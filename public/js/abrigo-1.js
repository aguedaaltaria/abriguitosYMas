const contenedorTargetas = document.getElementById("abriguitos");

async function obtenerAbrigos() {
    try {
        const response = await fetch('/abriguitos');
        const productos = await response.json(); 
        crearTarjetas(productos);
    } catch (error) {
        console.error(`Error al cargar los abrigos:, ${error}`);
    }
}

function crearTarjetas(productos) {
    productos.forEach((producto) => {

        const nuevoAbrigo = document.createElement("div");
        nuevoAbrigo.classList = "item";
        nuevoAbrigo.innerHTML = `

<div class="elemento ${producto.color}">     
    <div class="icon-item-corazon">
        <div class="icon-item">
            <button class="carritoAniadir" onclick="addCar( '${producto.ID}' ,'${producto.imagen}', '${producto.nombre_abrigo}', ${producto.precio_bruto})">
                <span class="material-symbols-outlined shopping-cart-item">
                    add_shopping_cart
                    </span>
            </button>
            <button class="carritoAniadir">
                <span class="material-symbols-outlined lista-item">
                    list_alt
                    </span>
            </button>
        </div>
        <div class="corazon-1">
            <input class="heart" type="checkbox" id="heart${producto.ID}${producto.tamanio}">
            <label class="label" for="heart${producto.ID}${producto.tamanio}"></label>
        </div>
    </div>
    <div class="imagen">
        <img src="${producto.imagen}" alt="abriguito">
    </div>
    <h3><center>${producto.nombre_abrigo}</center></h3>
    <p id="precio">$${producto.precio_bruto}.00</p>
    <p class="marca">${producto.nombre_marca}</p>
    <div class="especificaciones">
        <div id="size">
            <p>Size</p>
            <select name="Size" id="sizeSelect">
                <option value="${producto.tamanio}">${producto.tamanio}</option>
            </select>
        </div>
        <div id="tipo">
            <p>Tipo</p>
            <select name="Tipo">
                <option value="${producto.nombre_tipo}">${producto.nombre_tipo}</option>
            </select>
        </div>
        <div id="color">
            <p>Color</p>
            <select name="Color">
                <option value="${producto.color}">${producto.color}</option>
            </select>
        </div>
    </div>
</div>
            `;
        contenedorTargetas.appendChild(nuevoAbrigo);
    });
}

if (contenedorTargetas !== null) {
    obtenerAbrigos()
}


// Filtros ////////////////////////////////

function hola() {
    let checkbox = document.getElementById("checkboxTodo");
    if (checkbox.checked) {
        alert ("hi");
    } else {
    
        alert ("adios")
    }
}

function color(color) {
    let elementos = contenedorTargetas.querySelectorAll(".item");
    let checkbox = document.getElementsByClassName("checkboxcolor");
    let arrCheckbox = Array.from(checkbox);
    let checkedColors = arrCheckbox.filter((checkedColor) => {
        if (checkedColor.checked) {
            return true
        } else {
            return false
        }
    })
    checkedColors = checkedColors.map((valor) => {return valor.value}); 

    elementos.forEach(elemento => {
        elemento.style.display = "none";
    })

    elementos.forEach(elemento => {
        checkedColors.forEach(checkedColor => {
            if(elemento.textContent.toLowerCase().includes(checkedColor)) {
                elemento.style.display = "block";
            }
        }) 
    })

    if (checkedColors.length == 0) {
        elementos.forEach(elemento => {
            elemento.style.display = "block";
        })
    }
}

function tipo(tipo) {
    let elementos = contenedorTargetas.querySelectorAll(".item");
    let checkbox = document.getElementsByClassName("checkboxtipo");
    let arrCheckbox = Array.from(checkbox);
    let checkedTipos = arrCheckbox.filter((checkedTipo) => {
        if (checkedTipo.checked) {
            return true
        } else {
            return false
        }
    })
    checkedTipos = checkedTipos.map((valor) => {return valor.value}); 

    elementos.forEach(elemento => {
        elemento.style.display = "none";
    })

    elementos.forEach(elemento => {
        checkedTipos.forEach(checkedTipo => {
            if(elemento.textContent.toLowerCase().includes(checkedTipo)) {
                elemento.style.display = "block";
            }
        }) 
    })

    if (checkedTipos.length == 0) {
        elementos.forEach(elemento => {
            elemento.style.display = "block";
        })
    }
}

// busqueda /////////////////////////

// if (contenedorTargetas !== null) {
//     obtenerAbrigos();
// }

let formularioBusqueda = document.getElementById("formularioBusqueda");

formularioBusqueda.addEventListener("submit", (event) => {
    event.preventDefault();

    let inputBuscador = document.getElementById("busqueda");
    let terminoBusqueda = inputBuscador.value.trim().toLowerCase();
    let elementos = contenedorTargetas.querySelectorAll(".item");

    elementos.forEach((elemento) => {
        let elementoNombre = elemento.textContent.toLowerCase();

        if (terminoBusqueda.startsWith("-")) {
            if (!elementoNombre.includes(terminoBusqueda.slice(1))) {
                elemento.style.display = "block";
            } else {
                elemento.style.display = "none";
            }
        } else if (elementoNombre.includes(terminoBusqueda)) {
            elemento.style.display = "block";
        } else {
            elemento.style.display = "none";
        }
    });
});


// Carrito ////////////////

let carrito = document.getElementById('carrito');
let cuadrodepago = document.getElementById('pago');
let listPago = document.getElementById('listaPago');
let total = document.getElementById('total');
let numCarrito = document.getElementById('numCarrito')
let botonCerrar = document.getElementById('btncerrarpago')

carrito.addEventListener('mouseover', function() {
    cuadrodepago.style.display = 'block';
})

botonCerrar.addEventListener('click', function() {
    cuadrodepago.style.display = 'none';
});

carrito.addEventListener('mouseout', function() {
    setTimeout(() => {
        cuadrodepago.style.display = 'none';
    }, 7000);
});

function addCar(id, imagen, producto, precio) {
    listPago.innerHTML += `
    <li class="productoPago"><p>${producto}</p><span class= "precioPago">$${precio}</span></li>
    `
    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    let nuevoProducto = {
        id: id,
        imagen: imagen,
        nombre: producto,
        precio: parseFloat(precio),
        cantidad: 1
    };
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    actualizar();
}

function borrarpago() {
    let productoPago = listPago.querySelectorAll('.productoPago');
    listPago.innerHTML = "";
    numCarrito.innerHTML = '0';
    total.innerHTML = `$0`;
    localStorage.clear();
}

function actualizar() {
    let productoPago = listPago.querySelectorAll('.productoPago');
    let precioPago = listPago.querySelectorAll('.precioPago')
    numCarrito.innerHTML = `${productoPago.length}`

    let valorPrecio = [];
    for (let p of precioPago) {
        valorPrecio.push(p.textContent);
    }
    let valorPrecioSinSigno = valorPrecio.map(precio => precio.substring(1));
    let precioArr = valorPrecioSinSigno.map(precio => {return parseFloat(precio)})
    let precioReduce = precioArr.reduce((acu, curr) => acu + curr);

    total.innerHTML = `$${precioReduce}`;
}


// Menu ////////////

let menu = document.getElementById('menu');
let contenedor = document.getElementById('contenedor');
let detail = document.getElementById('detail-container');
let oferta = document.getElementById('oferta');
let MiPerfil = document.getElementById('contenedorPerfil');

detail.addEventListener('click', function() {
    cambioOpacity();
});

function cambioOpacity() {
    if (contenedor !== null) {
        if (detail.open) {
            contenedor.style.opacity = 1;
            oferta.style.opacity = 1;
        } else {
            contenedor.style.opacity = 0.3;
            oferta.style.opacity = 0.3;
        }
    } else {
        if (detail.open) {
            MiPerfil.style.opacity = 1;
        } else {
            MiPerfil.style.opacity = 0.3;
        }
    }
}


// Mi Perfil //////////////////////////////////

// register
let nombreRegister = document.getElementById('nombreRegister');
let apellidoRegister = document.getElementById('apellidoRegister');
let correoRegister = document.getElementById('correoRegister');
let telefonoRegister = document.getElementById('telefonoRegister');
let ContrasenaRegister = document.getElementById('ContrasenaRegister');
let calleRegister = document.getElementById('calleRegister');
let nombre_entregaRegister = document.getElementById('nombre_entregaRegister');
let estadoRegister = document.getElementById('estadoRegister');
let ciudadRegister = document.getElementById('ciudadRegister');
let paisRegister = document.getElementById('paisRegister');
let zipcodeRegister = document.getElementById('zipcodeRegister');

let usuarios = [];
let calleYCorreo = '';

class Usuario {
    constructor(nombre, apellido, correo, telefono, contrasena, calle, nombre_entrega, estado, ciudad, pais, zipcode ) {
        this.id = (generarID(correo)) + 40000;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.telefono = telefono;
        this.contrasena = contrasena;
        calleYCorreo = (eliminarEspacios(`${calle}${correo}`)) + 50000;
        this.ID_direccion = generarID(calleYCorreo);
        this.calle = calle;
        this.nombre_entrega = nombre_entrega;
        this.estado = estado;
        this.ciudad = ciudad;
        this.pais = pais;
        this.zipcode = zipcode;
        this.historialPedidos = [];
        this.favoritos = [];
        usuarios.push(this);
    }
}

function generarID(str) {
    const hash = str.hashCode();
    return Math.abs(hash % 10000); 
}

String.prototype.hashCode = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        hash = ((hash << 5) - hash) + this.charCodeAt(i);   
        hash |= 0;
    }
    return hash;
};

function formatoTelefono (input) {
    if (input.length === 10) {
        let numeroString = input.toString();
        numeroString = numeroString.slice(0, 10);
        let parte1 = numeroString.slice(0, 3);
        let parte2 = numeroString.slice(3, 6);
        let parte3 = numeroString.slice(6);

        let telefonoConFormato = `(${parte1}) ${parte2} - ${parte3}`;

        return telefonoConFormato;

    } else if (input.length === 11) {
        let numeroString = input.toString();
        numeroString = numeroString.slice(0, 11);
        let parte0 = numeroString.slice(0);
        let parte1 = numeroString.slice(1, 4);
        let parte2 = numeroString.slice(4, 7);
        let parte3 = numeroString.slice(7);

        let telefonoConFormato = `+${parte0} (${parte1}) ${parte2} - ${parte3}`;

        return telefonoConFormato;

    } else if (input.length === 12) {
        let numeroString = input.toString();
        numeroString = numeroString.slice(0, 12);
        let parte0 = numeroString.slice(0, 2);
        let parte1 = numeroString.slice(2, 5);
        let parte2 = numeroString.slice(5, 8);
        let parte3 = numeroString.slice(8);

        let telefonoConFormato = `+${parte0} (${parte1}) ${parte2} - ${parte3}`;

        return telefonoConFormato;

    } else {
        alert('Escriba el telefono completo (los 10 numeros) sin guiones, ni espacios, ni signos');
    }
}

function eliminarEspacios (text) {
    return text.split(' ').join('');
}

function mayusculaPrimeraLetra1 (str) {
    return palabra[0].toUpperCase() + palabra.slice(1);
}

function crearUsuario() {
    let nombre = mayusculaPrimeraLetra1(nombreRegister.value);
    let apellido = mayusculaPrimeraLetra1(apellidoRegister.value);
    let correo = correoRegister.value;
    let telefono = formatoTelefono(telefonoRegister.value);
    let contrasena = ContrasenaRegister.value;
    let calle = calleRegister.value;
    let nombre_entrega = mayusculaPrimeraLetra1(nombre_entregaRegister.value);
    let estado = mayusculaPrimeraLetra1(estadoRegister.value);
    let ciudad = mayusculaPrimeraLetra1(ciudadRegister.value);
    let pais = mayusculaPrimeraLetra1(paisRegister.value);
    let zipcode = zipcodeRegister.value;
    let newUsuario = new Usuario(nombre, apellido, correo, telefono, contrasena, calle, nombre_entrega, estado, ciudad, pais, zipcode );

    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUsuario)
    })
        .then(response => response.json())
        .then(data => {
            alert (`Bienvenido a Abriguitos & Mas ${data.nombre} ${data.apellido}, Tu nuevo ID es ${data.id}`);
            window.location.href = "/";
        })
        .catch(error => {
            alert ('Error al crear usuario:', error);
        });
}

// codigo movido al html "login.html" debido a que por alguna razon interferia con mi cuenta

//login
// const formulariologin = document.getElementById('formulariologin');
// const nombreLogin = document.getElementById('nombreLogin');
// const contrasenaLogin = document.getElementById('contrasenaLogin');
// const idLogin = document.getElementById('idLogin');

// ...

// Mi cuenta /////////////////////

// Informacion
const formularioAcceder = document.getElementById("formularioGET");
const info = document.getElementById("info");
const cuadroAcceder = document.getElementById("cuadroGET")

formularioAcceder.addEventListener('submit', event => {
    event.preventDefault();

    const idGET = (document.getElementById("idGET")).value;
    const nombreGET = (document.getElementById("nombreGET")).value;
    const apellidoGET = (document.getElementById("apellidoGET")).value;
    const contrasenaGET = (document.getElementById("contrasenaGET")).value;
    let nombreMiniscula = nombreGET.toLowerCase();
    let apellidoMinuscula = apellidoGET.toLowerCase();

    fetch(`/usuarios/${idGET}`)
    .then(response => response.json())
    .then((data) => {
        if (data) {
            let nombreUsuario = data.nombre.toLowerCase();
            let apellidoUsuario = data.apellido.toLowerCase();

            if (nombreUsuario == nombreMiniscula) {
                if (apellidoUsuario == apellidoMinuscula) {
                    if (contrasenaGET == data.contrasena) {
                        cuadroAcceder.style.left = "-100vw";
                        info.innerHTML = `
                        <table>
                                <tr>
                                    <td >ID:</td>
                                    <td id="IDVerificar">${data.id}</td>
                                </tr>
                                <tr>
                                    <td>Nombre y Apellido:</td>
                                    <td>${data.nombre} ${data.apellido}</td>
                                </tr>
                                <tr>
                                    <td>Correo electronico:</td>
                                    <td>${data.correo}</td>
                                </tr>
                                <tr>
                                    <td>Telefono:</td>
                                    <td>${data.telefono}</td>
                                </tr>
                                <tr>
                                    <td>Contrasena:</td>
                                    <td id="contrasenaVerificar">${data.contrasena}</td>
                                </tr>
                                <tr>
                                    <td>ID Direccion:</td>
                                    <td>${data.ID_direccion}</td>
                                </tr>
                                <tr>
                                    <td>Direccion:</td>
                                    <td>${data.calle}, ${data.ciudad}, ${data.estado}, ${data.pais}</td>
                                </tr>
                                <tr>
                                    <td>Zipcode:</td>
                                    <td>${data.zipcode}</td>
                                </tr>
                                <tr>
                                    <td>Historial de pedidos:</td>
                                    <td>Ha hecho ${data.historialPedidos.length} pedidos</td>
                                </tr>
                            </table>
                        `;
                    }
                }
            }
        } else {
            console.error('Error: No se encontraron datos de ese usuario.');
        }
    })
    .catch(error => {
        console.error('Error en el fetch:', error);
    });
})

// Eliminar cuenta 
const btnEliminarCuenta = document.getElementById("eliminarCuenta");
const cuadroEliminarCuenta = document.getElementById("cuadroDELETE");
const ocultarCuadroEliminarCuenta = document.getElementById("ocultarEliminarcuenta");
const formularioEliminarCuenta = document.getElementById("formularioDELETE");
const contrasenaDELETE = document.getElementById("contrasenaDELETE").value;
const contrasenaVerificar = document.getElementById("contrasenaVerificar").value;
const IDVerificar = document.getElementById("IDVerificar").value;

btnEliminarCuenta.addEventListener('click', () => {
    cuadroEliminarCuenta.style.left = 0;
})

ocultarCuadroEliminarCuenta.addEventListener('click', () => {
    cuadroEliminarCuenta.style.left = "-100vw";
})

formularioEliminarCuenta.addEventListener('submit', (event) => {
    event.preventDefault();

    const idDELETE = document.getElementById("idDELETE").value;
    let respuesta = confirm("¿Deseas Eliminar tu cuenta de forma definitiva? No hay vuelta atras");

    if (respuesta == true) {
        if ((idDELETE == IDVerificar) && (idDELETE !== "") && (contrasenaDELETE == contrasenaVerificar)) {
            fetch(`/usuarios/${idDELETE}`, {
                method: 'DELETE',
            })
            .then(response => {
                if (response.ok) {
                    alert("Cuenta eliminada exitosamente");
                    window.location.href = "/";
                } else {
                    alert(`Error al eliminar cuenta: ${response.status}`);
                }
            })
            .catch(error => {
                if (error instanceof NetworkError) {
                    alert("Error de red: Intenta nuevamente más tarde");
                } else if (error instanceof SyntaxError) {
                    alert("Error de sintaxis en la respuesta del servidor");
                } else {
                    console.error(error);
                    alert("Error al eliminar cuenta");
                }
            })
        } else {
            alert("Error: ID de usuario inválido o contrasena incorrecta");
        }
    } else {
        cuadroEliminarCuenta.style.left = "-100vw";
        alert("Cuenta no eliminada");
    }
})
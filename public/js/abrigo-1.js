const contenedorTargetas = document.getElementById("abriguitos");

async function obtenerAbrigos() {
    try {
        const response = await fetch('/abrigos');
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
            <button class="carritoAniadir" onclick="addCar( '${producto.id}' ,'${producto.imagen}', '${producto.nombre}', ${producto.precio})">
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
            <input class="heart" type="checkbox" id="heart${producto.id}">
            <label class="label" for="heart${producto.id}"></label>
        </div>
    </div>
    <div class="imagen">
        <img src="${producto.imagen}" alt="abriguito">
    </div>
    <h3><center>${producto.nombre}</center></h3>
    <p id="precio">$${producto.precio}.00</p>
    <p class="marca">${producto.marca}</p>
    <div class="especificaciones">
        <div id="size">
            <p>Size</p>
            <select name="Size" id="sizeSelect">
                <option value="${producto.size[0]}">${producto.size[0]}</option>
                <option value="${producto.size[1]}">${producto.size[1]}</option>
                <option value="${producto.size[2]}">${producto.size[2]}</option>
                <option value="${producto.size[3]}">${producto.size[3]}</option>
                <option value="${producto.size[4]}">${producto.size[4]}</option>
                <option value="${producto.size[5]}">${producto.size[5]}</option>
                <option value="${producto.size[6]}">${producto.size[6]}</option>
                </select>
        </div>
        <div id="tipo">
            <p>Tipo</p>
            <select name="Tipo">
                <option value="${producto.tipo}">${producto.tipo}</option>
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
        precio: parseFloat(precio)
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

















////////////////

















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
let correoRegister = document.getElementById('correoRegister');
let direccionRegister = document.getElementById('direccionRegister');
let ContrasenaRegister = document.getElementById('ContrasenaRegister');

let usuarios = [];

class Usuario {
    constructor(nombre, correo, contrasena, direccion) {
        this.id = generarID(nombre);
        this.nombre = nombre;
        this.correo = correo;
        this.contrasena = contrasena;
        this.direccion = direccion;
        this.historialPedidos = [];
        this.favoritos = [];
        usuarios.push(this);
    }
}

function generarID(nombre) {
    let numeros = "0123456789";

    let partes = nombre.split(' ');
    if (partes.length !== 2) {
        alert ("Error, debe escribir su primer nombre y su primer apellido");
    }

    let nombreM = partes[0].toUpperCase();
    let apellidoM = partes[1].toUpperCase();

    let primeraLetraNombre = nombreM.charAt(0);
    let primeraLetraApellido = apellidoM.charAt(0);

    let letras = primeraLetraNombre + primeraLetraApellido;

    let id = "";
    for (let i = 0; i < 1; i++) {
        id += letras
    }

    for (let i = 0; i < 4; i++) {
      id += numeros.charAt(Math.floor(Math.random() * numeros.length));
    }

    return id; 
}

function crearUsuario() {
    let nombre = nombreRegister.value;
    let correo = correoRegister.value;
    let contrasena = ContrasenaRegister.value;
    let direccion = direccionRegister.value;
    let newUsuario = new Usuario(nombre, correo, contrasena, direccion);

    fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUsuario) // Send the user data as JSON
    })
        .then(response => response.json())
        .then(data => {
            alert (`Bienvenido a Abriguitos & Mas ${data.nombre}, Tu nuevo ID es ${data.id}`);
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

// formulariologin.addEventListener('submit', event => {
//     event.preventDefault();

//     let id = idLogin.value;
//     let nombre = nombreLogin.value;
//     let contrasena = contrasenaLogin.value;
//     let nombreMiniscula = nombre.toLowerCase();
//     let usuarioEncontrado = null;

//     fetch(`/usuarios/${id}`)
//     .then(response => response.json())
//     .then(usuario => {
//         let nombreUsuario = usuario.nombre.toLowerCase();

//         if (nombreUsuario == nombreMiniscula) {
//             if (usuario.contrasena == contrasena) {
//                 usuarioEncontrado = usuario;
//             }
//         }

//         if (usuarioEncontrado) {
//             alert (`Bienvenido ${usuarioEncontrado.nombre}`);
//             window.location.href = "/";
//         } else {
//             alert ("No hay usuario con ese nombre o contraseña incorrecta");
//         }
//     })
//     .catch(error => {
//         console.error('Error al cargar el archivo JSON:', error);
//     })
// })

// Mi cuenta /////////////////////

// Informacion
const formularioAcceder = document.getElementById("formularioGET");
const info = document.getElementById("info");
const cuadroAcceder = document.getElementById("cuadroGET")

formularioAcceder.addEventListener('submit', event => {
    event.preventDefault();

    const idGET = (document.getElementById("idGET")).value;

    fetch(`/usuarios/${idGET}`)
    .then(response => response.json())
    .then((data) => {
        if (data) {
            cuadroAcceder.style.left = "-100vw";
            info.innerHTML = `
            <table>
                    <tr>
                        <td>ID:</td>
                        <td>${data.id}</td>
                    </tr>
                    <tr>
                        <td>Nombre:</td>
                        <td>${data.nombre}</td>
                    </tr>
                    <tr>
                        <td>Correo electronico:</td>
                        <td>${data.correo}</td>
                    </tr>
                    <tr>
                        <td>Direccion:</td>
                        <td>${data.direccion}</td>
                    </tr>
                    <tr>
                        <td>Contrasena:</td>
                        <td>${data.contrasena}</td>
                    </tr>
                    <tr>
                        <td>Historial de pedidos:</td>
                        <td>Ha hecho ${data.historialPedidos.length} pedidos</td>
                    </tr>
                </table>
            `;
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

btnEliminarCuenta.addEventListener('click', () => {
    cuadroEliminarCuenta.style.left = 0;
})

ocultarCuadroEliminarCuenta.addEventListener('click', () => {
    cuadroEliminarCuenta.style.left = "-100vw";
})

formularioEliminarCuenta.addEventListener('submit', (event) => {
    event.preventDefault();

    let respuesta = confirm("¿Deseas Eliminar tu cuenta de forma definitiva? No hay vuelta atras");

    if (respuesta == true) {
        const idDELETE = document.getElementById("idDELETE").value;

        if (idDELETE && idDELETE !== "") {
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
                    alert("Error al eliminar cuenta. Contacta al soporte técnico");
                }
            })
        } else {
            alert("Error: ID de usuario inválido");
        }
    } else {
        cuadroEliminarCuenta.style.left = "-100vw";
    }
})
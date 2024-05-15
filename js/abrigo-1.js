const contenedorTargetas = document.getElementById("abriguitos");

function crearTarjetas(productos) {
    productos.forEach((producto) => {
        const nuevoAbrigo = document.createElement("div");
        nuevoAbrigo.classList = "item";
        nuevoAbrigo.innerHTML = `

<div class="elemento ${producto.color}">     
    <div class="icon-item-corazon">
        <div class="icon-item">
            <button class="carritoAniadir" onclick="addCar('${producto.nombre}', ${producto.precio})">
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

        `
        contenedorTargetas.appendChild(nuevoAbrigo);
    });
}

if (contenedorTargetas !== null) {
    crearTarjetas(abrigos);
}


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

function addCar(producto, precio) {
    listPago.innerHTML += `
    <li class="productoPago"><p>${producto}</p><span class= "precioPago">$${precio}</span></li>
    `
    actualizar();
}

function borrarpago() {
    let productoPago = listPago.querySelectorAll('.productoPago');
    listPago.innerHTML = "";
    numCarrito.innerHTML = '0';
    total.innerHTML = `$0`
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
let correoRegister = document.getElementById('correoRegister');
let direccionRegister = document.getElementById('direccionRegister');
let ContrasenaRegister = document.getElementById('ContrasenaRegister');

let usuarios = [];

class Usuario {
    constructor(nombre, correo, contrasena, direccion) {
        this._nombre = nombre;
        this._correo = correo;
        this._contrasena = contrasena;
        this._direccion = direccion;
        this._historialPedidos = [];
        usuarios.push(this);
    }
}

function crearUsuario() {
    let nombre = nombreRegister.value;
    let correo = correoRegister.value;
    let contrasena = ContrasenaRegister.value;
    let direccion = direccionRegister.value;
    let newUsuario = new Usuario(nombre, correo, contrasena, direccion);
    window.location.href = "./abrigo-1.html"
}

let clientePrueba = new Usuario("Juan Perez", "jp@gmail.com", "1234", "calle 1");

//login
let nombreLogin = document.getElementById('nombreLogin');
let contrasenaLogin = document.getElementById('contrasenaLogin');

function btnLogin() {
    let nombre = nombreLogin.value;
    let contrasena = contrasenaLogin.value;
    let nombreMiniscula = nombre.toLowerCase();

    for (let usuario of usuarios) {
        let nombreUsuario = usuario._nombre.toLowerCase();

        if (nombreUsuario == nombreMiniscula) {
            if (usuario._contrasena == contrasena) {
                alert (`Bienvenido ${usuario._nombre}`);
                window.location.href = "./abrigo-1.html"
            } else {
                alert ("Contrasena incorrecta");
                break;
            }
        } else {
            alert ("No hay usuario con ese nombre");
        }
    }
}
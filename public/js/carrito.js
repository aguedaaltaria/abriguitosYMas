const productosCarritoC = document.getElementById("productosCarritoC");
let idCounter = 0;

function crearTarjetasCarrito () {
    let productos = JSON.parse(localStorage.getItem('productos'));
    let productosSet = new Set(productos);
    let arrayProductos = [...productosSet];

    arrayProductos.forEach(producto => {
        let cantidad = 1;
        
        let precioNum = parseFloat(producto.precio);
        let cantidadyPrecio = precioNum * cantidad;
        let nuevoProducto = document.createElement("div");
        nuevoProducto.classList = "productoCarrito";
        nuevoProducto.id = `targeta${idCounter}`;
        idCounter++;
        nuevoProducto.innerHTML = `
            <img src="${producto.imagen}" alt="🧥">
            <div class="nombreYCantidades">
                <h3>${producto.nombre}</h3>
            </div>
            <div class="botonesYNum" >
                <button class="trash targeta${idCounter}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#75485b"><path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z"/></svg></button>
                <p class="totalPladoBTNSprevio" >$${producto.precio}</p>
                <div class="MasoMenos">
                    <button class="menoscarrito ${idCounter}"><h4>-</h4></button>
                    <p>${cantidad}</p>
                    <button class="mascarrito ${idCounter}"><h5>+</h5></button>
                </div>
                <p class="totalPladoBTNS">Total: $${cantidadyPrecio}</p>
            </div>
        `
        productosCarritoC.appendChild(nuevoProducto);
    });

    let totalAPagar = document.getElementById("totalAPagar");
    let productoCarritoTodos = document.querySelectorAll(".productoCarrito")

    let ArrayProductoCarritoTodos = [...productoCarritoTodos];

    let totalPrecio = productos.reduce((acumulador, producto) => {
        return acumulador + parseFloat(producto.precio);
    }, 0);

    totalAPagar.innerHTML = `$${totalPrecio}`;
}

function borrarLocalS() {
    localStorage.removeItem("productos");

    let productoCarritoTodos = document.querySelectorAll(".productoCarrito");
    let tarjetaCarrito = document.querySelector(".productoCarrito");

    for (let i = 0; i < productoCarritoTodos.length; i++) {
        let productoSolo = productoCarritoTodos[i];
        productoSolo.style.animation = "eliminar 1s ease-in-out forwards";

        productoSolo.addEventListener('animationend', () => {
            productosCarritoC.removeChild(productoSolo);

            productoCarritoTodos = document.querySelectorAll(".productoCarrito");

            if (i < productoCarritoTodos.length) {
                productoSolo = productoCarritoTodos[i];
                productoSolo.style.animation = "eliminar 1s ease-in-out forwards";
                productoSolo.addEventListener('animationend', () => {
                productosCarritoC.removeChild(productoSolo);
                productoCarritoTodos = document.querySelectorAll(".productoCarrito");
                });
            } else {
                productosCarritoC.innerHTML = "";
            }
        });
    }

    totalAPagar.innerHTML = `$0`;
}
crearTarjetasCarrito ()

productosCarritoC.addEventListener('click', evento => {
    if(evento.srcElement.nodeName == 'svg' ) {
        botonesTargetaCarrito(evento.srcElement.parentNode.parentNode.parentNode.id);
    } else if (evento.srcElement.nodeName == 'H4') {
        let elementoP = evento.srcElement.parentElement.nextElementSibling;
        let cantidadString = elementoP.innerHTML;
        let cantidadNum = parseInt(cantidadString);
        cantidadNum--;
        if (cantidadNum > 0) {
            elementoP.innerHTML = cantidadNum;
        } else {
            botonesTargetaCarrito(evento.srcElement.parentNode.classList);
        }

        let elementoTotal = evento.srcElement.parentElement.parentElement.nextElementSibling;
        let elementoPrecio = evento.srcElement.parentElement.parentElement.previousElementSibling;

        let elementoPrecioString = elementoPrecio.innerHTML.slice(1);
        let elementoPrecioNum = parseFloat(elementoPrecioString);
        elementoTotal.innerHTML =  `Total: $${elementoPrecioNum * cantidadNum}`;
        actualizarBotonTotal ()

    } else if (evento.srcElement.nodeName == 'H5') {
        let elementoP = evento.srcElement.parentElement.previousElementSibling;
        let cantidadString = elementoP.innerHTML;
        let cantidadNum = parseInt(cantidadString);
        cantidadNum++;
        elementoP.innerHTML = cantidadNum;

        let elementoTotal = evento.srcElement.parentElement.parentElement.nextElementSibling;
        let elementoPrecio = evento.srcElement.parentElement.parentElement.previousElementSibling;

        let elementoPrecioString = elementoPrecio.innerHTML.slice(1);
        let elementoPrecioNum = parseFloat(elementoPrecioString);
        elementoTotal.innerHTML =  `Total: $${elementoPrecioNum * cantidadNum}`;
        actualizarBotonTotal ();
    }
});

function botonesTargetaCarrito (id) {
    let tarjetaCarrito = document.getElementById(id);
    let totalAPagar = document.getElementById("totalAPagar");

    tarjetaCarrito.style.animation = "eliminar 1s ease-in-out forwards";

    tarjetaCarrito.addEventListener('animationend', () => {
        productosCarritoC.removeChild(tarjetaCarrito);
        actualizarBotonTotal();
        let productoCarrito = document.querySelectorAll(".productoCarrito");
        if (productoCarrito.length == 0) {
            localStorage.removeItem("productos");
            totalAPagar.innerHTML = `$0`;
        }
    })
}

function actualizarBotonTotal () {
    let totalAPagar = document.getElementById("totalAPagar");
    let preciosTotales = document.querySelectorAll(".totalPladoBTNS")
    let arrayPreciosTotales = [...preciosTotales];
    let precioValue = arrayPreciosTotales.map(producto => producto.innerHTML);
    let mapPrecio = precioValue.map(producto => producto.slice(8));
    let totalPrecio = mapPrecio.reduce((acumulador, producto) => {
        return acumulador + parseFloat(producto);
    }, 0);
    totalAPagar.innerHTML = `$${totalPrecio}`;
}

/////////////////////////

const contenedorTargetas = document.getElementById("abriguitos");

function crearTarjetas(productos) {
    productos.forEach((producto) => {
        const nuevoAbrigo = document.createElement("div");
        nuevoAbrigo.classList = "item";
        nuevoAbrigo.innerHTML = `
        
    <div class="icon-item-corazon">
        <div class="icon-item">
            <button class="carritoAniadir">
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
    <div class="especificaciones">
        <div id="size">
            <p>Size</p>
            <select name="Size">
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

        `
        contenedorTargetas.appendChild(nuevoAbrigo);
    });
}

crearTarjetas(abrigos);
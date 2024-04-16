const contenedorTargetas = document.getElementById("abriguitos");

function crearTarjetas(productos) {
    productos.forEach((producto) => {
        const nuevoAbrigo = document.createElement("div");
        nuevoAbrigo.classList = "item";
        nuevoAbrigo.innerHTML = `

<div class="elemento ${producto.color}">     
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

crearTarjetas(abrigos);

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
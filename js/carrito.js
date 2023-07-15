////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////// D O M ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONTENEDORES
let carritoContainer = document.querySelector('#carrito-container');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// L O C A L  S T O R A G E ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let productosEnLS = JSON.parse(localStorage.getItem('carrito'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// F U M C I O N E S //////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Titulo
if (!productosEnLS || !productosEnLS.length) {
    mostrarTitulo();
} else {
    mostrarCarrito();
}


// Mostrar productos en carrito 
function mostrarCarrito() {
    carritoContainer.innerHTML = "";
    let total = 0;

    if (!productosEnLS.length) {
        mostrarTitulo();
    }
    
    productosEnLS.forEach((producto) => {

        carritoContainer.innerHTML += `
        <div class="card mb-3 flex-row p-2" style="width: 100%;">
        <div class="img">
            <img style="width: 13rem; height: 13rem" src="${producto.img}" class="card-img-carrito" alt="">
        </div>
        <div class="info w-100 d-flex justify-content-around align-items-center">
            <p>Cantidad: ${producto.cantidad}<span></span></p>
            <p>Precio: $<span>${producto.importe}</span></p>
            <p>Subtotal: $<span>${producto.cantidad * producto.importe}</span></p>
            <button class="btn btn-eliminar btn-outline-secondary main-btns bg-dark" id="${producto.id}">Eliminar</button>
        </div>
        </div>`;

        total = productosEnLS.reduce((acc, producto) => acc + producto.cantidad * producto.importe, 0);

    });

    if (total === 0) {
        return;
    }

    const div = document.createElement('div');
    div.classList.add('container-fluid');
    div.innerHTML = `
        <div class="card mb-3 flex-row p-2 bg-success" style="width: 100%;">
            <div class="info w-100 d-flex justify-content-around align-items-center">
                <p class="text-white">Total: $<span>${total}</span></p>
            </div>
        </div>`;
    carritoContainer.append(div);


    setBotonesEliminar();
};

// Mostrar titulo
function mostrarTitulo() {
    const titulo = document.createElement('h1');
    titulo.textContent = "El carrito esta vacio.";
    titulo.classList.add('text-center');
    const main = document.querySelector('#main');
    main.append(titulo);
}

// Setear eventos en botones eliminar
function setBotonesEliminar() {
    let btnsEliminar = document.querySelectorAll('.btn-eliminar');

    btnsEliminar.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let indexEliminar = productosEnLS.findIndex(producto => producto.id === parseInt(e.currentTarget.id));

            productosEnLS.splice(indexEliminar, 1);

            mostrarCarrito();
            localStorage.setItem('carrito', JSON.stringify(productosEnLS));
        });
    });
}
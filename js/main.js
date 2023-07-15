// Variables -
// Funciones -
// Objetos -
// Arrays -
// Metodos de busqueda y filtrado sobre Arrays -
//DOM -
//JSON Y STORAGE  -


///////////////////////////////////////////////////////////// A R R A Y //////////////////////////////////////////////////
////////////////////////////////////////////////////////////// D E ///////////////////////////////////////////////////////
///////////////////////////////////////////////////////// P R O D U C T O S //////////////////////////////////////////////

import productos from './data/productos.js';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////// D O M ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// BOTONES
const btnShowAll = document.querySelector('#btn-show-all');
const btnSearchName = document.querySelector('#btn-search-name');
const btnSearchFormName = document.querySelector('#btn-search');
const btnSearchPrice = document.querySelector('#btn-search-price');
const btnSearchFormPrice = document.querySelector('#btn-input-price');

// botones categorias
let btnsCat = document.querySelectorAll('.btn-cat');

// FORMS
// nombre
const formSearchName = document.querySelector('#search-form-name');
// precio
const formSearchPrice = document.querySelector('#search-form-price');

// INPUTS
// input nombre
const inputNombre = document.querySelector('#input-nombre');

// input precio
const inputPrecioMax = document.querySelector('#customRange1');
const inputPrecioMin = document.querySelector('#customRange2');
let numPrecioMax = document.querySelector('#precio-range-max');
let numPrecioMin = document.querySelector('#precio-range-min');

// CONTENEDORES
// contenedor de productos
const productosContainer = document.querySelector('#cards-container');

// titulo principal
const titulo = document.querySelector('#title');
// numero del carrito
const carritoNum = document.querySelector('#carrito-numero');


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////// F U N C I O N E S ///////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// MOSTRAR TODOS LOS PRODUCTOS
const mostrarTodos = () => {
    titulo.textContent = "Todos los productos:"
    mostrarProductos(productos)
}

// Mostrar productos
const mostrarProductos = (param1) => {
    productosContainer.innerHTML = "";

    ocultarForm(formSearchName);
    ocultarForm(formSearchPrice);

    param1.forEach((producto) => {
        productosContainer.innerHTML += `
            <div class="card mx-auto" style="width: 18rem;">
                <div class="card-body">
                    <img style="width: 16rem; height: 13rem" src="${producto.img}" class="card-img-top" alt="${producto.nombre}">
                    <div class="d-flex flex-column justify-content-around align-items-center">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$ ${producto.importe}</p>
                        <button class="btn btn-primary agregar-al-carrito" id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>`;
    });
    setBotonesAgregarCarrito();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Display form
const displayForm = (display, form) => {
    form.classList.remove(display === "d-flex" ? "d-none" : "d-flex");
    form.classList.add(display);
};

// Mostrar form
const mostrarForm = (form) => {
    displayForm('d-flex', form);
};

// Ocultar form
const ocultarForm = (form) => {
    displayForm('d-none', form);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let carrito;
let carritoLS = JSON.parse(localStorage.getItem('carrito'));

if (carritoLS) {
    carrito = carritoLS;
    actualizarNumCarrito();
} else {
    carrito = [];
}

// Botones agregar al carrito
const setBotonesAgregarCarrito = () => {
    let btnsAgregarAlCarrito = document.querySelectorAll('.agregar-al-carrito');

    btnsAgregarAlCarrito.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let productoAgregado = productos.find((producto) => producto.id === parseInt(e.currentTarget.id));

            if (carrito.some(producto => producto.id === parseInt(e.currentTarget.id))) {
                productoAgregado.cantidad++;
            } else {
                productoAgregado.cantidad = 1;
                carrito.push(productoAgregado);
            }

            localStorage.setItem('carrito', JSON.stringify(carrito));

            actualizarNumCarrito();
        });
    });
};

// Actualizar num Carrito
function actualizarNumCarrito() {
    let numeroDeProductos = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    carritoNum.textContent = numeroDeProductos;
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Limpiar container de porductos y mostrar Form de Nombre
const limpiarYMostrarFormName = () => {
    titulo.textContent = "Buscar por nombre.";
    productosContainer.innerHTML = "";
    ocultarForm(formSearchPrice);
    mostrarForm(formSearchName);
};

// buscar productos por nombre
const buscarProductosXNombre = () => {
    // Limpia container de productos
    productosContainer.innerHTML = "";
    // Campturar datos buscados y filtrar
    let productoBuscado = inputNombre.value.toLowerCase();///////////////////////////////////////////////////////////////////////////////////////////////////
    let productosEncontrados = productos.filter((producto) => producto.nombre.toLowerCase().includes(productoBuscado));

    // Si el Array de productos encontrados tiene elementos los muestra
    if (productosEncontrados.length > 0) {
        titulo.textContent = `${productosEncontrados.length} producto/s encontrado/s:`;
        mostrarProductos(productosEncontrados);
        mostrarForm(formSearchName);
    } else { // Sino se alerta que no hay coincidencias
        titulo.textContent = `0 productos encontrados:`;
        alert("No se encontraron coincidencias.");
    }
};

// Limpiar container de productos y mostrar Form de Precio
const limpiarYMostrarFormPrice = () => {
    titulo.innerHTML = "Buscar por precio.";
    productosContainer.innerHTML = "";
    ocultarForm(formSearchName);
    mostrarForm(formSearchPrice);

    let arrayDePrecios = productos.map(producto => producto.importe);
    let precioMasCaro = Math.max(...arrayDePrecios);

    inputPrecioMax.addEventListener('input', () => numPrecioMax.textContent = Math.round(parseInt(inputPrecioMax.value) / 100 * precioMasCaro));
    inputPrecioMin.addEventListener('input', () => numPrecioMin.textContent = Math.round((parseInt(inputPrecioMin.value) / 100) * precioMasCaro));
};

// buscar por precio
const buscarProductosXPrecio = () => {
    productosContainer.innerHTML = "";

    let precioMin = parseInt(numPrecioMin.textContent);
    let precioMax = parseInt(numPrecioMax.textContent);

    let resultados = [];
    resultados = productos.filter(producto => {
        return producto.importe >= precioMin && producto.importe <= precioMax;
    });

    if (resultados.length > 0) {
        titulo.innerHTML = `${resultados.length} producto/s encontrado/s:`;
        mostrarProductos(resultados);
    } else {
        titulo.innerHTML = `0 productos encontrados:`;
        alert("No hay coincidencias.");
    }
};

// Filtrar por categorias
const filtrarPorCategorias = (e) => {
    let categoria = e.currentTarget.id;
    let resultados = productos.filter((producto) => producto.categ === categoria.toLowerCase());
    titulo.innerHTML = `${categoria}:`;
    ocultarForm(formSearchName);
    ocultarForm(formSearchPrice);
    productosContainer.innerHTML = "";
    mostrarProductos(resultados);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////// E V E N T O S ///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//mostrar todos los productos
btnShowAll.addEventListener('click', mostrarTodos);

//filtrar por nombre
btnSearchName.addEventListener('click', limpiarYMostrarFormName);
btnSearchFormName.addEventListener('click', buscarProductosXNombre);

// filtrar por precio
btnSearchPrice.addEventListener('click', limpiarYMostrarFormPrice);
btnSearchFormPrice.addEventListener('click', buscarProductosXPrecio);

// filtrar por categorias
btnsCat.forEach(btn => {
    btn.addEventListener('click', filtrarPorCategorias);
});

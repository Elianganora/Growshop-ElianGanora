// Alertas Toastify

const alertaAgregado = () => {
  Toastify({
    text: "Producto agregado al carrito",
    closeOnClick: true,
    style: {
      background: 'linear-gradient(to right, #456253, #2DAF6C)'
    },
  }).showToast();
}
const alertafnCompra = () => {
  Toastify({
    text: "Gracias por su compra!",
    closeOnClick: true,
    duration: 2500,
    style: {
      background: 'linear-gradient(to right, #456253, #2DAF6C)'
    },
  }).showToast();
}


const alertaBorrado = () => {
  Toastify({
    text: "El producto se elimino del carrito",
    closeOnClick: true,
    style: {
      background: 'linear-gradient(to left, #850707, #DD0606)'
    },
  }).showToast();
}



// DOM
let carritoDeCompras = [];

const contenedorProductos = document.querySelector(".container-products");
const contenedorCarrito = document.querySelector("#carrito-contenedor");
const btnComprar = document.querySelector("#btn-comprar");
const precioProducto = document.querySelector(".precioProducto");

const contadorCarrito = document.querySelector("#contadorCarrito");
const precioTotal = document.querySelector("#precioTotal");
const buscador = document.querySelector("#search");

mostrarProducto(stockProductos);

// funcion para identificar y mostrar los productos

function mostrarProducto(array){
  array.forEach(item => {
    let div = document.createElement('div');
    div.classList.add('product');

    div.innerHTML = `
    <img src=${item.img} alt=""
      class="product__img">
    <div class="product__description">
      <h3 class="product__title">${item.nombre}</h3>
      <span class="product__price">$${item.precio}</span>
    </div>
    <i class="product__icon"><a class="fa-solid fa-cart-plus" id="agregar${item.id}"> </a>
  </div> `

  contenedorProductos.appendChild(div);

  let btnAgregar = document.getElementById(`agregar${item.id}`);
  
 
   btnAgregar.addEventListener("click",() =>{
    agregarAlCarrito(item.id);
   })
  }
)}

// funcion para agregar al carrito

function agregarAlCarrito(id) {
  let verificacion = carritoDeCompras.find(item => item.id == id)
  if (verificacion) {
    verificacion.cantidad = verificacion.cantidad + 1;

    document.getElementById(`und${verificacion.id}`).innerHTML = `<p id="und${verificacion.id}">Und:${verificacion.cantidad} </p> `

    alertaAgregado()
    actualizarCarrito()
  } else {
    let productoAgregar = stockProductos.find(elemento => elemento.id == id);

    productoAgregar.cantidad = 1;

    carritoDeCompras.push(productoAgregar);

    actualizarCarrito();
    mostrarCarrito(productoAgregar);
  }

  localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))

}

// funcion para mostrar el carrito

function mostrarCarrito(productoAgregar) {

  let div = document.createElement('div');
  div.className = ' productoEnCarrito';
  div.innerHTML = `<h3>${productoAgregar.nombre}</h3>
      <p>${productoAgregar.precio}</p>
      <p id="und${productoAgregar.id}">Und:${productoAgregar.cantidad} </p>
      <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fa-solid fa-delete-left"></i></button><br><hr><p>`

  contenedorCarrito.appendChild(div);

  let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

  btnEliminar.addEventListener('click', () => {
    if (productoAgregar.cantidad == 1) {
      btnEliminar.parentElement.remove();

      carritoDeCompras = carritoDeCompras.filter(item => item.id != productoAgregar.id);

      actualizarCarrito()
      localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    } else {
      productoAgregar.cantidad = productoAgregar.cantidad - 1;

      document.getElementById(`und${productoAgregar.id}`).innerHTML = `<p id="und${productoAgregar.id}">Und:${productoAgregar.cantidad} </p> `
      alertaBorrado()
      actualizarCarrito()
      localStorage.setItem('carrito', JSON.stringify(carritoDeCompras))
    }

  })

}

// funcion para  actualizar la cantidad y el precio del carrito

function actualizarCarrito() {
  contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)

  precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
}

// funcion para recuperar la informacion del localStorage del carrito

function recuperar() {
  let recuperarLocalStorage = JSON.parse(localStorage.getItem('carrito')) || []


  recuperarLocalStorage.forEach(el => {


    mostrarCarrito(el)
    carritoDeCompras.push(el)
    actualizarCarrito();

  })
}

// funcion boton de compra

btnComprar.addEventListener("click", () => {
  contenedorCarrito.innerHTML = ` `;
  contadorCarrito.innerHTML = ` `;

  btnComprar.innerText = `Finalizar compra`;
  if (btnComprar.addEventListener("click", fnCompra)) {

  }
})

// finalizar compra
function fnCompra() {
  setInterval("location.reload()", 2500);
  localStorage.clear();
  alertafnCompra();
}
// // declaracion de la funcion recuperar
recuperar()

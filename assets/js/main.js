// 1. Base de datos de Jockeys
const productos = [
  {
    id: 1,
    nombre: "Snapback LA Black",
    precio: 24990,
    imagen: "./assets/img/1657891-00-A_0_2000.jpg",
    descripcion: "Clásico diseño urbano con visera plana y ajuste trasero.",
    categoria: "Snapback",
  },
  {
    id: 2,
    nombre: "Trucker Vintage Olive",
    precio: 19990,
    imagen: "./assets/img/1657914-00-A_0_2000.jpg",
    descripcion: "Malla trasera respirable, ideal para el verano.",
    categoria: "Trucker",
  },
  {
    id: 3,
    nombre: "Dad Hat Minimal",
    precio: 15990,
    imagen: "./assets/img/1657915-00-A_0_2000.jpg",
    descripcion: "Gorra desestructurada de algodón, estilo relajado.",
    categoria: "Dad Hat",
  },
  {
    id: 4,
    nombre: "Bucket Hat Camo",
    precio: 22500,
    imagen: "./assets/img/1657916-00-A_0_2000.jpg",
    descripcion: "Gorro pescador con patrón de camuflaje urbano.",
    categoria: "Bucket",
  },
  {
    id: 5,
    nombre: "Five Panel Racer",
    precio: 21990,
    imagen: "./assets/img/1657921-00-A_0_2000.jpg",
    descripcion: "Diseño aerodinámico de 5 paneles con clip ajustable.",
    categoria: "5-Panel",
  },
  {
    id: 6,
    nombre: "Beanie Wool Grey",
    precio: 14990,
    imagen: "./assets/img/1657931-00-A_0_2000.jpg",
    descripcion: "Gorro tejido de lana merino, esencial para el invierno.",
    categoria: "Beanie",
  },
  {
    id: 7,
    nombre: "Snapback Chicago Red",
    precio: 25990,
    imagen: "./assets/img/1657932-00-A_0_2000.jpg",
    descripcion: "Rojo intenso con logo bordado en 3D. Actitud pura.",
    categoria: "Snapback",
  },
  {
    id: 8,
    nombre: "Trucker Surf Vibes",
    precio: 18500,
    imagen: "./assets/img/1657933-00-A_0_2000.jpg",
    descripcion: "Panel frontal de espuma con estampado tropical.",
    categoria: "Trucker",
  },
  {
    id: 9,
    nombre: "Dad Hat Corduroy",
    precio: 17990,
    imagen: "./assets/img/1693862-00-A_0_2000.jpg",
    descripcion: "Textura de cotelé (pana) en color café tabaco.",
    categoria: "Dad Hat",
  },
  {
    id: 10,
    nombre: "Visor Sport White",
    precio: 12990,
    imagen: "./assets/img/1693862-03-A_0_2000.jpg",
    descripcion: "Visera técnica ultra ligera para running y tenis.",
    categoria: "Deportivo",
  },
  {
    id: 11,
    nombre: "Bucket Hat Denim",
    precio: 23990,
    imagen: "./assets/img/1693867-00-A_0_2000.jpg",
    descripcion: "Gorro pescador de mezclilla lavado a la piedra.",
    categoria: "Bucket",
  },
  {
    id: 12,
    nombre: "Beanie Docker Black",
    precio: 13990,
    imagen: "./assets/img/1693867-02-A_0_2000.jpg",
    descripcion: "Gorro corto estilo portuario sin visera.",
    categoria: "Beanie",
  },
];

// 2. Elementos del DOM
const contenedor = document.getElementById("contenedor-productos");
const contadorCarrito = document.getElementById("contador-carrito");
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// 3. Recorrido de los Jockeys para mostrarlos.
function renderizarProductos() {
  contenedor.innerHTML = "";
  productos.forEach((producto) => {
    const cardHTML = `
            <div class="col-12 col-md-6 col-lg-3 mb-4">
                <div class="card h-100 shadow-sm border-0">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <span class="badge bg-secondary mb-2 w-50 align-self-start">${producto.categoria}</span>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text text-muted small flex-grow-1">${producto.descripcion}</p>
                        <div class="d-flex justify-content-between align-items-center mt-3">
                            <span class="fw-bold fs-5">$${producto.precio.toLocaleString("es-CL")}</span>
                            <button class="btn btn-dark btn-sm" onclick="agregarAlCarrito(${producto.id})">
                                + Agregar
                            </button>
                        </div>
                        <a href="detalle.html" class="btn btn-outline-dark btn-sm mt-2">Ver Detalles</a>
                    </div>
                </div>
            </div>
        `;
    contenedor.innerHTML += cardHTML;
  });
  actualizarContador();
}

// 4. Agregar el ID al Carrito
function agregarAlCarrito(idProducto) {
  carrito.push(idProducto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  // Agregar pop-up de éxito
}

// 5. Actualizar el numerito del Navbar
function actualizarContador() {
  contadorCarrito.innerText = carrito.length;
}

// Inicializar
document.addEventListener("DOMContentLoaded", renderizarProductos);

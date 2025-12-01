// -----------------------------
// 1) Datos (productos)
// -----------------------------
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

// -----------------------------
// 2) Manejo de carrito en localStorage
// carrito es array de items: { id: Number, cantidad: Number }
// -----------------------------
const KEY = "carrito_urbancap";

function cargarCarrito() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}
function guardarCarrito(carrito) {
  localStorage.setItem(KEY, JSON.stringify(carrito));
}
function agregarAlCarrito(id, cantidad = 1) {
  const carrito = cargarCarrito();
  const item = carrito.find((i) => i.id === id);
  if (item) item.cantidad += cantidad;
  else carrito.push({ id, cantidad });
  guardarCarrito(carrito);
  actualizarContador();
}
function quitarDelCarrito(id) {
  let carrito = cargarCarrito();
  carrito = carrito.filter((i) => i.id !== id);
  guardarCarrito(carrito);
  actualizarContador();
}
function actualizarCantidad(id, cantidad) {
  const carrito = cargarCarrito();
  const item = carrito.find((i) => i.id === id);
  if (!item) return;
  item.cantidad = Math.max(1, parseInt(cantidad) || 1);
  guardarCarrito(carrito);
  actualizarContador();
}
function vaciarCarrito() {
  guardarCarrito([]);
  actualizarContador();
}
function contarItemsTotales() {
  return cargarCarrito().reduce((acc, it) => acc + it.cantidad, 0);
}
function actualizarContador() {
  const el = document.getElementById("contador-carrito");
  if (el) el.innerText = contarItemsTotales();
}

// -----------------------------
// 3) Utilidades
// -----------------------------
function formatoCLP(value) {
  return value.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
}

// -----------------------------
// 4) Renderizado en index (catalogo)
// -----------------------------
function renderizarProductos() {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;
  contenedor.innerHTML = "";
  productos.forEach((p) => {
    const div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-3 mb-4";
    div.innerHTML = `
      <div class="card h-100 shadow-sm border-0">
        <img src="${p.imagen}" class="card-img-top" alt="${p.nombre}" onerror="this.src='https://via.placeholder.com/400x400?text=Sin+imagen'">
        <div class="card-body d-flex flex-column">
          <span class="badge bg-secondary mb-2 w-50 align-self-start">${p.categoria}</span>
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text text-muted small flex-grow-1">${p.descripcion}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <span class="fw-bold fs-5">${formatoCLP(p.precio)}</span>
            <button class="btn btn-dark btn-sm btn-add" data-id="${p.id}">+ Agregar</button>
          </div>
          <a href="detalle.html?id=${p.id}" class="btn btn-outline-dark btn-sm mt-2">Ver Detalles</a>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  contenedor.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-add");
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    agregarAlCarrito(id, 1);
    showToast("Producto agregado al carrito 🛒");
  });
}

// -----------------------------
// 5) Detalle de producto (detalle.html)
// -----------------------------
function obtenerDetalleProducto() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"), 10);
  if (!id) return null;
  return productos.find((p) => p.id === id) || null;
}
function renderizarDetalle(producto) {
  if (!producto) return;
  const elBreadcrumb = document.getElementById("detalle-nombre-breadcrumb");
  const elImagen = document.getElementById("detalle-imagen");
  const elCategoria = document.getElementById("detalle-categoria");
  const elTitulo = document.getElementById("detalle-titulo");
  const elPrecio = document.getElementById("detalle-precio");
  const elDescripcion = document.getElementById("detalle-descripcion");
  const btnAgregar = document.getElementById("btn-agregar-detalle");

  if (elBreadcrumb) elBreadcrumb.innerText = producto.nombre;
  if (elImagen) {
    elImagen.src = producto.imagen;
    elImagen.alt = producto.nombre;
    elImagen.onerror = () =>
      (elImagen.src = "https://via.placeholder.com/600x600?text=Sin+imagen");
  }
  if (elCategoria) elCategoria.innerText = producto.categoria;
  if (elTitulo) elTitulo.innerText = producto.nombre;
  if (elPrecio) elPrecio.innerText = formatoCLP(producto.precio);
  if (elDescripcion) elDescripcion.innerText = producto.descripcion;

  if (btnAgregar) {
    btnAgregar.onclick = () => {
      agregarAlCarrito(producto.id, 1);
      showToast(`${producto.nombre} agregado al carrito 🛒`);
    };
  }
}

// -----------------------------
// 6) Renderizado carrito (carrito.html)
// -----------------------------
function renderizarCarrito() {
  const carrito = cargarCarrito();
  const contenedor = document.getElementById("cuerpo-carrito");
  const tabla = document.getElementById("tabla-carrito");
  const avisoVacio = document.getElementById("carrito-vacio");
  const subtotalEl = document.getElementById("subtotal");
  const envioEl = document.getElementById("envio");
  const totalEl = document.getElementById("total");

  if (!contenedor || !tabla || !avisoVacio) return;

  if (carrito.length === 0) {
    tabla.style.display = "none";
    avisoVacio.style.display = "block";
    return;
  } else {
    tabla.style.display = "block";
    avisoVacio.style.display = "none";
  }

  contenedor.innerHTML = "";
  let subtotal = 0;

  carrito.forEach((item) => {
    const producto = productos.find((p) => p.id === item.id);
    if (!producto) return;
    const lineaSubtotal = producto.precio * item.cantidad;
    subtotal += lineaSubtotal;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <div class="d-flex align-items-center">
          <img src="${producto.imagen}" alt="${producto.nombre}" style="width:64px; height:64px; object-fit:cover; margin-right:12px;" onerror="this.src='https://via.placeholder.com/64x64?text=Sin'">
          <div>
            <strong>${producto.nombre}</strong>
            <div class="text-muted small">${producto.categoria}</div>
          </div>
        </div>
      </td>
      <td>${formatoCLP(producto.precio)}</td>
      <td>
        <input type="number" min="1" value="${item.cantidad}" class="form-control input-cantidad" data-id="${producto.id}">
      </td>
      <td>${formatoCLP(lineaSubtotal)}</td>
      <td>
        <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${producto.id}">Eliminar</button>
      </td>
    `;
    contenedor.appendChild(tr);
  });

  // calcular envío (ejemplo simple: gratis sobre 50000)
  const envio = subtotal >= 50000 ? 0 : 3990;
  const total = subtotal + envio;

  if (subtotalEl) subtotalEl.innerText = formatoCLP(subtotal);
  if (envioEl) envioEl.innerText = formatoCLP(envio);
  if (totalEl) totalEl.innerText = formatoCLP(total);

  // listeners para inputs y botones eliminar
  contenedor.querySelectorAll(".input-cantidad").forEach((input) => {
    input.addEventListener("change", (e) => {
      const id = parseInt(e.target.dataset.id, 10);
      const cant = parseInt(e.target.value, 10) || 1;
      actualizarCantidad(id, cant);
      renderizarCarrito(); // para actualizar subtotales
    });
  });

  contenedor.querySelectorAll(".btn-eliminar").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id, 10);
      quitarDelCarrito(id);
      renderizarCarrito();
      showToast("Producto eliminado del carrito ❌");
    });
  });

  // botones vaciar y comprar
  const btnVaciar = document.getElementById("vaciar-carrito");
  const btnComprar = document.getElementById("comprar-carrito");

  if (btnVaciar) {
    btnVaciar.onclick = () => {
      vaciarCarrito();
      renderizarCarrito();
      showToast("Carrito vaciado 🗑️");
    };
  }

  if (btnComprar) {
    btnComprar.onclick = () => {
      mostrarModalCompra();
    };
  }
}

// -----------------------------
// Toasts y Modal Bootstrap
// -----------------------------
function showToast(mensaje) {
  const toastEl = document.getElementById("cartToast");
  const toastBody = toastEl.querySelector(".toast-body");
  toastBody.innerText = mensaje;

  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

function mostrarModalCompra() {
  const modal = new bootstrap.Modal(
    document.getElementById("confirmPurchaseModal"),
  );
  modal.show();
}

function confirmarCompraFinal() {
  const modalEl = document.getElementById("confirmPurchaseModal");
  const modal =
    bootstrap.Modal.getInstance(confirmPurchaseModal) ||
    new bootstrap.Modal(confirmPurchaseModal);

  modal.hide();

  vaciarCarrito();
  renderizarCarrito();
}

// -----------------------------
// 7) Inicialización por página
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();

  const path = window.location.pathname;

  // index (catalogo)
  if (path.endsWith("/") || path.endsWith("index.html")) {
    renderizarProductos();
  }

  // detalle
  if (path.includes("detalle.html")) {
    const producto = obtenerDetalleProducto();
    if (producto) {
      renderizarDetalle(producto);
    } else {
      // si no hay producto válido, redirige al index
      window.location.href = "index.html";
    }
  }

  // carrito
  if (path.includes("carrito.html")) {
    renderizarCarrito();
  }

  // confirmar compra
  const btnConfirmarCompra = document.getElementById("confirmPurchaseBtn");
  if (btnConfirmarCompra) {
    btnConfirmarCompra.addEventListener("click", confirmarCompraFinal);
  }
});

import { db, collection, getDocs } from "./firebase.js";

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

let productoActual = null;

async function cargarProducto() {
  try {
    const snapshot = await getDocs(collection(db, "productos"));

    let productos = [];
    snapshot.forEach(doc => {
      productos.push({ id: doc.id, ...doc.data() });
    });

    window._productosCache = productos;

    productoActual = productos.find(p => p.id === id);

    if (!productoActual) {
      document.querySelector('.producto-detalle-section').innerHTML = `
        <div style="text-align:center;padding:80px">
          <h2>Producto no encontrado 😔</h2>
        </div>
      `;
      return;
    }

    // Imagen
    const img = document.getElementById('producto-img');
    img.src = productoActual.imagen || 'img/productos/producto-001.jpg';

    // Nombre y precio
    document.getElementById('producto-nombre').innerText = productoActual.nombre;
    document.getElementById('producto-precio').innerText =
      '$' + Number(productoActual.precio).toLocaleString('es-CO');

    // Descripción
    const lista = document.getElementById('producto-descripcion');
    lista.innerHTML = '';

    (productoActual.descripcion || []).forEach(item => {
      const li = document.createElement('li');
      li.innerText = item;
      lista.appendChild(li);
    });

    // WhatsApp
    const msg = encodeURIComponent(
      `Hola 👋 quiero pedir: ${productoActual.nombre}`
    );

    document.getElementById('boton-whatsapp').href =
      `https://wa.me/573164998444?text=${msg}`;

    // Carrito
    document.getElementById('boton-carrito').onclick = () => {
      agregarAlCarrito(productoActual);
    };

    mostrarRelacionados(productos);

  } catch (error) {
    console.error(error);
  }
}

cargarProducto();

function mostrarRelacionados(productos) {
  const contenedor = document.getElementById('relacionados');
  if (!contenedor) return;

  const relacionados = productos
    .filter(p => p.id !== id)
    .slice(0, 4);

  relacionados.forEach(p => {
    const imagen = p.imagen || 'img/productos/producto-001.jpg';

    const card = document.createElement('div');
    card.className = 'producto-card';

    card.innerHTML = `
      <img src="${imagen}">
      <h3>${p.nombre}</h3>
      <a href="producto.html?id=${p.id}">Ver</a>
    `;

    contenedor.appendChild(card);
  });
}
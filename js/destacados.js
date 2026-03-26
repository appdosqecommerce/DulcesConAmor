import { db, collection, getDocs } from "./firebase.js";

async function cargarDestacados() {
  try {
    const snapshot = await getDocs(collection(db, "productos"));

    let lista = [];
    snapshot.forEach(doc => {
      lista.push({ id: doc.id, ...doc.data() });
    });

    window._productosCache = lista;

    const destacados = lista.slice(0, 8);
    const contenedor = document.getElementById('destacados');
    if (!contenedor) return;

    contenedor.innerHTML = "";

    destacados.forEach(p => {
      const imagen = p.imagen || 'img/productos/producto-001.jpg';
      const precio = Number(p.precio).toLocaleString('es-CO');

      const card = document.createElement('div');
      card.className = 'producto-card';

      card.innerHTML = `
        <div class="producto-card-img">
          <img src="${imagen}" alt="${p.nombre}" loading="lazy" onerror="this.src='img/productos/producto-001.jpg'">
          <span class="producto-card-badge">⭐ Destacado</span>
        </div>
        <div class="producto-card-body">
          <h3>${p.nombre}</h3>
          <p class="producto-precio">$${precio}</p>
          <div class="producto-btns">
            <a class="btn-ver" href="producto.html?id=${p.id}">Ver detalle</a>
            <button class="btn-carrito" onclick="agregarDesdeDestacados('${p.id}')">🛒</button>
          </div>
        </div>
      `;

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    const cont = document.getElementById('destacados');
    if (cont) cont.innerHTML = '<p style="text-align:center;padding:40px;color:#999">Error cargando productos</p>';
  }
}

cargarDestacados();

window.agregarDesdeDestacados = function(id) {
  const lista = window._productosCache || [];
  const p = lista.find(x => x.id === id);
  if (p) agregarAlCarrito(p);
};
/* ================================
   destacados.js — Dulces con Amor
   Productos destacados en el inicio
   ================================ */

fetch('data/productos_limpio.json')
  .then(res => res.json())
  .then(lista => {
    window._productosCache = lista

    // Mostrar los primeros 8 productos como destacados
    const destacados = lista.slice(0, 8)
    const contenedor = document.getElementById('destacados')
    if (!contenedor) return

    destacados.forEach(p => {
      const imagen = p.imagen || 'img/productos/producto-001.jpg'
      const precio = Number(p.precio).toLocaleString('es-CO')

      const card = document.createElement('div')
      card.className = 'producto-card'
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
            <button class="btn-carrito" onclick="agregarDesdeDestacados('${p.id}')" title="Agregar al carrito">🛒</button>
          </div>
        </div>
      `
      contenedor.appendChild(card)
    })
  })
  .catch(() => {
    const cont = document.getElementById('destacados')
    if (cont) cont.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:40px;color:#999">No se pudo cargar los productos.</p>'
  })

function agregarDesdeDestacados(id) {
  const lista = window._productosCache || []
  const p = lista.find(x => x.id === id)
  if (p) agregarAlCarrito(p)
}

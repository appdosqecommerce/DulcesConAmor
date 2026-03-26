/* ================================
   producto.js — Dulces con Amor
   Página de detalle de producto
   ================================ */

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

let productoActual = null

fetch('data/productos_limpio.json')
  .then(res => res.json())
  .then(productos => {
    window._productosCache = productos

    productoActual = productos.find(p => p.id === id)

    if (!productoActual) {
      document.querySelector('.producto-detalle-section').innerHTML = `
        <div style="text-align:center;padding:80px 20px">
          <p style="font-size:60px">😔</p>
          <h2 style="margin:16px 0 10px">Producto no encontrado</h2>
          <a href="productos.html" style="color:var(--rosa);font-weight:700">← Ver catálogo completo</a>
        </div>
      `
      return
    }

    // Imagen
    const img = document.getElementById('producto-img')
    img.src = productoActual.imagen || 'img/productos/producto-001.jpg'
    img.alt = productoActual.nombre
    img.onerror = () => { img.src = 'img/productos/producto-001.jpg' }

    // Nombre y precio
    document.getElementById('producto-nombre').innerText = productoActual.nombre
    document.getElementById('producto-precio').innerText =
      '$' + Number(productoActual.precio).toLocaleString('es-CO')

    // Descripción / lista de incluidos
    const lista = document.getElementById('producto-descripcion')
    lista.innerHTML = ''
    const desc = productoActual.descripcion || []
    desc.forEach(item => {
      const li = document.createElement('li')
      li.innerText = item
      lista.appendChild(li)
    })

    // Botón WhatsApp
    const msgWA = encodeURIComponent(
      `Hola 👋, quiero pedir:\n*${productoActual.nombre}*\nPrecio: $${Number(productoActual.precio).toLocaleString('es-CO')}`
    )
    document.getElementById('boton-whatsapp').href =
      `https://wa.me/573164998444?text=${msgWA}`

    // Título del documento
    document.title = productoActual.nombre + ' | Dulces con Amor'

    // Botón carrito
    document.getElementById('boton-carrito').onclick = () => {
      agregarAlCarrito(productoActual)
    }

    // Relacionados
    mostrarRelacionados(productos)
  })
  .catch(() => {
    document.querySelector('.producto-detalle-section').innerHTML =
      '<p style="text-align:center;padding:60px;color:#999">No se pudo cargar el producto.</p>'
  })


function mostrarRelacionados(productos) {
  const contenedor = document.getElementById('relacionados')
  if (!contenedor) return

  const relacionados = productos
    .filter(p => p.id !== id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)

  relacionados.forEach(p => {
    const imagen = p.imagen || 'img/productos/producto-001.jpg'
    const precio = Number(p.precio).toLocaleString('es-CO')

    const card = document.createElement('div')
    card.className = 'producto-card'
    card.innerHTML = `
      <div class="producto-card-img">
        <img src="${imagen}" alt="${p.nombre}" loading="lazy" onerror="this.src='img/productos/producto-001.jpg'">
      </div>
      <div class="producto-card-body">
        <h3>${p.nombre}</h3>
        <p class="producto-precio">$${precio}</p>
        <div class="producto-btns">
          <a class="btn-ver" href="producto.html?id=${p.id}">Ver detalle</a>
          <button class="btn-carrito" onclick="agregarAlCarrito(${JSON.stringify(p).replace(/"/g, '&quot;')})" title="Añadir al carrito">🛒</button>
        </div>
      </div>
    `
    contenedor.appendChild(card)
  })
}

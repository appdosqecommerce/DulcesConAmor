/* ================================
   ver-carrito.js — Dulces con Amor
   Vista y gestión del carrito
   ================================ */

let carrito = JSON.parse(localStorage.getItem('carrito')) || []

const contenedor = document.getElementById('lista-carrito')
const totalTexto = document.getElementById('total')

function renderCarrito() {
  contenedor.innerHTML = ''
  let total = 0

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div style="text-align:center;padding:80px 20px">
        <p style="font-size:64px">🛒</p>
        <h3 style="margin:16px 0 10px;font-size:22px">Tu carrito está vacío</h3>
        <p style="color:#999;margin-bottom:28px">Agrega productos desde el catálogo</p>
        <a href="productos.html" style="
          background:var(--rosa);color:white;padding:14px 32px;
          border-radius:12px;font-weight:700;text-decoration:none;font-size:15px
        ">Ver catálogo →</a>
      </div>
    `
    totalTexto.innerText = ''
    return
  }

  carrito.forEach((p, index) => {
    const imagen = p.imagen || 'img/productos/producto-001.jpg'
    const precioUnit = Number(p.precio).toLocaleString('es-CO')
    const subtotal = Number(p.precio) * (p.cantidad || 1)
    total += subtotal

    const item = document.createElement('div')
    item.className = 'item-carrito'
    item.innerHTML = `
      <img src="${imagen}" alt="${p.nombre}" onerror="this.src='img/productos/producto-001.jpg'">
      <div class="info-carrito">
        <h3>${p.nombre}</h3>
        <p class="precio">$${precioUnit} c/u</p>
        <div class="cantidad">
          <button onclick="restar(${index})">−</button>
          <span>${p.cantidad || 1}</span>
          <button onclick="sumar(${index})">+</button>
        </div>
      </div>
      <button class="eliminar" onclick="eliminar(${index})" title="Eliminar">✕</button>
    `
    contenedor.appendChild(item)
  })

  totalTexto.innerText = 'Total: $' + total.toLocaleString('es-CO')
  guardarCarrito()
  actualizarContador()
}

function sumar(index) {
  carrito[index].cantidad = (carrito[index].cantidad || 1) + 1
  guardarCarrito()
  renderCarrito()
}

function restar(index) {
  if ((carrito[index].cantidad || 1) > 1) {
    carrito[index].cantidad--
    guardarCarrito()
    renderCarrito()
  }
}

function eliminar(index) {
  carrito.splice(index, 1)
  guardarCarrito()
  renderCarrito()
  mostrarToast("🗑️ Producto eliminado")
}

/* Botón pagar por WhatsApp */
const btnPagar = document.getElementById('pagar')
if (btnPagar) {
  btnPagar.addEventListener('click', () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío')
      return
    }
    const lineas = carrito.map(p =>
      `• ${p.nombre} x${p.cantidad || 1} = $${(Number(p.precio) * (p.cantidad || 1)).toLocaleString('es-CO')}`
    )
    const total = carrito.reduce((acc, p) => acc + Number(p.precio) * (p.cantidad || 1), 0)
    const msg = `Hola! 👋 Quiero hacer este pedido:\n\n${lineas.join('\n')}\n\n💰 *Total: $${total.toLocaleString('es-CO')}*`
    window.open('https://wa.me/573164998444?text=' + encodeURIComponent(msg), '_blank')
  })
}

renderCarrito()

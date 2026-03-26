/* ================================
   carrito.js — Dulces con Amor
   Lógica compartida del carrito
   ================================ */

let carrito = JSON.parse(localStorage.getItem('carrito')) || []

function agregarAlCarrito(producto) {
  const existe = carrito.find(p => p.id === producto.id)

  if (existe) {
    existe.cantidad = (existe.cantidad || 1) + 1
  } else {
    producto.cantidad = 1
    carrito.push({ ...producto })
  }

  guardarCarrito()
  mostrarToast(`✅ "${producto.nombre.substring(0, 30)}…" añadido al carrito`)
  actualizarContador()
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

function actualizarContador() {
  const contador = document.getElementById('contador-carrito')
  if (!contador) return
  const total = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0)
  contador.innerText = total
  contador.style.display = total > 0 ? 'inline-block' : 'none'
}

/* TOAST NOTIFICATION */
function mostrarToast(mensaje) {
  let toast = document.getElementById('toast-carrito')
  if (!toast) {
    toast = document.createElement('div')
    toast.id = 'toast-carrito'
    toast.style.cssText = `
      position: fixed;
      bottom: 100px;
      right: 28px;
      background: #2d1c24;
      color: white;
      padding: 14px 22px;
      border-radius: 12px;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 8px 30px rgba(0,0,0,.2);
      z-index: 9999;
      transform: translateY(20px);
      opacity: 0;
      transition: all .3s ease;
      max-width: 300px;
    `
    document.body.appendChild(toast)
  }
  toast.innerText = mensaje
  toast.style.transform = 'translateY(0)'
  toast.style.opacity = '1'
  clearTimeout(toast._timeout)
  toast._timeout = setTimeout(() => {
    toast.style.transform = 'translateY(20px)'
    toast.style.opacity = '0'
  }, 2800)
}

// Inicializar contador al cargar
actualizarContador()

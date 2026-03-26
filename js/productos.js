/* ================================
   productos.js — Dulces con Amor
   Lee desde data/productos_limpio.json
   ================================ */

let productos = []
let productosFiltrados = []
let pagina = 1
const porPagina = 12

/* Asigna categorías automáticamente por palabras clave */
function inferirCategoria(nombre) {
  const n = nombre.toLowerCase()
  if (n.includes('baileys') || n.includes('jc') || n.includes('chenet') || n.includes('champagne')) return 'baileys'
  if (n.includes('coronita') || n.includes('cerveza') || n.includes('heineken') || n.includes('poker')) return 'cerveza'
  if (n.includes('vino') || n.includes('wine')) return 'vino'
  if (n.includes('cristal') || n.includes('domo')) return 'cristal'
  if (n.includes('corazón') || n.includes('corazon')) return 'corazon'
  if (n.includes('flores') || n.includes('floral') || n.includes('ramo')) return 'flores'
  if (n.includes('romántic') || n.includes('romantico') || n.includes('pareja')) return 'romantico'
  if (n.includes('cumpleaño') || n.includes('torta') || n.includes('birthday')) return 'cumpleanos'
  if (n.includes('saludable') || n.includes('granola') || n.includes('orgánico')) return 'saludable'
  if (n.includes('sandwich') || n.includes('jamón') || n.includes('jamon') || n.includes('deditos')) return 'sandwich'
  return 'desayuno'
}

/* Carga productos */
fetch('data/productos_limpio.json')
  .then(res => res.json())
  .then(data => {
    // Añadir categoría automática
    productos = data.map(p => ({ ...p, categoriaAuto: inferirCategoria(p.nombre) }))
    productosFiltrados = productos

    // Leer parámetro URL
    const params = new URLSearchParams(window.location.search)
    const catParam = params.get('cat')
    if (catParam && catParam !== 'todos') {
      productosFiltrados = productos.filter(p => p.categoriaAuto === catParam)
      // Marcar botón activo
      document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('activo')
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${catParam}'`)) {
          btn.classList.add('activo')
        }
      })
    }
    mostrarProductos()
  })
  .catch(() => {
    document.getElementById('catalogo').innerHTML = '<p style="text-align:center;color:#999;padding:40px">No se pudo cargar el catálogo. Verifica que el servidor esté activo.</p>'
  })


/* Mostrar productos */
function mostrarProductos() {
  const contenedor = document.getElementById('catalogo')
  contenedor.innerHTML = ''

  const inicio = (pagina - 1) * porPagina
  const lista = productosFiltrados.slice(inicio, inicio + porPagina)

  if (lista.length === 0) {
    contenedor.innerHTML = '<p style="text-align:center;color:#999;padding:60px;grid-column:1/-1">No se encontraron productos 😔</p>'
    document.getElementById('paginacion').innerHTML = ''
    return
  }

  lista.forEach(p => {
    const imagen = p.imagen || 'img/productos/producto-001.jpg'
    const precio = Number(p.precio).toLocaleString('es-CO')
    const cat = p.categoriaAuto || 'desayuno'
    const catLabel = {
      desayuno: '🍳 Desayuno', sandwich: '🥪 Sandwich', corazon: '💗 Corazón',
      romantico: '🌹 Romántico', cumpleanos: '🎂 Cumpleaños', flores: '💐 Flores',
      cerveza: '🍺 Cervezas', baileys: '🥃 Baileys', vino: '🍷 Vino',
      cristal: '✨ Cristal', saludable: '🥗 Saludable'
    }[cat] || '🎁 Especial'

    const card = document.createElement('div')
    card.className = 'producto-card'
    card.innerHTML = `
      <div class="producto-card-img">
        <img src="${imagen}" alt="${p.nombre}" loading="lazy" onerror="this.src='img/productos/producto-001.jpg'">
        <span class="producto-card-badge">${catLabel}</span>
      </div>
      <div class="producto-card-body">
        <h3>${p.nombre}</h3>
        <p class="producto-precio">$${precio}</p>
        <div class="producto-btns">
          <a class="btn-ver" href="producto.html?id=${p.id}">Ver detalle</a>
          <button class="btn-carrito" onclick="agregarAlCarrito(${JSON.stringify(p).split('"').join('&quot;')})" title="Agregar al carrito">🛒</button>
        </div>
      </div>
    `
    contenedor.appendChild(card)
  })

  crearPaginacion()
}

/* Función segura para agregar al carrito desde catálogo */
function agregarDesdeCards(id) {
  const p = productos.find(x => x.id === id)
  if (p) agregarAlCarrito(p)
}


/* Paginación */
function crearPaginacion() {
  const cont = document.getElementById('paginacion')
  cont.innerHTML = ''
  const total = Math.ceil(productosFiltrados.length / porPagina)
  if (total <= 1) return

  if (pagina > 1) {
    const prev = document.createElement('button')
    prev.innerText = '← Anterior'
    prev.onclick = () => { pagina--; mostrarProductos(); scrollToTop() }
    cont.appendChild(prev)
  }

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement('button')
    btn.innerText = i
    if (i === pagina) btn.classList.add('activo')
    btn.onclick = () => { pagina = i; mostrarProductos(); scrollToTop() }
    cont.appendChild(btn)
  }

  if (pagina < total) {
    const next = document.createElement('button')
    next.innerText = 'Siguiente →'
    next.onclick = () => { pagina++; mostrarProductos(); scrollToTop() }
    cont.appendChild(next)
  }
}

function scrollToTop() {
  document.querySelector('.catalogo-section').scrollIntoView({ behavior: 'smooth' })
}


/* Buscador */
const buscador = document.getElementById('buscador')
if (buscador) {
  buscador.addEventListener('input', e => {
    const texto = e.target.value.toLowerCase()
    productosFiltrados = productos.filter(p =>
      p.nombre.toLowerCase().includes(texto) ||
      (p.descripcion || []).some(d => d.toLowerCase().includes(texto))
    )
    pagina = 1
    mostrarProductos()
  })
}


/* Filtros por categoría */
function filtrarCategoria(cat, btn) {
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('activo'))
  if (btn) btn.classList.add('activo')

  if (cat === 'todos') {
    productosFiltrados = productos
  } else {
    productosFiltrados = productos.filter(p => p.categoriaAuto === cat)
  }
  pagina = 1
  mostrarProductos()
}


/* Ordenar */
const ordenar = document.getElementById('ordenar')
if (ordenar) {
  ordenar.addEventListener('change', e => {
    const tipo = e.target.value
    const arr = [...productosFiltrados]
    if (tipo === 'precio-asc') arr.sort((a, b) => a.precio - b.precio)
    if (tipo === 'precio-desc') arr.sort((a, b) => b.precio - a.precio)
    if (tipo === 'nombre-asc') arr.sort((a, b) => a.nombre.localeCompare(b.nombre))
    if (tipo === 'nombre-desc') arr.sort((a, b) => b.nombre.localeCompare(a.nombre))
    productosFiltrados = arr
    pagina = 1
    mostrarProductos()
  })
}

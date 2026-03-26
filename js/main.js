/* ================================
   main.js — Dulces con Amor
   Menú mobile + buscador header
   ================================ */

/* HAMBURGER MENU */
const hamburger = document.getElementById('hamburger')
const menuMobile = document.getElementById('menu-mobile')

if (hamburger && menuMobile) {
  hamburger.addEventListener('click', () => {
    menuMobile.classList.toggle('open')
  })
  // Cerrar al hacer clic fuera
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !menuMobile.contains(e.target)) {
      menuMobile.classList.remove('open')
    }
  })
}


/* BUSCADOR DEL HEADER — autocomplete en vivo */
const inputHeader = document.getElementById('buscador-header')
const resultadosBox = document.getElementById('resultados-busqueda')

if (inputHeader && resultadosBox) {
  inputHeader.addEventListener('input', e => {
    const texto = e.target.value.trim().toLowerCase()
    if (texto.length < 2) {
      resultadosBox.innerHTML = ''
      resultadosBox.classList.remove('visible')
      return
    }

    // Carga productos si no están en memoria global
    const fuente = window._productosCache
      ? Promise.resolve(window._productosCache)
      : fetch('data/productos_limpio.json').then(r => r.json()).then(d => {
          window._productosCache = d
          return d
        })

    fuente.then(lista => {
      const encontrados = lista
        .filter(p => p.nombre.toLowerCase().includes(texto))
        .slice(0, 6)

      if (encontrados.length === 0) {
        resultadosBox.innerHTML = '<div style="padding:14px 16px;color:#999;font-size:14px">Sin resultados</div>'
        resultadosBox.classList.add('visible')
        return
      }

      resultadosBox.innerHTML = encontrados.map(p => `
        <a class="resultado-item" href="producto.html?id=${p.id}">
          <img src="${p.imagen || 'img/productos/producto-001.jpg'}" alt="${p.nombre}" onerror="this.src='img/productos/producto-001.jpg'">
          <div class="r-info">
            <span>${p.nombre}</span>
            <small>$${Number(p.precio).toLocaleString('es-CO')}</small>
          </div>
        </a>
      `).join('')
      resultadosBox.classList.add('visible')
    })
  })

  // Cerrar al hacer clic fuera
  document.addEventListener('click', e => {
    if (!inputHeader.contains(e.target) && !resultadosBox.contains(e.target)) {
      resultadosBox.classList.remove('visible')
    }
  })

  // Cerrar con Escape
  inputHeader.addEventListener('keydown', e => {
    if (e.key === 'Escape') resultadosBox.classList.remove('visible')
  })
}


/* STICKY HEADER SOMBRA */
const header = document.getElementById('header')
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 30px rgba(0,0,0,.1)'
    } else {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,.06)'
    }
  })
}

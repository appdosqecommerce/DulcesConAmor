/* ================================
   main.js — Dulces con Amor
   Menú mobile + buscador header
   ================================ */

import { db, collection, getDocs } from "./firebase.js";

/* HAMBURGER MENU */
const hamburger = document.getElementById('hamburger')
const menuMobile = document.getElementById('menu-mobile')

if (hamburger && menuMobile) {
  hamburger.addEventListener('click', () => {
    menuMobile.classList.toggle('open')
  })
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !menuMobile.contains(e.target)) {
      menuMobile.classList.remove('open')
    }
  })
}


/* 🔥 FUNCIÓN PARA CARGAR PRODUCTOS DESDE FIREBASE */
async function obtenerProductos() {
  if (window._productosCache) return window._productosCache;

  const snapshot = await getDocs(collection(db, "productos"));
  let lista = [];

  snapshot.forEach(doc => {
    lista.push({ id: doc.id, ...doc.data() });
  });

  window._productosCache = lista;
  return lista;
}


/* BUSCADOR DEL HEADER — ahora con Firebase */
const inputHeader = document.getElementById('buscador-header')
const resultadosBox = document.getElementById('resultados-busqueda')

if (inputHeader && resultadosBox) {
  inputHeader.addEventListener('input', async e => {
    const texto = e.target.value.trim().toLowerCase()

    if (texto.length < 2) {
      resultadosBox.innerHTML = ''
      resultadosBox.classList.remove('visible')
      return
    }

    const lista = await obtenerProductos()

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
        <img src="${p.imagen || 'img/productos/producto-001.jpg'}">
        <div class="r-info">
          <span>${p.nombre}</span>
          <small>$${Number(p.precio).toLocaleString('es-CO')}</small>
        </div>
      </a>
    `).join('')

    resultadosBox.classList.add('visible')
  })

  document.addEventListener('click', e => {
    if (!inputHeader.contains(e.target) && !resultadosBox.contains(e.target)) {
      resultadosBox.classList.remove('visible')
    }
  })

  inputHeader.addEventListener('keydown', e => {
    if (e.key === 'Escape') resultadosBox.classList.remove('visible')
  })
}


/* STICKY HEADER */
const header = document.getElementById('header')
if (header) {
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,.1)'
      : '0 2px 20px rgba(0,0,0,.06)'
  })
}
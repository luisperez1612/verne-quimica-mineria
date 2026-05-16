/* ============================================================
   main.js — Lógica e interactividad
   Depende de data.js (cargado antes en index.html)
   ============================================================ */

/* ---------- Carrusel del hero ---------- */
let curSlide = 0, timer;
const slEl = document.querySelectorAll('.slide');
const dots = document.getElementById('dots');

SLIDES.forEach((_, i) => {
  const d = document.createElement('i');
  d.onclick = () => show(i);
  dots.appendChild(d);
});

function show(i){
  curSlide = (i + SLIDES.length) % SLIDES.length;
  const s = SLIDES[curSlide];
  slEl.forEach((e, k) => e.classList.toggle('act', k === curSlide % slEl.length));
  dots.querySelectorAll('i').forEach((e, k) => e.classList.toggle('act', k === curSlide));
  hPill.textContent = s.pill;
  hTit.innerHTML = s.tit[0] + "<span>" + s.tit[1] + "</span>";
  hSub.textContent = s.sub;
  hAside.textContent = s.aside;
  clearTimeout(timer);
  timer = setTimeout(() => show(curSlide + 1), 6500);
}
function nav_s(d){ show(curSlide + d); }

/* ---------- Fichas de producto ---------- */
function infoDe(n){
  const k = n.toLowerCase().trim();
  if (INFO[k]) return INFO[k];
  return [
    "Producto químico de grado industrial seleccionado para procesos mineros y metalúrgicos.",
    "Aplicación según especificación del proceso. Consulta ficha técnica oficial con nuestro equipo."
  ];
}

/* ---------- Modales ---------- */
const M = document.getElementById('modal');

function abrirArea(i){
  const d = AREAS[i] || AREAS[0];
  mNum.textContent = d.num;
  mTit.textContent = d.tit;
  mProv.textContent = d.prov;
  mBody.innerHTML = d.g.map(g =>
    `<div class="grp"><b>${g.b}</b><div class="chips">${
      g.c.map(c => `<span class="chip" onclick="abrirProd('${c.replace(/'/g,"\\'")}')">${c}</span>`).join('')
    }</div></div>`).join('');
  M.classList.add('on');
}

function abrirProd(n){
  const [d, u] = infoDe(n);
  mNum.textContent = "Ficha de producto";
  mTit.textContent = n;
  mProv.textContent = "Verne · Química para Minería";
  mBody.innerHTML =
    `<p class="pdesc">${d}</p>` +
    `<div class="puso"><b>Aplicación típica:</b> ${u}</div>` +
    `<p class="pnote">Información de referencia general. Para ficha técnica, certificado de calidad y disponibilidad, contáctanos.</p>` +
    `<div style="margin-top:22px"><button class="btn" onclick="document.getElementById('contacto').scrollIntoView();cerrar()">Solicitar cotización</button></div>`;
  M.classList.add('on');
}

function cerrar(){ M.classList.remove('on'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

/* ---------- Commodities ---------- */
const grid = document.getElementById('gridCom');
COMMODITIES.forEach(p => {
  const d = document.createElement('div');
  d.className = 'com';
  d.textContent = p;
  d.dataset.n = p.toLowerCase();
  d.onclick = () => abrirProd(p);
  grid.appendChild(d);
});

const cont = document.getElementById('conteo');
const setCont = () =>
  cont.textContent = grid.querySelectorAll('.com:not(.oculto)').length +
    ' de ' + COMMODITIES.length + ' productos · clic para ver ficha';
setCont();

function filtrar(){
  const q = document.getElementById('filtro').value.toLowerCase().trim();
  grid.querySelectorAll('.com').forEach(e =>
    e.classList.toggle('oculto', q && !e.dataset.n.includes(q)));
  setCont();
}

/* ---------- Misceláneos ---------- */
document.getElementById('waBtn').href =
  "https://wa.me/" + WHATSAPP + "?text=" +
  encodeURIComponent("Hola Verne, quiero cotizar productos químicos.");

const navEl = document.getElementById('nav');
addEventListener('scroll', () => navEl.classList.toggle('scrolled', scrollY > 60));

const io = new IntersectionObserver(
  es => es.forEach(e => { if (e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }),
  { threshold:.12 }
);
document.querySelectorAll('.reveal').forEach(e => io.observe(e));

/* Inicia el carrusel */
show(0);

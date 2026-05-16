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
function infoDe(nombre, cat){
  const k = nombre.toLowerCase().trim();
  if (INFO[k]) return INFO[k];
  const uso = (cat && CAT_USO[cat]) ? CAT_USO[cat]
            : "Aplicación según especificación del proceso. Consulta ficha técnica oficial con nuestro equipo.";
  return ["Producto químico de grado industrial seleccionado para procesos mineros y metalúrgicos.", uso];
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

function abrirProd(nombre, cat){
  const [d, u] = infoDe(nombre, cat);
  const meta = (cat && CAT_META[cat]) ? CAT_META[cat] : null;
  const col = meta ? meta.color : "var(--azul-2)";
  const badge = cat
    ? `<span class="mbadge" style="background:${col}">${cat}</span>`
    : `<span class="mbadge" style="background:var(--azul-2)">Reactivo de proceso</span>`;
  mNum.innerHTML = "Ficha técnica " + badge;
  mTit.textContent = nombre;
  mProv.textContent = "Verne · Química para Minería";
  mBody.innerHTML =
    `<p class="pdesc">${d}</p>` +
    `<div class="specs">` +
      `<div class="spec"><span>Categoría</span><b>${cat || "Reactivo de proceso"}</b></div>` +
      `<div class="spec"><span>Aplicación típica</span><b>${u}</b></div>` +
      `<div class="spec"><span>Presentación</span><b>Sacos · IBC · granel (a consultar)</b></div>` +
      `<div class="spec"><span>Documentación</span><b>Ficha técnica y FDS a solicitud</b></div>` +
    `</div>` +
    `<p class="pnote">Información de referencia general. Para especificación, certificado de calidad y disponibilidad, contáctanos.</p>` +
    `<div class="mcta"><button class="btn" onclick="document.getElementById('contacto').scrollIntoView();cerrar()">Solicitar cotización</button></div>`;
  M.classList.add('on');
}

function cerrar(){ M.classList.remove('on'); }
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });

/* ---------- Catálogo de commodities (tarjetas + filtro por categoría) ---------- */
const grid  = document.getElementById('gridCom');
const cont  = document.getElementById('conteo');
const tabsEl = document.getElementById('catTabs');
let catActiva = "Todos";

const CATS = ["Todos", ...Array.from(new Set(COMMODITIES.map(p => p.cat)))];
CATS.forEach(c => {
  const b = document.createElement('button');
  b.className = 'cat-tab' + (c === "Todos" ? ' act' : '');
  b.textContent = c;
  if (c !== "Todos" && CAT_META[c]) b.style.setProperty('--cc', CAT_META[c].color);
  b.onclick = () => {
    catActiva = c;
    tabsEl.querySelectorAll('.cat-tab').forEach(x => x.classList.toggle('act', x === b));
    filtrar();
  };
  tabsEl.appendChild(b);
});

COMMODITIES.forEach(p => {
  const meta = CAT_META[p.cat] || { color:"#7c8aa0", ab:"··" };
  const card = document.createElement('button');
  card.className = 'com';
  card.dataset.n = p.n.toLowerCase();
  card.dataset.c = p.cat;
  card.onclick = () => abrirProd(p.n, p.cat);
  card.innerHTML =
    `<span class="tile" style="background:${meta.color}">${meta.ab}</span>` +
    `<span class="cinfo"><b>${p.n}</b><small>${p.cat}</small></span>` +
    `<span class="carrow">→</span>`;
  grid.appendChild(card);
});

function filtrar(){
  const q = document.getElementById('filtro').value.toLowerCase().trim();
  grid.querySelectorAll('.com').forEach(e => {
    const okCat = (catActiva === "Todos") || (e.dataset.c === catActiva);
    const okText = !q || e.dataset.n.includes(q);
    e.classList.toggle('oculto', !(okCat && okText));
  });
  const vis = grid.querySelectorAll('.com:not(.oculto)').length;
  cont.textContent = vis + ' de ' + COMMODITIES.length + ' productos · clic para ver ficha técnica';
}
filtrar();

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

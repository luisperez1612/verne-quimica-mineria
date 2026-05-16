/* ============================================================
   bot.js — Asistente Verne (100% cliente, sin backend)
   Usa COMMODITIES / AREAS / WHATSAPP (data.js) y
   abrirProd / abrirArea (main.js).
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Referencias ---------- */
  const fab    = document.getElementById('botFab');
  const panel  = document.getElementById('botPanel');
  const closeB = document.getElementById('botClose');
  const body   = document.getElementById('botBody');
  const quick  = document.getElementById('botQuick');
  const form   = document.getElementById('botForm');
  const input  = document.getElementById('botInput');
  const teaser = document.getElementById('botTeaser');
  if (!fab || !panel) return;

  /* ---------- Utilidades ---------- */
  const norm = s => (s || "").toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "");

  const waLink = (msg) =>
    "https://wa.me/" + (typeof WHATSAPP !== "undefined" ? WHATSAPP : "") +
    "?text=" + encodeURIComponent(msg || "Hola Verne, necesito información.");

  let abierto = false;

  /* ---------- Render ---------- */
  function scroll(){ body.scrollTop = body.scrollHeight; }

  function burbuja(html, who){
    const d = document.createElement('div');
    d.className = 'bot-msg ' + (who === 'u' ? 'u' : 'b');
    d.innerHTML = html;
    body.appendChild(d);
    scroll();
    return d;
  }

  function quickReplies(items){
    quick.innerHTML = "";
    items.forEach(it => {
      const b = document.createElement('button');
      b.className = 'bot-chip';
      b.textContent = it.label;
      b.onclick = it.on;
      quick.appendChild(b);
    });
  }

  function escribiendo(cb){
    const t = burbuja('<span class="bot-typing"><i></i><i></i><i></i></span>', 'b');
    setTimeout(() => { t.remove(); cb(); }, 520);
  }

  /* Mensaje del bot con retardo + quick replies opcionales */
  function bot(html, chips){
    escribiendo(() => {
      burbuja(html, 'b');
      if (chips) quickReplies(chips);
    });
  }

  /* ---------- Menú principal ---------- */
  const MENU = [
    { label:"Buscar producto", on:() => intentBuscar() },
    { label:"Categorías",      on:() => intentCategorias() },
    { label:"Soluciones",      on:() => intentAreas() },
    { label:"Cotización",      on:() => intentCotizar() },
    { label:"Contacto",        on:() => intentContacto() }
  ];

  function menu(){ quickReplies(MENU); }

  /* ---------- Intents ---------- */
  function intentBuscar(){
    burbuja("Buscar producto", 'u');
    bot("Escribe el nombre del producto (ej. <b>cuarzo</b>, <b>ácido sulfúrico</b>, <b>floculante</b>) y te muestro su ficha.",
        [{ label:"Ver todo el catálogo", on:() => { irA('commodities'); } }]);
    input.focus();
  }

  function buscarProducto(q){
    const n = norm(q);
    if (n.length < 2) return [];
    return COMMODITIES.filter(p => norm(p.n).includes(n)).slice(0, 6);
  }

  function mostrarResultados(q){
    const res = buscarProducto(q);
    if (!res.length){
      bot("No encontré <b>" + q + "</b> en el catálogo. Prueba con otro nombre o te conecto con un asesor.",
          [{ label:"Hablar por WhatsApp", on:() => abrirWa("Hola Verne, busco: " + q) },
           ...MENU]);
      return;
    }
    bot("Encontré " + res.length + " resultado(s). Toca uno para ver su <b>ficha técnica</b>:",
        res.map(p => ({
          label: p.n,
          on: () => {
            burbuja(p.n, 'u');
            if (typeof abrirProd === "function") abrirProd(p.n, p.cat);
            bot("Te abrí la ficha de <b>" + p.n + "</b> (" + p.cat + "). ¿Algo más?",
                [{ label:"Cotizar " + p.n, on:() => abrirWa("Hola Verne, quiero cotizar: " + p.n) },
                 { label:"Buscar otro", on:() => intentBuscar() },
                 { label:"Menú", on:() => bot("¿En qué más te ayudo?", MENU) }]);
          }
        })).concat([{ label:"Menú", on:() => bot("¿En qué te ayudo?", MENU) }]));
  }

  function intentCategorias(){
    burbuja("Categorías", 'u');
    const cats = Array.from(new Set(COMMODITIES.map(p => p.cat)));
    bot("Estas son nuestras categorías químicas. Elige una para ver sus productos:",
      cats.map(c => ({ label:c, on:() => {
        burbuja(c, 'u');
        const items = COMMODITIES.filter(p => p.cat === c);
        bot("<b>" + c + "</b> · " + items.length + " productos. Toca uno para ver su ficha técnica:",
          items.slice(0, 12).map(p => ({ label:p.n, on:() => {
            burbuja(p.n, 'u');
            if (typeof abrirProd === "function") abrirProd(p.n, p.cat);
            bot("Abrí la ficha de <b>" + p.n + "</b>. ¿Algo más?",
                [{ label:"Cotizar " + p.n, on:() => abrirWa("Hola Verne, quiero cotizar: " + p.n) },
                 { label:"Otra categoría", on:() => intentCategorias() },
                 { label:"Menú", on:menuMsg }]);
          }})).concat([
            { label:"Ver catálogo completo", on:() => { irA('commodities'); menu(); } },
            { label:"Menú", on:menuMsg }
          ]));
      }})).concat([{ label:"Menú", on:menuMsg }]));
  }

  function intentAreas(){
    burbuja("Soluciones", 'u');
    bot("Verne cubre todo el proceso. ¿Qué área te interesa?", [
      { label:"Planta Concentradora", on:() => { burbuja("Planta Concentradora",'u'); openArea(0); } },
      { label:"Hidrometalurgia", on:() => { burbuja("Hidrometalurgia",'u'); openArea(1); } },
      { label:"Commodities (64)", on:() => { burbuja("Commodities",'u'); irA('commodities'); bot("Te llevé al catálogo. Puedes filtrar por categoría o buscar.", MENU); } },
      { label:"Menú", on:menuMsg }
    ]);
  }

  function openArea(i){
    if (typeof abrirArea === "function") abrirArea(i);
    const a = (typeof AREAS !== "undefined" && AREAS[i]) ? AREAS[i] : null;
    bot("Abrí los productos de <b>" + (a ? a.tit : "el área") + "</b>. ¿Te ayudo con algo más?",
        [{ label:"Cotizar esta área", on:() => abrirWa("Hola Verne, me interesa: " + (a ? a.tit : "una solución")) }, ...MENU]);
  }

  function intentCotizar(){
    burbuja("Cotización", 'u');
    bot("Con gusto. Puedo conectarte de inmediato por WhatsApp o derivarte a la sección de contacto.", [
      { label:"Cotizar por WhatsApp", on:() => abrirWa("Hola Verne, quiero solicitar una cotización de productos químicos.") },
      { label:"Ir a Contacto", on:() => { irA('contacto'); bot("Te llevé a la sección de contacto (Chile y Perú).", MENU); } },
      { label:"Cotizar un producto", on:() => intentBuscar() }
    ]);
  }

  function intentContacto(){
    burbuja("Contacto", 'u');
    bot(
      "<b>🇨🇱 Chile</b><br>Av. Andrés Bello 2777 of. 1801, Las Condes<br>+56 2 2885 8633 · info@verne.cl" +
      "<br><br><b>🇵🇪 Perú</b><br>Schell 690 piso 6, Miraflores, Lima 18<br>+51 1 682 3345 · info@verne.com.pe",
      [{ label:"WhatsApp", on:() => abrirWa("Hola Verne, necesito información.") },
       { label:"Ver en la página", on:() => { irA('contacto'); menu(); } },
       { label:"Menú", on:menuMsg }]);
  }

  /* ---------- Acciones auxiliares ---------- */
  function abrirWa(msg){
    window.open(waLink(msg), "_blank", "noopener");
    bot("Te abrí WhatsApp en otra pestaña. Si no se abrió, escribe tu consulta aquí y te ayudo.", MENU);
  }

  function irA(id){
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth" });
  }

  function menuMsg(){ bot("¿En qué te ayudo?", MENU); }

  /* ---------- Enrutado de texto libre ---------- */
  function responder(txt){
    const t = norm(txt);
    if (/(cotiz|precio|comprar|presupuesto|vender)/.test(t)) return intentCotizar();
    if (/(contact|telefon|correo|email|direccion|donde estan|ubicac)/.test(t)) return intentContacto();
    if (/(categor|tipo de producto|familia)/.test(t)) return intentCategorias();
    if (/(area|solucion|flotac|hidromet|concentr|electro|servicio)/.test(t)) return intentAreas();
    if (/(hola|buenas|menu|ayuda|que ofrecen|productos?)/.test(t) && t.length < 14) return menuMsg();
    // por defecto: búsqueda de producto
    mostrarResultados(txt.trim());
  }

  /* ---------- Apertura / cierre ---------- */
  let saludado = false;
  function abrir(){
    abierto = true;
    panel.classList.add('on');
    fab.classList.add('hide');
    if (teaser) teaser.classList.remove('on');
    if (!saludado){
      saludado = true;
      bot("Hola, soy el asistente de <b>Verne · Química para Minería</b>. " +
          "Puedo ayudarte a encontrar productos, ver fichas técnicas o solicitar una cotización. " +
          "¿Por dónde empezamos?", MENU);
    }
    setTimeout(() => input.focus(), 300);
  }
  function cerrarBot(){
    abierto = false;
    panel.classList.remove('on');
    fab.classList.remove('hide');
  }

  fab.onclick = abrir;
  closeB.onclick = cerrarBot;
  document.addEventListener('keydown', e => { if (e.key === "Escape" && abierto) cerrarBot(); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    burbuja(v.replace(/[<>]/g, ""), 'u');
    input.value = "";
    responder(v);
  });

  /* ---------- Burbuja proactiva ---------- */
  if (teaser){
    const openFromTeaser = () => abrir();
    teaser.addEventListener('click', openFromTeaser);
    teaser.addEventListener('keydown', e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openFromTeaser(); }
    });
    setTimeout(() => { if (!abierto && !saludado) teaser.classList.add('on'); }, 5000);
    setTimeout(() => { teaser.classList.remove('on'); }, 15000);
  }
})();

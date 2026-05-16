/* ============================================================
   data.js — Contenido editable del sitio
   Cambia textos/productos aquí sin tocar la lógica (main.js)
   ============================================================ */

/* Número de WhatsApp (formato internacional, sin "+" ni espacios) */
const WHATSAPP = "51999999999"; // ← reemplaza por el número móvil real

/* Slides del hero */
const SLIDES = [
  { pill:"ÁREA 01 · CONCENTRADORA", tit:["PLANTA","CONCENTRADORA"], sub:"Colectores · Espumantes · Xantatos · Depresantes", aside:"Reactivos de alto desempeño para flotación y espesado.", area:0 },
  { pill:"ÁREA 02 · HIDROMETALURGIA", tit:["HIDRO","METALURGIA"], sub:"SX/EW · Electrorefinería · Insumos plásticos", aside:"Insumos y reactivos para extracción por solvente y ER.", area:1 },
  { pill:"ÁREA 03 · COMMODITIES", tit:["COMMODITIES","QUÍMICOS"], sub:"64 productos · proveedores ISO 9001", aside:"Amplio portafolio con relación precio-calidad competitiva.", area:2 }
];

/* Áreas y sus grupos de productos */
const AREAS = [
  { num:"Área 01", tit:"Planta Concentradora", prov:"Respaldo FMC · línea Danafloat · +70 años",
    g:[ { b:"Flotación", c:["Colectores (ditiofosfatos)","Espumantes","Xantatos","Depresantes"] },
        { b:"Espesadores", c:["Coagulantes","Floculantes","Modificadores reológicos"] } ] },
  { num:"Área 02", tit:"Hidrometalurgia · SX/EW · ER", prov:"Icon Plastics · Desert King",
    g:[ { b:"Insumos plásticos (SX/EW)", c:["Cubre bordes","Aisladores interceldas","Capping boards","Bus bars","Aisladores anódicos","Esferas anti neblinas"] },
        { b:"Reactivos SX/EW", c:["Mistop","Goma Guar","Extractantes tipo LIX","Arcillas activadas","Tierras diatomitas","Sulfatos de cobalto"] },
        { b:"Electrorefinería (ER)", c:["Cola animal","Avitone","Tiourea"] } ] }
];

/* Metadatos de categoría: color + abreviatura corta para el "tile" */
const CAT_META = {
  "Ácidos":                  { color:"#d4564e", ab:"Ac" },
  "Álcalis y carbonatos":    { color:"#3f7fd6", ab:"OH" },
  "Sulfatos":                { color:"#8e5bd0", ab:"SO" },
  "Óxidos":                  { color:"#e8732e", ab:"O₂" },
  "Nitratos y cloruros":     { color:"#2aa775", ab:"Cl" },
  "Carbón activado":         { color:"#2f3a48", ab:"C" },
  "Reactivos de flotación":  { color:"#1796b0", ab:"Fl" },
  "Minerales y cargas":      { color:"#a07433", ab:"Mn" },
  "Metales y ferroaleaciones":{ color:"#5c6b7d", ab:"Fe" },
  "Otros":                   { color:"#7c8aa0", ab:"··" }
};

/* Aplicación típica por categoría (fallback profesional para el modal) */
const CAT_USO = {
  "Ácidos":"Lixiviación, regulación de pH y limpieza de equipos en planta.",
  "Álcalis y carbonatos":"Regulación de pH, neutralización y modificación en flotación.",
  "Sulfatos":"Reactivos de proceso, depresantes y tratamiento de efluentes.",
  "Óxidos":"Pigmentos, fundentes y aditivos metalúrgicos.",
  "Nitratos y cloruros":"Coagulación, voladura y reactivos analíticos.",
  "Carbón activado":"Adsorción de oro (CIP/CIL) y purificación de soluciones.",
  "Reactivos de flotación":"Colección, depresión y modificación en circuitos de flotación.",
  "Minerales y cargas":"Medios densos, cargas minerales y ayudas de proceso.",
  "Metales y ferroaleaciones":"Cementación, reducción y aleación metalúrgica.",
  "Otros":"Insumos auxiliares de proceso según especificación."
};

/* Fichas detalladas: nombre(min) -> [descripción, aplicación específica] */
const INFO = {
  "colectores (ditiofosfatos)":["Reactivos colectores que confieren hidrofobicidad selectiva a los sulfuros metálicos.","Flotación de sulfuros de Cu, Pb, Zn y metales preciosos."],
  "espumantes":["Tensoactivos que estabilizan las burbujas de aire generando una espuma mineralizada estable.","Control del tamaño de burbuja y recuperación en flotación."],
  "xantatos":["Colectores sulfhidrílicos de amplio uso, alta potencia y bajo costo.","Flotación de minerales sulfurados."],
  "depresantes":["Reactivos que inhiben la flotación de minerales de ganga o especies no deseadas.","Separación selectiva (p. ej. deprimir pirita o esfalerita)."],
  "coagulantes":["Desestabilizan las cargas de partículas finas para favorecer su agregación.","Sedimentación en espesadores y clarificación."],
  "floculantes":["Polímeros que unen partículas en flóculos grandes de rápida sedimentación.","Espesado de relaves y recuperación de agua."],
  "floculante":["Polímero de alto peso molecular para agregación de sólidos.","Clarificación y espesado."],
  "modificadores reológicos":["Ajustan la viscosidad y el comportamiento de flujo de pulpas y relaves.","Transporte y disposición de relaves de alta densidad."],
  "mistop":["Inhibidor de neblina ácida (Desert King) que forma una capa supresora sobre el electrolito.","Naves de electroobtención (EW): reduce el arrastre de ácido."],
  "goma guar":["Polisacárido natural (80-90% galactomanano) usado como afinador de grano.","Mejora la calidad y lisura del depósito catódico en EW."],
  "extractantes tipo lix":["Reactivos orgánicos quelantes para extracción por solvente de cobre.","Etapa SX: transferencia selectiva de Cu de la solución PLS."],
  "cola animal":["Aditivo orgánico nivelador del depósito catódico.","Electrorefinería (ER): control de morfología del cátodo."],
  "tiourea":["Aditivo orgánico que refina el grano y reduce rugosidad del cátodo.","Electrorefinería de cobre."],
  "ácido sulfúrico":["Ácido mineral fuerte, reactivo central de la hidrometalurgia del cobre.","Lixiviación de minerales oxidados y control de pH en SX/EW."],
  "ácido clorhídrico":["Ácido mineral fuerte, alta capacidad de disolución de metales.","Lixiviación, limpieza de equipos y regeneración."],
  "cal":["Reactivo alcalino regulador de pH y depresante de pirita.","Flotación, espesado y neutralización de efluentes."],
  "carbón activado de coco":["Carbón de alta dureza y microporosidad para adsorción de oro.","Procesos CIP/CIL de recuperación de oro."],
  "zinc en polvo":["Metal reductor de alta superficie específica.","Precipitación de oro y plata (proceso Merrill-Crowe)."],
  "peróxido de hidrógeno":["Oxidante fuerte y limpio que no deja residuos sólidos.","Destrucción de cianuro y tratamiento de efluentes."],
  "soda cáustica sólida":["Hidróxido de sodio, álcali fuerte en escamas/perlas.","Ajuste de pH y neutralización de corrientes ácidas."],
  "silicato de sodio":["Depresante y dispersante de minerales de ganga silícea.","Flotación selectiva y dispersión de finos."],
  "sulfato de zinc":["Sal depresante de esfalerita (ZnS).","Flotación diferencial Pb/Zn y Cu/Zn."],
  "sulfuro de sodio":["Agente sulfidizante de minerales oxidados.","Flotación de óxidos de cobre y precipitación de metales."],
  "nitrato de amonio":["Sal oxidante, insumo base de explosivos de voladura.","Tronadura en minería y fertilización."],
  "metabisulfito de sodio":["Agente reductor y depresante; antioxidante.","Depresión de sulfuros y control de residual de oxidante."]
};

/* Catálogo de commodities: nombre + categoría */
const COMMODITIES = [
  { n:"Aceite de pino", cat:"Reactivos de flotación" },
  { n:"Acero esponja", cat:"Metales y ferroaleaciones" },
  { n:"Ácido clorhídrico", cat:"Ácidos" },
  { n:"Ácido nítrico", cat:"Ácidos" },
  { n:"Ácido oxálico", cat:"Ácidos" },
  { n:"Ácido sulfúrico", cat:"Ácidos" },
  { n:"Almidón", cat:"Reactivos de flotación" },
  { n:"Alternativa al NaSH", cat:"Reactivos de flotación" },
  { n:"Antiespumantes", cat:"Otros" },
  { n:"Antiincrustantes", cat:"Otros" },
  { n:"Baritina", cat:"Minerales y cargas" },
  { n:"Bentonita", cat:"Minerales y cargas" },
  { n:"Bicarbonato de sodio", cat:"Álcalis y carbonatos" },
  { n:"Bórax", cat:"Otros" },
  { n:"Cal", cat:"Álcalis y carbonatos" },
  { n:"Carbón activado de coco", cat:"Carbón activado" },
  { n:"Carbón activado de madera", cat:"Carbón activado" },
  { n:"Carbón coke", cat:"Carbón activado" },
  { n:"Carbonato de calcio", cat:"Álcalis y carbonatos" },
  { n:"Carbonato de potasio", cat:"Álcalis y carbonatos" },
  { n:"Carbonato de sodio", cat:"Álcalis y carbonatos" },
  { n:"Ceniza de hueso", cat:"Otros" },
  { n:"Ceniza de soda", cat:"Álcalis y carbonatos" },
  { n:"Cloruro de bario", cat:"Nitratos y cloruros" },
  { n:"Cloruro de calcio", cat:"Nitratos y cloruros" },
  { n:"Cloruro férrico", cat:"Nitratos y cloruros" },
  { n:"Colector de KCl", cat:"Reactivos de flotación" },
  { n:"Cromita", cat:"Minerales y cargas" },
  { n:"Cuarzo", cat:"Minerales y cargas" },
  { n:"Depresor de mercurio", cat:"Reactivos de flotación" },
  { n:"Dióxido de titanio", cat:"Óxidos" },
  { n:"Dolomita", cat:"Minerales y cargas" },
  { n:"Ferromanganeso", cat:"Metales y ferroaleaciones" },
  { n:"Ferrosilicio", cat:"Metales y ferroaleaciones" },
  { n:"Ferrotitanio", cat:"Metales y ferroaleaciones" },
  { n:"Fluoruro de sodio", cat:"Otros" },
  { n:"Fosfato monoamónico", cat:"Otros" },
  { n:"Litargirio", cat:"Óxidos" },
  { n:"Magnetita", cat:"Minerales y cargas" },
  { n:"Manganeso", cat:"Metales y ferroaleaciones" },
  { n:"MAP soluble", cat:"Otros" },
  { n:"Metabisulfito de sodio", cat:"Reactivos de flotación" },
  { n:"Molibdato de sodio", cat:"Otros" },
  { n:"Nitrato de amonio", cat:"Nitratos y cloruros" },
  { n:"Nitrato de calcio", cat:"Nitratos y cloruros" },
  { n:"Nitrato de sodio", cat:"Nitratos y cloruros" },
  { n:"Óxido de fierro", cat:"Óxidos" },
  { n:"Óxido de magnesio", cat:"Óxidos" },
  { n:"Óxido de zinc", cat:"Óxidos" },
  { n:"Perlita", cat:"Minerales y cargas" },
  { n:"Peróxido de hidrógeno", cat:"Otros" },
  { n:"Polvo de hierro", cat:"Metales y ferroaleaciones" },
  { n:"Sílica", cat:"Minerales y cargas" },
  { n:"Silicato de potasio", cat:"Reactivos de flotación" },
  { n:"Silicato de sodio", cat:"Reactivos de flotación" },
  { n:"Soda cáustica sólida", cat:"Álcalis y carbonatos" },
  { n:"Sulfato de amonio", cat:"Sulfatos" },
  { n:"Sulfato de hierro", cat:"Sulfatos" },
  { n:"Sulfato de sodio", cat:"Sulfatos" },
  { n:"Sulfato de zinc", cat:"Sulfatos" },
  { n:"Sulfuro de sodio", cat:"Reactivos de flotación" },
  { n:"Talco", cat:"Minerales y cargas" },
  { n:"Urea", cat:"Otros" },
  { n:"Zinc en polvo", cat:"Metales y ferroaleaciones" }
];

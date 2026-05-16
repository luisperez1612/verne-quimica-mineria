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

/* Metadatos de categoría: color + ícono + imagen de referencia.
   La imagen es de stock (Unsplash); si una no carga, el degradado de color
   mantiene el aspecto profesional. Puedes reemplazar 'img' por fotos reales. */
const CAT_META = {
  "Ácidos":                   { color:"#d4564e", icon:"⚗️", img:"https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=900&q=82" },
  "Álcalis y carbonatos":     { color:"#3f7fd6", icon:"🧪", img:"https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=900&q=82" },
  "Sulfatos":                 { color:"#8e5bd0", icon:"💠", img:"https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&w=900&q=82" },
  "Óxidos":                   { color:"#e8732e", icon:"🟠", img:"https://images.unsplash.com/photo-1610478920400-77eb1f3a5b22?auto=format&fit=crop&w=900&q=82" },
  "Nitratos y cloruros":      { color:"#2aa775", icon:"🧂", img:"https://images.unsplash.com/photo-1628863353691-0071c8c1874c?auto=format&fit=crop&w=900&q=82" },
  "Carbón activado":          { color:"#2f3a48", icon:"⬛", img:"https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=900&q=82" },
  "Reactivos de flotación":   { color:"#1796b0", icon:"🫧", img:"https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=900&q=82" },
  "Minerales y cargas":       { color:"#a07433", icon:"⛰️", img:"https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=900&q=82" },
  "Metales y ferroaleaciones":{ color:"#5c6b7d", icon:"🔩", img:"https://images.unsplash.com/photo-1565514020179-026b92b2d70b?auto=format&fit=crop&w=900&q=82" },
  "Otros":                    { color:"#7c8aa0", icon:"📦", img:"https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=900&q=82" }
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

/* Catálogo de commodities: nombre + categoría + artículo de Wikipedia (wiki)
   del que se obtiene una FOTO REAL (Wikimedia, libre, sin API key).
   Si quieres una foto propia de Verne, agrega  img:"ruta/foto.jpg"  al
   producto: esa tiene prioridad sobre la de Wikipedia. */
const COMMODITIES = [
  { n:"Aceite de pino", cat:"Reactivos de flotación", wiki:"Pine oil" },
  { n:"Acero esponja", cat:"Metales y ferroaleaciones", wiki:"Direct reduced iron" },
  { n:"Ácido clorhídrico", cat:"Ácidos", wiki:"Hydrochloric acid" },
  { n:"Ácido nítrico", cat:"Ácidos", wiki:"Nitric acid" },
  { n:"Ácido oxálico", cat:"Ácidos", wiki:"Oxalic acid" },
  { n:"Ácido sulfúrico", cat:"Ácidos", wiki:"Sulfuric acid" },
  { n:"Almidón", cat:"Reactivos de flotación", wiki:"Starch" },
  { n:"Alternativa al NaSH", cat:"Reactivos de flotación", wiki:"Sodium hydrosulfide" },
  { n:"Antiespumantes", cat:"Otros", wiki:"Defoamer" },
  { n:"Antiincrustantes", cat:"Otros", wiki:"Antiscalant" },
  { n:"Baritina", cat:"Minerales y cargas", wiki:"Baryte" },
  { n:"Bentonita", cat:"Minerales y cargas", wiki:"Bentonite" },
  { n:"Bicarbonato de sodio", cat:"Álcalis y carbonatos", wiki:"Sodium bicarbonate" },
  { n:"Bórax", cat:"Otros", wiki:"Borax" },
  { n:"Cal", cat:"Álcalis y carbonatos", wiki:"Calcium oxide" },
  { n:"Carbón activado de coco", cat:"Carbón activado", wiki:"Activated carbon" },
  { n:"Carbón activado de madera", cat:"Carbón activado", wiki:"Activated carbon" },
  { n:"Carbón coke", cat:"Carbón activado", wiki:"Coke (fuel)" },
  { n:"Carbonato de calcio", cat:"Álcalis y carbonatos", wiki:"Calcium carbonate" },
  { n:"Carbonato de potasio", cat:"Álcalis y carbonatos", wiki:"Potassium carbonate" },
  { n:"Carbonato de sodio", cat:"Álcalis y carbonatos", wiki:"Sodium carbonate" },
  { n:"Ceniza de hueso", cat:"Otros", wiki:"Bone ash" },
  { n:"Ceniza de soda", cat:"Álcalis y carbonatos", wiki:"Sodium carbonate" },
  { n:"Cloruro de bario", cat:"Nitratos y cloruros", wiki:"Barium chloride" },
  { n:"Cloruro de calcio", cat:"Nitratos y cloruros", wiki:"Calcium chloride" },
  { n:"Cloruro férrico", cat:"Nitratos y cloruros", wiki:"Iron(III) chloride" },
  { n:"Colector de KCl", cat:"Reactivos de flotación", wiki:"Potassium chloride" },
  { n:"Cromita", cat:"Minerales y cargas", wiki:"Chromite" },
  { n:"Cuarzo", cat:"Minerales y cargas", wiki:"Quartz" },
  { n:"Depresor de mercurio", cat:"Reactivos de flotación", wiki:"Mercury (element)" },
  { n:"Dióxido de titanio", cat:"Óxidos", wiki:"Titanium dioxide" },
  { n:"Dolomita", cat:"Minerales y cargas", wiki:"Dolomite (mineral)" },
  { n:"Ferromanganeso", cat:"Metales y ferroaleaciones", wiki:"Ferromanganese" },
  { n:"Ferrosilicio", cat:"Metales y ferroaleaciones", wiki:"Ferrosilicon" },
  { n:"Ferrotitanio", cat:"Metales y ferroaleaciones", wiki:"Ferrotitanium" },
  { n:"Fluoruro de sodio", cat:"Otros", wiki:"Sodium fluoride" },
  { n:"Fosfato monoamónico", cat:"Otros", wiki:"Monoammonium phosphate" },
  { n:"Litargirio", cat:"Óxidos", wiki:"Lead(II) oxide" },
  { n:"Magnetita", cat:"Minerales y cargas", wiki:"Magnetite" },
  { n:"Manganeso", cat:"Metales y ferroaleaciones", wiki:"Manganese" },
  { n:"MAP soluble", cat:"Otros", wiki:"Monoammonium phosphate" },
  { n:"Metabisulfito de sodio", cat:"Reactivos de flotación", wiki:"Sodium metabisulfite" },
  { n:"Molibdato de sodio", cat:"Otros", wiki:"Sodium molybdate" },
  { n:"Nitrato de amonio", cat:"Nitratos y cloruros", wiki:"Ammonium nitrate" },
  { n:"Nitrato de calcio", cat:"Nitratos y cloruros", wiki:"Calcium nitrate" },
  { n:"Nitrato de sodio", cat:"Nitratos y cloruros", wiki:"Sodium nitrate" },
  { n:"Óxido de fierro", cat:"Óxidos", wiki:"Iron(III) oxide" },
  { n:"Óxido de magnesio", cat:"Óxidos", wiki:"Magnesium oxide" },
  { n:"Óxido de zinc", cat:"Óxidos", wiki:"Zinc oxide" },
  { n:"Perlita", cat:"Minerales y cargas", wiki:"Perlite" },
  { n:"Peróxido de hidrógeno", cat:"Otros", wiki:"Hydrogen peroxide" },
  { n:"Polvo de hierro", cat:"Metales y ferroaleaciones", wiki:"Iron" },
  { n:"Sílica", cat:"Minerales y cargas", wiki:"Silicon dioxide" },
  { n:"Silicato de potasio", cat:"Reactivos de flotación", wiki:"Potassium silicate" },
  { n:"Silicato de sodio", cat:"Reactivos de flotación", wiki:"Sodium silicate" },
  { n:"Soda cáustica sólida", cat:"Álcalis y carbonatos", wiki:"Sodium hydroxide" },
  { n:"Sulfato de amonio", cat:"Sulfatos", wiki:"Ammonium sulfate" },
  { n:"Sulfato de hierro", cat:"Sulfatos", wiki:"Iron(II) sulfate" },
  { n:"Sulfato de sodio", cat:"Sulfatos", wiki:"Sodium sulfate" },
  { n:"Sulfato de zinc", cat:"Sulfatos", wiki:"Zinc sulfate" },
  { n:"Sulfuro de sodio", cat:"Reactivos de flotación", wiki:"Sodium sulfide" },
  { n:"Talco", cat:"Minerales y cargas", wiki:"Talc" },
  { n:"Urea", cat:"Otros", wiki:"Urea" },
  { n:"Zinc en polvo", cat:"Metales y ferroaleaciones", wiki:"Zinc" }
];

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

/* Fichas de producto: nombre(min) -> [descripción, aplicación típica] */
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

/* Catálogo de commodities */
const COMMODITIES = ["Aceite de pino","Acero esponja","Ácido clorhídrico","Ácido nítrico","Ácido oxálico","Ácido sulfúrico","Almidón","Alternativa al NaSH","Antiespumantes","Antiincrustantes","Baritina","Bentonita","Bicarbonato de sodio","Bórax","Cal","Carbón activado de coco","Carbón activado de madera","Carbón coke","Carbonato de calcio","Carbonato de potasio","Carbonato de sodio","Ceniza de hueso","Ceniza de soda","Cloruro de bario","Cloruro de calcio","Cloruro férrico","Colector de KCl","Cromita","Cuarzo","Depresor de mercurio","Dióxido de titanio","Dolomita","Ferromanganeso","Ferrosilicio","Ferrotitanio","Fluoruro de sodio","Fosfato monoamónico","Litargirio","Magnetita","Manganeso","MAP soluble","Metabisulfito de sodio","Molibdato de sodio","Nitrato de amonio","Nitrato de calcio","Nitrato de sodio","Óxido de fierro","Óxido de magnesio","Óxido de zinc","Perlita","Peróxido de hidrógeno","Polvo de hierro","Sílica","Silicato de potasio","Silicato de sodio","Soda cáustica sólida","Sulfato de amonio","Sulfato de hierro","Sulfato de sodio","Sulfato de zinc","Sulfuro de sodio","Talco","Urea","Zinc en polvo"];

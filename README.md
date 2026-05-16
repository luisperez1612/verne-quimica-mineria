# Verne · Química para Minería — Sitio web

Sitio estático (HTML + CSS + JS, sin dependencias ni build) que presenta los
productos químicos de Verne para minería: concentración, hidrometalurgia y
commodities, con fichas de producto interactivas.

## Estructura

```
.
├── index.html        # Marcado / estructura
├── css/
│   └── styles.css     # Estilos (paleta azul profundo + naranja minero)
├── js/
│   ├── data.js        # CONTENIDO EDITABLE: textos, productos, fichas, WhatsApp
│   └── main.js         # Lógica: carrusel, modales, buscador, animaciones
└── README.md
```

## Cómo editar el contenido

Casi todo el contenido vive en **`js/data.js`** (no necesitas tocar la lógica):

- `WHATSAPP` → número real de WhatsApp (formato internacional, sin `+`).
- `SLIDES` → diapositivas del hero.
- `AREAS` → áreas y sus listas de productos.
- `INFO` → fichas de cada producto (descripción + aplicación).
- `COMMODITIES` → catálogo de commodities.

Imágenes del hero/áreas: editar los `background-image` en `index.html`.
Para usar un **video** en el hero: descomentar el bloque `<video>` en `index.html`.

## Ver en local

Abrir `index.html` con doble clic, o servir la carpeta:

```bash
npx serve .
```

## Despliegue (Vercel)

Es un sitio estático: no requiere build. En Vercel, importar el repositorio
y desplegar con la configuración por defecto (sin framework, sin build command).

## Nota

Las descripciones de producto son de **referencia técnica general**, no fichas
oficiales de Verne. Imágenes de stock (Unsplash) pendientes de reemplazar por
material propio. Contenido sujeto a aprobación interna antes de publicación.

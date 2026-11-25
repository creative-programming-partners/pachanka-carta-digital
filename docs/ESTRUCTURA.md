# Estructura del proyecto

Mapa de la carta digital de Pachanka: qué hay en cada carpeta, dónde se cambia cada
cosa y por qué está ordenado así. Las mismas convenciones que
[`pachanka-landing-v3`](https://github.com/creative-programming-partners/pachanka-landing-v3),
para que quien trabaje en una web se mueva igual en la otra.

**Última actualización:** 2026-11-24

---

## La regla que manda

> **El contenido se separa del diseño y del funcionamiento.**
> Quien cambia un precio nunca debería abrir un archivo con lógica.

Es un sitio estático: HTML, CSS y JavaScript que el navegador lee tal cual.
**Sin dependencias, sin compilación, sin framework.** Se sube la carpeta y funciona.

---

## Carpetas

```
pachanka-carta-digital/
├── index.html          la página: estructura, textos en español y enlaces
├── README.md           qué es, cómo verlo, dónde se cambia cada cosa
├── COMO-EDITAR.md      guía para el restaurante, paso a paso y sin jerga
├── ver-en-local.cmd    doble clic en Windows: abre la carta en este computador
├── contenido/          lo que dice la carta (lo que se edita seguido)
├── css/                un archivo por sección, numerados
├── js/                 un módulo por sección + main.js que los arma
├── assets/             platos/ (fotos) · img/ (texturas)
└── docs/               este archivo
```

---

## `contenido/` — lo que dice la carta

Datos puros, sin lógica. Son archivos que dejan un objeto en `window`, para poder
abrirlos y editarlos sin saber programar. Cada uno empieza con un comentario que
explica qué se puede tocar.

| Archivo | Qué tiene |
| --- | --- |
| `carta.js` | Las 10 categorías con sus platos: nombre, precio y descripción en español, inglés y francés. **Es el mismo archivo que usa la landing** (`contenido/carta.js` allá): si cambia un precio, se copia a la otra web para que las dos digan lo mismo. |
| `textos-es.js` | Solo los mensajes que arma el JavaScript (título de la pestaña y descripción para Google). El resto del español está en `index.html`. |
| `textos-en.js` | Todos los textos de la página en inglés. |
| `textos-fr.js` | Todos los textos de la página en francés. |

**Forma de un plato** (en `carta.js`):

```js
{ id: 'lomo-saltado', es: 'Lomo saltado', en: 'Lomo saltado', fr: 'Lomo saltado', p: 39,
  des: 'Descripción en español.', den: 'In English.', dfr: 'En français.' }
```

- Un plato **con descripción** (`des`) se pinta como ficha y abre cartilla.
- Un plato **sin descripción** (guarniciones, bebidas) se pinta como línea de lista.
- El `id` es la llave que une todo: la foto se busca en `assets/platos/<id>.jpg` y el
  enlace directo al plato es `…/#plato-<id>`.

---

## `css/` — un archivo por sección

El número de dos cifras marca el orden de carga. **Si dos reglas chocan, gana la del
número mayor** — ese es el único mecanismo de prioridad que usamos; nada de `!important`
para resolver orden.

| Archivo | Qué pinta |
| --- | --- |
| `01-base.css` | Colores y tipografías (`:root`), reset y accesibilidad |
| `02-marca-y-botones.css` | Logotipo de las ocho letras, botón píldora, etiqueta en pincelada |
| `03-cabecera-y-categorias.css` | Cabecera pegajosa y barra de categorías |
| `04-portada-y-buscador.css` | Portada y buscador |
| `05-carta.css` | Categorías, fichas de plato, listas simples y revelado |
| `06-cartilla.css` | La cartilla que se sobrepone, con la vuelta de la foto |
| `07-pie.css` | Pie: dirección, enlaces y redes |
| `08-celular-y-tablet.css` | Ajustes por ancho de pantalla |
| `09-tema-claro.css` | Los colores de día |
| `10-movimiento-reducido.css` | Para quien pide menos animación |

Los tres últimos van al final porque tienen que poder pisar a los demás.

---

## `js/` — un módulo por comportamiento

Son **módulos ES**: cada archivo exporta sus funciones y pide las que necesita con
`import`. Ninguno se cuelga de `window`, ninguno toca lo que no es suyo y ninguno
define datos: los leen de `contenido/`.

| Archivo | Qué hace | De qué depende |
| --- | --- | --- |
| `main.js` | **Único punto de entrada.** Enciende cada parte en orden y las conecta entre sí | de todos |
| `utiles.js` | Ayudas comunes: buscar en el DOM, escapar texto, escribir precios | de nada |
| `catalogo.js` | Índice plano de la carta: plato por id, su categoría y el orden de las flechas | `contenido/carta.js` |
| `textos.js` | Motor de traducción: pasa la página a inglés o francés | `contenido/textos-*.js` |
| `idioma.js` | Idioma activo, selector ES · EN · FR y nombre de cada plato | `textos.js` |
| `logotipo.js` | Escribe "Pachanka" con las ocho letras de colores | de nada |
| `listado.js` | Pinta la carta: categorías, fichas y listas | catálogo, idioma, fotos, revelado, categorías |
| `categorias.js` | Barra de categorías: la pinta, marca la que se lee y lleva a su sección | catálogo, idioma |
| `fotos.js` | Fotos de los platos y marcador de las que faltan | — |
| `revelado.js` | Las fichas entran al hacer scroll | — |
| `buscador.js` | Filtra la carta mientras se escribe | — |
| `cartilla.js` | La cartilla del plato: abrir, cerrar, pasar de plato | catálogo, idioma, fotos |
| `tema.js` | Tema claro u oscuro según la hora de Lima | — |

Lo que una parte necesita de otra se pasa **desde `main.js`** (por ejemplo: al cambiar
de idioma hay que repintar la carta). Así ningún módulo necesita conocer a los demás y
se puede leer uno solo para entender qué hace.

**Cuándo partir un archivo:** cuando pasa de unas 250 líneas o cuando mezcla dos cosas
distintas. Antes de eso, basta un índice de secciones en el encabezado.

---

## `assets/`

| Carpeta | Qué va |
| --- | --- |
| `platos/` | Una foto por plato, con el nombre del `id`: `lomo-saltado.jpg`. `.jpg` vertical 3:4, 800 × 1067 px, unos 150 KB. Ver `assets/platos/README.md` para las que faltan. |
| `img/` | Texturas del fondo (`grain.png`). |

---

## Orden de carga en `index.html`

1. Script corto en el `<head>` que decide el tema antes de pintar (si no, se vería el
   otro tema un instante).
2. Los CSS de `css/`, del 01 al 10.
3. Tipografías de Google Fonts.
4. `contenido/*.js` — primero los datos.
5. `js/main.js` como módulo — después el programa.

Cada enlace lleva `?v=N`. **Al cambiar algo importante se sube ese número** en todos, para
que el navegador no sirva la versión guardada. Hoy va por `v=5`.

---

## Nombres

- Archivos y carpetas en minúsculas, con guiones, sin tildes ni ñ: `textos-fr.js`,
  `lomo-saltado.jpg`.
- Estilos numerados: `05-carta.css`.
- `id` de plato en minúsculas y con guiones; es la llave entre la carta, la foto y el enlace.
- Claves de traducción `seccion.cosa`: `cover.lede`, `sheet.close`.
- Comentarios y nombres de variables en español, como el resto del repo.

---

## Cómo crece

| Para… | Se toca |
| --- | --- |
| Cambiar un precio o una descripción | `contenido/carta.js` (y se copia a la landing) |
| Añadir una foto | Subir `assets/platos/<id>.jpg`. Nada más |
| Cambiar un texto de la página | El español en `index.html`; inglés y francés en `contenido/textos-*.js` |
| Añadir una sección visible | Un `NN-nombre.css` nuevo + un `nombre.js` con una función `iniciarNombre()` + una línea en `js/main.js` + el `<link>` en `index.html` |
| Cambiar colores o tipografías | `css/01-base.css` (y `css/09-tema-claro.css` para el día) |

Cuando se agrega, renombra o mueve un archivo de `contenido/`, `css/` o `js/`, **este
documento se actualiza en el mismo commit**.

## Publicación

No hay paso de compilación. **Cloudflare** publica la rama `main` desde la carpeta
principal (proyecto `pachanka-carta`, sin comando de build, carpeta de salida `/`). Cada
cambio guardado en `main` aparece en https://carta.pachankarestaurant.com en uno o dos
minutos.

Archivos que lee Cloudflare en la raíz:

| Archivo | Para qué |
| --- | --- |
| `_headers` | `noindex` para la documentación; `nosniff` y política de referencia para todo |
| `404.html` | la página de dirección equivocada. **Sin ella**, Cloudflare respondería cualquier dirección inventada con la portada y un código 200, y Google lo tomaría como contenido duplicado |
| `robots.txt` · `sitemap.xml` | para los buscadores |
| `site.webmanifest` + `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | el ícono del sitio |

El código QR de la carta no apunta a esta dirección, sino al acortador de la casa
(`qr.cppcstudio.com/pachanka-menu`), que redirige aquí. Si algún día cambia el dominio,
se cambia ahí y los QR impresos siguen valiendo.

## 🔗 Relacionado

- `README.md` — qué es el proyecto y dónde se cambia cada cosa
- `COMO-EDITAR.md` — guía para el restaurante
- `pachanka-landing-v3/docs/ESTRUCTURA.md` — la misma estructura en la landing

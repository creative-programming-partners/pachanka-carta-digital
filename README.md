# Pachanka Restaurant — Carta digital

Carta digital de **Pachanka Restaurant** (criollo · fusión, Jesús María, Lima), hecha
con la carta impresa vigente: *CARTA PACHANKA ACTUALIZADA*.

**Ver en vivo:** https://carta.pachankarestaurant.com

**Landing del restaurante:** https://pachankarestaurant.com

> Maqueta de presentación para el cliente. Los platos, las descripciones y los precios
> son los de su carta actual; las fotos son referenciales.

## Qué hace

- **Toda la carta**: 10 categorías, 31 platos con descripción y 20 guarniciones y bebidas
- **El plato manda**: nombre grande y descripción legible, no una lista apretada
- **Cartilla del plato**: al tocar un plato se sobrepone su ficha, el fondo se difumina
  y la foto **entra dando una vuelta** (se ve el reverso con el logo y gira hasta la foto)
- **Se pasa de plato** con las flechas, el teclado (← →) o deslizando en el celular
- **Español / inglés**, con la preferencia guardada en el navegador
- **Buscador**: filtra platos y deja en la barra solo las categorías con resultados
- **Barra de categorías** pegajosa que sigue la sección que se está leyendo
- Enlace directo a un plato: `…/#plato-lomo-saltado`
- Respeta *reducir movimiento* del sistema

## Las fotos

**25 de los 31 platos ya se ven con su foto**, del archivo del restaurante. Los 6 que
faltan muestran un marcador con la "P" y "Foto próximamente".

Para publicar una basta con subir el archivo a `assets/platos/` con el nombre del plato
(por ejemplo `lomo-saltado.jpg`). No hay que tocar código. La lista de los que faltan
está en [`assets/platos/README.md`](assets/platos/README.md).

- Formato `.jpg`, proporción **3:4 vertical**, 800 × 1067 px, alrededor de 150 KB

## Estructura

```
index.html          Página: estructura, textos en español y enlaces
contenido/          Lo que dice la carta (lo que se edita seguido)
  carta.js            Categorías, platos, precios y descripciones (es · en · fr)
  textos-es|en|fr.js  Traducciones de la página
css/                Un archivo por sección, numerados (01-base … 10-movimiento-reducido)
js/                 Un módulo por comportamiento + main.js, que los arma
assets/platos/      Fotos de los platos (una por plato, con el nombre de su id)
docs/ESTRUCTURA.md  Mapa completo: dónde va cada cosa y por qué
```

Mapa detallado en [`docs/ESTRUCTURA.md`](docs/ESTRUCTURA.md).

## Dónde se cambia cada cosa

| Para… | Archivo |
| --- | --- |
| Un precio, un nombre, una descripción | `contenido/carta.js` |
| Agregar o quitar un plato | `contenido/carta.js` |
| Subir la foto de un plato | `assets/platos/<id>.jpg` — nada de código |
| Un texto de la página en español | `index.html` |
| Un texto en inglés o francés | `contenido/textos-en.js` · `contenido/textos-fr.js` |
| Colores y tipografías | `css/01-base.css` (y `css/09-tema-claro.css` para el día) |

Paso a paso y sin jerga, en [`COMO-EDITAR.md`](COMO-EDITAR.md).

Un plato **con descripción** se muestra como ficha y abre cartilla; uno **sin
descripción** (guarniciones, bebidas) se muestra como línea de lista.

Cuando cambie un precio, conviene copiar el mismo plato a la landing
(`pachanka-landing-v3/contenido/carta.js`) para que las dos webs digan lo mismo.

## Tecnología

HTML, CSS y JavaScript sin paso de compilación ni dependencias: las animaciones son CSS
sobre `transform` y `opacity`, y el revelado usa `IntersectionObserver`.

## Verlo en local

En Windows, doble clic en **`ver-en-local.cmd`**: abre el navegador con la carta
y deja el servidor corriendo (cierra la ventana negra para apagarlo).

A mano, desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

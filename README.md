# Pachanka Restaurant — Carta digital

Carta digital de **Pachanka Restaurant** (criollo · fusión, Jesús María, Lima), hecha
con la carta impresa vigente: *CARTA PACHANKA ACTUALIZADA*.

**Ver en vivo:** https://creative-programming-partners.github.io/pachanka-carta-digital/

**Landing del restaurante:** https://creative-programming-partners.github.io/pachanka-landing-v2/

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

Todavía no hay fotos: cada plato muestra un marcador con la "P" y "Foto próximamente".

Para publicarlas basta con subir el archivo a `assets/platos/` con el nombre del plato
(por ejemplo `lomo-saltado.jpg`). No hay que tocar código. La lista completa de nombres
está en [`assets/platos/README.md`](assets/platos/README.md).

- Formato `.jpg`, proporción **16:10**, 1600 × 1000 px, menos de 400 KB

## Estructura

```
index.html          Página
css/styles.css      Estilos
js/menu-data.js     La carta (español e inglés) — mismo archivo que la landing
js/i18n.js          Traducciones al inglés
js/wordmark.js      Logotipo de las ocho letras
js/app.js           Carta, buscador, idioma, cartilla del plato y animaciones
assets/platos/      Fotos de los platos (una por plato, con su nombre)
```

## Cambiar la carta

Todo está en `js/menu-data.js`: categorías, grupos y platos con su precio y descripción
en los dos idiomas. Un plato **con descripción** se muestra como ficha y abre cartilla;
uno **sin descripción** (guarniciones, bebidas) se muestra como línea de lista.

Cuando cambie un precio, conviene copiar el mismo archivo a la landing
(`pachanka-landing-v2/js/menu-data.js`) para que las dos webs digan lo mismo.

## Tecnología

HTML, CSS y JavaScript sin paso de compilación ni dependencias: las animaciones son CSS
sobre `transform` y `opacity`, y el revelado usa `IntersectionObserver`.

## Verlo en local

```bash
python -m http.server 8000
```

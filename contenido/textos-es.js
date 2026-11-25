/* =========================================================
   TEXTOS EN ESPAÑOL (solo los mensajes)
   ---------------------------------------------------------
   Cada línea es   clave: 'texto',
   Cambia solo el texto de la derecha, sin borrar las comillas ni la coma del final.
   - Aquí van únicamente los textos que arma el JavaScript (el título de la pestaña,
     la descripción para Google y las etiquetas de la cartilla del plato).
   - Los demás textos en español están directamente en index.html.
   - Los nombres y las descripciones de los platos están en contenido/carta.js.
   Más ayuda: COMO-EDITAR.md, en la carpeta principal.
   ========================================================= */
window.PK_TEXTOS = window.PK_TEXTOS || {};

PK_TEXTOS.es = {
  mensajes: {
    title: 'Carta — Pachanka Restaurant, comida criolla y fusión en Jesús María',
    desc: 'Carta del restaurante Pachanka, criollo y fusión en Jesús María, Lima: entradas, clásicos criollos, del mar, especiales de fin de semana, postres y bebidas.',
    see: 'Ver el plato', of: 'de', photoOf: 'Foto de',
    results: n => n === 1 ? '1 plato encontrado' : n + ' platos encontrados'
  }
};

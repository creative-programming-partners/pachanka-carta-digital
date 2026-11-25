/* =========================================================
   TEXTOS EN INGLÉS
   ---------------------------------------------------------
   Cada línea es   'clave': 'texto',
   Cambia solo el texto de la derecha, sin borrar las comillas ni la coma del final.
   - La clave de la izquierda conecta el texto con su lugar en index.html
     (allí aparece como data-i18n="clave"). No la cambies.
   - Si a una clave le falta su texto aquí, la página muestra el español.
   - Para un apóstrofo usa la comilla curva ’ (por ejemplo: Grandma’s),
     no la recta ', que cierra el texto antes de tiempo.
   - <br> es un salto de línea; &nbsp; es un espacio que no se corta.
   - Los nombres y las descripciones de los platos están en contenido/carta.js.
   Más ayuda: COMO-EDITAR.md, en la carpeta principal.
   ========================================================= */
window.PK_TEXTOS = window.PK_TEXTOS || {};

PK_TEXTOS.en = {
  // Textos de la página (los mismos lugares que el español de index.html)
  pagina: {
    'lang.group': 'Language',
    'a11y.skip': 'Skip to the menu',
    'nav.home': 'Pachanka, home',
    'nav.cats': 'Menu categories',
    'lang.switch': 'Ver en español',
    'cta.site': 'Go to the website',
    'cta.siteShort': 'Website',

    'cover.sub': 'Restaurant &nbsp;·&nbsp; Criollo · Fusion &nbsp;·&nbsp; Jesús María, Lima',
    'cover.t1': 'Digital',
    'cover.t2': 'menu',
    'cover.lede': 'Tap a dish name to see it big, with its photo and description.',
    'cover.note': 'Prices in Peruvian soles (S/). Photos are for reference.',

    'search.ph': 'Search a dish…',
    'search.aria': 'Search a dish on the menu',
    'search.clear': 'Clear search',
    'search.empty': 'We could not find that dish on the menu.',

    'sheet.close': 'Close',
    'sheet.prev': 'Previous dish',
    'sheet.next': 'Next dish',
    'sheet.soon': 'Photo coming soon',

    'ftr.addr': 'Jr. Coronel Camilo Carrillo 169, Jesús María — Lima',
    'ftr.wa': 'Book via WhatsApp',
    'ftr.site': 'Pachanka website',
    'ftr.fine': 'Reference menu. Prices in Peruvian soles (S/), taxes included. Subject to availability.'
  },

  // Textos que arma el JavaScript
  mensajes: {
    title: 'Menu — Pachanka Restaurant, criollo and fusion food in Jesús María',
    desc: 'Menu of Pachanka, a criollo and fusion restaurant in Jesús María, Lima: starters, criollo classics, seafood, weekend specials, desserts and drinks.',
    see: 'See the dish', of: 'of', photoOf: 'Photo of',
    results: n => n === 1 ? '1 dish found' : n + ' dishes found'
  }
};

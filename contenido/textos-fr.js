/* =========================================================
   TEXTOS EN FRANCÉS
   ---------------------------------------------------------
   Cada línea es   'clave': 'texto',
   Cambia solo el texto de la derecha, sin borrar las comillas ni la coma del final.
   - La clave de la izquierda conecta el texto con su lugar en index.html
     (allí aparece como data-i18n="clave"). No la cambies.
   - Si a una clave le falta su texto aquí, la página muestra el español.
   - Para un apóstrofo usa la comilla curva ’ (por ejemplo: l’heure),
     no la recta ', que cierra el texto antes de tiempo.
   - No hace falta poner el espacio fino antes de : ; ? ! — lo pone la página sola.
   - Los nombres y las descripciones de los platos están en contenido/carta.js.
   Más ayuda: COMO-EDITAR.md, en la carpeta principal.
   ========================================================= */
window.PK_TEXTOS = window.PK_TEXTOS || {};

PK_TEXTOS.fr = {
  // Textos de la página (los mismos lugares que el español de index.html)
  pagina: {
    'lang.group': 'Langue',
    'a11y.skip': 'Aller à la carte',
    'nav.home': 'Pachanka, accueil',
    'nav.cats': 'Catégories de la carte',
    'cta.site': 'Aller sur le site',
    'cta.siteShort': 'Site web',

    'cover.sub': 'Restaurant &nbsp;·&nbsp; Criollo · Fusion &nbsp;·&nbsp; Jesús María, Lima',
    'cover.t1': 'Carte',
    'cover.t2': 'digitale',
    'cover.lede': 'Touchez le nom d’un plat pour le voir en grand, avec sa photo et sa description.',
    'cover.note': 'Prix en soles péruviens (S/). Photos à titre indicatif.',

    'search.ph': 'Chercher un plat…',
    'search.aria': 'Chercher un plat dans la carte',
    'search.clear': 'Effacer la recherche',
    'search.empty': 'Nous n’avons pas trouvé ce plat dans la carte.',

    'sheet.close': 'Fermer',
    'sheet.prev': 'Plat précédent',
    'sheet.next': 'Plat suivant',
    'sheet.soon': 'Photo bientôt disponible',

    'ftr.addr': 'Jr. Coronel Camilo Carrillo 169, Jesús María — Lima',
    'ftr.wa': 'Réserver par WhatsApp',
    'ftr.site': 'Site de Pachanka',
    'ftr.fine': 'Carte indicative. Prix en soles péruviens (S/), taxes comprises. Sous réserve de disponibilité.'
  },

  // Textos que arma el JavaScript
  mensajes: {
    title: 'Carte — Pachanka Restaurant, cuisine criolla et fusion à Jesús María',
    desc: 'Carte digitale de Pachanka Restaurant : entrées, classiques criollos, criollo fusion, produits de la mer, spécialités du week-end, desserts et boissons. Touchez un plat pour le voir en grand.',
    see: 'Voir le plat', of: 'sur', photoOf: 'Photo de',
    results: n => n === 1 ? '1 plat trouvé' : n + ' plats trouvés'
  }
};

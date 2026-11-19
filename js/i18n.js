/* Traducciones. El español vive en el HTML; aquí están el inglés y el francés (si falta una clave, queda el español).
   Marcas en el HTML: data-i18n (contenido), data-i18n-aria, data-i18n-alt, data-i18n-ph (placeholder).
   Mismo mecanismo que la landing. */
(function () {
  const EN = {
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
  };

  const FR = {
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
  };

  /* Textos que arma el JavaScript */
  const JS = {
    es: {
      title: 'Carta digital — Pachanka Restaurant',
      desc: 'Carta digital de Pachanka Restaurant: entradas, clásicos criollos, criollo fusión, del mar, especiales de fin de semana, postres y bebidas. Toca un plato para verlo en grande.',
      see: 'Ver el plato', of: 'de', photoOf: 'Foto de',
      results: n => n === 1 ? '1 plato encontrado' : n + ' platos encontrados'
    },
    en: {
      title: 'Digital menu — Pachanka Restaurant',
      desc: 'Pachanka Restaurant digital menu: starters, criollo classics, criollo fusion, seafood, weekend specials, desserts and drinks. Tap a dish to see it big.',
      see: 'See the dish', of: 'of', photoOf: 'Photo of',
      results: n => n === 1 ? '1 dish found' : n + ' dishes found'
    },
    fr: {
      title: 'Carte digitale — Pachanka Restaurant',
      desc: 'Carte digitale de Pachanka Restaurant : entrées, classiques criollos, criollo fusion, produits de la mer, spécialités du week-end, desserts et boissons. Touchez un plat pour le voir en grand.',
      see: 'Voir le plat', of: 'sur', photoOf: 'Photo de',
      results: n => n === 1 ? '1 plat trouvé' : n + ' plats trouvés'
    }
  };

  const originals = new Map();
  function keep(el, prop, value) {
    if (!originals.has(el)) originals.set(el, {});
    const o = originals.get(el);
    if (!(prop in o)) o[prop] = value;
    return o[prop];
  }
  const ATTRS = [['i18nAria', 'aria-label'], ['i18nAlt', 'alt'], ['i18nPh', 'placeholder'], ['i18nTitle', 'title']];

  // Francés: espacio fino antes de : ; ? ! (regla tipográfica)
  Object.keys(FR).forEach(k => { FR[k] = FR[k].replace(/ ([:;?!])/g, '\u00a0$1'); });
  JS.fr.desc = JS.fr.desc.replace(/ ([:;?!])/g, '\u00a0$1');
  const DICT = { en: EN, fr: FR };
  const pick = (dict, key, es) => { const v = dict && dict[key]; return v !== undefined && v !== null ? v : es; };

  function apply(lang) {
    const dict = DICT[lang] || null;
    document.documentElement.lang = dict ? lang : 'es';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = pick(dict, el.dataset.i18n, keep(el, 'html', el.innerHTML));
      if (el.innerHTML !== v) el.innerHTML = v;
    });
    ATTRS.forEach(([ds, attr]) => {
      document.querySelectorAll('[data-' + ds.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ']').forEach(el => {
        const v = pick(dict, el.dataset[ds], keep(el, attr, el.getAttribute(attr)));
        if (v !== undefined && v !== null) el.setAttribute(attr, v);
      });
    });
    const t = JS[dict ? lang : 'es'];
    document.title = t.title;
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', t.desc);
  }

  window.PK_I18N = { EN, FR, JS, apply };
})();

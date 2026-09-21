/* Traducciones. El español vive en el HTML; aquí está el inglés.
   Marcas en el HTML: data-i18n (contenido), data-i18n-aria, data-i18n-alt, data-i18n-ph (placeholder).
   Mismo mecanismo que la landing. */
(function () {
  const EN = {
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

  function apply(lang) {
    const en = lang === 'en';
    document.documentElement.lang = en ? 'en' : 'es';
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const es = keep(el, 'html', el.innerHTML);
      const v = en ? EN[el.dataset.i18n] : es;
      if (v !== undefined && el.innerHTML !== v) el.innerHTML = v;
    });
    ATTRS.forEach(([ds, attr]) => {
      document.querySelectorAll('[data-' + ds.replace(/[A-Z]/g, c => '-' + c.toLowerCase()) + ']').forEach(el => {
        const es = keep(el, attr, el.getAttribute(attr));
        const v = en ? EN[el.dataset[ds]] : es;
        if (v !== undefined && v !== null) el.setAttribute(attr, v);
      });
    });
    const t = JS[en ? 'en' : 'es'];
    document.title = t.title;
    const d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute('content', t.desc);
  }

  window.PK_I18N = { EN, JS, apply };
})();

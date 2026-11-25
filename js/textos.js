/* =========================================================
   MOTOR DE TRADUCCIÓN (español · inglés · francés)
   No hace falta editar este archivo: los textos están en contenido/textos-*.js.
   El español de la página vive en index.html; este motor lo cambia por el inglés
   o el francés. Si a un idioma le falta una clave, se muestra el español.
   Marcas en el HTML: data-i18n (contenido), data-i18n-aria, data-i18n-alt,
   data-i18n-ph (placeholder), data-i18n-title.
   ========================================================= */
const T = window.PK_TEXTOS || {};
const EN = (T.en && T.en.pagina) || {};
const FR = (T.fr && T.fr.pagina) || {};
const MENSAJES = { es: T.es.mensajes, en: T.en.mensajes, fr: T.fr.mensajes };

// Francés: espacio fino antes de : ; ? ! (regla tipográfica), así no quedan solos al inicio de una línea
Object.keys(FR).forEach(k => { FR[k] = FR[k].replace(/ ([:;?!])/g, ' $1'); });
MENSAJES.fr.desc = MENSAJES.fr.desc.replace(/ ([:;?!])/g, ' $1');

const DICT = { en: EN, fr: FR };
const ATTRS = [['i18nAria', 'aria-label'], ['i18nAlt', 'alt'], ['i18nPh', 'placeholder'], ['i18nTitle', 'title']];

// Guarda el español original de cada lugar para poder volver a él
const originals = new Map();
function keep(el, prop, value) {
  if (!originals.has(el)) originals.set(el, {});
  const o = originals.get(el);
  if (!(prop in o)) o[prop] = value;
  return o[prop];
}
const pick = (dict, key, es) => { const v = dict && dict[key]; return v !== undefined && v !== null ? v : es; };

/** Mensajes que arma el JavaScript, en el idioma pedido. */
export const mensajes = lang => MENSAJES[lang] || MENSAJES.es;

/** Pasa toda la página al idioma pedido ('es', 'en' o 'fr'). */
export function aplicarTextos(lang) {
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
  const t = mensajes(dict ? lang : 'es');
  document.title = t.title;
  const d = document.querySelector('meta[name="description"]');
  if (d) d.setAttribute('content', t.desc);
}

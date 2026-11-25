/* Idioma activo de la carta: lo recuerda, lo cambia con el selector ES · EN · FR y
   dice cómo se llama cada plato en ese idioma.
   Depende de js/textos.js (el motor que pasa la página de idioma). */
import { $$ } from './utiles.js';
import { aplicarTextos, mensajes } from './textos.js';

let lang = 'es';
// El idioma se comparte con la landing (mismo dominio): si eligieron francés allá, la carta abre en francés
try { const s = localStorage.getItem('pk-lang'); if (s === 'es' || s === 'en' || s === 'fr') lang = s; } catch (e) {}

/** 'es', 'en' o 'fr' */
export const idioma = () => lang;
/** Mensajes que arma el JavaScript, en el idioma activo. */
export const t = () => mensajes(lang);
/** Nombre de un plato, una categoría o un grupo en el idioma activo. */
export const nameOf = d => d[lang] || d.es;
/** Descripción de un plato en el idioma activo (si falta, va la española). */
export const descOf = d => (lang === 'en' ? d.den : lang === 'fr' ? d.dfr : d.des) || d.des || '';

const botones = () => $$('.lang [data-l]');
const marcarBoton = () => botones().forEach(b => b.setAttribute('aria-pressed', b.dataset.l === lang));

/**
 * Pone la página en el idioma guardado y conecta el selector.
 * @param alCambiar  se llama después de cada cambio, para repintar lo que armó el JS.
 */
export function iniciarIdioma(alCambiar) {
  botones().forEach(b => b.addEventListener('click', () => {
    if (b.dataset.l === lang) return;
    lang = b.dataset.l;
    try { localStorage.setItem('pk-lang', lang); } catch (e) {}
    aplicarTextos(lang);
    marcarBoton();
    alCambiar();
  }));
  aplicarTextos(lang);
  marcarBoton();
}

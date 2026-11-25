/* Barra de categorías: la pinta, marca la que se está leyendo y lleva a su sección.
   La barra solo lista las categorías que se están viendo (al buscar, las que tienen resultados). */
import { $, $$, esc, reduce } from './utiles.js';
import { carta } from './catalogo.js';
import { nameOf } from './idioma.js';

const tabsEl = $('#tabs');

/** Dibuja la barra con las categorías dadas (si no se pasa ninguna, todas). */
export function pintarBarra(cats) {
  tabsEl.innerHTML = (cats || carta).map((c, i) =>
    `<a class="tab${i ? '' : ' is-on'}" href="#cat-${c.id}" data-cat="${c.id}">${esc(nameOf(c))}</a>`).join('');
}

let espia = null;
/** Vuelve a vigilar qué categoría se está leyendo. Se llama después de cada repintado. */
export function iniciarEspia() {
  if (espia) espia.disconnect();
  espia = new IntersectionObserver(es => {
    es.forEach(e => {
      if (!e.isIntersecting) return;
      const id = e.target.dataset.cat;
      $$('.tab', tabsEl).forEach(a => a.classList.toggle('is-on', a.dataset.cat === id));
      const on = $('.tab.is-on', tabsEl);
      if (on) tabsEl.scrollTo({ left: Math.max(0, on.offsetLeft - 20), behavior: reduce ? 'auto' : 'smooth' });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('.cat').forEach(s => espia.observe(s));
}

/** Lleva a una categoría dejando el título justo debajo de la cabecera pegajosa. */
export function irACategoria(id, smooth) {
  const sec = $('#cat-' + id);
  if (!sec) return false;
  const top = sec.getBoundingClientRect().top + scrollY - ($('#hdr').offsetHeight + 12);
  // 'instant' y no 'auto': con scroll-behavior:smooth en el CSS, 'auto' también desplaza suave
  scrollTo({ top, behavior: smooth && !reduce ? 'smooth' : 'instant' });
  return true;
}

/** Conecta los clics de la barra. Se llama una sola vez. */
export function conectarBarra() {
  tabsEl.addEventListener('click', e => {
    const a = e.target.closest('.tab');
    if (!a) return;
    e.preventDefault();
    irACategoria(a.dataset.cat, true);
  });
}

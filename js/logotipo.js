/* Logotipo de Pachanka: las ocho letras con su color, su giro y su altura.
   Las mismas letras que en la landing, para que las dos webs escriban el nombre igual.
   El estilo de cada letra está en css/02-marca-y-botones.css (clase .wm). */

const LETRAS = [
  ['P', 'var(--ochre)', -4, '0'],
  ['a', 'var(--sage)', 3, '.02em'],
  ['c', 'var(--blush)', -3, '0'],
  ['h', 'var(--coral)', 4, '-.02em'],
  ['a', 'var(--butter)', -2, '.03em'],
  ['n', 'var(--teal)', 3, '0', 1],   // la "n" lleva el destello encima
  ['k', 'var(--brick)', -4, '-.02em'],
  ['a', 'var(--sand)', 2, '.02em']
];
const DESTELLO = '<svg class="spark" viewBox="0 0 40 26" aria-hidden="true"><path d="M8 22 3 11M20 20V4M32 22l5-11" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/></svg>';

/** Escribe el nombre dentro de cada elemento con data-wm (cabecera, portada, cartilla y pie). */
export function pintarLogotipos() {
  document.querySelectorAll('[data-wm]').forEach(el => {
    el.innerHTML = LETRAS.map((x, i) =>
      `<span style="--c:${x[1]};--r:${x[2]}deg;--y:${x[3]};--i:${i}">${x[0]}${x[4] ? DESTELLO : ''}</span>`).join('');
  });
}

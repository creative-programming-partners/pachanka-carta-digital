/* La carta en pantalla: categorías, fichas de plato y listas simples.
   Un plato con descripción se pinta como ficha (abre cartilla); uno sin descripción
   (guarniciones, bebidas) se pinta como línea de lista.
   Después de pintar vuelve a preparar las miniaturas, el revelado y la barra. */
import { $, esc, money, norm } from './utiles.js';
import { carta } from './catalogo.js';
import { t, nameOf, descOf } from './idioma.js';
import { etiquetaMiniatura, cargarMiniaturas } from './fotos.js';
import { revelarTodo } from './revelado.js';
import { pintarBarra, iniciarEspia } from './categorias.js';

const cartaEl = $('#carta'), emptyEl = $('#empty');

function ficha(d) {
  const n = esc(nameOf(d));
  return `<button class="dish rv" type="button" data-dish="${d.id}" aria-label="${esc(t().see)}: ${n}">
      <span class="dish-thumb" data-thumb="${d.id}"><span class="ph-mark" aria-hidden="true">P</span>${etiquetaMiniatura(d)}</span>
      <span class="dish-main">
        <span class="dish-head"><span class="dish-name">${n}</span><span class="dish-price">${money(d.p)}</span></span>
        <span class="dish-desc">${esc(descOf(d))}</span>
        <span class="dish-more">${esc(t().see)}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
      </span>
    </button>`;
}

function linea(d) {
  return `<li class="row"><span class="row-name">${esc(nameOf(d))}</span><span class="row-dots"></span><span class="row-price">${money(d.p)}</span></li>`;
}

/**
 * Dibuja la carta completa, o solo los platos que coinciden con lo buscado.
 * @param filtro  texto del buscador ('' = toda la carta)
 */
export function pintarCarta(filtro) {
  const q = norm(filtro || '');
  let shown = 0;
  const visible = [];
  cartaEl.innerHTML = carta.map(cat => {
    const groups = cat.groups.map(g => {
      const items = g.items.filter(d => !q || norm(nameOf(d) + ' ' + descOf(d)).includes(q));
      if (!items.length) return '';
      shown += items.length;
      // Hay grupos sin título, cuyos platos van sueltos en su categoría
      const titulo = nameOf(g);
      const title = titulo ? `<h3 class="grp">${esc(titulo)}</h3>` : '';
      const cards = items.some(d => d.des);
      return title + (cards
        ? `<div class="dishes">${items.map(ficha).join('')}</div>`
        : `<ul class="rows">${items.map(linea).join('')}</ul>`);
    }).join('');
    if (!groups) return '';
    visible.push(cat);
    return `<section class="cat" id="cat-${cat.id}" data-cat="${cat.id}">
        <header class="cat-head"><h2 class="brush">${esc(nameOf(cat))}</h2></header>
        ${groups}
      </section>`;
  }).join('');

  emptyEl.hidden = shown > 0;
  pintarBarra(visible);
  revelarTodo();
  cargarMiniaturas();
  iniciarEspia();
}

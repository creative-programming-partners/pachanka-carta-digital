/* Revelado al hacer scroll: las fichas entran de abajo hacia arriba, escalonadas.
   El movimiento lo hace el CSS (css/05-carta.css, clase .rv); aquí solo se añade .is-in
   cuando la ficha entra en pantalla. Si se pidió menos movimiento, se muestran de una. */
import { $$, reduce } from './utiles.js';

const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('is-in');
  io.unobserve(e.target);
}), { rootMargin: '0px 0px -6% 0px', threshold: .05 });

/** Prepara el retraso de cada ficha y las pone a la espera. Se llama después de pintar la carta. */
export function revelarTodo() {
  $$('.dishes').forEach(list => $$('.rv', list).forEach((el, i) => el.style.setProperty('--i', Math.min(i, 8))));
  $$('.rv').forEach(el => reduce ? el.classList.add('is-in') : io.observe(el));
}

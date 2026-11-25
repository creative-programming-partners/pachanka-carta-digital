/* Ayudas que usan todos los módulos: buscar en el DOM, escapar texto para el HTML,
   escribir precios y comparar palabras sin tildes ni mayúsculas.
   No depende de nada ni toca la página. */

/** true si en el sistema se pidió menos movimiento. */
export const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

export const $ = (s, c = document) => c.querySelector(s);
export const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/** Texto seguro para meter dentro del HTML (nombres y descripciones de la carta). */
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/** 33 → "S/ 33" · 12.5 → "S/ 12.50" */
export const money = p => 'S/ ' + (Number.isInteger(p) ? p : p.toFixed(2));

/** Para el buscador: "Ají de gallina" y "aji de gallina" son lo mismo. */
export const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

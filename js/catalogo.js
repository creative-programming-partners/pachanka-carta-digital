/* Índice plano de la carta: a partir de contenido/carta.js arma tres atajos que usan
   el listado, el buscador y la cartilla del plato. Un plato abre cartilla si tiene
   descripción: las guarniciones y las bebidas van como lista simple.
   Solo lee datos; no define ninguno ni toca la página. */

/** La carta tal como está en contenido/carta.js (categorías → grupos → platos). */
export const carta = window.PK_MENU || [];

/** id de plato → el plato */
export const porId = new Map();
/** id de plato → su categoría */
export const categoriaDe = new Map();
/** ids de los platos que abren cartilla, en el orden en que se pasan con las flechas */
export const abribles = [];

carta.forEach(cat => cat.groups.forEach(g => g.items.forEach(d => {
  porId.set(d.id, d);
  categoriaDe.set(d.id, cat);
  if (d.des) abribles.push(d.id);
})));

/* Fotos de los platos. Cada foto va en assets/platos/<id del plato>.jpg: al subir el
   archivo aparece sola, sin tocar código. Mientras no exista, queda el marcador con la "P".
   Los platos cuya foto no está se anotan aquí para no volver a pedirla en cada repintado. */
import { $$ } from './utiles.js';

/** ids de platos cuya foto no está en el servidor. */
export const faltantes = new Set();

/** Ruta de la foto de un plato. */
export const rutaFoto = id => 'assets/platos/' + id + '.jpg';

/** Las primeras miniaturas se ven apenas se abre la carta: se piden enseguida y con prioridad.
    Las demás esperan a acercarse a la pantalla. */
const PRIMERAS = 4;
let enEstaPintada = 0;

/** La imagen va dentro de la ficha. */
export const etiquetaMiniatura = d => {
  if (faltantes.has(d.id)) return '';
  const pronto = enEstaPintada++ < PRIMERAS;
  return `<img src="${rutaFoto(d.id)}" alt="" ${pronto ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
};

/** Marca cada miniatura según cargue o falle. Se llama después de pintar la carta. */
export function cargarMiniaturas() {
  enEstaPintada = 0;
  $$('.dish-thumb img').forEach(img => {
    const box = img.parentElement, id = box.dataset.thumb;
    const ok = () => box.classList.add('has-photo');
    const no = () => { faltantes.add(id); img.remove(); };
    if (img.complete) return img.naturalWidth ? ok() : no();
    img.addEventListener('load', ok, { once: true });
    img.addEventListener('error', no, { once: true });
  });
}

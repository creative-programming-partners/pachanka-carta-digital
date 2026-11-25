/* Fotos de los platos. Cada foto va en assets/platos/<id del plato>.jpg: al subir el
   archivo aparece sola, sin tocar código. Mientras no exista, queda el marcador con la "P".
   Los platos cuya foto no está se anotan aquí para no volver a pedirla en cada repintado. */
import { $$ } from './utiles.js';

/** ids de platos cuya foto no está en el servidor. */
export const faltantes = new Set();

/** Ruta de la foto de un plato. */
export const rutaFoto = id => 'assets/platos/' + id + '.jpg';

/** La imagen va dentro de la ficha para que el navegador la cargue al entrar en pantalla. */
export const etiquetaMiniatura = d => faltantes.has(d.id) ? ''
  : `<img src="${rutaFoto(d.id)}" alt="" loading="lazy" decoding="async">`;

/** Marca cada miniatura según cargue o falle. Se llama después de pintar la carta. */
export function cargarMiniaturas() {
  $$('.dish-thumb img').forEach(img => {
    const box = img.parentElement, id = box.dataset.thumb;
    const ok = () => box.classList.add('has-photo');
    const no = () => { faltantes.add(id); img.remove(); };
    if (img.complete) return img.naturalWidth ? ok() : no();
    img.addEventListener('load', ok, { once: true });
    img.addEventListener('error', no, { once: true });
  });
}

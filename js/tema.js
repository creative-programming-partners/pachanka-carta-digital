/* Tema claro u oscuro según la hora de Lima.
   El <head> ya puso el tema al cargar (antes de pintar, para que no haya un salto de color).
   Aquí se revisa cada minuto: a las 6 p.m. pasa a oscuro y a las 6 a.m. a claro, con un
   fundido corto. Con ?tema=claro o ?tema=oscuro en la dirección queda fijo (para mostrar
   uno a mano). Los colores del tema claro están en css/09-tema-claro.css. */
import { $ } from './utiles.js';

const fijado = /^(claro|oscuro)$/.test(new URLSearchParams(location.search).get('tema') || '');
const horaLima = () => +new Intl.DateTimeFormat('en-US', { timeZone: 'America/Lima', hour: 'numeric', hourCycle: 'h23' }).format(new Date());

function revisarTema() {
  if (fijado) return;
  const h = horaLima(), th = h >= 6 && h < 18 ? 'light' : 'dark';
  const root = document.documentElement;
  if (root.dataset.theme === th) return;
  root.classList.add('theme-fade');
  root.dataset.theme = th;
  const meta = $('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', th === 'light' ? '#f5f0e7' : '#110f0f');
  setTimeout(() => root.classList.remove('theme-fade'), 700);
}

/** Empieza a revisar la hora. Se llama una sola vez. */
export function iniciarTema() {
  // Arranca al cambiar de minuto, para que el cambio caiga en la hora en punto
  setTimeout(() => { revisarTema(); setInterval(revisarTema, 60000); }, (60 - new Date().getSeconds()) * 1000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) revisarTema(); });
}

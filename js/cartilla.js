/* Cartilla del plato: se sobrepone a la carta, oscurece el fondo y la foto entra dando
   una vuelta (se ve el reverso con el logo y gira hasta la foto). Se pasa de plato con
   las flechas, el teclado (← →) o deslizando en el celular.
   El movimiento lo hace el CSS (css/06-cartilla.css); aquí se llena, se abre y se cierra. */
import { $, money, reduce } from './utiles.js';
import { porId, categoriaDe, abribles } from './catalogo.js';
import { t, nameOf, descOf } from './idioma.js';
import { faltantes, rutaFoto } from './fotos.js';

const sheet = $('#sheet'), flip = $('#flip'), fig = $('#sheetFig'), sImg = $('#sheetImg');
let actual = null, ultimoFoco = null;

/** id del plato abierto, o null si la cartilla está cerrada. */
export const platoAbierto = () => actual;

function bloquearFondo(on) {
  document.body.style.overflow = on ? 'hidden' : '';
  document.body.style.touchAction = on ? 'none' : '';
}

/** Llena la cartilla con un plato (sin abrirla ni animarla). */
export function rellenarCartilla(id) {
  const d = porId.get(id), cat = categoriaDe.get(id);
  if (!d) return;
  actual = id;
  $('#sheetCat').textContent = cat ? nameOf(cat) : '';
  $('#sheetName').textContent = nameOf(d);
  $('#sheetDesc').textContent = descOf(d);
  $('#sheetPrice').textContent = money(d.p);
  const i = abribles.indexOf(id);
  $('#sheetCount').textContent = (i + 1) + ' ' + t().of + ' ' + abribles.length;

  // Foto grande: si no existe el archivo, la cartilla muestra el marcador
  fig.classList.remove('has-photo');
  sImg.removeAttribute('src');
  sImg.alt = '';
  if (!faltantes.has(id)) {
    sImg.alt = t().photoOf + ' ' + nameOf(d);
    // La foto se muestra recién decodificada: si aparece a medio decodificar durante la vuelta,
    // el navegador la decodifica y la pinta en plena animación y se pierden cuadros
    sImg.onload = () => {
      const ready = sImg.decode ? sImg.decode().catch(() => {}) : Promise.resolve();
      ready.then(() => { if (actual === id) fig.classList.add('has-photo'); });
    };
    sImg.onerror = () => { faltantes.add(id); fig.classList.remove('has-photo'); };
    sImg.src = rutaFoto(id);
  }
  try { history.replaceState(null, '', '#plato-' + id); } catch (e) {}
}

function darLaVuelta() {
  if (reduce) return;
  flip.classList.remove('spin');
  void flip.offsetWidth;   // reinicia la animación
  flip.classList.add('spin');
}

/** Abre la cartilla de un plato. `desde` es el botón que la abrió, para devolverle el foco. */
export function abrirPlato(id, desde) {
  ultimoFoco = desde || document.activeElement;
  rellenarCartilla(id);
  sheet.hidden = false;
  void sheet.offsetWidth;
  sheet.classList.add('open');
  darLaVuelta();
  bloquearFondo(true);
  $('#sheetClose').focus({ preventScroll: true });
}

function cerrar() {
  if (sheet.hidden) return;
  sheet.classList.remove('open');
  bloquearFondo(false);
  try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  const done = () => { sheet.hidden = true; };
  reduce ? done() : setTimeout(done, 320);
  if (ultimoFoco && document.contains(ultimoFoco)) ultimoFoco.focus({ preventScroll: true });
  actual = null;
}

function pasar(n) {
  const i = abribles.indexOf(actual);
  if (i < 0) return;
  rellenarCartilla(abribles[(i + n + abribles.length) % abribles.length]);
  darLaVuelta();
}

/** Conecta los clics, el teclado y el deslizar. Se llama una sola vez. */
export function iniciarCartilla() {
  $('#carta').addEventListener('click', e => {
    const b = e.target.closest('.dish');
    if (b) abrirPlato(b.dataset.dish, b);
  });
  $('#sheetClose').addEventListener('click', cerrar);
  $('#sheetBg').addEventListener('click', cerrar);
  $('#prevDish').addEventListener('click', () => pasar(-1));
  $('#nextDish').addEventListener('click', () => pasar(1));
  addEventListener('keydown', e => {
    if (sheet.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); cerrar(); }
    else if (e.key === 'ArrowRight') pasar(1);
    else if (e.key === 'ArrowLeft') pasar(-1);
  });
  // Deslizar en el móvil para pasar de plato
  let x0 = null;
  sheet.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  sheet.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 60) pasar(dx < 0 ? 1 : -1);
  }, { passive: true });
}

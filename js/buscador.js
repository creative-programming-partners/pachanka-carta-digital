/* Buscador de platos. Filtra la carta mientras se escribe (con una pausa corta para no
   repintar en cada tecla) y deja en la barra solo las categorías con resultados. */
import { $ } from './utiles.js';

const campo = $('#q'), limpiar = $('#qClear');

/** Lo que hay escrito en el buscador. */
export const textoBuscado = () => campo.value;

/**
 * Conecta el buscador. Se llama una sola vez.
 * @param alBuscar  se llama con el texto a filtrar.
 */
export function iniciarBuscador(alBuscar) {
  let espera;
  campo.addEventListener('input', () => {
    limpiar.hidden = !campo.value;
    clearTimeout(espera);
    espera = setTimeout(() => alBuscar(campo.value), 120);
  });
  limpiar.addEventListener('click', () => {
    campo.value = '';
    limpiar.hidden = true;
    alBuscar('');
    campo.focus();
  });
}

/* =========================================================
   PUNTO DE ENTRADA
   El único archivo que carga index.html: enciende cada parte en orden y las conecta.
   Cada sección vive en su propio archivo de js/ y no sabe de las demás; lo que una
   necesita de otra se pasa desde aquí.
   Para añadir un comportamiento: un archivo nuevo en js/ con una función iniciar…()
   y una línea aquí.
   ========================================================= */
import { porId } from './catalogo.js';
import { pintarLogotipos } from './logotipo.js';
import { iniciarIdioma } from './idioma.js';
import { pintarCarta } from './listado.js';
import { conectarBarra, irACategoria } from './categorias.js';
import { iniciarBuscador, textoBuscado } from './buscador.js';
import { iniciarCartilla, abrirPlato, rellenarCartilla, platoAbierto } from './cartilla.js';
import { iniciarTema } from './tema.js';

pintarLogotipos();

// Al cambiar de idioma hay que repintar lo que armó el JavaScript: la carta, la barra
// y, si está abierta, la cartilla del plato
iniciarIdioma(() => {
  pintarCarta(textoBuscado());
  const abierto = platoAbierto();
  if (abierto) rellenarCartilla(abierto);
});

iniciarBuscador(texto => pintarCarta(texto));
conectarBarra();
iniciarCartilla();
iniciarTema();

pintarCarta('');
document.documentElement.classList.add('ready');

/* ---------- Enlaces directos ---------- */
// A un plato: …/#plato-lomo-saltado
const plato = location.hash.match(/^#plato-(.+)$/);
if (plato && porId.has(plato[1]) && porId.get(plato[1]).des) setTimeout(() => abrirPlato(plato[1]), 400);
// A una categoría: …/#cat-mar, …/#cat-fusion (por ejemplo desde los botones de la landing).
// Las secciones se dibujan con JS, así que el salto nativo del ancla no las encuentra: se hace aquí
const cat = location.hash.match(/^#cat-(.+)$/);
if (cat) requestAnimationFrame(() => irACategoria(cat[1], false));

# Cómo editar la carta digital de Pachanka

Puedes cambiar precios, platos, fotos y textos desde la página de GitHub, sin instalar
nada. Cada cambio aparece en la web en uno o dos minutos.

## Antes de empezar

- **Necesitas una cuenta de GitHub con permiso de edición** en el repositorio
  `creative-programming-partners/pachanka-carta-digital`. Si al abrir un archivo no ves el
  ícono del lápiz, pide acceso a quien administra el repositorio.
- **Todo se edita desde github.com.** Abres el archivo, tocas el lápiz (*Edit this file*),
  cambias el texto y tocas **Commit changes…** y luego **Commit changes** en la ventana
  que aparece.
- **Lo que guardas se publica.** No hay un paso de revisión.
- **En los archivos `.js`** cambia solo lo que está entre comillas. No borres comillas,
  comas ni llaves `{ }`. Para un apóstrofo usa la comilla curva `’` (por ejemplo
  `l’heure`), no la recta `'`.

## Cambiar un precio

1. Abre `contenido/carta.js`.
2. Busca el plato con Ctrl+F (en Mac, Cmd+F), por ejemplo `Lomo saltado`.
3. Cambia el número que va después de `p:`. Por ejemplo, de `p: 39,` a `p: 42,`. Si lleva
   decimales, usa punto: `p: 3.5,`.
4. Guarda con **Commit changes**.

> La landing (la web principal) tiene su propia copia de la carta. Para que las dos
> muestren el mismo precio, cambia también el plato en el repositorio
> `pachanka-landing-v3`, archivo `contenido/carta.js`.

## Cambiar el nombre o la descripción de un plato

1. Abre `contenido/carta.js` y busca el plato.
2. Cambia el texto que quieras:
   - `es`, `en`, `fr`: el nombre en español, inglés y francés
   - `des`, `den`, `dfr`: la descripción en español, inglés y francés
3. Guarda.

## Agregar o quitar un plato

**Para agregar uno**, copia un plato parecido de la misma categoría en
`contenido/carta.js`, pégalo debajo y cambia sus datos:

```js
{ id: 'causa-de-pulpo', es: 'Causa de pulpo', en: 'Octopus causa', fr: 'Causa au poulpe', p: 32,
  des: 'Causa de papa amarilla con pulpo al olivo.',
  den: 'Yellow potato causa with octopus in olive sauce.',
  dfr: 'Causa de pomme de terre jaune au poulpe, sauce aux olives.' },
```

- El `id` es el nombre interno: en minúsculas, con guiones y sin tildes ni ñ. No puede
  repetirse, y es el nombre que tendrá que tener su foto.
- Cada plato termina en `},` y el último de la lista puede ir sin coma.
- **Un plato con descripción** se ve como ficha con foto y abre su cartilla al tocarlo.
  **Uno sin descripción** (guarniciones, bebidas) se ve como una línea de lista: déjalo
  con `des: '', den: '', dfr: ''`.

**Para quitar uno**, borra el bloque completo, desde `{ id:` hasta su `},`.

## Subir la foto de un plato

1. Prepara el archivo: `.jpg` **vertical**, proporción 3:4 (por ejemplo 800 × 1067 px),
   alrededor de 150 KB.
2. Ponle de nombre el `id` del plato, tal cual: `lomo-saltado.jpg`.
3. En GitHub entra a la carpeta `assets/platos/` y usa **Add file → Upload files**.
4. Guarda con **Commit changes**.

No hay que tocar nada más: la foto aparece sola en la ficha y en la cartilla. Mientras no
esté, el plato muestra el marcador con la "P" y "Foto próximamente".

La lista de las fotos que faltan está en `assets/platos/README.md`.

## Cambiar un texto de la página

- **En español:** está en `index.html` (el título de la portada, la frase de abajo, el
  pie). Busca el texto con Ctrl+F y cámbialo.
- **En inglés y francés:** están en `contenido/textos-en.js` y `contenido/textos-fr.js`.
  Cada línea es `'clave': 'texto',` — cambia solo el texto de la derecha, nunca la clave
  de la izquierda, que es la que conecta el texto con su lugar en la página.
- Si a un idioma le falta un texto, la página muestra el español.

## Lo que mejor no tocar

Los archivos de `css/` y de `js/` son el diseño y el funcionamiento. Si hay que cambiar
algo ahí, mejor avisar a quien lleva la web. Lo que sí se edita seguido vive todo en
`contenido/` y en `assets/platos/`.

## Ver la carta antes de publicar

Si tienes el proyecto descargado en Windows, doble clic en **`ver-en-local.cmd`**: abre la
carta en tu computador, con tus cambios, sin subir nada.

## 🔗 Relacionado

- `README.md` — qué es el proyecto
- `docs/ESTRUCTURA.md` — dónde está cada cosa (para quien programa)

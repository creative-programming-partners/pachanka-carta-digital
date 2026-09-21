/* Logotipo de Pachanka: las ocho letras con su color, su giro y su altura.
   Mismo archivo que en la landing para que las dos webs escriban el nombre igual. */
(function () {
  var L = [['P','var(--ochre)',-4,'0'],['a','var(--sage)',3,'.02em'],['c','var(--blush)',-3,'0'],['h','var(--coral)',4,'-.02em'],
           ['a','var(--butter)',-2,'.03em'],['n','var(--teal)',3,'0',1],['k','var(--brick)',-4,'-.02em'],['a','var(--sand)',2,'.02em']];
  var SPARK = '<svg class="spark" viewBox="0 0 40 26" aria-hidden="true"><path d="M8 22 3 11M20 20V4M32 22l5-11" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/></svg>';

  window.PK_WM = {
    build: function (el) {
      el.innerHTML = L.map(function (x, i) {
        return '<span style="--c:' + x[1] + ';--r:' + x[2] + 'deg;--y:' + x[3] + ';--i:' + i + '">' + x[0] + (x[4] ? SPARK : '') + '</span>';
      }).join('');
    }
  };
})();

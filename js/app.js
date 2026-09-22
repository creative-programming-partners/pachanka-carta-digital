/* Carta digital de Pachanka.
   - Pinta la carta desde js/menu-data.js (el mismo archivo que usa la landing)
   - Español / inglés, con la preferencia guardada en el navegador
   - Al tocar un plato se sobrepone su cartilla: el fondo se difumina y la foto entra dando una vuelta
   Sin dependencias: todo el movimiento es CSS sobre transform y opacity. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const money = p => 'S/ ' + (Number.isInteger(p) ? p : p.toFixed(2));
  const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

  let lang = 'es';
  try { const s = localStorage.getItem('pk-lang'); if (s === 'es' || s === 'en') lang = s; } catch (e) {}
  const t = () => PK_I18N.JS[lang];
  const nameOf = d => d[lang] || d.es;
  const descOf = d => (lang === 'en' ? d.den : d.des) || '';

  $$('[data-wm]').forEach(el => PK_WM.build(el));

  /* ---------- Índice plano de los platos que abren cartilla ---------- */
  // Un plato abre cartilla si tiene descripción: guarniciones y bebidas van como lista simple.
  const catOf = new Map();       // id de plato -> categoría
  const openable = [];           // orden de navegación con las flechas
  const byId = new Map();
  PK_MENU.forEach(cat => cat.groups.forEach(g => g.items.forEach(d => {
    byId.set(d.id, d);
    catOf.set(d.id, cat);
    if (d.des) openable.push(d.id);
  })));

  /* ---------- Carta ---------- */
  const cartaEl = $('#carta'), tabsEl = $('#tabs'), emptyEl = $('#empty');

  function dishCard(d) {
    const n = esc(nameOf(d));
    return `<button class="dish rv" type="button" data-dish="${d.id}" aria-label="${esc(t().see)}: ${n}">
      <span class="dish-thumb" data-thumb="${d.id}"><span class="ph-mark" aria-hidden="true">P</span>${thumbImg(d)}</span>
      <span class="dish-main">
        <span class="dish-head"><span class="dish-name">${n}</span><span class="dish-price">${money(d.p)}</span></span>
        <span class="dish-desc">${esc(descOf(d))}</span>
        <span class="dish-more">${esc(t().see)}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg></span>
      </span>
    </button>`;
  }

  function row(d) {
    return `<li class="row"><span class="row-name">${esc(nameOf(d))}</span><span class="row-dots"></span><span class="row-price">${money(d.p)}</span></li>`;
  }

  function render(filter) {
    const q = norm(filter || '');
    let shown = 0;
    const visible = [];
    cartaEl.innerHTML = PK_MENU.map(cat => {
      const groups = cat.groups.map(g => {
        const items = g.items.filter(d => !q || norm(nameOf(d) + ' ' + descOf(d)).includes(q));
        if (!items.length) return '';
        shown += items.length;
        const title = g[lang] ? `<h3 class="grp">${esc(g[lang])}</h3>` : '';
        const cards = items.some(d => d.des);
        return title + (cards
          ? `<div class="dishes">${items.map(dishCard).join('')}</div>`
          : `<ul class="rows">${items.map(row).join('')}</ul>`);
      }).join('');
      if (!groups) return '';
      visible.push(cat);
      return `<section class="cat" id="cat-${cat.id}" data-cat="${cat.id}">
        <header class="cat-head"><h2 class="brush">${esc(cat[lang])}</h2></header>
        ${groups}
      </section>`;
    }).join('');

    emptyEl.hidden = shown > 0;
    renderTabs(visible);
    revealAll();
    loadThumbs();
  }

  // La barra solo lista las categorías que se están viendo (al buscar, las que tienen resultados)
  function renderTabs(cats) {
    tabsEl.innerHTML = (cats || PK_MENU).map((c, i) =>
      `<a class="tab${i ? '' : ' is-on'}" href="#cat-${c.id}" data-cat="${c.id}">${esc(c[lang])}</a>`).join('');
  }

  /* ---------- Fotos: si aún no existe el archivo, queda el marcador ---------- */
  // Cada foto va en assets/platos/<id de plato>.jpg — al subirla aparece sola.
  const missing = new Set();
  // La imagen va dentro de la ficha para que el navegador la cargue al entrar en pantalla
  const thumbImg = d => missing.has(d.id) ? ''
    : `<img src="assets/platos/${d.id}.jpg" alt="" loading="lazy" decoding="async">`;
  function loadThumbs() {
    $$('.dish-thumb img').forEach(img => {
      const box = img.parentElement, id = box.dataset.thumb;
      const ok = () => box.classList.add('has-photo');
      const no = () => { missing.add(id); img.remove(); };
      if (img.complete) return img.naturalWidth ? ok() : no();
      img.addEventListener('load', ok, { once: true });
      img.addEventListener('error', no, { once: true });
    });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -6% 0px', threshold: .05 });

  function revealAll() {
    $$('.dishes').forEach(list => $$('.rv', list).forEach((el, i) => el.style.setProperty('--i', Math.min(i, 8))));
    $$('.rv').forEach(el => reduce ? el.classList.add('is-in') : io.observe(el));
  }

  /* ---------- Categoría activa en la barra ---------- */
  let spy = null;
  function startSpy() {
    if (spy) spy.disconnect();
    spy = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.dataset.cat;
        $$('.tab', tabsEl).forEach(a => a.classList.toggle('is-on', a.dataset.cat === id));
        const on = $('.tab.is-on', tabsEl);
        if (on) tabsEl.scrollTo({ left: Math.max(0, on.offsetLeft - 20), behavior: reduce ? 'auto' : 'smooth' });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('.cat').forEach(s => spy.observe(s));
  }

  tabsEl.addEventListener('click', e => {
    const a = e.target.closest('.tab');
    if (!a) return;
    e.preventDefault();
    const sec = $('#cat-' + a.dataset.cat);
    if (!sec) return;
    const top = sec.getBoundingClientRect().top + scrollY - ($('#hdr').offsetHeight + 12);
    scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---------- Buscador ---------- */
  const q = $('#q'), qClear = $('#qClear');
  let tId;
  q.addEventListener('input', () => {
    qClear.hidden = !q.value;
    clearTimeout(tId);
    tId = setTimeout(() => { render(q.value); startSpy(); }, 120);
  });
  qClear.addEventListener('click', () => { q.value = ''; qClear.hidden = true; render(''); startSpy(); q.focus(); });

  /* ---------- Cartilla del plato ---------- */
  const sheet = $('#sheet'), flip = $('#flip'), fig = $('#sheetFig'), sImg = $('#sheetImg');
  let current = null, lastFocus = null;

  function lock(on) {
    document.body.style.overflow = on ? 'hidden' : '';
    document.body.style.touchAction = on ? 'none' : '';
  }

  function fill(id) {
    const d = byId.get(id), cat = catOf.get(id);
    if (!d) return;
    current = id;
    $('#sheetCat').textContent = cat ? cat[lang] : '';
    $('#sheetName').textContent = nameOf(d);
    $('#sheetDesc').textContent = descOf(d);
    $('#sheetPrice').textContent = money(d.p);
    const i = openable.indexOf(id);
    $('#sheetCount').textContent = (i + 1) + ' ' + t().of + ' ' + openable.length;

    // Foto grande: si no existe el archivo, la cartilla muestra el marcador
    fig.classList.remove('has-photo');
    sImg.removeAttribute('src');
    sImg.alt = '';
    if (!missing.has(id)) {
      sImg.alt = t().photoOf + ' ' + nameOf(d);
      sImg.onload = () => fig.classList.add('has-photo');
      sImg.onerror = () => { missing.add(id); fig.classList.remove('has-photo'); };
      sImg.src = 'assets/platos/' + id + '.jpg';
    }
    try { history.replaceState(null, '', '#plato-' + id); } catch (e) {}
  }

  function spin() {
    if (reduce) return;
    flip.classList.remove('spin');
    void flip.offsetWidth;   // reinicia la animación
    flip.classList.add('spin');
  }

  function open(id, from) {
    lastFocus = from || document.activeElement;
    fill(id);
    sheet.hidden = false;
    void sheet.offsetWidth;
    sheet.classList.add('open');
    spin();
    lock(true);
    $('#sheetClose').focus({ preventScroll: true });
  }

  function close() {
    if (sheet.hidden) return;
    sheet.classList.remove('open');
    lock(false);
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    const done = () => { sheet.hidden = true; };
    reduce ? done() : setTimeout(done, 320);
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
    current = null;
  }

  function step(n) {
    const i = openable.indexOf(current);
    if (i < 0) return;
    fill(openable[(i + n + openable.length) % openable.length]);
    spin();
  }

  cartaEl.addEventListener('click', e => {
    const b = e.target.closest('.dish');
    if (b) open(b.dataset.dish, b);
  });
  $('#sheetClose').addEventListener('click', close);
  $('#sheetBg').addEventListener('click', close);
  $('#prevDish').addEventListener('click', () => step(-1));
  $('#nextDish').addEventListener('click', () => step(1));
  addEventListener('keydown', e => {
    if (sheet.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') step(1);
    else if (e.key === 'ArrowLeft') step(-1);
  });
  // Deslizar en el móvil para pasar de plato
  let x0 = null;
  sheet.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  sheet.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 60) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  /* ---------- Idioma ---------- */
  function setLang(next) {
    lang = next;
    try { localStorage.setItem('pk-lang', lang); } catch (e) {}
    PK_I18N.apply(lang);
    render(q.value);
    startSpy();
    if (current) fill(current);
  }
  $$('.js-lang').forEach(b => b.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es')));

  /* ---------- Arranque ---------- */
  PK_I18N.apply(lang);
  render('');
  startSpy();
  document.documentElement.classList.add('ready');

  const h = location.hash.match(/^#plato-(.+)$/);
  if (h && byId.has(h[1]) && byId.get(h[1]).des) setTimeout(() => open(h[1]), 400);
})();

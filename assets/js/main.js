/* Rescued Treasures Cat Café homepage interactions.
   Content stays visible if this script fails: hidden reveal states
   only apply once the .anim class is added here. */
(function () {
  var mm = function (q) { return window.matchMedia ? window.matchMedia(q).matches : false; };
  var reduce = mm('(prefers-reduced-motion: reduce)');
  var root = document.getElementById('pv');

  /* Scroll reveals, triggered once per section */
  if (!reduce && 'IntersectionObserver' in window) {
    root.classList.add('anim');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-sec]').forEach(function (el) { io.observe(el); });
  }

  /* Hero pointer parallax: desktop pointers only, a few pixels */
  var hero = document.querySelector('[data-hero]');
  if (hero && !reduce && mm('(hover: hover) and (pointer: fine)')) {
    var raf = null;
    hero.addEventListener('pointermove', function (ev) {
      if (raf) return;
      raf = requestAnimationFrame(function () {
        raf = null;
        var r = hero.getBoundingClientRect();
        hero.style.setProperty('--px', ((ev.clientX - r.left) / r.width - 0.5).toFixed(3));
        hero.style.setProperty('--py', ((ev.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', function () {
      hero.style.setProperty('--px', '0');
      hero.style.setProperty('--py', '0');
    });
  }

  /* Mobile menu */
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.classList.toggle('open', open);
  }
  btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { setMenu(false); btn.focus(); }
  });

  /* Gallery arrows */
  var gal = document.querySelector('[data-gal]');
  function scrollGal(dir) {
    gal.scrollBy({ left: dir * Math.min(420, gal.clientWidth * 0.8), behavior: reduce ? 'auto' : 'smooth' });
  }
  document.querySelector('[data-gal-prev]').addEventListener('click', function () { scrollGal(-1); });
  document.querySelector('[data-gal-next]').addEventListener('click', function () { scrollGal(1); });

  /* Ways to help: the cat reacts to the hovered or focused action */
  var notes = { adopt: 'Forever home, please?', foster: 'Just for a little while?', volunteer: 'Spare an afternoon?', donate: 'Vet bills add up!' };
  var note = document.getElementById('helpNote');
  var shape = document.getElementById('hShape');
  var acts = document.querySelectorAll('[data-help]');
  function setHelp(k) {
    acts.forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-help') === k); });
    note.textContent = notes[k];
    shape.className = 'h-shape shape-' + k;
  }
  acts.forEach(function (a) {
    var k = a.getAttribute('data-help');
    a.addEventListener('mouseenter', function () { setHelp(k); });
    a.addEventListener('focus', function () { setHelp(k); });
  });
})();

/* Adoption page. The cards are CONCEPT EXAMPLES with stock photos,
   not real PALNV cats. Replace with the live Shelterluv feed before launch. */
(function () {
  var all = [
    { b: 'kitten', src: 'ex-1529778873920.webp', alt: 'Stock photo: a tabby kitten sitting on a speckled floor', rot: '-1.5deg', rad: '999px 999px 28px 28px' },
    { b: 'adult', src: 'ex-1518791841217.webp', alt: 'Stock photo: an adult tabby cat lying on a sofa', rot: '1.2deg', rad: '28px' },
    { b: 'kitten', src: 'ex-1561948955.webp', alt: 'Stock photo: a white kitten with wide eyes', rot: '-1deg', rad: '28px 28px 90px 28px' },
    { b: 'junior', src: 'ex-1495360010541.webp', alt: 'Stock photo: a young tabby cat sitting on stairs', rot: '1.6deg', rad: '28px' },
    { b: 'adult', src: 'ex-1519052537078.webp', alt: 'Stock photo: a ginger cat dozing on a wooden floor', rot: '-1.4deg', rad: '28px' },
    { b: 'kitten', src: 'ex-1574144611937.webp', alt: 'Stock photo: a tabby kitten mid-yawn', rot: '1deg', rad: '999px 999px 28px 28px' },
    { b: 'adult', src: 'ex-1513245543132.webp', alt: 'Stock photo: a fluffy flat-faced cat sitting by a window', rot: '-1.2deg', rad: '28px 90px 28px 28px' },
    { b: 'kitten', src: 'ex-1592194996308.webp', alt: 'Stock photo: a kitten reaching up with one paw', rot: '1.4deg', rad: '28px' }
  ];
  var bands = { kitten: 'Kitten', junior: 'Junior', adult: 'Adult' };
  var defs = [{ k: 'all', label: 'All', sub: '' }, { k: 'kitten', label: 'Kittens', sub: '3 to 7 mo' }, { k: 'junior', label: 'Juniors', sub: '7 mo to 2 yrs' }, { k: 'adult', label: 'Adults', sub: '2 yrs +' }];
  var band = 'all';
  var filters = document.getElementById('filters'), cards = document.getElementById('cards'), count = document.getElementById('count');
  defs.forEach(function (d) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'chip'; b.dataset.k = d.k;
    b.innerHTML = d.label + (d.sub ? ' <span class="sub">' + d.sub + '</span>' : '');
    b.addEventListener('click', function () { band = d.k; render(); });
    filters.appendChild(b);
  });
  function render() {
    Array.prototype.forEach.call(filters.children, function (b) {
      var sel = b.dataset.k === band; b.classList.toggle('sel', sel); b.setAttribute('aria-pressed', sel ? 'true' : 'false');
    });
    var list = all.filter(function (c) { return band === 'all' || c.b === band; });
    cards.innerHTML = list.map(function (c) {
      return '<article class="card" style="--r:' + c.rot + ';--rad:' + c.rad + '"><div class="ph"><img src="assets/img/' + c.src + '" alt="' + c.alt + '" loading="lazy"><span class="flag">Concept example</span></div><h3>[Cat name]</h3><p>' + bands[c.b] + ' · details from live list</p></article>';
    }).join('');
    count.textContent = 'Showing ' + list.length + ' concept example' + (list.length === 1 ? '' : 's');
  }
  render();
})();

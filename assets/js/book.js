/* Booking prototype. Nothing is submitted or reserved here:
   the only exit is PALNV's official booking system (Acuity). */
(function () {
  var DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var DOWL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var st = { day: null, time: null, guests: 2, agreed: false };
  var days = [];
  var base = new Date(); base.setHours(12, 0, 0, 0);
  for (var i = 0; i < 14; i++) {
    var d = new Date(base.getTime() + i * 86400000), w = d.getDay();
    days.push({ w: w, dow: DOW[w], num: d.getDate(), mon: MON[d.getMonth()], full: DOWL[w] + ' ' + d.getDate() + ' ' + MONL[d.getMonth()], closed: w === 1 || w === 2 });
  }
  function hoursFor(w) {
    if (w === 3) return [12, 13, 14, 15, 16];          // Wed 12–5 PM
    if (w === 0 || w >= 4) return [12, 13, 14, 15, 16, 17]; // Thu–Sun 12–6 PM
    return [];
  }
  function fmt(h) { var x = h > 12 ? h - 12 : h; return x + (h >= 12 ? ' PM' : ' AM'); }
  var $ = function (id) { return document.getElementById(id); };
  var daysEl = $('days'), timesEl = $('times');

  days.forEach(function (d, idx) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'day';
    b.setAttribute('aria-pressed', 'false');
    b.setAttribute('aria-label', d.full + (d.closed ? ', closed' : ''));
    b.disabled = d.closed;
    b.innerHTML = '<span class="dw">' + d.dow + '</span><span class="dn">' + d.num + '</span><span class="dm">' + (d.closed ? 'Closed' : d.mon) + '</span>';
    b.addEventListener('click', function () {
      var hrs = hoursFor(d.w);
      if (st.time !== null && hrs.indexOf(st.time) < 0) st.time = null;
      st.day = idx; render();
    });
    daysEl.appendChild(b);
  });

  $('dec').addEventListener('click', function () { if (st.guests > 1) { st.guests--; render(); } });
  $('inc').addEventListener('click', function () { if (st.guests < 15) { st.guests++; render(); } });
  $('agree').addEventListener('change', function (e) { st.agreed = e.target.checked; render(); });
  document.querySelector('form').addEventListener('submit', function (e) { e.preventDefault(); });

  function render() {
    Array.prototype.forEach.call(daysEl.children, function (b, idx) {
      var sel = st.day === idx;
      b.classList.toggle('sel', sel); b.setAttribute('aria-pressed', sel ? 'true' : 'false');
    });
    var dayObj = st.day !== null ? days[st.day] : null;
    timesEl.hidden = !dayObj; $('noDay').hidden = !!dayObj;
    timesEl.innerHTML = '';
    if (dayObj) hoursFor(dayObj.w).forEach(function (h) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'time' + (st.time === h ? ' sel' : '');
      b.setAttribute('aria-pressed', st.time === h ? 'true' : 'false');
      b.textContent = fmt(h);
      b.addEventListener('click', function () { st.time = h; render(); b = null; timesEl.querySelector('[aria-pressed="true"]').focus(); });
      timesEl.appendChild(b);
    });
    var g = st.guests + (st.guests === 1 ? ' guest' : ' guests');
    $('guests').textContent = st.guests; $('guests').setAttribute('aria-label', g);
    $('dec').disabled = st.guests <= 1; $('inc').disabled = st.guests >= 15;
    $('sumDay').textContent = dayObj ? dayObj.full : 'Not chosen yet';
    $('sumDay').className = dayObj ? '' : 'todo';
    $('sumTime').textContent = st.time !== null ? fmt(st.time) + ' to ' + fmt(st.time + 1) + ' (1 hour)' : 'Not chosen yet';
    $('sumTime').className = st.time !== null ? '' : 'todo';
    $('sumGuests').textContent = g;
    var ready = dayObj && st.time !== null && st.agreed;
    $('goWrap').hidden = !ready; $('goOff').hidden = !!ready;
    $('status').textContent = !dayObj ? 'Choose a day to continue.' : st.time === null ? 'Choose a start time to continue.' : !st.agreed ? 'Tick the house rules box to continue.' : 'Ready. You will confirm this on PALNV booking.';
  }
  render();
})();

/* موقع هدية — منطق الصفحة: لغتان، ظهور عند التمرير، خلفيات متبدلة، حركات خفيفة. */
window.startSite = function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = window.matchMedia('(max-width: 480px)').matches;
  var KEY = 'gift2-lang';

  var lang = 'ar';
  try { lang = localStorage.getItem(KEY) || 'ar'; } catch (e) {}
  if (!window.SITE[lang]) lang = 'ar';

  // ---------------------------------------------------------------- one-time art
  var heroSlot = $('#heroGirl .girl-slot');
  heroSlot.innerHTML = ART.girlSVG({ prop: 'bouquet', label: '' }, 'hero-girl');
  var irises = $$('.iris', heroSlot);

  var sceneHost = $('#scenes');
  var SCENE_COUNT = 4;
  for (var i = 0; i < SCENE_COUNT; i++) {
    var fig = document.createElement('figure');
    fig.className = 'scene rv';
    fig.style.setProperty('--i', i);
    fig.innerHTML = ART.scene(i) + '<figcaption></figcaption>';
    sceneHost.appendChild(fig);
  }

  // ---------------------------------------------------------------- helpers
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }

  function highlight(src) {
    var re = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\b(const|let|var|while|if|else|return|function|true|false)\b|\b(\d+)\b|([{}[\]();,.=+<>])/gm;
    var out = '', last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index));
      var cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'k' : m[4] ? 'n' : 'p';
      out += '<span class="' + cls + '">' + esc(m[0]) + '</span>';
      last = re.lastIndex;
    }
    return out + esc(src.slice(last));
  }

  function buildCode(src) {
    var box = $('#codeBox');
    var tmp = document.createElement('div');
    tmp.innerHTML = highlight(src);
    var t = 300, walker = document.createTreeWalker(tmp, NodeFilter.SHOW_TEXT), nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var frag = document.createDocumentFragment();
      node.nodeValue.split('').forEach(function (c) {
        var s = document.createElement('span');
        s.className = 'ch';
        s.style.setProperty('--t', reduce ? 0 : t);
        s.textContent = c;
        t += c === '\n' ? 110 : 11;
        frag.appendChild(s);
      });
      node.parentNode.replaceChild(frag, node);
    });
    box.innerHTML = '';
    while (tmp.firstChild) box.appendChild(tmp.firstChild);
    var caret = document.createElement('span');
    caret.className = 'caret';
    box.appendChild(caret);
  }

  // ---------------------------------------------------------------- render (per language)
  function render(l) {
    var T = window.SITE[l];
    var root = document.documentElement;
    root.lang = T.lang;
    root.dir = l === 'ar' ? 'rtl' : 'ltr';
    document.title = T.pageTitle;

    setText('name', T.name); setText('nameSub', T.nameSub); setText('tagline', T.tagline);
    setText('tapHint', T.tapHint); setText('scrollTxt', T.scroll);
    setText('aboutTitle', T.aboutTitle); setText('bio', T.bio); setText('storyTitle', T.storyTitle);
    setText('quranTitle', T.quranTitle); setText('quranText', T.quranText); setText('quranSoon', T.quranSoon); setText('qLabel', T.quranLabel);
    setText('lovesTitle', T.lovesTitle); setText('notsTitle', T.notsTitle); setText('favesTitle', T.favesTitle);
    setText('galleryTitle', T.galleryTitle); setText('galleryHint', T.galleryHint);
    setText('codeTitle', T.codeTitle); setText('codeNote', T.codeNote);
    setText('footMsg', T.footerMsg); setText('footSign', T.footerSign);

    var btn = $('#lang');
    btn.textContent = T.toggle;
    btn.setAttribute('aria-label', T.toggleLabel);
    $('#heroGirl').setAttribute('aria-label', T.name);

    $('#chips').innerHTML = T.chips.map(function (c, k) { return '<li class="rv" style="--i:' + k + '">' + esc(c) + '</li>'; }).join('');
    $('#story').innerHTML = T.story.map(function (s, k) { return '<li class="tl rv" style="--i:' + (k % 3) + '"><b>' + esc(s.y) + '</b><p>' + esc(s.t) + '</p></li>'; }).join('');
    $('#lovesList').innerHTML = T.loves.map(function (x, k) { return '<article class="lv rv" style="--i:' + (k % 3) + '"><div class="ic">' + x.e + '</div><b>' + esc(x.t) + '</b><p>' + esc(x.d) + '</p></article>'; }).join('');

    var hasNots = T.nots && T.nots.length;
    $('#nots').hidden = !hasNots;
    $('#notsList').innerHTML = hasNots ? T.nots.map(function (x, k) { return '<li class="rv" style="--i:' + k + '"><span>🚫</span><span class="txt">' + esc(x) + '</span></li>'; }).join('') : '';

    $('#favesList').innerHTML = T.faves.map(function (f, k) {
      var sw = f.colors ? '<div class="sw">' + f.colors.map(function (c) { return '<i style="background:' + c + '"></i>'; }).join('') + '</div>' : '';
      return '<div class="fv rv" style="--i:' + (k % 3) + '"><small>' + esc(f.k) + '</small>' + sw + '<strong>' + esc(f.v || '') + '</strong></div>';
    }).join('');

    $$('#scenes figcaption').forEach(function (c, k) { c.textContent = T.scenes[k] || ''; });
    buildCode(T.code);
    watchNew();
  }

  // ---------------------------------------------------------------- reveal + section tracking
  var io = null;
  var winEl = $('.win');
  if ('IntersectionObserver' in window && !reduce) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -6% 0px' });
  }
  function watchNew() {
    $$('.rv:not(.in), .title:not(.in)').forEach(function (el) {
      if (io) io.observe(el); else el.classList.add('in');
    });
  }
  // titles use the same observer; give them the "in" hook too
  $$('.title').forEach(function (t) { t.classList.add('rv'); });

  var secIO = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) document.body.setAttribute('data-s', e.target.id);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('[data-sec]').forEach(function (s) { secIO.observe(s); });

  // pause heavy SVG/CSS animations whenever their block is off-screen
  if ('IntersectionObserver' in window) {
    var visIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('is-off', !e.isIntersecting); });
    }, { rootMargin: '60px' });
    visIO.observe($('.hero'));
    $$('.scene').forEach(function (s) { visIO.observe(s); });
  }

  // quran ring: animate when scrolled into view
  var qDone = false;
  function fmt(v) { return lang === 'ar' ? Number(v).toLocaleString('ar-EG', { useGrouping: false }) : String(v); }
  var C = 2 * Math.PI * 68;
  function runRing() {
    if (qDone) return; qDone = true;
    var pct = window.SITE.quranPct || 0, arc = $('#qArc'), num = $('#qNum');
    arc.style.strokeDashoffset = (C * (1 - pct / 100)).toFixed(1);
    if (reduce) { num.textContent = fmt(pct); return; }
    var t0 = performance.now(), dur = 2300;
    (function step(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      num.textContent = fmt(Math.round(pct * e));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  var qIO = new IntersectionObserver(function (en) { if (en[0].isIntersecting) { runRing(); qIO.disconnect(); } }, { threshold: 0.4 });
  qIO.observe($('.ringbox'));

  // code window: start typing when visible (the .in class is toggled by the reveal observer)

  // ---------------------------------------------------------------- stars & petals
  (function stars() {
    var mk = function () {
      var out = [], cols = ['#fff', '#fff', '#c4f5ff', '#ffd9cc'];
      for (var i = 0; i < (small ? 26 : 44); i++) {
        out.push((Math.random() * 100).toFixed(1) + 'vw ' + (Math.random() * 100).toFixed(1) + 'vh 0 ' + (Math.random() < .25 ? 1 : 0) + 'px ' + cols[(Math.random() * cols.length) | 0]);
      }
      return out.join(',');
    };
    var el = $('#stars');
    el.style.setProperty('--sh1', mk());
    el.style.setProperty('--sh2', mk());
  })();

  (function petals() {
    if (reduce) return;
    var host = $('#petals');
    var svg = function (c) { return 'url("data:image/svg+xml,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path d='M10 1C15 5 17 12 10 19C3 12 5 5 10 1Z' fill='" + c + "'/></svg>") + '")'; };
    var imgs = [svg('#ffc2ad'), svg('#c4f5ff'), svg('#ffe9e1')];
    var n = small ? 9 : 14;
    for (var i = 0; i < n; i++) {
      var p = document.createElement('i');
      p.className = 'petal';
      var d = 12 + Math.random() * 10;
      p.style.setProperty('--x', (Math.random() * 100).toFixed(1) + 'vw');
      p.style.setProperty('--s', (13 + Math.random() * 14).toFixed(0) + 'px');
      p.style.setProperty('--d', d.toFixed(1) + 's');
      p.style.setProperty('--dl', '-' + (Math.random() * d).toFixed(1) + 's');
      p.style.setProperty('--dx', ((Math.random() - .5) * 220).toFixed(0) + 'px');
      p.style.setProperty('--r', (360 + Math.random() * 540).toFixed(0) + 'deg');
      p.style.setProperty('--img', imgs[i % imgs.length]);
      host.appendChild(p);
    }
  })();

  // ---------------------------------------------------------------- interactions
  var raf = 0, pending = null;
  function lookAt(x, y) {
    var r = $('#heroGirl').getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    var cx = r.left + r.width / 2, cy = r.top + r.height * 0.4;
    var dx = Math.max(-1, Math.min(1, (x - cx) / (innerWidth * 0.5)));
    var dy = Math.max(-1, Math.min(1, (y - cy) / (innerHeight * 0.5)));
    irises.forEach(function (it) { it.style.transform = 'translate(' + (dx * 8).toFixed(1) + 'px,' + (dy * 6).toFixed(1) + 'px)'; });
  }
  window.addEventListener('pointermove', function (e) {
    pending = e;
    if (!raf) raf = requestAnimationFrame(function () { raf = 0; lookAt(pending.clientX, pending.clientY); });
  }, { passive: true });

  var live = 0;
  function burst(x, y, set) {
    if (reduce) return;
    var n = 10;
    for (var i = 0; i < n && live < 44; i++) {
      var b = document.createElement('i');
      b.className = 'burst';
      b.textContent = set[(Math.random() * set.length) | 0];
      var a = Math.random() * Math.PI * 2, dist = 60 + Math.random() * 110;
      b.style.left = x + 'px'; b.style.top = y + 'px';
      b.style.setProperty('--dx', (Math.cos(a) * dist).toFixed(0) + 'px');
      b.style.setProperty('--dy', (Math.sin(a) * dist - 40).toFixed(0) + 'px');
      b.style.setProperty('--r', ((Math.random() - .5) * 120).toFixed(0) + 'deg');
      b.style.setProperty('--t', (700 + Math.random() * 500).toFixed(0) + 'ms');
      live++;
      b.addEventListener('animationend', function () { this.remove(); live--; });
      document.body.appendChild(b);
    }
  }
  $('#heroGirl').addEventListener('click', function (e) {
    burst(e.clientX, e.clientY, ['🖤', '✨', '🤍', '⭐', '💛']);
    if (!reduce) {
      var s = $('svg.hero-girl');
      if (s && s.animate) s.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.07) rotate(-2.5deg)' }, { transform: 'scale(1)' }], { duration: 480, easing: 'ease-out' });
    }
  });
  $('#heart').addEventListener('click', function () {
    var r = this.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + r.height / 2, ['🖤', '🤍', '✨', '💛']);
  });

  $('#lang').addEventListener('click', function () {
    var next = lang === 'ar' ? 'en' : 'ar';
    document.body.classList.add('swapping');
    setTimeout(function () {
      lang = next;
      try { localStorage.setItem(KEY, lang); } catch (e) {}
      render(lang);
      window.scrollTo(0, 0);
      requestAnimationFrame(function () { document.body.classList.remove('swapping'); });
    }, 230);
  });

  // ---------------------------------------------------------------- go
  render(lang);
  // typing starts when the code window becomes visible
  if (winEl && io) { /* .in class is added by the reveal observer */ }
};
// plain (local) mode: texts are already loaded. Locked mode: gate.js calls startSite after decrypting.
if (window.SITE) window.startSite();

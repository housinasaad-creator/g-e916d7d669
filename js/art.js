/*
  كل الرسومات مرسومة بالكود (SVG): شخصية أنمي محجبة بالأسود + أربعة مشاهد.
  خفيفة جداً، بلا صور خارجية ولا مشاكل حقوق.
  props: bouquet | sketch | ball | racket | chart   ·   cap: قبعة   ·   steth: سماعة طبيب
*/
(function () {
  var counter = 0;

  function girlInner(n, o) {
    o = o || {};
    var id = function (k) { return k + n; };

    var eye = function (x, y, flip) {
      var s = flip ? ' scale(-1 1)' : '';
      var cid = id('ec' + (flip ? 'r' : 'l'));
      return '' +
        '<g transform="translate(' + x + ' ' + y + ')' + s + '"><g class="eye">' +
          '<clipPath id="' + cid + '"><ellipse rx="27" ry="33"/></clipPath>' +
          '<ellipse rx="27" ry="33" fill="#fff"/>' +
          '<g clip-path="url(#' + cid + ')"><g class="iris">' +
            '<ellipse cx="0" cy="5" rx="23" ry="30" fill="url(#' + id('i') + ')"/>' +
            '<ellipse cx="0" cy="7" rx="11" ry="16" fill="#120a06"/>' +
            '<circle cx="-9" cy="-9" r="8.5" fill="#fff"/>' +
            '<circle cx="10" cy="14" r="4.2" fill="#fff" opacity=".92"/>' +
            '<circle cx="-3" cy="22" r="2.2" fill="#fff" opacity=".75"/>' +
          '</g></g>' +
          '<path d="M-30 -6C-25 -38 25 -40 30 -6" fill="none" stroke="#0e0a12" stroke-width="6.5" stroke-linecap="round"/>' +
          '<path d="M-29 -10L-38 -21" stroke="#0e0a12" stroke-width="4.5" stroke-linecap="round"/>' +
          '<path d="M-24 -26L-30 -36" stroke="#0e0a12" stroke-width="3.5" stroke-linecap="round"/>' +
        '</g></g>';
    };

    var flower = function (x, y, r, c1, c2) {
      var p = '';
      for (var k = 0; k < 5; k++) {
        var a = k * 72 * Math.PI / 180;
        p += '<circle cx="' + (Math.sin(a) * r * .95).toFixed(1) + '" cy="' + (-Math.cos(a) * r * .95).toFixed(1) + '" r="' + (r * .78).toFixed(1) + '" fill="' + c1 + '"/>';
      }
      return '<g transform="translate(' + x + ' ' + y + ')">' + p + '<circle r="' + (r * .55).toFixed(1) + '" fill="' + c2 + '"/></g>';
    };

    var spark = function (x, y, s, d) {
      return '<path class="sp" style="--d:' + d + 's" transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0-14L3.4-3.4 14 0 3.4 3.4 0 14-3.4 3.4-14 0-3.4-3.4Z" fill="#fff"/>';
    };

    // -------- props (drawn behind the hands) --------
    var prop = '';
    if (o.prop === 'bouquet') {
      prop = '<g>' +
        '<path d="M200 524L178 474M200 524L222 474M200 524L200 466" stroke="#3fb985" stroke-width="6" stroke-linecap="round"/>' +
        '<path d="M166 482L234 482L216 534L184 534Z" fill="#fff" opacity=".92"/>' +
        '<path d="M166 482L234 482L229 494L171 494Z" fill="#ffd0c0"/>' +
        flower(176, 462, 14, '#ff9f86', '#ffe08a') + flower(224, 462, 14, '#ffd0c0', '#ffe08a') + flower(200, 446, 16, '#fff', '#ffe08a') +
        '</g>';
    } else if (o.prop === 'sketch') {
      prop = '<g transform="rotate(-7 200 484)">' +
        '<rect x="146" y="436" width="108" height="84" rx="9" fill="#fff"/>' +
        '<rect x="146" y="436" width="15" height="84" rx="7" fill="#e8957f"/>' +
        '<circle cx="222" cy="458" r="9" fill="#ffe08a"/>' +
        '<path d="M161 508Q186 476 208 494T254 480V516H161Z" fill="#6fe3ff"/>' +
        '<path d="M232 506L262 452" stroke="#ffd34d" stroke-width="7" stroke-linecap="round"/>' +
        '<path d="M232 506l-4 11l11-5z" fill="#2a2226"/>' +
        '</g>';
    } else if (o.prop === 'ball') {
      prop = '<g transform="translate(200 476)">' +
        '<circle r="31" fill="#fff" stroke="#14141c" stroke-width="3.5"/>' +
        '<path d="M0-12L11-4 7 10H-7L-11-4Z" fill="#14141c"/>' +
        '<path d="M0-12V-30M11-4L28-10M7 10L18 26M-7 10L-18 26M-11-4L-28-10" stroke="#14141c" stroke-width="3" stroke-linecap="round"/>' +
        '</g>';
    } else if (o.prop === 'racket') {
      prop = '<g>' +
        '<path d="M226 488L284 428" stroke="#14141c" stroke-width="9" stroke-linecap="round"/>' +
        '<g transform="rotate(38 308 392)"><ellipse cx="308" cy="392" rx="35" ry="46" fill="rgba(255,255,255,.16)" stroke="#ffb199" stroke-width="8"/>' +
        '<path d="M308 348V436M283 362V424M333 362V424M274 392H342M280 372H336M280 412H336" stroke="#fff" stroke-opacity=".7" stroke-width="2"/></g>' +
        '<circle cx="152" cy="486" r="13" fill="#d8ff5e"/><path d="M141 480Q152 488 141 496M163 476Q152 486 163 494" fill="none" stroke="#fff" stroke-width="2"/>' +
        '</g>';
    } else if (o.prop === 'chart') {
      prop = '<g transform="rotate(-5 200 484)">' +
        '<rect x="146" y="436" width="108" height="84" rx="9" fill="#eaf6f8"/>' +
        '<rect x="180" y="428" width="40" height="15" rx="6" fill="#8a8a9c"/>' +
        '<rect x="158" y="452" width="50" height="5" rx="2.5" fill="#b7c9ce"/><rect x="158" y="463" width="34" height="5" rx="2.5" fill="#b7c9ce"/>' +
        '<path d="M156 494L176 494L184 474L194 508L204 484L212 494L244 494" fill="none" stroke="#e8564f" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' +
        '</g>';
    }

    // -------- extras --------
    var steth = o.steth ? '' +
      '<path d="M168 318C158 372 242 372 232 318" fill="none" stroke="#1b1b24" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M200 358V382" stroke="#1b1b24" stroke-width="5" stroke-linecap="round"/>' +
      '<circle cx="168" cy="318" r="5.5" fill="#d4d4e0"/><circle cx="232" cy="318" r="5.5" fill="#d4d4e0"/>' +
      '<circle cx="200" cy="394" r="13" fill="#d4d4e0" stroke="#1b1b24" stroke-width="4"/><circle cx="200" cy="394" r="5" fill="#8a8a9c"/>' : '';
    var cap = o.cap ? '' +
      '<path d="M94 94C94 28 306 28 306 94L306 106C252 116 148 116 94 106Z" fill="#3fd0c9"/>' +
      '<path d="M118 76C130 46 170 34 200 34" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M94 100C148 112 252 112 306 100" fill="none" stroke="#2aa9a3" stroke-width="8" stroke-linecap="round"/>' : '';

    return '' +
    '<defs>' +
      '<linearGradient id="' + id('h') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--h1,#4e4e5e)"/><stop offset="1" style="stop-color:var(--h2,#12121a)"/></linearGradient>' +
      '<linearGradient id="' + id('hl') + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--h3,#8d8d9f)"/><stop offset="1" style="stop-color:var(--h1,#4e4e5e)"/></linearGradient>' +
      '<linearGradient id="' + id('d') + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--d1,#44445a)"/><stop offset="1" style="stop-color:var(--d2,#15151f)"/></linearGradient>' +
      '<radialGradient id="' + id('s') + '" cx=".5" cy=".36" r=".78"><stop offset="0" stop-color="#fff4ec"/><stop offset="1" stop-color="#ffd0bb"/></radialGradient>' +
      '<radialGradient id="' + id('i') + '" cx=".5" cy=".28" r=".9"><stop offset="0" stop-color="#4a2a14"/><stop offset=".55" stop-color="#b8642a"/><stop offset="1" stop-color="#ffd27a"/></radialGradient>' +
      '<radialGradient id="' + id('b') + '"><stop offset="0" stop-color="#ff6f9f" stop-opacity=".8"/><stop offset="1" stop-color="#ff6f9f" stop-opacity="0"/></radialGradient>' +
    '</defs>' +

    spark(46, 96, .9, 0) + spark(358, 70, 1.1, .7) + spark(374, 250, .7, 1.3) + spark(30, 290, .8, 1.9) + spark(332, 18, .6, 2.4) +

    // ground shadow + dress (soft wavy hem)
    '<ellipse cx="200" cy="540" rx="138" ry="13" fill="#000" opacity=".42"/>' +
    '<path d="M98 402C72 450 54 496 46 528Q200 552 354 528C346 496 328 450 302 402Z" fill="url(#' + id('d') + ')"/>' +
    '<path d="M122 468Q200 490 278 468L283 484Q200 508 117 484Z" fill="#ffc2ad" opacity=".55"/>' +

    // hijab silhouette (head + drape)
    '<path d="M200 20C116 20 62 86 62 176C62 232 78 262 74 304C70 350 54 384 44 424Q200 460 356 424C346 384 330 350 326 304C322 262 338 232 338 176C338 86 284 20 200 20Z" fill="url(#' + id('h') + ')"/>' +
    '<path d="M92 326C102 368 94 398 80 422" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M308 326C298 368 306 398 320 422" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M138 338C136 378 128 408 114 432" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M262 338C264 378 272 408 286 432" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="4" stroke-linecap="round"/>' +
    '<path d="M150 40C110 62 84 108 80 160" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="6" stroke-linecap="round"/>' +
    steth +

    // arms, props, hands
    '<path d="M94 428C100 468 132 490 170 486" fill="none" stroke="url(#' + id('d') + ')" stroke-width="32" stroke-linecap="round"/>' +
    '<path d="M306 428C300 468 268 490 230 486" fill="none" stroke="url(#' + id('d') + ')" stroke-width="32" stroke-linecap="round"/>' +
    prop +
    '<circle cx="174" cy="486" r="15" fill="url(#' + id('s') + ')"/>' +
    '<circle cx="226" cy="486" r="15" fill="url(#' + id('s') + ')"/>' +

    // face
    '<ellipse cx="200" cy="306" rx="72" ry="14" fill="#000" opacity=".3"/>' +
    '<ellipse cx="200" cy="198" rx="98" ry="102" fill="url(#' + id('s') + ')"/>' +
    '<path fill-rule="evenodd" d="M200 66C132 66 90 116 90 188C90 264 138 316 200 316C262 316 310 264 310 188C310 116 268 66 200 66ZM200 124C150 124 112 150 106 190C112 252 150 298 200 298C250 298 288 252 294 190C288 150 250 124 200 124Z" fill="url(#' + id('hl') + ')"/>' +
    '<path d="M106 190C112 252 150 298 200 298C250 298 288 252 294 190" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="3"/>' +
    '<path d="M116 164Q142 150 172 158" fill="none" stroke="#2a2226" stroke-width="5" stroke-linecap="round"/>' +
    '<path d="M228 158Q258 150 284 164" fill="none" stroke="#2a2226" stroke-width="5" stroke-linecap="round"/>' +
    eye(152, 214, false) + eye(248, 214, true) +
    '<ellipse cx="124" cy="250" rx="21" ry="11" fill="url(#' + id('b') + ')"/>' +
    '<ellipse cx="276" cy="250" rx="21" ry="11" fill="url(#' + id('b') + ')"/>' +
    '<path d="M196 248Q200 252 204 248" fill="none" stroke="#e39a86" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M183 264Q200 281 217 264" fill="none" stroke="#d1446f" stroke-width="4.5" stroke-linecap="round"/>' +
    '<path d="M193 271Q200 277 207 271" fill="#ff8fa9" opacity=".6"/>' +
    (o.cap ? '' : flower(108, 98, 11, '#ffc2ad', '#ffe08a')) +
    (o.steth ? '' : '<circle cx="266" cy="338" r="10" fill="#ffe08a"/><circle cx="266" cy="338" r="5" fill="#fff" opacity=".85"/>') +
    cap;
  }

  function girlSVG(opts, cls) {
    counter++;
    return '<svg class="girl ' + (cls || '') + '" viewBox="0 0 400 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + ((opts && opts.label) || '') + '">' + girlInner(counter, opts) + '</svg>';
  }

  // ---------------------------------------------------------------- scenes
  function scene(kind) {
    counter++;
    var n = counter;
    var girl = function (x, y, s, o) {
      counter++;
      return '<g transform="translate(' + x + ' ' + y + ') scale(' + s + ')">' + girlInner(counter, o) + '</g>';
    };
    var tw = function (x, y, r, d) {
      return '<circle class="tw" style="--d:' + d + 's" cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff"/>';
    };
    var head = function (extra) {
      return '<svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg" class="sc sc' + kind + '" role="img">' + (extra || '');
    };

    // ---- 0: drawing studio (dark)
    if (kind === 0) {
      var splash = '';
      [[34, 66, 14, '#ffb199'], [276, 60, 10, '#6fe3ff'], [262, 150, 7, '#ffe08a'], [44, 150, 8, '#ffffff'], [160, 30, 9, '#ffb199'], [292, 232, 6, '#6fe3ff']].forEach(function (p, i) {
        splash += '<circle class="fl2" style="--d:' + (3 + i * .4) + 's;--dl:-' + i * .7 + 's" cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="' + p[3] + '" opacity=".88"/>';
      });
      return head() +
        '<defs><linearGradient id="sg' + n + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#34344a"/><stop offset="1" stop-color="#14141e"/></linearGradient></defs>' +
        '<rect width="320" height="400" fill="url(#sg' + n + ')"/>' +
        '<path d="M-10 346Q90 310 190 340T330 326V410H-10Z" fill="#2a2a3c"/><path d="M-10 376Q110 350 210 374T330 366V410H-10Z" fill="#171722"/>' +
        '<path d="M236 214L214 392M268 214L290 392M252 214V392" stroke="#7a4d2a" stroke-width="7" stroke-linecap="round"/>' +
        '<rect x="214" y="104" width="76" height="98" rx="5" fill="#fff" stroke="#7a4d2a" stroke-width="5"/>' +
        '<rect x="220" y="110" width="64" height="86" fill="#0e0e16"/><circle cx="262" cy="136" r="9" fill="#ffd9cc"/><path d="M220 196V168Q244 142 284 170V196Z" fill="#2a6d80"/>' +
        splash + girl(52, 38, .56, { prop: 'sketch' }) + '</svg>';
    }

    // ---- 1: football at night
    if (kind === 1) {
      var stripes = '';
      for (var i = 0; i < 6; i++) stripes += '<rect x="0" y="' + (250 + i * 30) + '" width="320" height="30" fill="' + (i % 2 ? '#0d6a50' : '#12805f') + '"/>';
      var net = '';
      for (var j = 0; j < 9; j++) net += '<path d="M' + (96 + j * 16) + ' 168V228" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>';
      for (var k = 0; k < 5; k++) net += '<path d="M96 ' + (168 + k * 15) + 'H224" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>';
      return head() +
        '<defs><linearGradient id="sg' + n + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05050a"/><stop offset=".6" stop-color="#1a1a2a"/><stop offset="1" stop-color="#3a3a52"/></linearGradient>' +
        '<radialGradient id="fl' + n + '"><stop offset="0" stop-color="#fff6cf" stop-opacity=".95"/><stop offset="1" stop-color="#fff6cf" stop-opacity="0"/></radialGradient></defs>' +
        '<rect width="320" height="400" fill="url(#sg' + n + ')"/>' +
        tw(60, 30, 1.5, 0) + tw(150, 18, 1.2, .5) + tw(220, 40, 1.6, 1) + tw(300, 26, 1.3, 1.6) +
        '<circle cx="34" cy="96" r="46" fill="url(#fl' + n + ')"/><circle cx="34" cy="96" r="9" fill="#fff8dc"/><path d="M34 105V250" stroke="#2a2a3a" stroke-width="5"/>' +
        '<circle cx="288" cy="96" r="46" fill="url(#fl' + n + ')"/><circle cx="288" cy="96" r="9" fill="#fff8dc"/><path d="M288 105V250" stroke="#2a2a3a" stroke-width="5"/>' +
        stripes + '<path d="M0 250H320" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>' +
        '<g>' + net + '<path d="M96 228V166H224V228" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></g>' +
        girl(52, 40, .56, { prop: 'ball' }) +
        '<path class="mv" d="M24 330H62M14 350H52M30 370H60" stroke="#fff" stroke-opacity=".7" stroke-width="3" stroke-linecap="round"/>' + '</svg>';
    }

    // ---- 2: tennis (blue court, night sky)
    if (kind === 2) {
      var tnet = '';
      for (var a = 0; a < 17; a++) tnet += '<path d="M' + (20 + a * 17) + ' 232V272" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>';
      for (var b = 0; b < 4; b++) tnet += '<path d="M20 ' + (232 + b * 13) + 'H292" stroke="#fff" stroke-opacity=".5" stroke-width="1.2"/>';
      return head() +
        '<defs><linearGradient id="sg' + n + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#08080f"/><stop offset="1" stop-color="#2c2c44"/></linearGradient></defs>' +
        '<rect width="320" height="400" fill="url(#sg' + n + ')"/>' +
        tw(40, 40, 1.4, 0) + tw(120, 70, 1.2, .8) + tw(250, 34, 1.5, 1.4) +
        '<path d="M-10 230L60 150H260L330 230V410H-10Z" fill="#2b6aa8"/>' +
        '<path d="M60 150L-10 230M260 150L330 230M0 262H320M160 150V410" stroke="#fff" stroke-opacity=".8" stroke-width="3"/>' +
        '<g>' + tnet + '<path d="M16 232H296" stroke="#fff" stroke-width="5"/><path d="M16 232V290M296 232V290" stroke="#e6e0ff" stroke-width="6"/></g>' +
        '<circle class="bf" cx="24" cy="96" r="9" fill="#d8ff5e"/><path class="bf" d="M16 92Q24 98 16 104" fill="none" stroke="#fff" stroke-width="1.6"/>' +
        girl(52, 40, .56, { prop: 'racket' }) + '</svg>';
    }

    // ---- 3: scene 3
    var lamp = '';
    for (var q = 0; q < 7; q++) {
      var ang = q * 51.4 * Math.PI / 180;
      lamp += '<circle cx="' + (160 + Math.cos(ang) * 20).toFixed(1) + '" cy="' + (44 + Math.sin(ang) * 20).toFixed(1) + '" r="5" fill="#fff6bf"/>';
    }
    return head() +
      '<defs><linearGradient id="sg' + n + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091519"/><stop offset="1" stop-color="#1e4e57"/></linearGradient>' +
      '<linearGradient id="bm' + n + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
      '<rect width="320" height="400" fill="url(#sg' + n + ')"/>' +
      '<path d="M132 66L58 340H262L188 66Z" fill="url(#bm' + n + ')"/>' +
      '<path d="M160 0V16" stroke="#9fb4b8" stroke-width="4"/><circle cx="160" cy="44" r="34" fill="#e9f6f8"/><circle cx="160" cy="44" r="26" fill="#cfe8ec"/>' + lamp + '<circle cx="160" cy="44" r="7" fill="#fff"/>' +
      '<g transform="translate(232 84)"><rect width="76" height="60" rx="8" fill="#06131a" stroke="#6fe3ff" stroke-width="2.5"/>' +
        '<path class="ecg" d="M8 34H24L30 16L38 50L46 26L52 34H68" fill="none" stroke="#7dffd8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></g>' +
      '<rect x="0" y="336" width="320" height="64" fill="#0b242a"/><rect x="0" y="336" width="320" height="8" fill="#1d5560"/>' +
      girl(52, 40, .56, { prop: 'chart', cap: true, steth: true }) + '</svg>';
  }

  window.ART = { girlSVG: girlSVG, scene: scene };
})();

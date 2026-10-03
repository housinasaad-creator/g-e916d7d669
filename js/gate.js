/* يفك تشفير نصوص الموقع (AES-GCM) بكلمة السر ثم يشغّل الصفحة. بدون كلمة السر لا يوجد أي نص مقروء. */
(function () {
  'use strict';
  var STORE = 'gift2-pw';
  var gate = document.getElementById('gate');
  var form = document.getElementById('gateForm');
  var input = document.getElementById('gatePw');
  var msg = document.getElementById('gateMsg');
  var btn = document.getElementById('gateBtn');

  function b64(s) {
    var bin = atob(s), a = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i);
    return a;
  }

  async function decrypt(pw) {
    if (!window.crypto || !crypto.subtle) throw new Error('nosubtle');
    var res = await fetch('data/content.enc.json', { cache: 'no-store' });
    var j = await res.json();
    var mat = await crypto.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
    var key = await crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(j.salt), iterations: j.iter, hash: 'SHA-256' }, mat, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(j.iv) }, key, b64(j.data));
    return new TextDecoder().decode(plain);
  }

  async function unlock(pw, silent) {
    try {
      var src = await decrypt(pw);
      (0, eval)(src); // defines window.SITE
      try { localStorage.setItem(STORE, pw); } catch (e) {}
      gate.classList.add('gone');
      setTimeout(function () { gate.remove(); }, 800);
      window.startSite();
      return true;
    } catch (e) {
      if (!silent) {
        msg.textContent = (e && e.message === 'nosubtle') ? 'افتحي الرابط من متصفح حديث (https)' : 'كلمة السر غير صحيحة · Wrong password';
        gate.classList.add('shake');
        setTimeout(function () { gate.classList.remove('shake'); }, 500);
      }
      return false;
    }
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    btn.disabled = true;
    msg.textContent = '…';
    var ok = await unlock(input.value.trim(), false);
    if (!ok) { input.select(); }
    else { msg.textContent = ''; }
    btn.disabled = false;
  });

  // remembered on this phone? open straight away
  try {
    var saved = localStorage.getItem(STORE);
    if (saved) {
      unlock(saved, true).then(function (ok) { if (!ok) { try { localStorage.removeItem(STORE); } catch (e) {} } });
    }
  } catch (e) {}
  setTimeout(function () { try { input.focus({ preventScroll: true }); } catch (e) {} }, 300);
})();

/* ATTAA anti-bot: honeypot + minimum fill time + simple human check (no external service) */
(function () {
  var started = Date.now();
  var css = '.ab-box{margin:18px 0;padding:14px 16px;border:1.5px solid #d6dde8;border-radius:12px;background:#f7f9fc;display:flex;align-items:center;gap:12px;flex-wrap:wrap;font-family:inherit}'
    + '.ab-box.bad{border-color:#d93025;animation:abshake .35s}'
    + '.ab-q{font-weight:700;color:#0b2a63;font-size:15px}'
    + '.ab-in{width:84px;padding:9px 10px;border:1.5px solid #c4cedd;border-radius:8px;font:inherit;text-align:center;direction:ltr}'
    + '.ab-msg{width:100%;font-size:13px;color:#d93025;display:none}.ab-box.bad .ab-msg{display:block}'
    + '.ab-hp{position:absolute !important;top:0;left:0;width:1px;height:1px;opacity:0;overflow:hidden;clip-path:inset(50%);pointer-events:none}'
    + '@keyframes abshake{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function isEn() { return document.documentElement.lang === 'en'; }
  function build() {
    var a = 2 + Math.floor(Math.random() * 8), b = 2 + Math.floor(Math.random() * 8);
    var box = document.createElement('div'); box.className = 'ab-box'; box.dataset.answer = String(a + b);
    box.innerHTML = '<span class="ab-q"><span data-en="Verify you are human:">تأكد أنك لست روبوت:</span> ' + a + ' + ' + b + ' = ?</span>'
      + '<input class="ab-in" type="text" inputmode="numeric" autocomplete="off" maxlength="3" aria-label="human check">'
      + '<span class="ab-msg" data-en="Incorrect answer, please try again.">الإجابة غير صحيحة، حاول مرة أخرى.</span>'
      + '<div class="ab-hp" aria-hidden="true"><label>Website <input type="text" name="website_url" tabindex="-1" autocomplete="off"></label></div>';
    return box;
  }
  function ok(box) {
    var hp = box.querySelector('[name="website_url"]').value;
    var ans = box.querySelector('.ab-in').value.trim();
    var human = !hp && ans === box.dataset.answer && (Date.now() - started) > 3000;
    box.classList.toggle('bad', !human);
    if (!human) { box.querySelector('.ab-msg').style.display = ''; try { box.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (e) {} }
    return human;
  }
  function guard(target, evt, anchor, where) {
    if (!target || !anchor) return;
    var box = build();
    anchor.parentNode.insertBefore(box, anchor);
    target.addEventListener(evt, function (e) {
      if (!ok(box)) { e.preventDefault(); e.stopImmediatePropagation(); }
    }, true);
  }
  function init() {
    var f;
    if ((f = document.getElementById('homeReportForm'))) guard(f, 'submit', f.querySelector('[type="submit"]'));
    if ((f = document.getElementById('reportForm'))) guard(f, 'submit', f.querySelector('[type="submit"]'));
    if ((f = document.getElementById('volunteerForm'))) guard(f, 'submit', f.querySelector('[type="submit"]'));
    if ((f = document.getElementById('pay'))) guard(f, 'click', f);
    if (window.__setLang) window.__setLang(isEn() ? 'en' : 'ar');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

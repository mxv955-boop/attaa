(function () {
  /* ── Language switcher ── */
  var btn = document.getElementById('langBtn');
  var arTitle = document.title;
  function collectNodes() {
    var list = document.querySelectorAll('[data-en]');
    list.forEach(function (el) { if (!el.getAttribute('data-ar')) el.setAttribute('data-ar', el.innerHTML); });
    return list;
  }

  function getSavedLang() {
    try {
      var saved = localStorage.getItem('lang');
      return saved === 'en' ? 'en' : 'ar';
    } catch (e) {
      return document.documentElement.lang === 'en' ? 'en' : 'ar';
    }
  }

  function setLang(lang) {
    var en = lang === 'en';
    document.documentElement.lang = en ? 'en' : 'ar';
    document.documentElement.dir = en ? 'ltr' : 'rtl';
    document.title = en ? 'Attaa Organization for Peace and Development' : arTitle;
    collectNodes().forEach(function (el) {
      el.innerHTML = el.getAttribute(en ? 'data-en' : 'data-ar');
    });
    if (btn) btn.textContent = en ? 'عربي' : 'EN';
    if (window.onLangChange) window.onLangChange(lang);
    try { localStorage.setItem('lang', lang); } catch (e) {}
  }

  if (btn) {
    btn.addEventListener('click', function () {
      setLang(document.documentElement.lang === 'ar' ? 'en' : 'ar');
    });
  }

  window.__setLang = setLang;
  setLang(getSavedLang());

  /* ── Mobile hamburger menu ── */
  (function () {
    var drawerHTML = [
      '<div class="nav-drawer" id="navDrawer" role="dialog" aria-modal="true" aria-label="القائمة">',
      '  <div class="nav-drawer__backdrop" id="drawerBackdrop"></div>',
      '  <div class="nav-drawer__panel">',
      '    <div class="nav-drawer__head">',
      '      <a href="index.html" class="brand" style="gap:10px">',
      '        <img src="images/logo.jpg" alt="ATTAA" style="width:44px;height:32px;object-fit:contain">',
      '        <span class="brand-name" style="font-size:16px" data-en="Attaa Organization">منظمة عطاء</span>',
      '      </a>',
      '      <button class="nav-drawer__close" id="drawerClose" aria-label="إغلاق">',
      '        <svg viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>',
      '      </button>',
      '    </div>',
      '    <nav class="nav-drawer__links" id="drawerLinks">',
      '      <a href="index.html">',
      '        <svg viewBox="0 0 24 24"><path d="M3 12L12 4l9 8M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9"/></svg>',
      '        <span data-en="Home">الرئيسية</span>',
      '      </a>',
      '      <a href="about.html">',
      '        <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
      '        <span data-en="About Us">من نحن</span>',
      '      </a>',
      '      <a href="programs.html">',
      '        <svg viewBox="0 0 24 24"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>',
      '        <span data-en="Programs">البرامج</span>',
      '      </a>',
      '      <a href="policies.html">',
      '        <svg viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
      '        <span data-en="Policies">السياسات</span>',
      '      </a>',
      '      <a href="accountability.html">',
      '        <svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.5 3-5.5 6.5-5.5s6 2 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 010 7M18 14.8c2 .6 3.3 2.4 3.5 5.2"/></svg>',
      '        <span data-en="Accountability">المساءلة</span>',
      '      </a>',
      '      <a href="reports.html">',
      '        <svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
      '        <span data-en="Reports">التقارير</span>',
      '      </a>',
      '      <a href="jobs.html">',
      '        <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
      '        <span data-en="Jobs">الوظائف</span>',
      '      </a>',
      '      <a href="contact.html">',
      '        <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
      '        <span data-en="Contact Us">اتصل بنا</span>',
      '      </a>',
      '    </nav>',
      '    <div class="nav-drawer__foot">',
      '      <a href="donate.html" class="btn btn-green" style="width:100%;justify-content:center;height:50px;margin-bottom:10px">',
      '        <span data-en="Donate">تبرّع</span>',
      '      </a>',
      '      <a href="volunteer.html" class="btn btn-light" style="width:100%;justify-content:center;height:50px;margin-bottom:10px">',
      '        <span data-en="Volunteer">تطوّع</span>',
      '      </a>',
      '      <a href="accountability.html#form" class="btn btn-navy" style="width:100%;justify-content:center;height:50px;gap:10px">',
      '        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
      '        <span data-en="Safe Report">إبلاغ آمن</span>',
      '      </a>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');

    document.body.insertAdjacentHTML('beforeend', drawerHTML);
    if (window.__setLang) window.__setLang(document.documentElement.lang === 'en' ? 'en' : 'ar');

    /* Create the hamburger toggle button */
    var toggleBtn = document.createElement('button');
    toggleBtn.className = 'nav-toggle';
    toggleBtn.id = 'navToggle';
    toggleBtn.setAttribute('aria-label', 'القائمة');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';

    /* Insert toggle button right before header-actions */
    var headerActions = document.querySelector('.header-actions');
    if (headerActions) {
      headerActions.parentNode.insertBefore(toggleBtn, headerActions);
    }

    var drawer      = document.getElementById('navDrawer');
    var backdrop    = document.getElementById('drawerBackdrop');
    var closeBtn    = document.getElementById('drawerClose');
    var drawerLinks = document.getElementById('drawerLinks');

    function openDrawer() {
      drawer.classList.add('open');
      toggleBtn.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      /* Highlight current page */
      var cur = location.pathname.split('/').pop() || 'index.html';
      drawerLinks.querySelectorAll('a').forEach(function (a) {
        var href = (a.getAttribute('href') || '').split('#')[0];
        a.classList.toggle('active', href === cur);
      });
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggleBtn.addEventListener('click', function () {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });
    backdrop.addEventListener('click', closeDrawer);
    closeBtn.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    drawerLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });

    /* Keep drawer text in sync when language changes */
    var _origLangChange = window.onLangChange;
    window.onLangChange = function (lang) {
      if (_origLangChange) _origLangChange(lang);
    };
  })();

  /* ── Policy TOC smooth scrolling with header offset ── */
  (function () {
    var tocLinks = document.querySelectorAll('.pd-toc a[href^="#s"]');
    if (!tocLinks.length) return;

    var header = document.querySelector('.header');
    var fixedHeaderOffset = header ? header.offsetHeight + 18 : 120;

    function resolveTargetId(href) {
      var raw = (href || '').replace(/^#/, '');
      if (!raw) return null;
      var candidates = [raw, raw.replace(/^s0+/, 's'), raw.replace(/^0+/, '')];
      for (var i = 0; i < candidates.length; i++) {
        if (candidates[i] && document.getElementById(candidates[i])) return candidates[i];
      }
      return null;
    }

    function scrollToTarget(targetId) {
      var section = document.getElementById(targetId);
      if (!section) return;
      var top = section.getBoundingClientRect().top + window.pageYOffset - fixedHeaderOffset;
      window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    }

    tocLinks.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var targetId = resolveTargetId(link.getAttribute('href'));
        if (!targetId) return;
        event.preventDefault();
        scrollToTarget(targetId);
      });
    });

    if (location.hash) {
      var initialTarget = resolveTargetId(location.hash);
      if (initialTarget) {
        setTimeout(function () { scrollToTarget(initialTarget); }, 120);
      }
    }
  })();
})();

/* Autoplay videos reliably on phones (muted + inline, retried on scroll/touch) */
(function () {
  function prep(v) { v.muted = true; v.defaultMuted = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('webkit-playsinline', ''); v.removeAttribute('controls'); if (v.preload !== 'auto') v.preload = 'auto'; }
  function tryPlay(v) { if (v.ended) return; var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  function init() {
    var vids = [].slice.call(document.querySelectorAll('video'));
    if (!vids.length) return;
    vids.forEach(prep);
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && e.target.paused && !e.target.ended && !e.target.__done) tryPlay(e.target); }); }, { threshold: 0.35 });
      vids.forEach(function (v) { v.addEventListener('ended', function () { v.__done = true; }); io.observe(v); });
    } else { vids.forEach(tryPlay); }
    function unlock() { vids.forEach(function (v) { if (v.paused && !v.__done) { var r = v.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight) tryPlay(v); } }); }
    ['touchstart', 'touchend', 'scroll', 'click'].forEach(function (ev) { window.addEventListener(ev, unlock, { passive: true, once: ev !== 'scroll' }); });
    document.addEventListener('visibilitychange', function () { if (!document.hidden) unlock(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

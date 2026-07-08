// ---------------------------------------------------------------------------
// Mobile navigation toggle
// ---------------------------------------------------------------------------
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ---------------------------------------------------------------------------
// Scroll reveal — content gracefully rises into view (progressive enhancement)
// ---------------------------------------------------------------------------
(function () {
  var selectors = [
    '.hero-inner', '.page-hero-inner',
    '.section > .wrap > .center',
    '.card', '.principle', '.service',
    '.panel', '.quote', '.split > *',
    '.contact-form', '.cta-band .wrap > *'
  ];
  var nodes = document.querySelectorAll(selectors.join(','));
  if (!nodes.length) return;

  // Respect users who prefer reduced motion
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;

  // Stagger children within grids for a cascading effect
  document.querySelectorAll('.grid, .contact-grid').forEach(function (group) {
    Array.prototype.slice.call(group.children).forEach(function (child, i) {
      child.style.transitionDelay = (i * 0.09) + 's';
    });
  });

  nodes.forEach(function (n) { n.classList.add('js-reveal'); });

  var reveal = function (n) { n.classList.add('in'); };

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        reveal(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

  nodes.forEach(function (n) { io.observe(n); });

  // Fail-open safety nets — content must NEVER stay hidden, even if the
  // observer misbehaves (unusual viewports, headless renderers, etc.).
  var revealInView = function () {
    var h = window.innerHeight || document.documentElement.clientHeight || 0;
    nodes.forEach(function (n) {
      if (n.getBoundingClientRect().top < h + 40) reveal(n);
    });
  };
  window.addEventListener('load', revealInView);
  window.addEventListener('scroll', revealInView, { passive: true });
  // Absolute backstop: reveal everything shortly after load regardless.
  setTimeout(function () { nodes.forEach(reveal); }, 2500);
})();

// ---------------------------------------------------------------------------
// Rotating "who we serve" words
// ---------------------------------------------------------------------------
(function () {
  var rot = document.querySelector('.serve-rotator');
  if (!rot) return;
  var word = rot.querySelector('.serve-word');
  var list;
  try { list = JSON.parse(rot.getAttribute('data-words') || '[]'); } catch (e) { list = []; }
  if (!word || list.length < 2) return;
  var i = 0;
  setInterval(function () {
    word.classList.add('out');
    setTimeout(function () {
      i = (i + 1) % list.length;
      word.textContent = list[i];
      word.classList.remove('out');
    }, 400);
  }, 2200);
})();

// ---------------------------------------------------------------------------
// Flip cards (team + approach) — click or keyboard to reveal the back
// ---------------------------------------------------------------------------
(function () {
  var cards = document.querySelectorAll('.flip-card');
  if (!cards.length) return;
  cards.forEach(function (card) {
    var toggle = function () {
      var flipped = card.classList.toggle('flipped');
      card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
    };
    card.addEventListener('click', toggle);
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
})();

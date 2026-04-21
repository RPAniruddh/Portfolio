(function (P) {
  const canvas  = document.getElementById('orbitCanvas');
  const tooltip = document.getElementById('tooltip');
  const bubbles = P.createBubbles(P.ICONS);

  P.initClock();
  P.initWordCycleGSAP();
  P.initDrag(bubbles, tooltip);
  P.initOrbit(canvas, bubbles);
  P.initTweakPanel(bubbles, canvas);
  P.initAnimations(bubbles);

  // Fade orbit layer out as user scrolls into the about section
  window.addEventListener('scroll', function () {
    const fade = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.55));
    canvas.style.opacity = fade;
    bubbles.forEach(function (b) { b.style.opacity = fade; });
  }, { passive: true });

  // ScrollTrigger text reveal for about section
  gsap.registerPlugin(ScrollTrigger);

  // ── Block reveal (slide up) for non-paragraph elements ──
  var blockSelectors = [
    '#about-section .hero-eyebrow',
    '#about-section .about-heading',
    '#about-section .about-lead',
    '#about-section .stat-num',
    '#about-section .stat-label',
    '#about-section .photo-cluster',
    '#about-section .about-divider',
  ];

  document.querySelectorAll(blockSelectors.join(',')).forEach(function (el) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'overflow:hidden;display:block;';
    el.parentNode.insertBefore(wrap, el);
    wrap.appendChild(el);

    gsap.from(el, {
      scrollTrigger: { trigger: wrap, start: 'top 90%', toggleActions: 'play none none reverse' },
      y: '110%',
      opacity: 0,
      duration: 0.85,
      ease: 'power4.out',
    });
  });

  // ── Word-by-word reveal for paragraphs ──
  document.querySelectorAll('#about-section .about-text p').forEach(function (p) {
    // preserve <strong> by working on childNodes
    var html = p.innerHTML;
    // split on spaces, wrap each word token in spans
    p.innerHTML = html.replace(/(<[^>]+>|[^<\s]+)/g, function (token) {
      if (token.startsWith('<')) return token; // keep tags intact
      return '<span class="w-wrap" style="overflow:hidden;display:inline-block;vertical-align:bottom;">' +
             '<span class="w" style="display:inline-block;">' + token + '</span></span>';
    });

    var words = p.querySelectorAll('.w');

    gsap.from(words, {
      scrollTrigger: {
        trigger: p,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
      y: '100%',
      opacity: 0,
      duration: 0.55,
      stagger: 0.028,
      ease: 'power3.out',
    });
  });

  // Photo card tilt on the inlined about section
  document.querySelectorAll('.photo-card').forEach(function (card) {
    const baseTransform = getComputedStyle(card).transform;

    card.addEventListener('mouseenter', function () {
      this.style.zIndex = '20';
      gsap.to(this, { boxShadow: '0 12px 36px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)', duration: 0.25 });
    });

    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / rect.width;
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / rect.height;
      const origRot = parseFloat((baseTransform + '').replace(/[^-\d.]/g, '')) || 0;
      gsap.to(this, { rotation: origRot + dx * 4, y: -dy * 6, scale: 1.04, duration: 0.2, ease: 'power2.out' });
    });

    card.addEventListener('mouseleave', function () {
      this.style.zIndex = '';
      gsap.to(this, {
        rotation: parseFloat((baseTransform + '').replace(/[^-\d.]/g, '')) || 0,
        y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.4)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.3)',
      });
    });
  });
})(window.Portfolio);

// ── Clock ──────────────────────────────────────────────
(function () {
  const el = document.getElementById('clock');
  if (!el) return;
  function tick() {
    const d = new Date();
    el.textContent = [d.getHours(), d.getMinutes(), d.getSeconds()]
      .map(n => String(n).padStart(2, '0')).join(' : ');
  }
  setInterval(tick, 1000);
  tick();
})();

// ── GSAP entrance animations ───────────────────────────
(function () {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('nav',            { y: -60, opacity: 0, duration: 0.7 })
    .from('.about-heading', { y: 32, opacity: 0, duration: 0.75 }, '-=0.35')
    .from('.about-lead',    { y: 20, opacity: 0, duration: 0.6  }, '-=0.45')
    .from('.about-row',     { y: 40, opacity: 0, duration: 0.7, stagger: 0.15 }, '-=0.3');
})();

// ── Photo card hover tilt ──────────────────────────────
(function () {
  document.querySelectorAll('.photo-card').forEach(card => {
    const baseTransform = card.style.transform || getComputedStyle(card).transform;

    card.addEventListener('mouseenter', function () {
      this.style.zIndex = '20';
      gsap.to(this, { boxShadow: '0 12px 36px rgba(0,0,0,0.16), 0 2px 8px rgba(0,0,0,0.08)', duration: 0.25 });
    });

    card.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / rect.width;
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / rect.height;
      const origRot = parseFloat((baseTransform + '').replace(/[^-\d.]/g, '')) || 0;
      gsap.to(this, {
        rotation: origRot + dx * 4,
        y: -dy * 6,
        scale: 1.04,
        duration: 0.2,
        ease: 'power2.out',
      });
    });

    card.addEventListener('mouseleave', function () {
      this.style.zIndex = '';
      gsap.to(this, {
        rotation: parseFloat((baseTransform + '').replace(/[^-\d.]/g, '')) || 0,
        y: 0,
        scale: 1,
        duration: 0.45,
        ease: 'back.out(1.4)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)',
        clearProps: 'zIndex',
      });
    });
  });
})();

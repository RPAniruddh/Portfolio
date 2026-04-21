(function (P) {
  P.initAnimations = function (bubbles) {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Nav drops in
    tl.from('nav', { y: -60, opacity: 0, duration: 0.7 })

    // Hero stagger
      .from('.hero-eyebrow', { y: 16, opacity: 0, duration: 0.6 }, '-=0.3')
      .from('.hero-title',   { y: 28, opacity: 0, duration: 0.75 }, '-=0.4')
      .from('.hero-sub',     { y: 20, opacity: 0, duration: 0.6 },  '-=0.45')
      .from('.hero-cta',     { y: 16, opacity: 0, duration: 0.55 }, '-=0.35')

    // Bubbles spawn with stagger
      .from(bubbles, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.055,
        ease: 'back.out(1.6)',
        transformOrigin: 'center center',
      }, '-=0.2');
  };

  P.initWordCycleGSAP = function () {
    const cycleEl = document.getElementById('wordCycle');
    const WORDS = ['resilient', 'scalable', 'distributed', 'performant', 'fault-tolerant', 'cloud-native'];
    let wIdx = 0;

    setInterval(() => {
      gsap.to(cycleEl, {
        opacity: 0, y: -18, duration: 0.22, ease: 'power2.in',
        onComplete: () => {
          wIdx = (wIdx + 1) % WORDS.length;
          cycleEl.textContent = WORDS[wIdx];
          gsap.fromTo(cycleEl,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' }
          );
        },
      });
    }, 2400);
  };
})(window.Portfolio);

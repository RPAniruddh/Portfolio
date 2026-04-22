(function (P) {
  P.initCertificates = function () {
    var track   = document.getElementById('certTrack');
    var btnPrev = document.getElementById('certBtnPrev');
    var btnNext = document.getElementById('certBtnNext');
    var counter = document.getElementById('certCounter');
    var wrap    = document.getElementById('certTrackWrap');
    if (!track) return;

    var cards   = Array.prototype.slice.call(track.querySelectorAll('.cert-card'));
    var TOTAL   = cards.length;
    var current = 0;
    var animating = false;

    var DECK_OFFSETS = [
      { y: 0,  rot: 0,    scale: 1,    z: 40 },
      { y: 14, rot: 2.5,  scale: 0.96, z: 30 },
      { y: 26, rot: -1.8, scale: 0.92, z: 20 },
      { y: 36, rot: 1.2,  scale: 0.88, z: 10 },
    ];

    function updateCounter() {
      counter.textContent =
        String(current + 1).padStart(2, '0') + ' / ' + String(TOTAL).padStart(2, '0');
    }

    function applyDeckState(animated) {
      cards.forEach(function (card, i) {
        var pos = (i - current + TOTAL) % TOTAL;
        var off = DECK_OFFSETS[Math.min(pos, DECK_OFFSETS.length - 1)];
        card.style.transition = animated
          ? 'transform 0.5s cubic-bezier(.77,0,.18,1), opacity 0.4s ease'
          : 'none';
        card.style.zIndex        = off.z;
        card.style.opacity       = pos < DECK_OFFSETS.length ? 1 : 0;
        card.style.pointerEvents = pos === 0 ? 'auto' : 'none';
        card.style.transform     = 'translateY(' + off.y + 'px) rotate(' + off.rot + 'deg) scale(' + off.scale + ')';
      });
      updateCounter();
      btnPrev.disabled = current === 0;
      btnNext.disabled = current === TOTAL - 1;
    }

    function swipeOut(dir, cb) {
      var topCard = cards[current];
      topCard.style.transition = 'transform 0.45s cubic-bezier(.55,0,.1,1), opacity 0.35s ease';
      topCard.style.transform  = 'translateX(' + (dir * 130) + '%) rotate(' + (dir * 18) + 'deg) scale(0.95)';
      topCard.style.opacity    = '0';
      setTimeout(cb, 400);
    }

    function swipeIn(card) {
      card.style.transition = 'none';
      card.style.transform  = 'translateX(-80%) rotate(-10deg) scale(0.9)';
      card.style.opacity    = '0';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          card.style.transition = 'transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.35s ease';
          card.style.transform  = 'translateY(0) rotate(0deg) scale(1)';
          card.style.opacity    = '1';
        });
      });
    }

    function goNext() {
      if (animating || current >= TOTAL - 1) return;
      animating = true;
      swipeOut(1, function () {
        var swiped = cards[current];
        swiped.style.transition = 'none';
        swiped.style.transform  = 'translateY(36px) rotate(1.2deg) scale(0.88)';
        swiped.style.opacity    = '0';
        swiped.style.zIndex     = '5';
        current++;
        applyDeckState(true);
        animating = false;
      });
    }

    function goPrev() {
      if (animating || current <= 0) return;
      animating = true;
      current--;
      swipeIn(cards[current]);
      setTimeout(function () { applyDeckState(true); animating = false; }, 100);
    }

    btnNext.addEventListener('mousedown', function (e) { e.preventDefault(); });
    btnPrev.addEventListener('mousedown', function (e) { e.preventDefault(); });
    btnNext.addEventListener('click', goNext);
    btnPrev.addEventListener('click', goPrev);

    // Wheel on deck
    wrap.addEventListener('wheel', function (e) {
      e.preventDefault();
      if (e.deltaY > 30) goNext();
      else if (e.deltaY < -30) goPrev();
    }, { passive: false });

    // Drag / swipe
    var dragging = false, dragX = 0;

    wrap.addEventListener('mousedown', function (e) {
      dragging = true;
      dragX = e.clientX;
      cards[current].style.transition = 'none';
    });
    document.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var dx  = e.clientX - dragX;
      var rot = dx * 0.04;
      cards[current].style.transform = 'translateX(' + dx + 'px) rotate(' + rot + 'deg) scale(1)';
    });
    document.addEventListener('mouseup', function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.clientX - dragX;
      if (dx < -70) { goNext(); return; }
      if (dx >  70) { goPrev(); return; }
      cards[current].style.transition = 'transform 0.45s cubic-bezier(.34,1.56,.64,1)';
      cards[current].style.transform  = 'translateY(0) rotate(0deg) scale(1)';
    });

    wrap.addEventListener('touchstart', function (e) {
      dragX = e.touches[0].clientX; dragging = true;
      cards[current].style.transition = 'none';
    }, { passive: true });
    wrap.addEventListener('touchmove', function (e) {
      if (!dragging) return;
      var dx = e.touches[0].clientX - dragX;
      cards[current].style.transform = 'translateX(' + dx + 'px) rotate(' + (dx * 0.04) + 'deg) scale(1)';
    }, { passive: true });
    wrap.addEventListener('touchend', function (e) {
      dragging = false;
      var dx = e.changedTouches[0].clientX - dragX;
      if (dx < -70) { goNext(); return; }
      if (dx >  70) { goPrev(); return; }
      cards[current].style.transition = 'transform 0.45s cubic-bezier(.34,1.56,.64,1)';
      cards[current].style.transform  = 'translateY(0) rotate(0deg) scale(1)';
    });

    // Heading reveal
    gsap.from('.certs-tag, .certs-heading, .certs-sub', {
      y: 24, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '#certificates-section', start: 'top 82%' },
    });

    applyDeckState(false);
  };
})(window.Portfolio);

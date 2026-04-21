(function (P) {
  P.initDrag = function (bubbles, tooltip) {
    bubbles.forEach((el, i) => {
      const ic = P.ICONS[i];

      el.addEventListener('mouseenter', () => {
        if (P.state.drag) return;
        tooltip.textContent = ic.label;
        tooltip.classList.add('visible');
      });
      el.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
      el.addEventListener('mousemove', e => {
        tooltip.style.left = (e.clientX - tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top  = (e.clientY + 24) + 'px';
      });

      el.addEventListener('mousedown', e => { e.preventDefault(); startDrag(i, e.clientX, e.clientY, bubbles, tooltip); });
      el.addEventListener('touchstart', e => {
        e.preventDefault();
        startDrag(i, e.touches[0].clientX, e.touches[0].clientY, bubbles, tooltip);
      }, { passive: false });
    });

    document.addEventListener('mousemove', e => moveHandler(e, bubbles));
    document.addEventListener('mouseup', () => endDrag(bubbles));
    document.addEventListener('touchmove', e => {
      if (!P.state.drag) return;
      e.preventDefault();
      moveHandler({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }, bubbles);
    }, { passive: false });
    document.addEventListener('touchend', () => endDrag(bubbles));
  };

  function startDrag(idx, x, y, bubbles, tooltip) {
    tooltip.classList.remove('visible');
    P.state.snap = null;
    P.state.drag = { idx, x, y, velX: 0, velY: 0, lastX: x, lastY: y, lastT: performance.now() };
    bubbles[idx].classList.add('dragging');
  }

  function moveHandler(e, bubbles) {
    if (!P.state.drag) return;
    const now = performance.now();
    const dt = (now - P.state.drag.lastT) / 1000;
    if (dt > 0.001) {
      P.state.drag.velX = (e.clientX - P.state.drag.lastX) / dt;
      P.state.drag.velY = (e.clientY - P.state.drag.lastY) / dt;
    }
    P.state.drag.lastX = e.clientX; P.state.drag.lastY = e.clientY; P.state.drag.lastT = now;
    P.state.drag.x = e.clientX; P.state.drag.y = e.clientY;

    bubbles[P.state.drag.idx].style.left = (e.clientX - 26) + 'px';
    bubbles[P.state.drag.idx].style.top  = (e.clientY - 26) + 'px';
    bubbles[P.state.drag.idx].style.transform = 'scale(1.12)';
  }

  function endDrag(bubbles) {
    if (!P.state.drag) return;
    const { idx, x, y, velX, velY } = P.state.drag;
    bubbles[idx].classList.remove('dragging');

    const ri = P.ICONS[idx].ring;
    const { rx } = P.ringParams(ri);
    const speed = Math.sqrt(velX * velX + velY * velY);
    const angImpulse = (speed / (rx * 2)) * Math.sign(P.RING_DEF[ri].dir) * 0.35;
    P.state.ringVel[ri] = P.RING_DEF[ri].baseSpeed * P.RING_DEF[ri].dir + angImpulse;

    const toPhase = P.nearestPhase(x, y, ri);
    P.state.snap = { idx, fromX: x, fromY: y, toPhase, startT: performance.now(), dur: 620 };
    P.state.drag = null;
  }
})(window.Portfolio);

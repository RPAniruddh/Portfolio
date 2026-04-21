(function (P) {
  P.initOrbit = function (canvas, bubbles) {
    const ctx = canvas.getContext('2d');

    const TRAIL_DURATION = 1800; // ms each trail point lives
    const trails = P.ICONS.map(() => []);

    function resizeCanvas() {
      P.resize();
      canvas.width = P.state.VW;
      canvas.height = P.state.VH;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function pushTrail(i, x, y, now) {
      trails[i].push({ x, y, t: now });
      // remove points older than TRAIL_DURATION
      const cutoff = now - TRAIL_DURATION;
      while (trails[i].length > 0 && trails[i][0].t < cutoff) trails[i].shift();
    }

    function drawTrails(now) {
      const cutoff = now - TRAIL_DURATION;
      P.ICONS.forEach((ic, i) => {
        const pts = trails[i];
        if (pts.length < 2) return;

        for (let j = 1; j < pts.length; j++) {
          const age = (pts[j].t - cutoff) / TRAIL_DURATION; // 0 = oldest → 1 = newest
          ctx.beginPath();
          ctx.moveTo(pts[j - 1].x, pts[j - 1].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = ic.color;
          ctx.globalAlpha = age * 0.45;
          ctx.lineWidth = age * 4.5;
          ctx.lineCap = 'round';
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      });
    }

    function drawRings() {
      ctx.clearRect(0, 0, P.state.VW, P.state.VH);
      const STEPS = 300;

      P.RING_DEF.forEach((_, ri) => {
        ctx.beginPath();
        for (let i = 0; i <= STEPS; i++) {
          const a = (i / STEPS) * Math.PI * 2;
          const [x, y] = P.ellipseXY(a, ri);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(255,255,255,${0.07 - ri * 0.018})`;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3.5, 9]);
        ctx.lineDashOffset = -(P.state.ringOffset[ri] * (50 + ri * 15));
        ctx.stroke();
        ctx.setLineDash([]);
      });
    }

    let lastT = performance.now();

    function frame(now) {
      const dt = Math.min((now - lastT) / 1000, 0.05);
      lastT = now;

      for (let ri = 0; ri < P.RING_DEF.length; ri++) {
        P.state.ringOffset[ri] += P.state.ringVel[ri] * dt;
        const base = P.RING_DEF[ri].baseSpeed * P.RING_DEF[ri].dir;
        P.state.ringVel[ri] += (base - P.state.ringVel[ri]) * (1 - Math.exp(-4 * dt));
      }

      drawRings();

      if (P.state.snap) {
        const elapsed = now - P.state.snap.startT;
        const t = Math.min(elapsed / P.state.snap.dur, 1);
        const ease = P.easeOutCubic(t);

        const ri = P.ICONS[P.state.snap.idx].ring;
        const [tx, ty] = P.ellipseXY(P.state.snap.toPhase + P.state.ringOffset[ri], ri);
        const bx = P.state.snap.fromX + (tx - P.state.snap.fromX) * ease;
        const by = P.state.snap.fromY + (ty - P.state.snap.fromY) * ease;

        bubbles[P.state.snap.idx].style.left = (bx - 26) + 'px';
        bubbles[P.state.snap.idx].style.top  = (by - 26) + 'px';
        bubbles[P.state.snap.idx].style.transform = `scale(${1 + (1 - ease) * 0.12})`;

        pushTrail(P.state.snap.idx, bx, by, now);

        if (t >= 1) {
          P.state.iconPhase[P.state.snap.idx] = P.state.snap.toPhase;
          P.state.snap = null;
        }
      }

      // keep trail alive for the icon being dragged
      if (P.state.drag) {
        const { idx, x, y } = P.state.drag;
        pushTrail(idx, x, y, now);
      }

      P.ICONS.forEach((ic, i) => {
        if (P.state.drag && P.state.drag.idx === i) return;
        if (P.state.snap && P.state.snap.idx === i) return;

        const a = P.state.iconPhase[i] + P.state.ringOffset[ic.ring];
        const [x, y] = P.ellipseXY(a, ic.ring);
        bubbles[i].style.left = (x - 26) + 'px';
        bubbles[i].style.top  = (y - 26) + 'px';
        bubbles[i].style.transform = 'scale(1)';

        pushTrail(i, x, y, now);
      });

      drawTrails(now);

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  };
})(window.Portfolio);

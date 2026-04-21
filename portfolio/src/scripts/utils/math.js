(function (P) {
  P.ringParams = function (ri) {
    const d = P.RING_DEF[ri];
    return {
      rx: d.rxF * P.state.VW,
      ry: d.ryF * P.state.VH,
      tilt: d.tiltDeg * Math.PI / 180,
    };
  };

  P.ellipseXY = function (angle, ri) {
    const { rx, ry, tilt } = P.ringParams(ri);
    const ex = rx * Math.cos(angle);
    const ey = ry * Math.sin(angle);
    return [
      P.state.VW / 2 + ex * Math.cos(tilt) - ey * Math.sin(tilt),
      P.state.VH / 2 + ex * Math.sin(tilt) + ey * Math.cos(tilt),
    ];
  };

  P.nearestPhase = function (px, py, ri) {
    const STEPS = 512;
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < STEPS; i++) {
      const phase = (i / STEPS) * Math.PI * 2;
      const a = phase + P.state.ringOffset[ri];
      const [x, y] = P.ellipseXY(a, ri);
      const d = Math.hypot(px - x, py - y);
      if (d < bestDist) { bestDist = d; best = phase; }
    }
    return best;
  };

  P.easeOutCubic = function (t) { return 1 - Math.pow(1 - t, 3); };
})(window.Portfolio);

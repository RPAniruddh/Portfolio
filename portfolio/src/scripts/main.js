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
})(window.Portfolio);

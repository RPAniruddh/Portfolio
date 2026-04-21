(function (P) {
  P.state = {
    VW: window.innerWidth,
    VH: window.innerHeight,
    ringOffset: P.RING_DEF.map(() => 0),
    ringVel: P.RING_DEF.map(r => r.baseSpeed * r.dir),
    iconPhase: P.ICONS.map(ic => ic.phase),
    drag: null,
    snap: null,
  };

  P.resize = function () {
    P.state.VW = window.innerWidth;
    P.state.VH = window.innerHeight;
  };
})(window.Portfolio);

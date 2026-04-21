(function (P) {
  P.createBubbles = function (icons) {
    return icons.map((ic) => {
      const el = document.createElement('div');
      el.className = 'bubble';
      el.innerHTML = P.iconSVG(ic.label, ic.color);
      document.body.appendChild(el);
      return el;
    });
  };
})(window.Portfolio);

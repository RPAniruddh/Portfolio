(function (P) {
  P.initClock = function () {
    function tick() {
      const d = new Date();
      const h = String(d.getHours()).padStart(2, '0');
      const m = String(d.getMinutes()).padStart(2, '0');
      const s = String(d.getSeconds()).padStart(2, '0');
      document.getElementById('clock').textContent = `${h} : ${m} : ${s}`;
    }
    setInterval(tick, 1000);
    tick();
  };
})(window.Portfolio);

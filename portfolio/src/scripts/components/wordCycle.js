(function (P) {
  P.initWordCycle = function () {
    const cycleEl = document.getElementById('wordCycle');
    const WORDS = ['resilient', 'scalable', 'distributed', 'performant', 'fault-tolerant', 'cloud-native'];
    let wIdx = 0;

    setInterval(() => {
      cycleEl.classList.add('word-exit');
      setTimeout(() => {
        wIdx = (wIdx + 1) % WORDS.length;
        cycleEl.textContent = WORDS[wIdx];
        cycleEl.classList.remove('word-exit');
        cycleEl.classList.add('word-enter');
        requestAnimationFrame(() => requestAnimationFrame(() => {
          cycleEl.classList.remove('word-enter');
        }));
      }, 300);
    }, 2400);
  };
})(window.Portfolio);

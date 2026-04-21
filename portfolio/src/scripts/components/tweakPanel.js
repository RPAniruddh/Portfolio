(function (P) {
  P.initTweakPanel = function (bubbles, canvas) {
    const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
      "speed": 0.7,
      "bubbleSize": 50,
      "ringTilt": 1.3,
      "showOrbits": true
    }/*EDITMODE-END*/;

    let tweaks = { ...TWEAK_DEFAULTS };

    const panel = document.createElement('div');
    panel.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:999;
      background:rgba(238,236,234,0.92); backdrop-filter:blur(20px);
      border:1px solid rgba(255,255,255,0.85); border-radius:16px;
      padding:20px 22px; width:220px;
      box-shadow:0 4px 28px rgba(0,0,0,0.1);
      display:none; font-family:'Inter',sans-serif; font-size:12px;
    `;
    panel.innerHTML = `
      <div style="font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#7a7369;margin-bottom:14px;font-weight:500;">Tweaks</div>
      <label style="display:block;color:#18150f;margin-bottom:10px;">
        <span style="display:flex;justify-content:space-between;margin-bottom:5px;"><span>Orbit Speed</span><span id="twSpeedVal">${tweaks.speed}×</span></span>
        <input id="twSpeed" type="range" min="0.1" max="3" step="0.1" value="${tweaks.speed}" style="width:100%;accent-color:#b85c2a;">
      </label>
      <label style="display:block;color:#18150f;margin-bottom:10px;">
        <span style="display:flex;justify-content:space-between;margin-bottom:5px;"><span>Bubble Size</span><span id="twSizeVal">${tweaks.bubbleSize}px</span></span>
        <input id="twSize" type="range" min="36" max="76" step="2" value="${tweaks.bubbleSize}" style="width:100%;accent-color:#b85c2a;">
      </label>
      <label style="display:block;color:#18150f;margin-bottom:10px;">
        <span style="display:flex;justify-content:space-between;margin-bottom:5px;"><span>Ring Tilt</span><span id="twTiltVal">${tweaks.ringTilt}×</span></span>
        <input id="twTilt" type="range" min="0" max="2" step="0.1" value="${tweaks.ringTilt}" style="width:100%;accent-color:#b85c2a;">
      </label>
      <label style="display:flex;align-items:center;gap:8px;color:#18150f;cursor:pointer;">
        <input id="twOrbits" type="checkbox" ${tweaks.showOrbits ? 'checked' : ''} style="accent-color:#b85c2a;">
        Show orbit rings
      </label>
    `;
    document.body.appendChild(panel);

    const BASE_SPEEDS = P.RING_DEF.map(r => r.baseSpeed);
    const BASE_TILTS  = P.RING_DEF.map(r => r.tiltDeg);

    function applyTweaks() {
      P.RING_DEF.forEach((r, ri) => { r.baseSpeed = BASE_SPEEDS[ri] * tweaks.speed; });
      bubbles.forEach(b => { b.style.width = b.style.height = tweaks.bubbleSize + 'px'; });
      canvas.style.opacity = tweaks.showOrbits ? '1' : '0';
      P.RING_DEF.forEach((d, ri) => { d.tiltDeg = BASE_TILTS[ri] * tweaks.ringTilt; });
    }

    function postTweaks() {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: tweaks }, '*');
    }

    panel.querySelector('#twSpeed').addEventListener('input', function () {
      tweaks.speed = parseFloat(this.value);
      panel.querySelector('#twSpeedVal').textContent = tweaks.speed + '×';
      applyTweaks(); postTweaks();
    });
    panel.querySelector('#twSize').addEventListener('input', function () {
      tweaks.bubbleSize = parseInt(this.value);
      panel.querySelector('#twSizeVal').textContent = tweaks.bubbleSize + 'px';
      applyTweaks(); postTweaks();
    });
    panel.querySelector('#twTilt').addEventListener('input', function () {
      tweaks.ringTilt = parseFloat(this.value);
      panel.querySelector('#twTiltVal').textContent = tweaks.ringTilt + '×';
      applyTweaks(); postTweaks();
    });
    panel.querySelector('#twOrbits').addEventListener('change', function () {
      tweaks.showOrbits = this.checked;
      applyTweaks(); postTweaks();
    });

    window.addEventListener('message', e => {
      if (e.data?.type === '__activate_edit_mode') {
        panel.style.display = 'block';
      } else if (e.data?.type === '__deactivate_edit_mode') {
        panel.style.display = 'none';
      }
    });

    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
  };
})(window.Portfolio);

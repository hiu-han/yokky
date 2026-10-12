/** ========= 차트 로딩 애니메이션 START - 한희재 ========= */
const ChartLoader = (() => {
  const overlayMap = new WeakMap();

  // 애니메이션 내부 바의 높이 랜덤
  const clBarRand = (min, max) => Math.round(min + Math.random() * (max - min));

  function makeDetail() {
    const wrap = document.createElement('div');
    wrap.className = 'cl-wrap';
    wrap.innerHTML = `
        <div class="cl-header">
          <div class="cl-title"></div>
          <div class="cl-legend">
            <div class="cl-leg-item"><div class="cl-chip"></div><div class="cl-leg-text"></div></div>
            <div class="cl-leg-item"><div class="cl-chip"></div><div class="cl-leg-text"></div></div>
          </div>
        </div>
        <div class="cl-plot">
          <div class="cl-y">
            <div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div><div class="tick"></div>
          </div>
          <div class="cl-grid">
            <div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div><div class="line"></div>
          </div>
          <div class="cl-bars"></div>
          <div class="cl-x">
            <div class="tick"></div><div class="tick"></div><div class="tick"></div>
            <div class="tick"></div><div class="tick"></div><div class="tick"></div>
          </div>
        </div>`;

    const bars = wrap.querySelector('.cl-bars');
    // ★ 6개 막대, 각 막대 높이는 30~85% 랜덤
    for (let i = 0; i < 6; i++) {
      const b = document.createElement('div');
      b.className = 'cl-bar';
      b.style.height = clBarRand(30, 85) + '%';
      bars.appendChild(b);
    }
    return wrap;
  }

  function toEls(target) {
    if (typeof target === 'string') return document.querySelectorAll(target);
    if (target instanceof Element) return [target];
    return Array.from(target || []);
  }

  // .chart_wrap의 스타일 조건 조정
  function ensureContainer(el) {
    const cs = getComputedStyle(el);
    if (cs.position === 'static') el.style.position = 'relative';
    if (cs.overflow === 'visible') el.style.overflow = 'hidden';
  }

  // .chart_wrap의 동작 안정화
  function ensureOverlay(el) {
    let ov = overlayMap.get(el);
    if (!ov) {
      ensureContainer(el);
      ov = document.createElement('div');
      ov.className = 'cl-overlay cl-hidden';
      ov.appendChild(makeDetail());
      el.appendChild(ov);
      overlayMap.set(el, ov);
    }
    return ov;
  }

  // 애니메이션 동작
  function on(target) {
    toEls(target).forEach((el) => {
      const ov = ensureOverlay(el);
      ov.classList.remove('cl-hidden');
      el.setAttribute('aria-busy', 'true');
    });
  }

  // 애니메이션 멈춤
  function off(target) {
    toEls(target).forEach((el) => {
      const ov = overlayMap.get(el);
      if (ov) {
        ov.classList.add('cl-hidden');
      }
      el.removeAttribute('aria-busy');
    });
  }

  return { on, off };
})();

/** 동작 예시 */
// 모든 .chart_wrap의 로딩 애니메이션 동작
ChartLoader.on('.chart_wrap');

// 모든 .chart_wrap의 로딩 애니메이션 멈춤
// ChartLoader.off('.chart_wrap');

// #chart1을 포함하는 .chart_wrap의 로딩 애니메이션 동작
// ChartLoader.on('#chart1');

// #chart1을 포함하는 .chart_wrap의 로딩 애니메이션 멈춤
// ChartLoader.off('#chart1');

/** ========= 차트 로딩 애니메이션 END - 한희재 ========= */

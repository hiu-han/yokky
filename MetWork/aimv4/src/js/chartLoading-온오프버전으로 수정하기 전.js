/**
 *   차트 로딩 오버레이
 *   inst.hide()  // 수동 숨김
 *   inst.show()  // 다시 보이기
 *   inst.destroy() // DOM 제거
 */
const ChartLoader = (() => {
  function makeDetail(barsCount) {
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
          ${Array.from({ length: Math.max(6, barsCount) })
            .map(() => `<div class="tick"></div>`)
            .join('')}
        </div>
      </div>
    `;
    const bars = wrap.querySelector('.cl-bars');
    for (let i = 0; i < barsCount; i++) {
      const b = document.createElement('div');
      b.className = 'cl-bar';
      // 적당한 높이 분포 (30~85%)
      b.style.height = 30 + Math.round(Math.random() * 55) + '%';
      bars.appendChild(b);
    }
    return wrap;
  }

  function mount(el, opts = {}) {
    const { autoHide = true, duration = 3000, bars = 6, onHide = null } = opts;

    const cs = getComputedStyle(el);
    if (cs.position === 'static') {
      el.style.position = 'relative';
    }
    if (cs.overflow === 'visible') {
      el.style.overflow = 'hidden';
    }

    const overlay = document.createElement('div');
    overlay.className = 'cl-overlay ' + 'cl--pulse';
    overlay.appendChild(makeDetail(bars));
    el.appendChild(overlay);

    let timer = null;
    if (autoHide) {
      timer = setTimeout(() => hide(), duration);
    }

    function hide() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      overlay.classList.add('cl-hidden');
      if (typeof onHide === 'function') onHide();
    }
    function show() {
      overlay.classList.remove('cl-hidden');
    }
    function destroy() {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      overlay.remove();
    }
    return { hide, show, destroy, el, overlay };
  }
  return { mount };
})();

// ** 차트 로딩 오버레이 동작 **
// 1) 대상 카드 모으기
const cards = document.querySelectorAll('.chart_wrap');

// 2) 동시에 mount (각 인스턴스는 배열로 보관)
const loaders = Array.from(cards, (el) =>
  ChartLoader.mount(el, {
    duration: 3000,
    autoHide: false, // 각자 완료 시점에 수동 hide()
    bars: 6, // 카드별로 data 속성으로 커스터마이즈 가능
  })
);

// 3) 개별 제어 예시 (예: 3번째 카드 데이터 로드 끝났을 때)
loaders[2].hide();

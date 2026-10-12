/**
 * ChartLoader - 재사용 가능한 차트 로딩 오버레이
 * API:
 *   const inst = ChartLoader.mount(el, { variant:'pulse'|'skeleton', autoHide:true, duration:3000, bars:6, onHide(){} })
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
    const {
      variant = 'skeleton', // 'pulse' | 'skeleton'
      autoHide = true,
      duration = 3000,
      bars = 6,
      onHide = null,
    } = opts;

    if (!el) throw new Error('mount target element is required');
    // 컨테이너가 position이 없으면 상대 배치 부여(안전)
    const cs = getComputedStyle(el);
    if (cs.position === 'static') {
      el.style.position = 'relative';
    }

    const overlay = document.createElement('div');
    overlay.className =
      'cl-overlay ' + (variant === 'pulse' ? 'cl--pulse' : 'cl--skeleton');

    // 디테일 스켈레톤(두 변형 모두 사용)
    overlay.appendChild(makeDetail(bars));

    // skeleton이면 shimmer 추가
    if (variant === 'skeleton') {
      const shimmer = document.createElement('div');
      shimmer.className = 'cl-shimmer';
      overlay.appendChild(shimmer);
    }

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

/* ------------------ 데모 ------------------ */
// const card1 = document.getElementById('card1');
// const card2 = document.getElementById('card2');

// 1) pulse(깜빡임) – 3초 후 자동 숨김
// const loader1 = ChartLoader.mount(card1, {
//   variant: 'pulse',
//   // duration: 3000,
//   duration: 199000,
//   bars: 6,
//   onHide: () => console.log('Pulse loader hidden'),
// });

// 2) skeleton(shimmer) – 3초 후 자동 숨김
// const loader2 = ChartLoader.mount(card2, {
//   variant: 'skeleton',
//   duration: 3000,
//   bars: 7,
//   onHide: () => console.log('Skeleton loader hidden'),
// });

// 예) 실제 앱에서 데이터 로드 완료 시점에 수동으로 끄려면:
// loader1.hide(); loader2.hide();

// 차트 카드 엘리먼트
const el = document.querySelector('.chart_wrap');

// 로더 붙이기
const loader = ChartLoader.mount(el, {
  variant: 'pulse', // 'pulse' 도 가능
  duration: 199000, // 임시 자동 숨김 시간
  bars: 6, // 막대 개수
  onHide() {
    /* 차트 렌더 시작 등 */
  },
});

const loaders = new Map();

document.querySelectorAll('.chart_wrap').forEach((el, idx) => {
  const inst = ChartLoader.mount(el, {
    // variant: idx % 2 ? 'pulse' : 'skeleton',
    variant: 'pulse',
    autoHide: false,
    bars: 6,
  });
  loaders.set(el, inst);
});

// …각 카드의 차트가 완료될 때:
function onChartDone(el) {
  const inst = loaders.get(el);
  inst?.hide();
}

// 차트 카드 엘리먼트
// const el = document.querySelector('.write-chart-name');

// 로더 붙이기
// const loader = ChartLoader.mount(el, {
//   variant: 'pulse', // 'pulse' 도 가능
//   duration: 3000, // 임시 자동 숨김 시간
//   bars: 8, // 막대 개수
//   onHide() {
//     /* 차트 렌더 시작 등 */
//   },
// });

// 데이터 완료시 수동 종료
// loader.hide();

// 더 이상 안 쓰면
// loader.destroy();

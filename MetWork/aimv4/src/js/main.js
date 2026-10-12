const qInput = document.getElementById('qInput');

qInput.addEventListener('input', function () {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
});

/** 플로팅 메뉴 핸들러 START */
const sMenuHandler = {
  on: function (opener, menuName) {
    opener.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      menuName.classList.toggle('on');
    });
  },
  off: function (opener, menuName) {
    document.addEventListener('click', function (e) {
      if (!menuName.contains(e.target) && !opener.contains(e.target)) {
        menuName.classList.remove('on');
      }
    });
  },
  close: function(closer, menuName) {
    closer.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      menuName.classList.remove('on');
    });
  },
};

const qExOpener = document.getElementById('qExOpener'),
  optSub = document.getElementById('optSub');
const userMenuOpener = document.getElementById('userMenuOpener'),
  userMenu = document.getElementById('userMenu');
const detailSrchOpener = document.getElementById('detailSrchOpener'),
  detailSrchSub = document.getElementById('detailSrchSub'),
  detailSrchApply = document.getElementById('detailSrchApply'),
  detailSrchCloser = document.getElementById('detailSrchCloser');
// const srcOpener = document.querySelector('.srcOpener'),
//   srcSub = document.querySelector('srcSub');

// 질문 예시 서브랩
// sMenuHandler.on(qExOpener, optSub);
// sMenuHandler.off(qExOpener, optSub);
// 유저메뉴 서브랩
sMenuHandler.on(userMenuOpener, userMenu);
sMenuHandler.off(userMenuOpener, userMenu);
// 검색 조건 설정 서브랩
sMenuHandler.on(detailSrchOpener, detailSrchSub);
sMenuHandler.off(detailSrchOpener, detailSrchSub);
sMenuHandler.close(detailSrchCloser, detailSrchSub);
sMenuHandler.close(detailSrchApply, detailSrchSub);
// 출처표기 모달
// sMenuHandler.on(srcOpener, srcSub);
// sMenuHandler.off(srcOpener, srcSub);
/** 플로팅 메뉴 핸들러 END */

/** 좌축 ASIDE 내 지난대화 목록 옵션 플로팅 메뉴 START **/
const recordList = document.getElementById('recordList'),
  asdSub = document.getElementById('asdSubMenu');
let currentAsdItem = null;

recordList.addEventListener('click', function (e) {
  if (e.target.classList.contains('asd-menu-icon')) {
    const btn = e.target;
    const item = btn.closest('.asd_item');
    currentAsdItem = item;

    const rect = btn.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    const offsetX = 18;
    const offsetY = 0;

    asdSub.style.top = rect.top + scrollTop + offsetY + 'px';
    asdSub.style.left = rect.left + scrollLeft + offsetX + 'px';
    asdSub.classList.remove('hidden');
  }
});

document.addEventListener('click', function (e) {
  if (
    !asdSub.contains(e.target) &&
    !e.target.classList.contains('asd-menu-icon')
  ) {
    asdSub.classList.add('hidden');
  }
});

// "이름바꾸기" 클릭 시 수정 모드
asdSub.querySelector('.sub_item.modify').addEventListener('click', () => {
  if (!currentAsdItem) return;

  const txtEl = currentAsdItem.querySelector('.txt');
  const oldText = txtEl.textContent;

  currentAsdItem.classList.add('edit');
  txtEl.style.display = 'none';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'edit-name';
  input.value = oldText;
  currentAsdItem.querySelector('.item-name').appendChild(input);
  input.focus();

  let done = false;
  const finishEdit = () => {
    if (done) return;
    done = true;

    const newText = input.value.trim() || oldText;
    txtEl.textContent = newText;
    txtEl.style.display = '';
    if (input.isConnected) input.remove();
    currentAsdItem.classList.remove('edit');
    currentAsdItem = null;
  };

  // "이름 바꾸기" // 중복실행이 발견되어 보완
  input.addEventListener('blur', finishEdit);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      finishEdit();
    } else if (e.key === 'Escape') {
      // ESC 누르면 취소
      input.value = oldText;
      finishEdit();
    }
  });

  asdSub.classList.add('hidden');
});

// "삭제하기" 클릭 시 모달 열기
asdSub.querySelector('.sub_item.delete').addEventListener('click', () => {
  if (!currentAsdItem) return;
  asdSub.classList.add('hidden');
  openDeleteModal(currentAsdItem);
});

// "삭제하기" // 모달 관련
const modal = document.getElementById('asdConfirmModal');
const modalName = document.getElementById('asdDelTargetName');
const btnCancel = document.getElementById('asdBtnCancel');
const btnDelete = document.getElementById('asdBtnDelete');

let pendingDeleteItem = null; // 모달에서 실제 삭제할 아이템

function openDeleteModal(item) {
  pendingDeleteItem = item;
  // 표시용 이름(없으면 공백)
  const name = item?.querySelector('.txt')?.textContent?.trim() || '';
  modalName.textContent = name;

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
  // 접근성/편의: 기본 포커스 취소 버튼
  btnCancel.focus();
}

function closeDeleteModal() {
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
  pendingDeleteItem = null;
}

// 모달 외부(백드롭) 클릭 시 닫기
modal.addEventListener('click', (e) => {
  if (e.target.dataset.modalDismiss === 'true') {
    closeDeleteModal();
  }
});

// ESC로 닫기
document.addEventListener('keydown', (e) => {
  if (!modal.classList.contains('hidden') && e.key === 'Escape') {
    closeDeleteModal();
  }
});

// 취소 버튼
btnCancel.addEventListener('click', () => {
  closeDeleteModal();
});

// 삭제 버튼
btnDelete.addEventListener('click', () => {
  if (pendingDeleteItem && pendingDeleteItem.isConnected) {
    // 편집 중 input이 있든 말든, 통째로 제거
    pendingDeleteItem.remove();
  }
  // 현재 타겟 초기화
  if (typeof currentAsdItem !== 'undefined' && currentAsdItem === pendingDeleteItem) {
    currentAsdItem = null;
  }
  closeDeleteModal();
});
/** 좌축 ASIDE 내 지난대화 목록 옵션 플로팅 메뉴 END **/


/**
     * initFoldToggle
     * 컨테이너 내부의 .fold-hd를 클릭하면
     * 연결된 .fold-hd와 .fold-bd에 .folded를 토글한다.
     * 
     * @param {string} foldListContainer - 토글 기능을 적용할 컨테이너 선택자
     */
    function initFoldToggle(foldListContainer = '.fold-cont') {
      document.querySelectorAll(foldListContainer).forEach(container => {
        const hd = container.querySelector('.fold-hd');
        const bd = container.querySelector('.fold-bd');

        if (hd && bd) {
          hd.addEventListener('click', () => {
            hd.classList.toggle('folded');
            bd.classList.toggle('folded');
          });
        }
      });
    }

    // DOM 로드 후 실행
    document.addEventListener('DOMContentLoaded', () => {
      initFoldToggle('.fold-cont');
    });

/**
 * initSidebarToggle
 * 사이드바 내부의 .sidebar-toggler 클릭 시 target에 .collapsed 토글.
 * 관련된 .fold-hd / .fold-bd에서 .folded 제거.
 *
 * @param {Element|string} container - 사이드바 래퍼(선택자 또는 Element)
 * @param {Element|string|null} target - .collapsed 토글 대상(미지정 시 container)
 */
// function initSidebarToggle(container = '.collapse-area', target = null) {
//   const $container = typeof container === 'string'
//     ? document.querySelector(container)
//     : container;

//   if (!$container) return; // 컨테이너 없음

//   const $toggler = $container.querySelector('.sidebar-toggler');
//   if (!$toggler) return;   // 토글 버튼 없음

//   const $target = target
//     ? (typeof target === 'string' ? document.querySelector(target) : target)
//     : $container;

//   const $hd = $container.querySelector('.fold-hd');
//   const $bd = $container.querySelector('.fold-bd');

//   // 클릭으로 토글
//   $toggler.addEventListener('click', (e) => {
//     e.preventDefault();
//     if ($target) $target.classList.toggle('collapsed');
//     if ($hd) $hd.classList.add('folded');
//     if ($bd) $bd.classList.add('folded');

//     // 접근성: aria-expanded 갱신
//     const expanded = $toggler.getAttribute('aria-expanded') === 'true';
//     $toggler.setAttribute('aria-expanded', String(!expanded));
//   });

//   // 키보드 접근성(Enter/Space)
//   $toggler.addEventListener('keydown', (e) => {
//     if (e.key === 'Enter' || e.key === ' ') {
//       e.preventDefault();
//       $toggler.click();
//     }
//   });
// }

// // DOM 로드 후 실행
// document.addEventListener('DOMContentLoaded', () => {
//   // 컨테이너: .layout-asd, 토글 대상: #aside (주석대로 동작)
//   initSidebarToggle('.layout-asd', '#aside');
// });

/* ===== ultra-hardened sidebar toggle ===== */
(() => {
  const ready = (fn) =>
    (document.readyState === 'loading')
      ? document.addEventListener('DOMContentLoaded', fn, { once: true })
      : fn();

  ready(() => {
    const aside   = document.getElementById('aside');            // 토글 대상(DIV)
    const toggler = document.getElementById('sidebarToggler');    // <p.sidebar-toggler> (래퍼)
    const clickableSel = '#aside > aside.scrbar';                 // 접힌 상태에서 펼치기 클릭영역

    if (!aside) return console.warn('[toggle] #aside 없음');
    if (!toggler) console.warn('[toggle] #sidebarToggler 없음(문서 위임으로만 동작)');

    const expand   = () => aside.classList.remove('collapsed');
    const collapse = () => aside.classList.add('collapsed');
    const toggle   = () => aside.classList.toggle('collapsed');

    // 1) 문서 위임 (캡처 단계) — 제3자 코드가 stopPropagation 해도 관통
    document.addEventListener('click', (e) => {
      const t = e.target.closest('#sidebarToggler, .sidebar-toggler');
      if (!t) return;
      // 버튼이 submit이어도 방지
      e.preventDefault();
      toggle();
    }, true);

    // 2) 토글러 자체에도 직접 바인딩(버튼/래퍼 모두)
    if (toggler) {
      // 내부 버튼이 submit이면 막기
      const btn = toggler.querySelector('button');
      if (btn && !btn.hasAttribute('type')) btn.setAttribute('type', 'button');

      toggler.addEventListener('click', (e) => {
        e.preventDefault();
        toggle();
      });

      toggler.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    }

    // 3) 접힌 상태에서만 #aside > aside.scrbar 클릭/키입력 → 펼치기
    const clickable = document.querySelector(clickableSel);
    if (clickable) {
      // 시각 힌트
      const syncCursor = () => {
        clickable.style.cursor = aside.classList.contains('collapsed') ? 'pointer' : '';
      };
      syncCursor();

      document.addEventListener('click', (e) => {
        if (!aside.classList.contains('collapsed')) return;
        if (e.target.closest(clickableSel)) {
          e.preventDefault();
          expand();
          syncCursor();
        }
      }, true);

      clickable.addEventListener('keydown', (e) => {
        if (!aside.classList.contains('collapsed')) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          expand();
          syncCursor();
        }
      });

      // 처음 한번 ARIA 최소부여
      if (aside.classList.contains('collapsed')) {
        clickable.setAttribute('role', 'button');
        clickable.setAttribute('tabindex', '0');
        clickable.setAttribute('aria-label', '사이드바 펼치기');
      }
    }

    // 4) 사이드바 DOM이 교체되는 SPA 대비 — 토글 상태 유지 + 이벤트 살아있게
    const mo = new MutationObserver(() => {
      // 교체 시점에도 위임 리스너가 있어서 대부분 커버됨.
      // 필요시 여기서 재동기화 가능.
    });
    mo.observe(aside, { childList: true, subtree: true });

    // 5) 빠른 콘솔 로깅(원하면 열어보기)
    // console.log('[toggle] ready:', { aside, toggler, clickable: !!clickable });
  });
})();


/** .user-q-input 유저질문용 textarea 높이 조절 // START */
  (() => {
    const ta = document.querySelector('.user-q-input');
    if (!ta) return;

    const MAX_PX = 340; //최대 높이
    const EXTRA = 2;

    let ticking = false;
    let last = 0;

    function measure() {
      const r = ta.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) return {
        target: last,
        overflow: 'hidden'
      };

      const prev = ta.style.height;
      ta.style.height = 'auto';
      const scrollH = ta.scrollHeight;
      ta.style.height = prev;

      const target = Math.min(scrollH + EXTRA, MAX_PX);
      const overflow = (scrollH + EXTRA > MAX_PX) ? 'auto' : 'hidden';
      return {
        target,
        overflow
      };
    }

    function applyHeight() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const {
          target,
          overflow
        } = measure();

        if (Math.abs(target - last) > 0.5) {
          ta.style.setProperty('height', target + 'px', 'important');
          last = target;
        }
        ta.style.overflowY = overflow;

        requestAnimationFrame(() => {
          const again = measure();
          if (Math.abs(again.target - last) > 0.5) {
            ta.style.setProperty('height', again.target + 'px', 'important');
            last = again.target;
          }
          ta.style.overflowY = again.overflow;
          ticking = false;
        });
      });
    }

    ta.addEventListener('input', applyHeight);
    ta.addEventListener('change', applyHeight);

    applyHeight();

    document.fonts?.ready?.then(applyHeight);

    const io = new IntersectionObserver(e => {
      if (e[0]?.isIntersecting) applyHeight();
    });
    io.observe(ta);

    const ro = new ResizeObserver(applyHeight);
    ro.observe(ta);

    ta.form?.addEventListener('reset', () => {
      ta.value = '';
      last = 0;
      applyHeight();
    });
  })();
  /** .user-q-input 유저질문용 textarea 높이 조절 // END */


  /**
   * - #qSend 클릭 후 새 질문 잡아 스크롤 고정
   * - Enter 전송 포함 (Shift + Enter 제외)
   * - 실패 시 최하단으로
   */
  (function() {
    const SCROLL_BOX_SEL = '#chatScroll';
    const LIST_BOX_SEL = '#convListBox';
    const SEND_BTN_SEL = '#qSend';
    const INPUT_SEL = '#qInput';

    const scrollBox = document.querySelector(SCROLL_BOX_SEL);
    const listBox = document.querySelector(LIST_BOX_SEL);
    if (!scrollBox || !listBox) return;

    function findLastUser() {
      const sel = '.conv--user';
      const nodes = listBox.querySelectorAll(sel);
      return nodes.length ? nodes[nodes.length - 1] : listBox.lastElementChild;
    }

    function scrollToLast() {
      const target = findLastUser();
      if (target) {
        scrollBox.scrollTop = target.offsetTop;
      } else {
        scrollBox.scrollTop = scrollBox.scrollHeight; // fallback
      }
    }

    // #qSend 클릭
    document.addEventListener('click', (e) => {
      if (e.target.closest(SEND_BTN_SEL)) {
        setTimeout(scrollToLast, 0);
      }
    });

    // Enter 전송 (Shift+Enter 제외)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && e.target.closest(INPUT_SEL)) {
        setTimeout(scrollToLast, 0);
      }
    });
  })();


/** 근거자료 여닫기
 *  임시 작성
 *  ai 답변 하단의 .srcCall 클릭 시 #srcBrd에 .on 토글
 *  #srcBrd 내부의 #srcBrdCloser 혹은 #srcBrd의 외부 클릭 시 #srcBrd의 .on 클래스 제거 > 닫힘
 */
document.addEventListener('DOMContentLoaded', () => {
  const opener = document.querySelector('.srcCall');
  const board = document.querySelector('#srcBrd');
  const closer = document.querySelector('#srcBrdCloser');
  const modal  = document.getElementById('modalMsg'); // ✅ 모달 루트 참조
  const wrap = document.getElementById('wrap');
  const dsbrdOpener = document.getElementById('sectRightOpener');
  const asdTggr = document.getElementById('sidebarToggler');

  if (!opener || !board || !closer) return;

  // 열기 / 닫기 토글
  opener.addEventListener('click', (e) => {
    e.stopPropagation(); // 외부 클릭 이벤트 전파 방지
    board.classList.toggle('on');
    wrap.classList.toggle('addSrcbrd');
    wrap.classList.remove(
      'addDsbrd',
      'addLogbrd',
      'addCnvsDocBrd',
      'addCnvsWebBrd',
    );
    // wrap.classList.remove('addDsbrd');
    // wrap.classList.remove('addLogbrd');
    // wrap.classList.remove('addCnvsDocBrd');
    // wrap.classList.remove('addCnvsWebBrd');
    dsbrdOpener.classList.remove('on');
  });

  // 닫기 버튼 클릭 시 닫힘
  closer.addEventListener('click', (e) => {
    e.stopPropagation();
    board.classList.remove('on');
    wrap.classList.remove('addSrcbrd');
  });

  dsbrdOpener.addEventListener('click', (e) => {
    e.stopPropagation();
    board.classList.remove('on');
    // wrap.classList.remove('addSrcbrd');
    wrap.classList.remove(
      'addSrcbrd',
      'addLogbrd',
      'addCnvsDocBrd',
      'addCnvsWebBrd',
    );
    wrap.classList.toggle('addDsbrd');
    dsbrdOpener.classList.toggle('on');
  });

  // 외부 클릭 시 닫힘
  // document.addEventListener('click', (e) => {
  //    // ✅ 모달 내부에서 발생한 모든 클릭은 사이드 보드 닫힘 로직을 건너뜀
  //   if (modal && modal.contains(e.target)) return;
  //   if (asdTggr && asdTggr.contains(e.target)) return;

  //   // #srcBrd 영역 외부 클릭 시만 닫기
  //   if (!board.contains(e.target) && !opener.contains(e.target)) {
  //     board.classList.remove('on');
  //     wrap.classList.remove('addSrcbrd');
  //     // wrap.classList.remove('addDscbrd');
  //     // dsbrdOpener.classList.remove('on');
  //   }
  // });
});

/** 메시지 목록 모달: 셀 클릭으로 열기(.table--buzz td.open), 닫기(버튼/배경/ESC) */
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('modalMsg');
  const closeBtn = document.getElementById('msgModalClose');
  const nameMEl = modal?.querySelector('.modal-title .name-m');
  const nameSEl = modal?.querySelector('.modal-title .name-s');

  if (!modal) {
    console.warn('[modal] #modalMsg가 없습니다.');
    return;
  }

  // 유틸: 텍스트 정리
  const cleanText = (el) => (el?.textContent || '').trim();

  document.addEventListener('click', (e) => {
    // 1) 외부 테이블 셀 클릭 → 열기 (모든 .table--buzz 대상, td.open만)
    const cell = e.target.closest('td.open');
    const table = cell?.closest('table.table--buzz');

    if (table && cell) {
      // 링크가 셀 안에 있어도 네비게이션되지 않도록 방지
      if (e.target.closest('a')) e.preventDefault();

      const row = cell.closest('tr');
      const colIndex = cell.cellIndex; // 클릭한 셀의 열 인덱스

      // (1) 같은 테이블의 헤더행에서 동일한 열의 th 텍스트 추출
      let headerText = '';
      const theadRow =
        table.tHead?.rows?.[0] ||
        table.querySelector('thead tr') ||
        null;

      if (theadRow) {
        const th = theadRow.cells[colIndex];
        headerText = cleanText(th);
      } else {
        // thead가 없다면 첫 번째 행을 헤더 대용으로 시도 (안전장치)
        const firstRow = table.querySelector('tr');
        headerText = cleanText(firstRow?.cells?.[colIndex]);
      }

      // (2) 같은 행에서 td.td-brd 텍스트 추출
      const brdCell = row.querySelector('td.td-brd, th.td-brd');
      const brdText = cleanText(brdCell);

      // (3) 모달 타이틀 주입
      if (nameMEl) nameMEl.textContent = headerText;
      if (nameSEl) nameSEl.textContent = brdText;

      // (4) 모달 열기
      modal.classList.add('on');
      return;
    }

    // 2) 닫기 버튼 → 닫기
    if (closeBtn && (e.target === closeBtn || e.target.closest('#msgModalClose'))) {
      modal.classList.remove('on');
      return;
    }

    // 3) 배경(오버레이) 클릭 → 닫기
    if (e.target === modal) {
      modal.classList.remove('on');
      return;
    }
  });

  // 4) ESC → 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('on')) {
      modal.classList.remove('on');
    }
  });
});



/**
 * 근거자료 > url list
 */
// 샘플데이터 - 인용자료
const urlsAnno = [
  "https://www.lavender.ai/product",
  "https://www.landing.love/page/2/",
  "https://nvg8.io/?ref=landing.love",
  "https://lqve.jp/about/",
  "https://oatside.com/?ref=landing.love",
  "https://www.offmenu.design/?ref=landing.love#work"
];

// 샘플데이터 - 더보기
const urlsSrc = [
  "https://www.landing.love/sites/aave/",
  "https://aave.com/?ref=landing.love",
  "https://get.imagica.ai/studio?ref=landing.love",
  "https://godly.website/"
];

const MULTIPART_SUFFIXES = new Set([
  "co.kr","go.kr","or.kr","ac.kr","re.kr","pe.kr","ne.kr",
  "co.jp","ac.jp","ne.jp","or.jp"
]);

function extractSecondLevelDomain(urlString) {
  try {
    const u = new URL(urlString);
    let host = u.hostname.toLowerCase();
    if (host.startsWith("www.")) host = host.slice(4);
    const parts = host.split(".");
    if (parts.length < 2) return capitalize(host);

    const last = parts[parts.length - 1];
    const secondLast = parts[parts.length - 2];
    const tail = `${secondLast}.${last}`;

    let name = secondLast;
    if (MULTIPART_SUFFIXES.has(tail) && parts.length >= 3) {
      name = parts[parts.length - 3];
    }
    return capitalize(name);
  } catch {
    const m = urlString.match(/https?:\/\/([^/]+)/i);
    if (!m) return urlString;
    let host = m[1].toLowerCase();
    if (host.startsWith("www.")) host = host.slice(4);
    const parts = host.split(".");
    return capitalize(parts.length >= 2 ? parts[parts.length - 2] : host);
  }
}

// 첫 글자만 대문자
function capitalize(str = "") {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 카드 렌더링
function renderCardList({ container, items, cardType, defaultFavicon = "./src/assets/img/icon/icon-world.svg" }) {
  if (!container) return;
  container.innerHTML = "";

  const frag = document.createDocumentFragment();

  items.forEach((url) => {
    const li = document.createElement("li");
    li.className = `card_item ${cardType}`;

    const a = document.createElement("a");
    a.className = "card_inner";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const hd = document.createElement("div");
    hd.className = "item-hd";

    const site = document.createElement("div");
    site.className = "item-site";

    const favi = document.createElement("p");
    favi.className = "favi";

    const name = document.createElement("p");
    name.className = "name";
    name.textContent = extractSecondLevelDomain(url);

    site.appendChild(favi);
    site.appendChild(name);
    hd.appendChild(site);

    const bd = document.createElement("div");
    bd.className = "item-bd";

    const urlText = document.createElement("p");
    urlText.className = "url";
    urlText.textContent = url;

    bd.appendChild(urlText);

    a.appendChild(hd);
    a.appendChild(bd);
    li.appendChild(a);

    frag.appendChild(li);

    // 기본 파비콘 처리
    requestAnimationFrame(() => {
      const bg = getComputedStyle(favi).backgroundImage;
      if (!bg || bg === "none") {
        favi.style.backgroundImage = `url("${defaultFavicon}")`;
      }
    });
  });

  container.appendChild(frag);
}

// url 카드리스트 랜더 실행
renderCardList({
  container: document.getElementById("urlAnnoCardList"),
  items: urlsAnno,
  cardType: "anno"
});

renderCardList({
  container: document.getElementById("urlSrcCardList"),
  items: urlsSrc,
  cardType: "src"
});


/**
 * 답변 > 출처 링크 아이콘화 *
 * p태그, li태그의 마지막 a태그를 아이콘화하기.
 * a태그 앞뒤의 괄호를 지운다.
 * a태그 뒤 온점을 지운다.
 * a태그 바로 앞의 글자 뒤에 온점을 추가한다.
 */
// 표시용 도메인 추출 (.com .net .co .kr 등 제거)
function extractDisplayDomain(url) {
  try {
    const hostname = new URL(url).hostname; // e.g., "news.naver.co.kr"
    const parts = hostname.split('.').filter(p => p !== 'www');
    const drop = new Set([
      'com','net','org','co','kr','jp','io','ai','app',
      'dev','edu','gov','me','us','nz','ca'
    ]);
    const filtered = parts.filter(p => !drop.has(p.toLowerCase()));
    return filtered[filtered.length - 1] || parts[parts.length - 2] || hostname;
  } catch {
    return '출처';
  }
}

// 링크 아이콘 생성
function createLinkIcon() {
  const wrap = document.createElement('span');
  wrap.className = 'src-icon';
  wrap.setAttribute('aria-hidden', 'true');

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');

  const path = document.createElementNS(svgNS, 'path');
  path.setAttribute('fill', 'currentColor');
  path.setAttribute('d',
    'M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z'
  );

  svg.appendChild(path);
  wrap.appendChild(svg);
  return wrap;
}

// 모든 .aiAnswer 내 p, li 마지막 a 처리
function enhanceSourceLinksAll() {
  const containers = document.querySelectorAll('.a_box');
  if (!containers.length) return;

  containers.forEach(root => {
    root.querySelectorAll('p, li').forEach(node => {
      const a = node.lastElementChild;
      if (!a || a.tagName !== 'A') return;

      // 이미 처리된 링크는 스킵
      if (a.classList.contains('src-link')) return;

      // a 앞의 텍스트 노드: "(" 제거 + 온점 붙이기
      const prev = a.previousSibling;
      if (prev && prev.nodeType === Node.TEXT_NODE) {
        let txt = prev.textContent || '';

        // 끝에 오는 "(" 제거
        txt = txt.replace(/\(\s*$/, '');
        // 끝 공백 제거
        txt = txt.replace(/\s+$/, '');
        // 마지막 글자 뒤에 온점이 없다면 온점 추가
        if (txt && !/[.!?。！？]$/.test(txt)) {
          txt = txt + '.';
        }

        prev.textContent = txt;
      }

      // a 뒤의 텍스트 노드: ")"와 그 뒤의 온점 제거
      const next = a.nextSibling;
      if (next && next.nodeType === Node.TEXT_NODE) {
        // 시작 부분의 공백 + ")" + 공백 + 선택적인 "." 제거
        next.textContent = next.textContent.replace(/^\s*\)\s*\.?/, '');
      }

      const href = a.getAttribute('href') || a.href || '';
      const display = extractDisplayDomain(href);

      a.classList.add('src-link');
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.setAttribute('aria-label', display + ' 링크');

      // 텍스트를 도메인 표시로 교체
      a.textContent = display;

      // 아이콘 prepend
      a.prepend(createLinkIcon());
    });
  });
}

// 최초 실행
enhanceSourceLinksAll();

// 동적 추가 대응 (옵션)
const observer = new MutationObserver(enhanceSourceLinksAll);
observer.observe(document.body, { childList: true, subtree: true });


// 대화 시작 시 대화 모드 및 모델 선택
document.addEventListener('DOMContentLoaded', () => {
  const ITEM_SHARED_CLASSES = ['select_item', 'selected', 'disabled'];
  const SELECTED_SHARED_CLASSES = ['selected_item'];

  function getItemOptionClasses(item) {
    return [...item.classList].filter((className) => {
      return !ITEM_SHARED_CLASSES.includes(className);
    });
  }

  function getSelectedBaseClasses(selectedItem) {
    const prevOptionClasses = (selectedItem.dataset.optionClasses || '')
      .split(' ')
      .filter(Boolean);

    return [...selectedItem.classList].filter((className) => {
      return (
        !SELECTED_SHARED_CLASSES.includes(className) &&
        !prevOptionClasses.includes(className)
      );
    });
  }

  function getItemValue(item) {
    const explicitValue = item.dataset.value?.trim();
    if (explicitValue) return explicitValue;

    const optionClasses = getItemOptionClasses(item);
    return optionClasses[0] || '';
  }

  function getItemText(item) {
    return item.querySelector('.txt')?.textContent.trim() || '';
  }

  function syncSelectedItem(selectedItem, activeItem) {
    if (!selectedItem || !activeItem) return;

    const baseClasses = getSelectedBaseClasses(selectedItem);
    const optionClasses = getItemOptionClasses(activeItem);
    const value = getItemValue(activeItem);
    const text = getItemText(activeItem);
    const selectedText = selectedItem.querySelector('.txt');

    selectedItem.className = ['selected_item', ...baseClasses, ...optionClasses].join(' ');
    selectedItem.dataset.value = value;
    selectedItem.dataset.optionClasses = optionClasses.join(' ');

    if (selectedText) {
      selectedText.textContent = text;
    }
  }

  function closeAllSelects(exception = null) {
    document.querySelectorAll('.custom-select').forEach((selectWrap) => {
      if (selectWrap !== exception) {
        selectWrap.classList.remove('is-open');
        const sub = selectWrap.querySelector('.select_sub');
        if (sub) sub.classList.remove('open');
      }
    });
  }

  // function updateDebug(selectWrap, debugId) {
  //   const debug = document.getElementById(debugId);
  //   const selectedItem = selectWrap.querySelector('.selected_item');
  //   if (!debug || !selectedItem) return;

  //   const value = selectedItem.dataset.value || '';
  //   const classes = [...selectedItem.classList]
  //     .filter((cls) => cls !== 'selected_item')
  //     .join(' ');

  //   debug.innerHTML = `
  //     value: <strong>${value}</strong><br />
  //     classes: <strong>${classes}</strong>
  //   `;
  // }

  const customSelects = document.querySelectorAll('.custom-select');

  customSelects.forEach((selectWrap) => {
    const opener = selectWrap.querySelector('.select-opener');
    const selectedItem = selectWrap.querySelector('.selected_item');
    const selectSub = selectWrap.querySelector('.select_sub');
    const selectItems = selectWrap.querySelectorAll('.select_item');

    if (!opener || !selectedItem || !selectSub || !selectItems.length) return;

    const initialSelected =
      selectWrap.querySelector('.select_item.selected:not(.disabled)') ||
      [...selectItems].find((item) => !item.classList.contains('disabled'));

    if (initialSelected) {
      selectWrap.querySelectorAll('.select_item.selected').forEach((item) => {
        if (item !== initialSelected) {
          item.classList.remove('selected');
        }
      });
      initialSelected.classList.add('selected');
      syncSelectedItem(selectedItem, initialSelected);
    }

    opener.addEventListener('click', (e) => {
      e.stopPropagation();

      const isOpen = selectSub.classList.contains('open');
      closeAllSelects(selectWrap);

      if (!isOpen) {
        selectSub.classList.add('open');
        selectWrap.classList.add('is-open');
      } else {
        selectSub.classList.remove('open');
        selectWrap.classList.remove('is-open');
      }
    });

    selectItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();

        if (item.classList.contains('disabled')) return;

        selectWrap.querySelectorAll('.select_item.selected').forEach((selected) => {
          selected.classList.remove('selected');
        });

        item.classList.add('selected');
        syncSelectedItem(selectedItem, item);

        selectSub.classList.remove('open');
        selectWrap.classList.remove('is-open');

        const changeEvent = new CustomEvent('customSelectChange', {
          detail: {
            value: getItemValue(item),
            text: getItemText(item),
            itemClasses: getItemOptionClasses(item),
            selectedElement: item,
            selectWrap
          }
        });

        selectWrap.dispatchEvent(changeEvent);
      });
    });
  });

  document.addEventListener('click', (e) => {
    document.querySelectorAll('.custom-select').forEach((selectWrap) => {
      if (!selectWrap.contains(e.target)) {
        selectWrap.classList.remove('is-open');
        const selectSub = selectWrap.querySelector('.select_sub');
        if (selectSub) {
          selectSub.classList.remove('open');
        }
      }
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 공통으로 제외할 클래스 정의
  // --------------------------------------------------
  // select-confirm_item 자체의 공통 클래스들
  // - selected: 현재 확정된 값
  // - clicked: 사용자가 임시로 클릭한 값
  // - disabled: 선택 불가
  const ITEM_SHARED_CLASSES = ['select-confirm_item', 'selected', 'clicked', 'disabled'];

  // selected-confirm_item 자체의 공통 클래스
  const SELECTED_SHARED_CLASSES = ['selected-confirm_item'];

  // --------------------------------------------------
  // 옵션 아이템에서 "개별 클래스"만 추출
  // --------------------------------------------------
  // 예:
  // <li class="select-confirm_item gpt-5_2 selected">
  // => ["gpt-5_2"] 반환
  function getOptionClasses(item) {
    return [...item.classList].filter((className) => {
      return !ITEM_SHARED_CLASSES.includes(className);
    });
  }

  // --------------------------------------------------
  // 표시 영역(selected-confirm_item)의 기본 클래스만 추출
  // --------------------------------------------------
  // 이전에 붙었던 옵션 클래스는 제거하고,
  // 원래 유지되어야 하는 클래스만 남기기 위한 함수
  function getSelectedBaseClasses(selectedItem) {
    const prevOptionClasses = (selectedItem.dataset.optionClasses || '')
      .split(' ')
      .filter(Boolean);

    return [...selectedItem.classList].filter((className) => {
      return (
        !SELECTED_SHARED_CLASSES.includes(className) &&
        !prevOptionClasses.includes(className)
      );
    });
  }

  // --------------------------------------------------
  // 옵션 아이템의 value 가져오기
  // --------------------------------------------------
  // 1) data-value가 있으면 그 값을 사용
  // 2) 없으면 옵션의 개별 클래스 첫 번째를 value로 사용
  function getItemValue(item) {
    const explicitValue = item.dataset.value?.trim();
    if (explicitValue) return explicitValue;

    const optionClasses = getOptionClasses(item);
    return optionClasses[0] || '';
  }

  // --------------------------------------------------
  // 옵션 아이템의 텍스트 가져오기
  // --------------------------------------------------
  function getItemText(item) {
    return item.querySelector('.txt')?.textContent.trim() || '';
  }

  // --------------------------------------------------
  // 현재 상단에 표시되는 선택 표시 영역 가져오기
  // --------------------------------------------------
  function getSelectedItem(selectWrap) {
    return selectWrap.querySelector('.selected-confirm_item');
  }

  // --------------------------------------------------
  // 현재 확정된(selected) 옵션 찾기
  // --------------------------------------------------
  function getCurrentSelectedOption(selectWrap) {
    return selectWrap.querySelector('.select-confirm_item.selected:not(.disabled)');
  }

  // --------------------------------------------------
  // 현재 임시 선택(clicked) 옵션 찾기
  // --------------------------------------------------
  function getCurrentClickedOption(selectWrap) {
    return selectWrap.querySelector('.select-confirm_item.clicked:not(.disabled)');
  }

  // --------------------------------------------------
  // 확인 버튼 찾기
  // --------------------------------------------------
  function getConfirmButton(selectWrap) {
    return selectWrap.querySelector('.btn--confirm');
  }

  // --------------------------------------------------
  // .other-box 요소 찾기
  // --------------------------------------------------
  // 이번에 추가된 기능용
  // 같은 custom-select-confirm 내부에 있는 .other-box를 찾는다.
  // 없으면 null이므로, 다른 구조에서는 그냥 무시된다.
  function getOtherBox(selectWrap) {
    return selectWrap.querySelector('.other-box');
  }

  // --------------------------------------------------
  // 확인 버튼 활성화 / 비활성화
  // --------------------------------------------------
  function enableConfirm(selectWrap) {
    const confirmBtn = getConfirmButton(selectWrap);
    if (confirmBtn) confirmBtn.classList.remove('disabled');
  }

  function disableConfirm(selectWrap) {
    const confirmBtn = getConfirmButton(selectWrap);
    if (confirmBtn) confirmBtn.classList.add('disabled');
  }

  // --------------------------------------------------
  // 임시 클릭(clicked) 상태 제거
  // --------------------------------------------------
  function clearClicked(selectWrap) {
    selectWrap.querySelectorAll('.select-confirm_item.clicked').forEach((item) => {
      item.classList.remove('clicked');
    });
  }

  // --------------------------------------------------
  // 상단 표시 영역 갱신
  // --------------------------------------------------
  // 현재 확정된 옵션의 텍스트 / value / 개별 클래스 반영
  function syncSelectedDisplay(selectedDisplay, activeItem) {
    if (!selectedDisplay || !activeItem) return;

    const baseClasses = getSelectedBaseClasses(selectedDisplay);
    const optionClasses = getOptionClasses(activeItem);
    const value = getItemValue(activeItem);
    const text = getItemText(activeItem);
    const selectedText = selectedDisplay.querySelector('.txt');

    // selected-confirm_item에는
    // "기본 클래스 + 현재 선택된 옵션의 개별 클래스"만 남기도록 재구성
    selectedDisplay.className = ['selected-confirm_item', ...baseClasses, ...optionClasses].join(' ');

    selectedDisplay.dataset.value = value;
    selectedDisplay.dataset.optionClasses = optionClasses.join(' ');

    if (selectedText) {
      selectedText.textContent = text;
    }
  }

  // --------------------------------------------------
  // .other-box on/off 상태 갱신
  // --------------------------------------------------
  // 이번 수정의 핵심 함수
  //
  // 규칙:
  // - 현재 확정된 .selected 항목이 속한 .box_item 찾기
  // - 현재 임시 선택된 .clicked 항목이 속한 .box_item 찾기
  // - 두 box_item이 서로 다르면 .other-box에 .on 추가
  // - 같거나, 둘 중 하나라도 box_item이 없으면 .on 제거
  //
  // 참고:
  // .box_item 구조가 없는 드롭다운에서도 에러 없이 동작해야 하므로
  // closest('.box_item') 결과가 없을 때는 그냥 .on 제거 처리
  function updateOtherBoxState(selectWrap) {
    const otherBox = getOtherBox(selectWrap);

    // .other-box가 없는 구조라면 아무것도 하지 않음
    if (!otherBox) return;

    const selectedItem = getCurrentSelectedOption(selectWrap);
    const clickedItem = getCurrentClickedOption(selectWrap);

    // clicked가 없으면 비교할 대상이 없으므로 .on 제거
    if (!selectedItem || !clickedItem) {
      otherBox.classList.remove('on');
      return;
    }

    // 각각이 속한 상위 .box_item 찾기
    const selectedBoxItem = selectedItem.closest('.box_item');
    const clickedBoxItem = clickedItem.closest('.box_item');

    // 둘 다 .box_item 안에 있고, 서로 다른 박스라면 .on 추가
    if (selectedBoxItem && clickedBoxItem && selectedBoxItem !== clickedBoxItem) {
      otherBox.classList.add('on');
    } else {
      otherBox.classList.remove('on');
    }
  }

  // --------------------------------------------------
  // 임시 상태 초기화
  // --------------------------------------------------
  // - clicked 제거
  // - 확인 버튼 비활성화
  // - .other-box.on 제거 여부까지 함께 갱신
  function resetConfirmState(selectWrap) {
    clearClicked(selectWrap);
    disableConfirm(selectWrap);
    updateOtherBoxState(selectWrap);
  }

  // --------------------------------------------------
  // 드롭다운 닫기
  // --------------------------------------------------
  function closeConfirmSelect(selectWrap) {
    selectWrap.classList.remove('is-open');
    const sub = selectWrap.querySelector('.select-confirm_sub');
    if (sub) sub.classList.remove('open');
  }

  // --------------------------------------------------
  // 다른 confirm 셀렉트 닫기
  // --------------------------------------------------
  function closeAllConfirmSelects(exception = null) {
    document.querySelectorAll('.custom-select-confirm').forEach((selectWrap) => {
      if (selectWrap !== exception) {
        resetConfirmState(selectWrap);
        closeConfirmSelect(selectWrap);
      }
    });
  }

  // --------------------------------------------------
  // 디버그 표시용 함수
  // --------------------------------------------------
  // function updateDebug(selectWrap, debugId) {
  //   const debug = document.getElementById(debugId);
  //   const selectedDisplay = getSelectedItem(selectWrap);
  //   const clickedItem = getCurrentClickedOption(selectWrap);

  //   if (!debug || !selectedDisplay) return;

  //   const value = selectedDisplay.dataset.value || '';
  //   const classes = [...selectedDisplay.classList]
  //     .filter((cls) => cls !== 'selected-confirm_item')
  //     .join(' ');
  //   const clicked = clickedItem ? getItemValue(clickedItem) : '-';

  //   debug.innerHTML = `
  //     value: <strong>${value}</strong><br />
  //     classes: <strong>${classes}</strong><br />
  //     clicked: <strong>${clicked}</strong>
  //   `;
  // }

  // --------------------------------------------------
  // 페이지 안의 모든 custom-select-confirm 초기화
  // --------------------------------------------------
  const confirmSelects = document.querySelectorAll('.custom-select-confirm');

  confirmSelects.forEach((selectWrap) => {
    const opener = selectWrap.querySelector('.select-confirm-opener');
    const selectedDisplay = getSelectedItem(selectWrap);
    const selectSub = selectWrap.querySelector('.select-confirm_sub');
    const selectItems = selectWrap.querySelectorAll('.select-confirm_item');
    const cancelBtn = selectWrap.querySelector('.btn--cls');
    const confirmBtn = selectWrap.querySelector('.btn--confirm');

    // 필수 구조가 없으면 이 셀렉트는 동작하지 않음
    if (!opener || !selectedDisplay || !selectSub || !selectItems.length || !cancelBtn || !confirmBtn) return;

    // ------------------------------------------------
    // 초기 selected 항목 찾기
    // ------------------------------------------------
    const initialSelected =
      getCurrentSelectedOption(selectWrap) ||
      [...selectItems].find((item) => !item.classList.contains('disabled'));

    // 초기 selected 상태 정리 및 표시 반영
    if (initialSelected) {
      selectWrap.querySelectorAll('.select-confirm_item.selected').forEach((item) => {
        if (item !== initialSelected) {
          item.classList.remove('selected');
        }
      });

      initialSelected.classList.add('selected');
      syncSelectedDisplay(selectedDisplay, initialSelected);
    }

    // 처음에는 확인 버튼 비활성화
    disableConfirm(selectWrap);

    // 처음에는 .other-box 상태도 같이 맞춤
    updateOtherBoxState(selectWrap);

    // ------------------------------------------------
    // opener 클릭: 열기 / 닫기
    // ------------------------------------------------
    opener.addEventListener('click', (e) => {
      e.stopPropagation();

      const isOpen = selectSub.classList.contains('open');
      closeAllConfirmSelects(selectWrap);

      if (!isOpen) {
        // 열릴 때마다 clicked 상태는 초기화
        // 따라서 .other-box.on도 같이 초기화됨
        resetConfirmState(selectWrap);
        selectSub.classList.add('open');
        selectWrap.classList.add('is-open');
      } else {
        resetConfirmState(selectWrap);
        closeConfirmSelect(selectWrap);
      }
    });

    // ------------------------------------------------
    // 옵션 클릭
    // ------------------------------------------------
    selectItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();

        // disabled는 아무 동작 안 함
        if (item.classList.contains('disabled')) return;

        // 현재 이미 selected인 항목 클릭 시 아무 반응 없음
        if (item.classList.contains('selected')) return;

        // 이전 clicked 제거 후 현재 항목만 clicked
        clearClicked(selectWrap);
        item.classList.add('clicked');

        // 새 선택 후보가 생겼으므로 확인 버튼 활성화
        enableConfirm(selectWrap);

        // clicked가 바뀌었으니,
        // 현재 selected와 다른 box_item인지 비교해서
        // .other-box.on 상태 갱신
        updateOtherBoxState(selectWrap);
      });
    });

    // ------------------------------------------------
    // 취소 버튼
    // ------------------------------------------------
    cancelBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // clicked 제거 + 확인 버튼 비활성화 + other-box 상태 초기화
      resetConfirmState(selectWrap);
      closeConfirmSelect(selectWrap);
    });

    // ------------------------------------------------
    // 확인 버튼
    // ------------------------------------------------
    confirmBtn.addEventListener('click', (e) => {
      e.stopPropagation();

      // 비활성화 상태면 동작 안 함
      if (confirmBtn.classList.contains('disabled')) return;

      const clickedItem = getCurrentClickedOption(selectWrap);
      if (!clickedItem) return;

      // 기존 selected 제거
      selectWrap.querySelectorAll('.select-confirm_item.selected').forEach((item) => {
        item.classList.remove('selected');
      });

      // clicked -> selected 확정
      clickedItem.classList.remove('clicked');
      clickedItem.classList.add('selected');

      // 상단 표시 영역 갱신
      syncSelectedDisplay(selectedDisplay, clickedItem);

      // 상태 정리
      disableConfirm(selectWrap);

      // selected가 바뀌었고 clicked는 사라졌으므로
      // .other-box.on 여부도 다시 정리
      updateOtherBoxState(selectWrap);

      // 닫기
      closeConfirmSelect(selectWrap);

      // 외부 개발자 연결용 커스텀 이벤트
      const changeEvent = new CustomEvent('customSelectConfirmChange', {
        detail: {
          value: getItemValue(clickedItem),
          text: getItemText(clickedItem),
          itemClasses: getOptionClasses(clickedItem),
          selectedElement: clickedItem,
          selectWrap
        }
      });

      selectWrap.dispatchEvent(changeEvent);
    });
  });

  // --------------------------------------------------
  // 바깥 클릭 시 닫기
  // --------------------------------------------------
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.custom-select-confirm').forEach((selectWrap) => {
      if (!selectWrap.contains(e.target)) {
        resetConfirmState(selectWrap);
        closeConfirmSelect(selectWrap);
      }
    });
  });

  // --------------------------------------------------
  // 디버그용
  // --------------------------------------------------
  // const modelWrap = document.querySelector('.conv-model');
  // const modeWrap = document.querySelector('.conv-mode');

  // if (modelWrap) {
  //   updateDebug(modelWrap, 'debugModel');
  //   modelWrap.addEventListener('customSelectConfirmChange', () => {
  //     updateDebug(modelWrap, 'debugModel');
  //   });
  //   modelWrap.addEventListener('click', () => {
  //     updateDebug(modelWrap, 'debugModel');
  //   });
  // }

  // if (modeWrap) {
  //   updateDebug(modeWrap, 'debugMode');
  //   modeWrap.addEventListener('customSelectConfirmChange', () => {
  //     updateDebug(modeWrap, 'debugMode');
  //   });
  //   modeWrap.addEventListener('click', () => {
  //     updateDebug(modeWrap, 'debugMode');
  //   });
  // }
});


/** 추론 로그 패널 #logBrd // START
 * 1. #wrap.addLogbrd를 이용한 여닫기
 * - .logCall 버튼 클릭으로 열림
 * 2. 패널 출력하기
 */
/**
 * ============================================
 * reasoning log link helper
 * ============================================
 * 역할
 * 1) .link_item > a[href] 에서 hostname 추출 후 .link-host에 텍스트 주입
 * 2) .link_item 안의 .link-favi 에 파비콘 이미지 적용
 * 3) 각 .link_list 안의 .link_item 이 4개 이상이면 4번째부터 숨김
 * 4) .link-more 클릭 시 숨김 링크 펼치기 / 접기
 *
 * 전제
 * - 전체 .link_list / .link_item 생성은 다른 스크립트(개발자)가 담당
 * - 이 스크립트는 이미 만들어진 마크업만 후처리
 * - 여러 개의 .link_list 가 있어도 각각 독립적으로 동작
 */

/**
 * URL에서 hostname만 안전하게 추출
 * 예)
 * https://www.reuters.com/aaa/bbb -> www.reuters.com
 * https://chatgpt.com/g/... -> chatgpt.com
 */
function getLinkHost(url) {
  try {
    return new URL(url).hostname;
  } catch (error) {
    return "";
  }
}

/**
 * 파비콘 URL 생성
 * Google favicon 서비스를 사용해서 host 기준으로 아이콘을 불러옴
 * 실패할 수도 있으므로, CSS에서 기본 배경을 같이 잡아두는 걸 권장
 */
function getFaviconUrl(url) {
  const host = getLinkHost(url);
  if (!host) return "";

  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64`;
}

/**
 * .link-favi 요소에 파비콘 적용
 * - background-image 방식 사용
 * - 실패 시 background-image 제거하고 기본 스타일만 남김
 */
function applyFavicon(faviEl, url) {
  if (!faviEl) return;

  const faviconUrl = getFaviconUrl(url);

  if (!faviconUrl) {
    faviEl.style.backgroundImage = "";
    return;
  }

  faviEl.style.backgroundImage = `url("${faviconUrl}")`;
  faviEl.style.backgroundRepeat = "no-repeat";
  faviEl.style.backgroundPosition = "center";
  faviEl.style.backgroundSize = "contain";
}

/**
 * "더 보기" 버튼(li.link-more) 생성
 * 이미 있으면 재사용, 없으면 새로 만들어서 맨 뒤에 붙임
 */
function getOrCreateLinkMore(linkList) {
  let linkMore = linkList.querySelector(":scope > .link-more");

  if (!linkMore) {
    linkMore = document.createElement("li");
    linkMore.className = "link-more";
    linkMore.setAttribute("role", "button");
    linkMore.setAttribute("tabindex", "0");
    linkMore.setAttribute("aria-expanded", "false");
    linkMore.innerHTML = '<span class="txt">더 보기</span>';
    linkList.appendChild(linkMore);
  }

  if (!linkMore.querySelector(".txt")) {
    linkMore.innerHTML = '<span class="txt">더 보기</span>';
  }

  return linkMore;
}

/**
 * "더 보기" 버튼 텍스트 상태 변경
 */
function setLinkMoreText(linkMore, isOpen) {
  const txt = linkMore.querySelector(".txt");
  if (!txt) return;

  txt.textContent = isOpen ? "접기" : "더 보기";
  linkMore.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

/**
 * 특정 .link_list 하나를 초기화 / 갱신
 * - .link-host 채우기
 * - .link-favi 파비콘 적용
 * - 4번째부터 숨김 처리
 * - .link-more 생성/숨김/문구 설정
 */
function setupLinkList(linkList) {
  if (!linkList) return;

  const linkItems = Array.from(linkList.querySelectorAll(":scope > .link_item"));

  // 1) 각 링크의 host 추출해서 .link-host 채우기 + .link-favi 적용
  linkItems.forEach((item) => {
    const anchor = item.querySelector("a[href]");
    const hostEl = item.querySelector(".link-host");
    const faviEl = item.querySelector(".link-favi");

    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";
    const host = getLinkHost(href);

    if (hostEl) {
      hostEl.textContent = host;
    }

    if (faviEl) {
      applyFavicon(faviEl, href);
    }
  });

  // 2) 링크가 3개 이하이면 모두 노출, 더보기 숨김
  if (linkItems.length <= 3) {
    linkItems.forEach((item) => {
      item.style.display = "";
    });

    const existedMore = linkList.querySelector(":scope > .link-more");
    if (existedMore) {
      existedMore.classList.remove("on");
      existedMore.style.display = "none";
      setLinkMoreText(existedMore, false);
    }

    return;
  }

  // 3) 링크가 4개 이상이면 더보기 필요
  const linkMore = getOrCreateLinkMore(linkList);

  // 기본 상태는 닫힘: 1~3만 노출, 4번째부터 숨김
  linkItems.forEach((item, index) => {
    item.style.display = index < 3 ? "" : "none";
  });

  linkMore.classList.remove("on");
  linkMore.style.display = "";
  setLinkMoreText(linkMore, false);
}

// 특정 .link-more 클릭 시 해당 리스트만 펼치기/접기
function toggleLinkMore(linkMore) {
  const linkList = linkMore.closest(".link_list");
  if (!linkList) return;

  const linkItems = Array.from(linkList.querySelectorAll(":scope > .link_item"));
  if (linkItems.length <= 3) return;

  const isOpen = linkMore.classList.contains("on");

  if (isOpen) {
    // 접기: 1~3만 노출
    linkItems.forEach((item, index) => {
      item.style.display = index < 3 ? "" : "none";
    });

    linkMore.classList.remove("on");
    setLinkMoreText(linkMore, false);
  } else {
    // 펼치기: 모두 노출
    linkItems.forEach((item) => {
      item.style.display = "";
    });

    linkMore.classList.add("on");
    setLinkMoreText(linkMore, true);
  }
}

// 페이지 내 모든 .link_list 초기화
// - 최초 로딩 시 실행
// - 로그 리스트가 새로 렌더링된 뒤에도 다시 호출 가능
function initReasoningLogLinks(root = document) {
  const linkLists = root.querySelectorAll("#logList .link_list");

  linkLists.forEach((linkList) => {
    setupLinkList(linkList);
  });
}

// 클릭 이벤트 위임
document.addEventListener("click", (event) => {
  const linkMore = event.target.closest(".link-more");
  if (!linkMore) return;

  toggleLinkMore(linkMore);
});

// 키보드 접근성
document.addEventListener("keydown", (event) => {
  const linkMore = event.target.closest?.(".link-more");
  if (!linkMore) return;

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    toggleLinkMore(linkMore);
  }
});

// 최초 1회 실행
document.addEventListener("DOMContentLoaded", () => {
  initReasoningLogLinks();
});

// 외부 재호출용
window.initReasoningLogLinks = initReasoningLogLinks;

/** 추론 로그 패널 #logBrd // END */


/**
 * 추론 상태 타이핑 START
 */
(function () {
  const typingMap = new WeakMap();
  const clickHandlerMap = new WeakMap();

  function getState(el) {
    if (!typingMap.has(el)) {
      typingMap.set(el, { timer: null });
    }
    return typingMap.get(el);
  }

  function getDelay(char, baseSpeed) {
    let delay = baseSpeed;

    if (char === " ") delay -= 10;
    if (char === ",") delay += 120;
    if (char === ".") delay += 180;
    if (char === "…") delay += 220;
    if (char === "\n") delay += 150;

    return Math.max(25, delay);
  }

  function stopRBoxTyping(el) {
    if (!el) return;

    const state = getState(el);

    if (state.timer) {
      clearTimeout(state.timer);
      state.timer = null;
    }

    el.classList.remove("is-typing");
  }

  function playRBoxTyping(el, text, speed = 55) {
    if (!el) return;

    const state = getState(el);
    const chars = Array.from(String(text ?? ""));
    let index = 0;

    if (state.timer) {
      clearTimeout(state.timer);
      state.timer = null;
    }

    el.textContent = "";
    el.classList.add("is-typing");

    function step() {
      if (index >= chars.length) {
        el.classList.remove("is-typing");
        state.timer = null;
        return;
      }

      const char = chars[index];
      el.textContent += char;
      index += 1;

      state.timer = setTimeout(step, getDelay(char, speed));
    }

    step();
  }

  /**
   * .r_box 클릭 이벤트를 외부에서 자유롭게 갈아끼우는 함수
   *
   * 사용 예:
   * setRBoxClickHandler(rBox, function ({ el, event }) {
   *   document.querySelector("#wrap")?.classList.add("addLogbrd");
   * });
   *
   * 특징:
   * - 기존 클릭 핸들러가 있으면 먼저 제거
   * - 새 클릭 핸들러를 다시 등록
   * - null을 넣으면 클릭 기능 제거 가능
   */
  function setRBoxClickHandler(el, handler) {
    if (!el) return;

    /* 기존에 등록된 클릭 핸들러가 있으면 제거 */
    const prevHandler = clickHandlerMap.get(el);
    if (prevHandler) {
      el.removeEventListener("click", prevHandler);
      clickHandlerMap.delete(el);
    }

    /* handler가 함수가 아니면 클릭 기능 제거만 하고 종료 */
    if (typeof handler !== "function") {
      el.classList.remove("is-clickable");
      return;
    }

    /* 실제로 이벤트에 등록될 래퍼 함수 */
    const wrappedHandler = function (event) {
      handler({
        el,
        event,
        play(text, speed) {
          playRBoxTyping(el, text, speed);
        },
        stop() {
          stopRBoxTyping(el);
        }
      });
    };

    el.addEventListener("click", wrappedHandler);
    clickHandlerMap.set(el, wrappedHandler);
    el.classList.add("is-clickable");
  }

  /**
   * 필요하면 클릭 기능만 제거하고 텍스트만 출력
   */
  function removeRBoxClickHandler(el) {
    if (!el) return;

    const prevHandler = clickHandlerMap.get(el);
    if (prevHandler) {
      el.removeEventListener("click", prevHandler);
      clickHandlerMap.delete(el);
    }

    el.classList.remove("is-clickable");
  }

  /* 전역으로 꺼내기 */
  window.playRBoxTyping = playRBoxTyping;
  window.stopRBoxTyping = stopRBoxTyping;
  window.setRBoxClickHandler = setRBoxClickHandler;
  window.removeRBoxClickHandler = removeRBoxClickHandler;
})();



const rBox = document.querySelector(".conv--ai.waiting .r_box");

/* 사용 예시 */
playRBoxTyping(rBox, "깊이 사고하며 답을 찾고 있습니다.");

/* 멈춤 */
// stopRBoxTyping(rBox);
// rBox.textContent = "";

setRBoxClickHandler(rBox, function () {
  document.querySelector("#wrap")?.classList.add("addLogbrd");
  document.querySelector("#wrap")?.classList.remove("addDsbrd");
  document.querySelector("#wrap")?.classList.remove("addSrcbrd");
});


document.addEventListener('DOMContentLoaded', () => {
  const rCloser = document.querySelector('#logBrdCloser');
  const wrap = document.querySelector('#wrap');
  const dsbrdOpener = document.querySelector('#sectRightOpener');

  rCloser.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.remove('addLogbrd');
  })
  dsbrdOpener.addEventListener('click', (e) => {
    e.stopPropagation();
    wrap.classList.remove('addLogbrd');
  })
});
/** 추론 상태 타이핑 END */


/** 플랫폼 변경 시 내용 요약 중 로더 START */
(function () {
  const miniLogText = document.getElementById('miniLogText');

  const miniLogs = [
    '이전 질문과 답변을 확인하고 있어요',
    '중복된 내용을 줄이고 핵심 흐름만 정리하고 있어요',
    '새 모델이 이해하기 쉬운 형태로 요약하고 있어요',
    '대화 맥락과 중요한 요청사항을 묶고 있어요'
  ];

  let logIndex = 0;

  function updateMiniLog() {
    logIndex = (logIndex + 1) % miniLogs.length;
    miniLogText.textContent = miniLogs[logIndex];
  }

  miniLogText.textContent = miniLogs[0];
  setInterval(updateMiniLog, 1800);
})();

// 이하는 샘플 오프너
document.addEventListener('DOMContentLoaded', () => {
  const sampleLoaderOpener = document.getElementById('samplePlatformLoader');
  const platformLoader = document.getElementById('platformLoader');
  const sampleLoaderCloser = document.getElementById('platformCancel');

  sampleLoaderOpener.addEventListener('click', (e) => {
    e.stopPropagation();
    platformLoader.classList.add('on');
  })
  sampleLoaderCloser.addEventListener('click', (e) => {
    e.stopPropagation();
    platformLoader.classList.remove('on');
  })
});
/** 플랫폼 변경 시 내용 요약 중 로더 END */


/** 캔버스 보드 START */
  const wrap = document.querySelector('#wrap');
  const aside = document.querySelector('#aside');

  const docEditor = document.querySelector("#docEditor");
  const docResetBtn = document.querySelector("#docResetBtn");
  const docSaveBtn = document.querySelector("#docSaveBtn");
  const docSaveState = document.querySelector("#docSaveState");
  const docBlockType = document.querySelector("#docBlockType");

  const codeEditor = document.querySelector("#codeEditor");
  const codeLineNumbersInner = document.querySelector("#codeLineNumbersInner");
  const webResetBtn = document.querySelector("#webResetBtn");
  const webSaveBtn = document.querySelector("#webSaveBtn");
  const webSaveState = document.querySelector("#webSaveState");
  const webNote = document.querySelector("#webNote");
  const codePanel = document.querySelector("#codePanel");
  const renderPanel = document.querySelector("#renderPanel");
  const renderBox = document.querySelector("#renderBox");

  const getReport = {
    doc: {
      html: createDocHtml()
    },
    web: {
      code: createWebCode()
    }
  };

  function createDocHtml() {
      return `
        <span class="doc-report-badge">Document Report</span>
        <h1>2026 유가 동향 문서 리포트</h1>
        <p>
          이 문서는 스크립트에서 임시로 넣은 문서형 리포트 샘플입니다.
          사용자는 이 문장을 직접 수정할 수 있고, 저장 버튼을 눌러 수정사항을 저장할 수 있습니다.
        </p>

        <h2>1. 핵심 요약</h2>
        <ul>
          <li>국제 유가는 수급, 지정학 리스크, 산유국 정책에 따라 변동성이 커질 수 있습니다.</li>
          <li>문서형 리포트는 HTML 콘텐츠를 보드 안의 편집 영역에 직접 표시합니다.</li>
          <li>사용자가 편집하면 draftDocHtml이 바뀌고, 저장 시 savedDocHtml에 반영됩니다.</li>
        </ul>

        <h2>2. 개발 연결 방식</h2>
        <ol>
          <li>AI 또는 백엔드에서 문서 HTML을 받습니다.</li>
          <li>setDocReportContent(serverData.docHtml)을 호출합니다.</li>
          <li>저장 버튼 클릭 시 saveDocReport() 내부에서 API 저장 처리를 붙입니다.</li>
        </ol>

        <h2>1. 핵심 요약</h2>
        <ul>
          <li>국제 유가는 수급, 지정학 리스크, 산유국 정책에 따라 변동성이 커질 수 있습니다.</li>
          <li>문서형 리포트는 HTML 콘텐츠를 보드 안의 편집 영역에 직접 표시합니다.</li>
          <li>사용자가 편집하면 draftDocHtml이 바뀌고, 저장 시 savedDocHtml에 반영됩니다.</li>
        </ul>

        <h2>2. 개발 연결 방식</h2>
        <ol>
          <li>AI 또는 백엔드에서 문서 HTML을 받습니다.</li>
          <li>setDocReportContent(serverData.docHtml)을 호출합니다.</li>
          <li>저장 버튼 클릭 시 saveDocReport() 내부에서 API 저장 처리를 붙입니다.</li>
        </ol>

        <h2>1. 핵심 요약</h2>
        <ul>
          <li>국제 유가는 수급, 지정학 리스크, 산유국 정책에 따라 변동성이 커질 수 있습니다.</li>
          <li>문서형 리포트는 HTML 콘텐츠를 보드 안의 편집 영역에 직접 표시합니다.</li>
          <li>사용자가 편집하면 draftDocHtml이 바뀌고, 저장 시 savedDocHtml에 반영됩니다.</li>
        </ul>

        <h2>2. 개발 연결 방식</h2>
        <ol>
          <li>AI 또는 백엔드에서 문서 HTML을 받습니다.</li>
          <li>setDocReportContent(serverData.docHtml)을 호출합니다.</li>
          <li>저장 버튼 클릭 시 saveDocReport() 내부에서 API 저장 처리를 붙입니다.</li>
        </ol>
      `.trim();
    }

  function createWebCode () {
    const scriptOpen = "<" + "script>";
    const scriptClose = "<" + "/script>";

    const headClose = "<" + "/head>";
    const bodyClose = "<" + "/body>";
    const htmlClose = "<" + "/html>";

    return [
      "<!DOCTYPE html>",
      "<html lang=\"ko\">",
      "<head>",
      "  <meta charset=\"UTF-8\" />",
      "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />",
      "  <title>웹 리포트 임시 샘플</title>",
      "  <style>",
      "    * { box-sizing: border-box; }",
      "    body {",
      "      margin: 0;",
      "      padding: 42px;",
      "      font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;",
      "      background: linear-gradient(135deg, #f8fafc, #ecfeff);",
      "      color: #111827;",
      "    }",
      "    .report {",
      "      max-width: 920px;",
      "      margin: 0 auto;",
      "      padding: 36px;",
      "      border-radius: 28px;",
      "      background: rgba(255, 255, 255, 0.94);",
      "      box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);",
      "    }",
      "    .eyebrow {",
      "      display: inline-flex;",
      "      padding: 6px 12px;",
      "      border-radius: 999px;",
      "      background: #ecfeff;",
      "      color: #0e7490;",
      "      font-size: 13px;",
      "      font-weight: 800;",
      "    }",
      "    h1 { margin: 18px 0 12px; font-size: 34px; line-height: 1.25; }",
      "    p { color: #4b5563; line-height: 1.7; }",
      "    .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px; }",
      "    .card { padding: 20px; border: 1px solid #e5e7eb; border-radius: 20px; background: #fff; }",
      "    .card strong { display: block; margin-bottom: 8px; font-size: 18px; }",
      "    .test-note { margin-top: 22px; padding: 14px 16px; border-radius: 16px; background: #f9fafb; color: #6b7280; font-size: 13px; }",
      "    @media (max-width: 720px) {",
      "      body { padding: 20px; }",
      "      .grid { grid-template-columns: 1fr; }",
      "    }",
      "  </style>",
      headClose,
      "<body>",
      "  <section class=\"report\">",
      "    <span class=\"eyebrow\">Web Report</span>",
      "    <h1>유가 추세와 대응 전략</h1>",
      "    <p>",
      "      이 웹 리포트는 스크립트에서 임시로 만든 HTML 코드입니다.",
      "      코드를 수정하면 draftWebCode만 바뀌고, 저장 버튼을 눌러야 savedWebCode에 반영됩니다.",
      "    </p>",
      "    <div class=\"grid\">",
      "      <article class=\"card\">",
      "        <strong>수급 변수</strong>",
      "        <p>생산량 조절과 재고 흐름이 단기 가격에 영향을 줍니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>지정학 리스크</strong>",
      "        <p>분쟁, 해상 운송 리스크, 제재 이슈가 가격 프리미엄을 만들 수 있습니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>국내 대응</strong>",
      "        <p>비축유 관리, 수입선 다변화, 에너지 효율 정책이 중요합니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>수급 변수</strong>",
      "        <p>생산량 조절과 재고 흐름이 단기 가격에 영향을 줍니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>지정학 리스크</strong>",
      "        <p>분쟁, 해상 운송 리스크, 제재 이슈가 가격 프리미엄을 만들 수 있습니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>국내 대응</strong>",
      "        <p>비축유 관리, 수입선 다변화, 에너지 효율 정책이 중요합니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>수급 변수</strong>",
      "        <p>생산량 조절과 재고 흐름이 단기 가격에 영향을 줍니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>지정학 리스크</strong>",
      "        <p>분쟁, 해상 운송 리스크, 제재 이슈가 가격 프리미엄을 만들 수 있습니다.</p>",
      "      </article>",
      "      <article class=\"card\">",
      "        <strong>국내 대응</strong>",
      "        <p>비축유 관리, 수입선 다변화, 에너지 효율 정책이 중요합니다.</p>",
      "      </article>",
      "    </div>",
      "    <div id=\"scriptTest\" class=\"test-note\">iframe 내부 script 실행 전입니다.</div>",
      "  </section>",
      "",
      "  " + scriptOpen,
      "    document.querySelector('#scriptTest').textContent = 'iframe 내부 script가 정상 실행되었습니다.';",
      "  " + scriptClose,
      bodyClose,
      htmlClose
    ].join("\n");
  };

  let savedDocHtml = "";
  let draftDocHtml = "";

  let savedWebCode = "";
  let draftWebCode = "";

  /* =========================================================
    문서형 리포트 처리
  ========================================================= */

  function setDocReportContent(html) {
    savedDocHtml = html;
    draftDocHtml = html;
    docEditor.innerHTML = html;
    updateDocSaveState(false, "저장된 문서 내용입니다.");
  }

  function checkDocChanged() {
    draftDocHtml = docEditor.innerHTML;
    const changed = draftDocHtml !== savedDocHtml;

    docSaveBtn.disabled = !changed;

    if (changed) {
      updateDocSaveState(true, "저장되지 않은 문서 수정사항이 있습니다.");
    } else {
      updateDocSaveState(false, "저장된 문서 내용입니다.");
    }
  }

  function updateDocSaveState(isDirty, text) {
    docSaveState.textContent = text;
    docSaveState.classList.toggle("is-dirty", isDirty);
    docSaveState.classList.toggle("is-saved", !isDirty);
    
    // 저장/초기화 버튼은 수정사항이 있을 때만 활성화
    docSaveBtn.disabled = !isDirty;
    docResetBtn.disabled = !isDirty;
  }

  function saveDocReport() {
    savedDocHtml = docEditor.innerHTML;
    draftDocHtml = savedDocHtml;
    updateDocSaveState(false, "문서 수정사항이 저장되었습니다.");

    /*
      실제 서비스 연결 위치:
      fetch('/api/report/doc/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: savedDocHtml })
      });
    */
  }

  function resetDocReport() {
    // 마지막 저장본으로 되돌리기
    // 저장하지 않은 문서 수정사항만 취소
    draftDocHtml = savedDocHtml;
    docEditor.innerHTML = savedDocHtml;
    updateDocSaveState(false, "저장 전 문서 수정사항을 초기화했습니다.");
  }

  function applyDocBlockType(tagName) {
    docEditor.focus();
    document.execCommand("formatBlock", false, tagName);
    checkDocChanged();
  }

  function applyDocCommand(command) {
    docEditor.focus();
    document.execCommand(command, false, null);
    checkDocChanged();
  }

  /* =========================================================
      웹 리포트 처리
    ========================================================= */
  function setWebReportCode(code) {
    savedWebCode = code;
    draftWebCode = code;
    codeEditor.value = code;
    updateCodeLineNumbers();
    // updateWebSaveState(false, "저장된 코드와 동일합니다.");
    updateWebSaveState(false, "렌더링은 저장된 코드 기준으로 출력됩니다.");
    showRenderEmpty();
    setWebViewMode("code");
  }

  function checkWebCodeChanged() {
    draftWebCode = codeEditor.value;
    const changed = draftWebCode !== savedWebCode;

    webSaveBtn.disabled = !changed;

    if (changed) {
      updateWebSaveState(true, "저장되지 않은 코드 수정사항이 있습니다. 렌더링에는 아직 반영되지 않습니다.");
    } else {
      // updateWebSaveState(false, "저장된 코드와 동일합니다.");
      updateWebSaveState(false, "렌더링은 저장된 코드 기준으로 출력됩니다.");
    }
  }

  function updateWebSaveState(isDirty, text) {
    webSaveState.textContent = text;
    webSaveState.classList.toggle("is-dirty", isDirty);
    webSaveState.classList.toggle("is-saved", !isDirty);
    
    // 저장/초기화 버튼은 수정사항이 있을 때만 활성화
    webSaveBtn.disabled = !isDirty;
    webResetBtn.disabled = !isDirty;
  }

  function saveWebReport() {
    savedWebCode = codeEditor.value;
    draftWebCode = savedWebCode;
    updateWebSaveState(false, "코드 수정사항이 저장되었습니다.");

    /*
      실제 서비스 연결 위치:
      fetch('/api/report/web/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: savedWebCode })
      });
    */

    if (renderPanel.classList.contains("on")) {
      renderSavedWebCode();
    }
  }

  function resetWebReport() {
    // 마지막 저장본으로 되돌리기
    // 저장하지 않은 코드 수정사항만 취소
    draftWebCode = savedWebCode;
    codeEditor.value = savedWebCode;
    updateCodeLineNumbers();
    updateWebSaveState(false, "저장 전 코드 수정사항을 초기화했습니다.");

    // 렌더링 탭이 열려 있다면 저장본 기준 화면으로 다시 맞추기
    if (renderPanel.classList.contains("on")) {
      renderSavedWebCode();
    }
  }

  function setWebViewMode(mode) {
    const radios = document.querySelectorAll('input[name="webViewMode"]');

    radios.forEach((radio) => {
      radio.checked = radio.value === mode;
    });

    codePanel.classList.toggle("on", mode === "code");
    renderPanel.classList.toggle("on", mode === "render");
  }

  function handleWebViewModeChange(mode) {
    if (mode === "render") {
      renderSavedWebCode();
      return;
    }

    setWebViewMode("code");
    webNote.textContent = "렌더링은 저장된 코드 기준으로만 출력됩니다.";
  }

  function renderSavedWebCode() {
    setWebViewMode("render");

    renderBox.innerHTML = `
      <iframe
        class="render-frame"
        title="웹 리포트 렌더링 화면"
        sandbox="allow-scripts"
      ></iframe>
    `;

    const frame = renderBox.querySelector("iframe");
    frame.srcdoc = savedWebCode;

    if (draftWebCode !== savedWebCode) {
      webNote.textContent = "저장 전 수정사항은 렌더링에 반영되지 않았습니다.";
    } else {
      webNote.textContent = "저장된 코드 기준으로 렌더링되었습니다.";
    }
  }

  function showRenderEmpty() {
    renderBox.innerHTML = `
      <div class="render-empty">
        코드/렌더링 토글에서 렌더링을 선택하면 저장된 코드가 출력됩니다.
      </div>
    `;
  }

  /* =========================================================
    코드 줄번호 처리
  ========================================================= */

  function updateCodeLineNumbers() {
    const lineCount = Math.max(codeEditor.value.split("\n").length, 1);
    const numbers = Array.from({ length: lineCount }, (_, index) => index + 1).join("\n");

    codeLineNumbersInner.textContent = numbers;
    syncCodeLineNumbersScroll();
  }

  function syncCodeLineNumbersScroll() {
    codeLineNumbersInner.style.transform = `translateY(${-codeEditor.scrollTop}px)`;
  }

  /* =========================================================
    이벤트 연결
  ========================================================= */
  docEditor.addEventListener("input", checkDocChanged);
  docResetBtn.addEventListener("click", resetDocReport);
  docSaveBtn.addEventListener("click", saveDocReport);

  docBlockType.addEventListener("change", () => {
    applyDocBlockType(docBlockType.value);
  });

  document.querySelectorAll("[data-doc-cmd]").forEach((button) => {
    button.addEventListener("click", () => {
      applyDocCommand(button.dataset.docCmd);
    });
  });

  codeEditor.addEventListener("input", () => {
    updateCodeLineNumbers();
    checkWebCodeChanged();
  });

  codeEditor.addEventListener("scroll", syncCodeLineNumbersScroll);
  webResetBtn.addEventListener("click", resetWebReport);
  webSaveBtn.addEventListener("click", saveWebReport);

  document.querySelectorAll('input[name="webViewMode"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      handleWebViewModeChange(radio.value);
    });
  });

  /* =========================================================
    초기 실행

    여기서 샘플 데이터를 실제 보드에 주입합니다.
    실서비스에서는 이 부분을 API 응답 후 실행하면 됩니다.
  ========================================================= */

  setDocReportContent(getReport.doc.html);
  setWebReportCode(getReport.web.code);


  document.addEventListener('DOMContentLoaded', () => {
  if (!wrap) return;

  document.addEventListener('click', (e) => {
    /**
     * 문서 리포트 버튼 클릭
     * .a_report_item.doc 클릭 시 문서 보드 열기
     */
    const docReportBtn = e.target.closest('.a_report_item.doc');

    if (docReportBtn) {
      wrap.classList.remove(
        'addSrcbrd',
        'addLogbrd',
        'addDsbrd',
        'addCnvsWebBrd'
      );
      aside.classList.add('collapsed');

      wrap.classList.add('addCnvsDocBrd');
      return;
    }

    /**
     * 웹 리포트 버튼 클릭
     * .a_report_item.web 클릭 시 웹 보드 열기
     */
    const webReportBtn = e.target.closest('.a_report_item.web');

    if (webReportBtn) {
      wrap.classList.remove(
        'addSrcbrd',
        'addLogbrd',
        'addDsbrd',
        'addCnvsDocBrd'
      );
      aside.classList.add('collapsed');

      wrap.classList.add('addCnvsWebBrd');
      return;
    }

    /**
     * 보드 닫기 버튼 클릭
     * 각 보드 내부의 .btn.cls 클릭 시 문서/웹 보드 닫기
     */
    const closeBtn = e.target.closest('.btn.cls');

    if (closeBtn) {
      wrap.classList.remove(
        'addCnvsDocBrd',
        'addCnvsWebBrd'
      );
    }
  });
});

/** 캔버스 보드 END */
$(document).ready(function () {
  const $body = $('html, body');

  const MODALON_CLASSNAME = 'modalOn';
  const NOWON_CLASSNAME = 'now-on';
  const OPEN_CLASSNAME = 'open';

  /*  GO TOP event  */
  function goTopEvent() {
    $('#goTop').on('click', function () {
      const yPos = $body.offset().top;

      $body.stop().animate(
        {
          scrollTop: yPos,
        },
        500
      );

      $(this).children().children('img').css('color', '#313131');
    });
  }

  goTopEvent();

  /* MODAL Handler */
  // ******** 모달 핸들러 START

  const sModHandler = {
    modOn: function (clicker, modalName) {
      $(clicker).on('click', function (e) {
        $(modalName).addClass(MODALON_CLASSNAME);
        e.preventDefault();
        $(`${modalName} .modalBg`).on(
          'scroll touchmove mousewheel',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        );
      });
    },
    modOff: function (clicker, modalName) {
      $(clicker).on('click', function (e) {
        $(modalName).removeClass(MODALON_CLASSNAME);
        e.preventDefault();
        $(`${modalName} .modalBg`).off('scroll touchmove mousewheel');
      });
    },
  };

  sModHandler.modOn('.item-value-title', '#resultDataModal');
  sModHandler.modOff('#clsResultData', '#resultDataModal');

  // 컨텐츠 원문 리스트 모달 >> NOW > channel details
  sModHandler.modOn('.item-sub-list', '#showAllModal');
  // 컨텐츠 원문 리스트 모달 >> NOW > sentiemnt keyword, keyword ranking
  sModHandler.modOn('.now-page .rank-item', '#showAllModal');
  // 컨텐츠 원문 리스트 모달 >> TREND > keyword trend
  sModHandler.modOn('.trend-page .rank-item', '#showAllModal');
  // 컨텐츠 원문 리스트 모달 >> HOTTEST > hot lists
  sModHandler.modOn('.hottest-item', '#showAllModal');

  sModHandler.modOff('#clsAllList', '#showAllModal');

  // 컨텐츠 원문 내용 모달 여닫기
  sModHandler.modOn('#showAllModal .content-subs-list', '#showOriginModal');
  sModHandler.modOff('#clsOriginList', '#showOriginModal');

  // INTRO page 로그인 모달 여닫기
  sModHandler.modOn('#introLogin', '#loginModal');
  sModHandler.modOff('#loginClsBtn', '#loginModal');

  // 검색 설정 모달 여닫기
  sModHandler.modOn('.preset-btn', '#srchSetModal');
  sModHandler.modOff('#clsSrchSet', '#srchSetModal');
  // sModHandler.modOff('');

  // ******** 모달 핸들러 END

  /* Message page MODAL 내 '분류 메세지' 탭 온오프 */
  function contentTableHandler() {
    $('.content-group-wrap .box-title').on('click', function () {
      $(this).siblings('.box-content').addClass(NOWON_CLASSNAME);
    });

    $('#clsResultData').on('click', function () {
      $('.box-content').removeClass(NOWON_CLASSNAME);
    });
  }
  contentTableHandler();

  // ******** 셀렉트 옵션 커스텀 START
  /* 
    main.js에 동일한 내용이 있으나 include 형식으로 footer문서를 불러올 때
    main.js의 내용이 적용되지 않아, 해결 방안을 찾을 때까지
    동일한 내용을 본 문서에도 추가 함. 
  */
  const modalLabel = document.querySelectorAll('.modal-select-label');

  modalLabel.forEach(function (lb) {
    lb.addEventListener('click', (e) => {
      let optionList = lb.nextElementSibling;
      let optionItems = optionList.querySelectorAll('.option-item');
      clickLabel(lb, optionItems);
    });
  });

  const clickLabel = (lb, optionItems) => {
    modalLabel.forEach(function (itemLb) {
      if (lb !== itemLb) {
        itemLb.parentNode.classList.remove('active');
      }
    });

    if (lb.parentNode.classList.contains('active')) {
      lb.parentNode.classList.remove('active');
      optionItems.forEach((opt) => {
        opt.removeEventListener('click', () => {
          handleSelect(lb, opt);
        });
      });
    } else {
      lb.parentNode.classList.add('active');
      optionItems.forEach((opt) => {
        opt.addEventListener('click', () => {
          handleSelect(lb, opt);
        });
      });
    }
  };

  const handleSelect = (modalLabel, item) => {
    modalLabel.innerHTML = item.textContent;
    modalLabel.parentNode.classList.remove('active');
  };

  const handleClose = (e) => {
    if (
      !e.target.classList.contains('modal-select-label') &&
      !e.target.classList.contains('option-item')
    ) {
      modalLabel.forEach(function (lb) {
        lb.parentNode.classList.remove('active');
      });
    }
  };

  window.addEventListener('click', (e) => handleClose(e));
  // ******** 셀렉트 옵션 커스텀 END
});

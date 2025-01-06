$(document).ready(function () {
  const NOWON_CLASSNAME = 'nowOn';
  const ACTIVE_CLASSNAME = 'active';

  //
  /* 모바일 메뉴 오프너 */
  function moGnbHandler(e) {
    $('#moGnbBtn').on('click', function (e) {
      e.preventDefault();
      $('.user--menu__wrap').addClass(NOWON_CLASSNAME);
    });
    $('.user--menu__wrap .btn--cls').on('click', function (e) {
      e.preventDefault();
      $('.user--menu__wrap').removeClass(NOWON_CLASSNAME);
    });
  }
  moGnbHandler();

  //
  /* 메인페이지 롤링 배너 */
  const rollBanner = function () {
    const $bannerBox = $('.slider-img>.img__list');

    const $thumbBox = $('.slider-thumb__wrap>.thumb__list'),
      $thumbItem = $thumbBox.children('.thumb__item');

    const $leftBtn = $('.slider-arrow__list>.btn-arrow.prev'),
      $rightBtn = $('.slider-arrow__list>.btn-arrow.next');

    let showNum = 0;
    let bannerCount = $('.slider-img>.img__list>li').length;

    const copyFirstOne = $('.slider-img>.img__list>li:first').clone();
    $('.slider-img>.img__list').append(copyFirstOne);

    function moveBanner() {
      $bannerBox.stop().animate(
        {
          marginLeft: -100 * showNum + '%',
        },
        500
      );

      if (showNum == bannerCount) {
        $('.slider-thumb__wrap>.thumb__list>.thumb__item')
          .eq(0)
          .addClass(NOWON_CLASSNAME)
          .siblings()
          .removeClass(NOWON_CLASSNAME);
      } else {
        $('.slider-thumb__wrap>.thumb__list>.thumb__item')
          .eq(showNum)
          .addClass(NOWON_CLASSNAME)
          .siblings()
          .removeClass(NOWON_CLASSNAME);
      }
    }

    $rightBtn.click(function () {
      if (showNum == bannerCount) {
        showNum = 0;
        $bannerBox.css('margin-left', 0);
      }
      showNum++;
      moveBanner();
    });
    $leftBtn.click(function () {
      if (showNum == 0) {
        showNum = bannerCount;
        $bannerBox.css('margin-left', -100 * showNum + '%');
      }
      showNum--;
      moveBanner();
    });

    $('.slider-thumb__wrap>.thumb__list>.thumb__item').click(function () {
      showNum = $(this).index();
      moveBanner();
    });
  };
  rollBanner();

  //
  /* space info page -> 시설 안내 */
  const spaceList = {
    spaceFocusA: {
      name: 'Focus A 공간',
      price: '12,000',
      tag: ['1~8인', '회의 공간', '집중형', '대형모니터'],
    },
    spaceFocusB: {
      name: 'Focus B 공간',
      price: '5,000',
      tag: ['1인실', '집중형'],
    },
    spaceFocusC: {
      name: 'Focus C 공간',
      price: '6,000',
      tag: ['1~8인', '회의 공간', '집중형', '대형모니터'],
    },
    spaceTrainingA: {
      name: 'Training A 공간',
      price: '25,000',
      tag: ['1~22인', '교육 공간', '교육형'],
    },
    spaceTrainingB: {
      name: 'Training B 공간',
      price: '18,000',
      tag: ['1~12인', '교육 공간', '교육형'],
    },
    spaceTrainingAB: {
      name: 'Training A + B 공간',
      price: '12,000',
      tag: ['1~34인', '교육 공간', '특수 교육형'],
    },
    spaceFGM: {
      name: 'FGM',
      price: '15,000',
      tag: ['1~8인', '회의 공간', '집중형', '관찰형', '대형모니터'],
    },
    spaceFGD: {
      name: 'FGD',
      price: '18,000',
      tag: ['1~10인', '회의 공간', '집중형', '관찰형', '대형모니터'],
    },
    spaceM1: {
      name: 'M1 공간',
      price: '7,000',
      tag: ['1~8인', '회의 공간', '집중형', '대형모니터'],
    },
    spaceM2: {
      name: 'M2 공간',
      price: '7,000',
      tag: ['1~8인', '회의 공간', '집중형', '대형모니터'],
    },
    spaceOpen: {
      name: 'Open 공간',
      price: '18,000',
      tag: ['1~6인', '다목적 공간', '집중형', '대형모니터'],
    },
    spaceWzone: {
      name: 'Work 공강',
      price: '1,500',
      tag: ['1인', '다목적 사무공간', '오픈형', '모니터'],
    },
  };

  $('.info-sort__item .thumb__item').on('click', function () {
    function inputSpaceInfo() {}
    const spaceId = $(this).attr('id');

    $('.info-sort__item .thumb__item').removeClass(NOWON_CLASSNAME);
    $(this).addClass(NOWON_CLASSNAME);

    $('.space-info__wrap')
      .attr('class', '')
      .addClass(`space-info__wrap ${spaceId}`);

    const $spaceName = $(`.space-info__wrap .space-name`),
      $spacePrice = $(`.space-info__wrap .cost--num`),
      $spaceTag = $('.space-keyword__list');

    // 공간 정보 출력 - 이름, 가격
    $spaceName.text(spaceList[spaceId].name);
    $spacePrice.text(spaceList[spaceId].price);

    // 공간 정보 출력 - 키워드
    const addTags = function () {
      $spaceTag.empty();
      const spaceTagObj = spaceList[spaceId].tag;
      let tagLength = spaceTagObj.length;
      for (let i = 0; i < tagLength; i++) {
        $spaceTag.append(
          `<li class="space-keyword__item">${spaceList[spaceId].tag[i]}</li>`
        );
      }
    };
    $spaceTag.append(addTags);
  });

  //
  /* 예약하기 페이지 -> 공간 선택 */
  $('.space-btn__list .space-btn').on('click', function () {
    const spaceId = $(this).attr('id');

    $(this).addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);

    $('.space-info__wrap')
      .attr('class', '')
      .addClass(`space-info__wrap ${spaceId}`);
  });

  //
  /* 예약하기 페이지 -> 공간선택 모달 활성화 in mobile */
  const activeSwitcher = {
    activeOn: function (clicker, target) {
      $(clicker).on('click', function () {
        $(target).addClass(ACTIVE_CLASSNAME);
      });
    },
    activeOff: function (clicker, target) {
      $(clicker).on('click', function () {
        $(target).removeClass(ACTIVE_CLASSNAME);
      });
    },
  };
  activeSwitcher.activeOn('#callSpaceSelector', '#bgSpaceSelector');
  activeSwitcher.activeOff(
    '.space-select-btn__wrap .btn-confirm',
    '#bgSpaceSelector'
  );
  activeSwitcher.activeOff('.book--space-select .btn--cls', '#bgSpaceSelector');
});

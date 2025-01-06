$(document).ready(function () {
  const NOWON_CLASSNAME = 'now-on';

  /* -- MAINBANNER handler -- */
  function mBannerHandler() {
    let showBanner = 0;

    // 배너 페이드
    const fadeBanner = () => {
      $('.banner-item').eq(showBanner).fadeIn(1300).siblings().fadeOut(1300);

      if (showBanner == 2) {
        $('.banner-btn')
          .eq(2)
          .addClass(NOWON_CLASSNAME)
          .siblings()
          .removeClass(NOWON_CLASSNAME);
      } else {
        $('.banner-btn')
          .eq(showBanner)
          .addClass(NOWON_CLASSNAME)
          .siblings()
          .removeClass(NOWON_CLASSNAME);
      }
    };

    const autoFadeBanner = () => {
      if (showBanner < 2) {
        showBanner++;
      } else {
        showBanner = 0;
      }
      $('.banner-item').eq(showBanner).fadeIn(1300).siblings().fadeOut(1300);
      $('.banner-btn')
        .eq(showBanner)
        .addClass(NOWON_CLASSNAME)
        .siblings()
        .removeClass(NOWON_CLASSNAME);
    };
    var bannerTimer = setInterval(autoFadeBanner, 6000);

    $('.banner-btn-list').on('mouseover', function () {
      clearInterval(bannerTimer);
    });
    $('.btn-arrow-wrap').on('mouseover', function () {
      clearInterval(bannerTimer);
    });
    $('.banner-btn-list').on('mouseout', function () {
      bannerTimer = setInterval(autoFadeBanner, 6000);
    });
    $('.btn-arrow-wrap').on('mouseout', function () {
      bannerTimer = setInterval(autoFadeBanner, 6000);
    });

    let resetTime = 0;

    function timerIncrement() {
      resetTime++;

      if (resetTime == 1) {
        console.log(resetTime);
        window.location.reload();
      }
    }
    setInterval(timerIncrement, 54000);

    // 하단 버튼 컨트롤
    $('.banner-btn').on('click', function () {
      showBanner = $(this).index();
      fadeBanner();
    });

    // arrow 버튼 컨트롤 - left
    $('.arrow-prev').on('click', function () {
      if (showBanner == 0) {
        showBanner = 3;
      }
      showBanner--;
      fadeBanner();
    });

    // arrow 버튼 컨트롤 - right
    $('.arrow-next').on('click', function () {
      if (showBanner == 2) {
        showBanner = -1;
      }
      showBanner++;
      fadeBanner();
    });
  }
  mBannerHandler();
});

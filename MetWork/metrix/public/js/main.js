$(document).ready(function () {

  const NOWON_CLASSNAME = "now-on";

  // gnb > sub opener
  function subOpener() {
    $(".menu-item").on("mouseover", function() {
      $(this).children(".sub-menu").css("height", "auto");
    })
    $(".menu-item").on("mouseleave", function() {
      $(this).children(".sub-menu").css("height", "0");
    })
  };

  // max 768 > nav on
  function mobileNavHandler() {
    $(".ham-btn").on("click", function() {
      let subHeight = $(".sub-menu").outerHeight();
      $(this).siblings(".m-nav").fadeToggle();
      $(this).siblings(".m-nav").children(".m-gnb").slideToggle(300, "swing");
      $(this).toggleClass(NOWON_CLASSNAME);

      $(".m-gnb").children(".menu-item").on("click", function () {
        $(this).children(".sub-menu").stop().slideToggle(300, "swing");
      })

      if ($(".ham-btn").hasClass(NOWON_CLASSNAME)) {
        $(".m-nav").on("scroll touchmove mousewheel", function (event) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        });
      } else {
        $(".m-nav").off("scroll touchmove mousewheel");
      };
    });
  };
  
  function init() {
    subOpener();
    mobileNavHandler();
  };

  init();

  // onMobile RECRUIT page > 인재채용 정보 이벤트
  function recruitInfoHandler() {
    const $recruitTitleFirst = $(".recruit-title").eq(0),
          $recruitTitleSecond = $(".recruit-title").eq(1),
          $recruitTitleThird = $(".recruit-title").eq(2);
    const $recruitContentFirst = $(".recruit-content-list").eq(0),
          $recruitContentSecond = $(".recruit-content-list").eq(1),
          $recruitContentThird = $(".recruit-content-list").eq(2);

    $recruitTitleFirst.on("click", function () {
      $(this).addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);
      $recruitContentFirst.addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);
    })
    $recruitTitleSecond.on("click", function () {
      $(this).addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);
      $recruitContentSecond.addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);
    })
    $recruitTitleThird.on("click", function () {
      $(this).addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);
      $recruitContentThird.addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);
    })
  }
  recruitInfoHandler();
  
})


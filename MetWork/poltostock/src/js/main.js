 $(document).ready(function () {

  const NOWON_CLASSNAME = "now-on";

  /* nav 활성화 */
  $(".ham-btn").on("click", function () {
    $(".ham-btn").toggleClass(NOWON_CLASSNAME);
    $(".nav-inner").toggleClass(NOWON_CLASSNAME);
  })

  /* style > 클래스명 추가 제거 */
  const superClassHandler = {
    addRemoveSiblings: function (obj) {
      $(obj).addClass(NOWON_CLASSNAME).siblings().removeClass(NOWON_CLASSNAME);
    },
  }

  /* MAIN page > 코스피, 코스닥 탭 여닫기 */
  $(".tab-kospi").on("click", function () {
    superClassHandler.addRemoveSiblings(this);
    superClassHandler.addRemoveSiblings(".kospi-wrap");
  })
  $(".tab-kosdaq").on("click", function () {
    superClassHandler.addRemoveSiblings(this);
    superClassHandler.addRemoveSiblings(".kosdaq-wrap");
  })

  /*  */
  // $(".menu-item").on("click", function () {
  //   $(this).addClass(NOWON_CLASSNAME);
  //   $(this).css("color", "tomato");
  // })
      
})
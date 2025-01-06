$(document).ready(function () {

  $('input[type=range]').on('input', function(){
		var rangeVal = $(this).val();
		$(this).css('background', 'linear-gradient(to right, #888 0%, #888 '+ rangeVal +'%, #d5d4d3 ' + rangeVal + '%, #d5d4d3 100%)');
	})

  function searchMethodOpen() {
    $('.search_method_wrap').on('mouseenter', function() {
      $(this).addClass('is-open');
    })

    $('.search_method_wrap').on('mouseleave', function() {
      $(this).removeClass('is-open');
    })
  }

  searchMethodOpen();

  function subWrapTitle() {
    $('.sub_wrap > li').on('click', function () {
      $(this).addClass('is-open').siblings().removeClass('is-open');
    })

    $('.comm_list > div > ul > li').on('click', function () {
      $(this).parents('.comm_list').addClass('is-open').siblings().removeClass('is-open');
    })

    // 헤더 메뉴의 '전체회의록' 클릭 -> .sub_wrap의 '전체회의록'에 '.is-open' 부여하기
    $('.whole_minutes_wrap').on('click', function () {
      $('.sub_wrap').children().eq(1).addClass('is-open').siblings().removeClass('is-open');
    })
  }

  subWrapTitle();

  function selPayPeriod () {
    $('.period_item').on('click', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
    })

  }

  function selPayMethod () {
    $('#CARD').on('click', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
      $('#CARD_SUB').css('display', 'block').siblings().css('display', 'none');
    })
    $('#EASY').on('click', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
      $('#EASY_SUB').css('display', 'block').siblings().css('display', 'none');
    })
    $('#PHONE').on('click', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
      $('#PHONE_SUB').css('display', 'block').siblings().css('display', 'none');
    })
    $('#BANK').on('click', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
      $('#BANK_SUB').css('display', 'block').siblings().css('display', 'none');
    })
    $('#ETC').on('click', function () {
      $(this).addClass('selected').siblings().removeClass('selected');
      $('#ETC_SUB').css('display', 'block').siblings().css('display', 'none');
    })
  }
  
  selPayPeriod();
  selPayMethod();

})
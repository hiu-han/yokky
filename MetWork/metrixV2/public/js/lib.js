$(document).ready(function () {
  const trdMenu = ['정치', '경제', '사회', 'IT·과학', '연예'];

  const trdSwp = new Swiper('#trdSwpContainer', {
    slidesPerView: 1.8,
    spaceBetween: 24,
    centeredSlides: true,
    debugger: true,
    mousewheel: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    loop: true,
    pagination: {
      el: '#trdSwpPagination.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + trdMenu[index] + '</span>';
      },
    },
    navigation: {
      nextEl: '#trdNext.swiper-button-next',
      prevEl: '#trdPrev.swiper-button-prev',
    },
    breakpoints: {
      481: {
        slidesPerView: 2.4,
      },
      681: {
        slidesPerView: 5,
        loop: false,
        autoplay: false,
        navigation: false,
        centeredSlides: false,
      },
    },
  });

  const idxTrdSwp = new Swiper('#idxTrdSwpContainer', {
    slidesPerView: 1.8,
    spaceBetween: 14,
    centeredSlides: true,
    debugger: true,
    mousewheel: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    loop: true,
    pagination: {
      el: '#idxTrdSwpPagination.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + trdMenu[index] + '</span>';
      },
    },
    navigation: {
      nextEl: '#idxTrdNext.swiper-button-next',
      prevEl: '#idxTrdPrev.swiper-button-prev',
    },
    // breakpoints: {
    //   481: {
    //     slidesPerView: 2.4,
    //   },
    //   681: {
    //     slidesPerView: 5,
    //     loop: false,
    //     autoplay: false,
    //     navigation: false,
    //     centeredSlides: false,
    //   },
    // },
  });

  const idxMwsSwp = new Swiper('#mwsBannerContainer', {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    debugger: true,
    mousewheel: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    loop: true,
    pagination: {
      el: '#mwsBannerPagination',
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + index + '</span>';
      },
    },
  });

  // new Swiper('#trdSwpContainer', {
  //   direction: 'vertical',
  //   autoplay: {
  //     delay: 4000,
  //   },
  //   loop: true,
  //   slidesPerView: 1.5,
  //   spaceBetween: 24,
  //   centerdSlides: true,
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  //   navigation: {
  //     prevEl: '.swiper-prev',
  //     nextEl: '.swiper-next',
  //   },
  // });
});

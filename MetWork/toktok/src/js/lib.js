$(document).ready(function () {
    
  $(window).on("resize", function () {
    winWidth = window.innerWidth;
    console.log(winWidth);
    return winWidth;
  });
  
  let indexTrdMenu = ['정치', '경제', '사회', 'IT·과학', '연예'];

  const idxTrdSwp = new Swiper('#idxTrdSwpContainer', {
    slidesPerView: 1.5,
    spaceBetween: 24,
    debugger: true,
    mousewheel:true,
    loop: true,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    pagination: {
      el: "#idxTrdSwpPagination.swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (indexTrdMenu[index]) + '</span>';
      },
    },
    navigation: {
      nextEl: "#idxtrdNext.swiper-button-next",
      prevEl: "#idxtrdPrev.swiper-button-prev",
    },
    breakpoints: {
      481: {
        slidesPerView: 2.4,
      },
      681: {
        slidesPerView: 5,
        loop:false,
        autoplay: false,
        navigation: false,
        centeredSlides:false,
      }
    },
  });

  // swiper test >> Trend page 시작
  const stmtTrdSwp = new Swiper('#kwdRnkContainer, #postTrdSwpContainer, #stmtTrdSwpContainer, #enggTrdSwpContainer', {
    slidesPerView: 1,
    spaceBetween: 24,
    debugger: true,
    mousewheel:true,
    loop:false,
    centeredSlides: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const kwdTrdSwp = new Swiper('#kwdTrdSwpContainer', {
    slidesPerView: 1,
    spaceBetween: 36,
    breakpoints: {
      481: {
        slidesPerView: 3,
      },
      769: {
        slidesPerView: 4,
      },
    },
    debugger: true,
    mousewheel:true,
    loop:false,
    centeredSlides: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const youtHotSwp = new Swiper('#youtHotSwpContainer', {
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      481: {
        slidesPerView: 3,
      },
      769: {
        slidesPerView: 3,
      },
    },
    debugger: true,
    mousewheel:true,
    loop: true,
    centeredSlides: true,
    
    autoplay: {
      delay: 3500,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: false,
      prevEl: false,
    },
  });

  const buzzNewsSwp = new Swiper('#buzzNewsSwpContainer', {
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      481: {
        slidesPerView: 1.8,
      },
      769: {
        slidesPerView: 1.8,
      },
    },
    debugger: true,
    mousewheel:true,
    loop: false,
    centeredSlides: false,
    
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: false,
      prevEl: false,
    },
  });
  // swiper test >> Trend page 끝
})
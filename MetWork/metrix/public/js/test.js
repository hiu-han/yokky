$(document).ready(function () {
  const $cardBox = $(".cont-mission-card");
  const $cardWrap = $cardBox.children(".card-wrap");
  const $card = $(".mission-card-item");
  const cardLeng = $card.length;
  const cardWidth = $card.outerWidth();
  
  console.log(cardLeng);

  function cardWrapWidth() {
    $cardWrap.css("width", `${cardWidth * cardLeng}px`);
  }
  cardWrapWidth();

  function cardSlider() {
    let showBanner = 0;

    /*for (let i = showBanner; i < cardLeng; i++) {
      // $cardWrap.stop().animate({
      //   "margin-left": `-${cardWidth * i}px`}, 1000);
      $cardWrap.css("margin-left", `-${cardWidth * i}px`);
      console.log(i);
    }*/

    if (showBanner < cardLeng) {
      $cardWrap.stop().animate({
        "margin-left": `-${cardWidth * showBanner}px`
      }, 1000);
      console.log(`-${cardWidth * showBanner}px`);
      return showBanner++;
    }
    
  }
  // setInterval(cardSlider,1000);
  // cardSlider();
})
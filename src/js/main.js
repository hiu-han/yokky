// 좌측 > 오늘의 한마디 > 타이핑효과
const typingTxt = document.querySelector('.typing');
const cursor = document.querySelector('.cursor');

const typing = function (_, counter = 0) {
  const txt = `Website for
  My digital dreams.`;

  setInterval(() => {
    if (txt.length === counter) {
      cursor.classList.add('blink_animate');
      return;
    }
    typingTxt.textContent += txt[counter];
    counter++;
  }, 110);
};

window.addEventListener('load', typing);

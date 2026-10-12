// 좌측 > 오늘의 한마디 > 타이핑효과
const quotes = [
  '쌓여가는 경험이 나를 만듭니다.',
  'The less their ability, the more their conceit.',
  'There is no great genius without some touch of madness.',
  'Genius is nothing but a great capacity for patience.',
  'The more things a man is ashamed of, the more respectable he is.',
  'With regard to excellence, it is not enough to know, but we must try to have and use it.',
  'Never bend your head. Hold it high. Look the world straight in the eye.',
  'The farther behind I leave the past, the closer I am to forging my own character.',
  "There is never ebough time, unless you're serving it.",
  "I don't think of the past. The only thing that matters is the everlasting present.",
];

const typingTxt = document.querySelector('.typing');
const cursor = document.querySelector('.cursor');

const typing = function (_, counter = 0) {
  // const txt = `Website for My digital dreams.`;
  // const txt = `쌓여가는 경험이 나를 만듭니다.`;
  const txt = quotes[Math.floor(Math.random() * quotes.length)];

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

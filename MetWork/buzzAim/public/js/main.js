// 우측 > 상세추이 > 차트 샘플
const chartConfigs = [
  {
    id: 'chartA1',
    dailyData: [
      [10, 20, 30, 40, 50, 60, 70],
      [15, 25, 35, 45, 55, 65, 75],
      [20, 30, 40, 50, 60, 70, 80],
    ],
    weeklyData: [
      [70, 60, 50, 40, 30, 20, 10],
      [75, 65, 55, 45, 35, 25, 15],
      [80, 70, 60, 50, 40, 30, 20],
    ],
  },
  {
    id: 'chartA2',
    dailyData: [
      [12, 22, 32, 42, 52, 62, 72],
      [17, 27, 37, 47, 57, 67, 77],
      [22, 32, 42, 52, 62, 72, 82],
    ],
    weeklyData: [
      [72, 62, 52, 42, 32, 22, 12],
      [77, 67, 57, 47, 37, 27, 17],
      [82, 72, 62, 52, 42, 32, 22],
    ],
  },
  {
    id: 'chartA3',
    dailyData: [
      [14, 24, 34, 44, 2, 64, 74],
      [19, 29, 39, 49, 59, 69, 79],
      [24, 34, 44, 54, 64, 74, 84],
    ],
    weeklyData: [
      [74, 64, 54, 44, 34, 24, 14],
      [79, 69, 59, 49, 39, 29, 19],
      [84, 74, 64, 54, 44, 34, 24],
    ],
  },
];

const colors = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(199, 199, 199, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(255, 102, 255, 1)',
];

const backgroundColors = colors.map((color) => color.replace('1)', '0.2)'));

const charts = {};

chartConfigs.forEach((config, index) => {
  const ctx = document.getElementById(config.id).getContext('2d');
  charts[config.id] = new Chart(ctx, {
    type: 'line',
    data: {
      labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
      datasets: config.dailyData.map((data, dataIndex) => ({
        label: `Dataset ${dataIndex + 1}`,
        data,
        borderColor: colors[(index * 0 + dataIndex) % colors.length],
        backgroundColor:
          backgroundColors[(index * 0 + dataIndex) % backgroundColors.length],
        borderWidth: 2,
      })),
    },
    options: {
      responsive: true,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          position: 'top',
        },
      },
    },
  });

  document.getElementById(`${config.id}daily`).addEventListener('click', () => {
    updateChart(config.id, config.dailyData, 'Day');
  });

  document
    .getElementById(`${config.id}weekly`)
    .addEventListener('click', () => {
      updateChart(config.id, config.weeklyData, 'Week');
    });
});

function updateChart(chartId, dataSets, labelType) {
  const chart = charts[chartId];
  chart.data.labels = Array.from(
    { length: 7 },
    (_, i) => `${labelType} ${i + 1}`
  );
  chart.data.datasets.forEach((dataset, idx) => {
    dataset.data = dataSets[idx];
  });
  chart.update();
}

// 타이핑 효과
/*
const paragraphTag = document.querySelector('.typing');
const letter =
  '로보락 S8 MaxV Ultra에 대한 고객들의 반응은 대체로 긍정적이지만, 흡입력과 장애물 인식 기능에 대한 아쉬움이 존재하며, 가격 대비 성능에 대한 고민도 나타나고 있습니다. 일부 사용자는 로봇청소기의 편리함과 청소 효율성에 만족하고 있지만, 다른 브랜드와의 비교를 통해 로보락의 가성비에 의문을 제기하기도 했습니다.';

function play() {
  let i = 0;
  function typing() {
    if (i === letter.length - 1) {
      //초기화
      i = 0;
      paragraphTag.innerHTML = '';
      return;
    }
    //줄바꿈
    if (letter[i] === '\n') {
      paragraphTag.innerHTML += '<br/>';
    } else {
      paragraphTag.innerHTML += letter[i];
    }
    i++;
  }
  const timer = setInterval(typing, 70);
}

play();
// 출처: https://woorii-kye.tistory.com/195 [캐빈 방정식:티스토리]

*/

/*
const content =
  '로보락 S8 MaxV Ultra에 대한 고객들의 반응은 대체로 긍정적이지만, 흡입력과 장애물 인식 기능에 대한 아쉬움이 존재하며, 가격 대비 성능에 대한 고민도 나타나고 있습니다. 일부 사용자는 로봇청소기의 편리함과 청소 효율성에 만족하고 있지만, 다른 브랜드와의 비교를 통해 로보락의 가성비에 의문을 제기하기도 했습니다.';
const text = document.querySelector('.typing');
let i = 0;

function typing() {
  if (i < content.length) {
    let txt = content.charAt(i);
    text.innerHTML += txt;
    i++;
  }
}
setInterval(typing, 100);
*/

// 좌측 > 오늘의 한마디 > 타이핑효과
// const typingTxt = document.querySelector('.typing');
// const cursor = document.querySelector('.cursor');

// const typing = function (_, counter = 0) {
//   const txt =
//     '로보락 제품에 대한 고객들의 반응은 대체로 긍정적이지만, 물걸레 청소 시 발생하는 냄새 문제와 관련된 불만이 많으며, 가격 대비 성능에 대한 고민도 존재하는 것으로 요약할 수 있습니다. ';

//   setInterval(() => {
//     if (txt.length === counter) {
//       cursor.classList.add('blink_animate');
//       return;
//     }
//     typingTxt.textContent += txt[counter];
//     counter++;
//   }, 80);
// };

// window.addEventListener('load', typing);

//
// const typingTxt = document.querySelector('.typing');
// const cursor = document.querySelector('.cursor');

// const txt =
//   '로보락 제품에 대한 고객들의 반응은 대체로 긍정적이지만, 물걸레 청소 시 발생하는 냄새 문제와 관련된 불만이 많으며, 가격 대비 성능에 대한 고민도 존재하는 것으로 요약할 수 있습니다. ';

// // 전체 글자 수 기준으로 랜덤하게 1~2개의 멈춤 포인트 선택
// const pauseCount = Math.floor(Math.random() * 2) + 1; // 1 또는 2
// const pauseIndexes = [];
// while (pauseIndexes.length < pauseCount) {
//   const index = Math.floor(Math.random() * txt.length);
//   if (!pauseIndexes.includes(index) && index > 5 && index < txt.length - 5) {
//     pauseIndexes.push(index);
//   }
// }
// // 정렬해줘야 멈추는 타이밍이 자연스러워져~
// pauseIndexes.sort((a, b) => a - b);

// function typeText(counter = 0) {
//   if (counter >= txt.length) {
//     cursor.classList.add('blink_animate');
//     return;
//   }

//   typingTxt.textContent += txt[counter];
//   counter++;

//   const isPausePoint = pauseIndexes.includes(counter);
//   const delay = isPausePoint ? 1000 : 80;

//   setTimeout(() => typeText(counter), delay);
// }

// window.addEventListener('load', () => {
//   typeText();
// });

//
// const typingTxt = document.querySelector('.typing');
// const cursor = document.querySelector('.cursor');

// const txt =
//   '로보락 제품에 대한 고객들의 반응은 대체로 긍정적이지만, 물걸레 청소 시 발생하는 냄새 문제와 관련된 불만이 많으며, 가격 대비 성능에 대한 고민도 존재하는 것으로 요약할 수 있습니다. ';

// // 랜덤하게 1~2회 멈춤 위치 선정
// const pauseCount = Math.floor(Math.random() * 2) + 1;
// const pauseIndexes = [];
// while (pauseIndexes.length < pauseCount) {
//   const index = Math.floor(Math.random() * txt.length);
//   if (!pauseIndexes.includes(index) && index > 5 && index < txt.length - 5) {
//     pauseIndexes.push(index);
//   }
// }
// pauseIndexes.sort((a, b) => a - b);

// // 타이핑 함수
// function typeText(counter = 0) {
//   if (counter >= txt.length) {
//     cursor.classList.add('blink_animate');
//     return;
//   }

//   typingTxt.textContent += txt[counter];
//   counter++;

//   const isPausePoint = pauseIndexes.includes(counter);

//   // 🎯 진짜 타자 느낌! 50~120ms 사이 랜덤 속도
//   const baseSpeed = Math.floor(Math.random() * 70) + 50;

//   // 🛑 멈추는 위치에서는 1초 쉬기
//   const delay = isPausePoint ? 1000 : baseSpeed;

//   setTimeout(() => typeText(counter), delay);
// }

// window.addEventListener('load', () => {
//   typeText();
// });

//
const typingTxt = document.querySelector('.typing');
const cursor = document.querySelector('.cursor');

const txt =
  '로보락 제품에 대한 고객들의 반응은 대체로 긍정적이지만, 물걸레 청소 시 발생하는 냄새 문제와 관련된 불만이 많으며, 가격 대비 성능에 대한 고민도 존재하는 것으로 요약할 수 있습니다.';

function typeText(counter = 0) {
  if (counter >= txt.length) {
    cursor.classList.add('blink_animate');
    return;
  }

  const currentChar = txt[counter];
  typingTxt.textContent += currentChar;
  counter++;

  // 타자 속도 기본값 (랜덤 50~120ms)
  let delay = Math.floor(Math.random() * 70) + 50;

  // 쉼표나 마침표는 살짝 멈춤
  if (currentChar === ',') {
    delay = 500;
  } else if (currentChar === '.') {
    delay = 800;
  }

  setTimeout(() => typeText(counter), delay);
}

window.addEventListener('load', () => {
  typeText();
});

// 우측 > AI 감성 평가 > 자동 슬라이드 효과 - 02-250402
let emotSlideIntervals = [];

function startEmotAutoSlide(containers) {
  emotSlideIntervals.forEach((interval) => clearInterval(interval));
  emotSlideIntervals = [];

  containers.forEach((container, index) => {
    const list = container.querySelector('.list__inner');
    // const items = Array.from(container.querySelectorAll('.emot__item'));

    function updateClasses() {
      const items = Array.from(container.querySelectorAll('.emot__item'));
      items.forEach((el) => el.classList.remove('first', 'second', 'third'));
      if (items.length > 0) items[0].classList.add('first');
      if (items.length > 1) items[1].classList.add('second');
      if (items.length > 2) items[2].classList.add('third');
    }

    function slideUp() {
      const items = Array.from(container.querySelectorAll('.emot__item'));
      if (items.length === 0 || list.scrollHeight <= container.clientHeight)
        return;

      const firstItem = items[0];
      const shiftHeight = firstItem.offsetHeight + 5;

      list.style.transition = 'transform 0.5s ease-in-out';
      list.style.transform = `translateY(-${shiftHeight}px)`;

      setTimeout(() => {
        list.style.transition = 'none';
        list.style.transform = 'translateY(0)';
        list.appendChild(firstItem);
        items.push(items.shift());
        updateClasses();
      }, 500);
    }

    updateClasses();

    setTimeout(() => {
      emotSlideIntervals[index] = setInterval(slideUp, 2000);
    }, index * 1000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.emot__list');
  startEmotAutoSlide(containers);

  document.querySelectorAll('.cont--reaction .tap__item').forEach((button) => {
    button.addEventListener('click', () => {
      console.log('btn clicked');
      startEmotAutoSlide(containers);
    });
  });
});

// 우측 > AI 주제 분석 관련 >> 운영서버의 내용 일단 그대로 복붙 >> 정리하자
// 카테고리별 클릭 이벤트 추가 ( 1) "#카테고리" 변경  2) classList(on)변경)
let topicItems = document
  .querySelector('.topic__list')
  .querySelectorAll('.topic__item');
topicItems.forEach((tItem) => {
  // console.log(tItem);
  tItem.addEventListener('click', () => {
    // 1) "#카테고리" 변경
    let category_idx = tItem.id.split('_');
    // console.log(category_idx);
    let category_idx2 = category_idx.pop();
    let category_idx1 = category_idx.pop();
    // console.log(category_idx1, category_idx2);
    getTopicContent(brand_idx, category_idx1, category_idx2);
    // 2) classList(on)변경
    let beforetItemOn = document
      .querySelector('.topic__list')
      .querySelector('.on');
    beforetItemOn.classList.remove('on');
    tItem.classList.add('on');

    // 우측 텍스트박스 컨텐츠 제목 > 선택한 카테고리 이름으로 변경하기 // 한희재 250327_1540
    let tItemName = tItem.querySelector('.topic-element');
    let selectedtItemName = document.querySelector('#detailTopicName');
    selectedtItemName.innerText = tItemName.textContent;
  });
});

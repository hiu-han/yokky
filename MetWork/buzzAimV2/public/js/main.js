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

const typingTxt = document.querySelector('.typing');
const cursor = document.querySelector('.cursor');

const typing = function (_, counter = 0) {
  const txt =
    '로보락 S8 MaxV Ultra에 대한 고객들의 반응은 대체로 긍정적이지만, 흡입력과 장애물 인식 기능에 대한 아쉬움이 존재하며, 가격 대비 성능에 대한 고민도 나타나고 있습니다. 일부 사용자는 로봇청소기의 편리함과 청소 효율성에 만족하고 있지만, 다른 브랜드와의 비교를 통해 로보락의 가성비에 의문을 제기하기도 했습니다.';

  setInterval(() => {
    if (txt.length === counter) {
      cursor.classList.add('blink_animate');
      return;
    }
    typingTxt.textContent += txt[counter];
    counter++;
  }, 80);
};

window.addEventListener('load', typing);

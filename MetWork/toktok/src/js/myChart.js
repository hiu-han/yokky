/** 첫 테스트 차트 */
const ctx = document.getElementById('myChart01').getContext('2d');
const myChart01 = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '판매량',
        data: [12, 29, 3, 5, 2, 3],
        backgroundColor: [
          '#699ff1',
          '#fb6761',
          '#f8f858',
          '#ffbf48',
          '#81e778',
          '#a384eb',
        ],
        // backgroundColor: [
        //   'rgba(255, 99, 132, 0.6)',
        //   'rgba(54, 162, 235, 0.6)',
        //   'rgba(255, 206, 86, 0.6)',
        //   'rgba(75, 192, 192, 0.6)',
        //   'rgba(153, 102, 255, 0.6)',
        //   'rgba(255, 159, 64, 0.6)',
        // ],
        borderColor: [
          '#699ff1',
          '#fb6761',
          '#f8f858',
          '#ffbf48',
          '#81e778',
          '#a384eb',
        ],
        borderWidth: 1,
        barPercentage: 0.5,
        barThickness: 20,
        maxBarThickness: 30,
        minBarLength: 8,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    legend: {
      display: true,
      position: 'bottom',
    },
    layout: {
      padding: {
        // left: 50,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    // indexAxis: 'y',
  },
});

myChart01.data.datasets[0].data = [100, 20, 31, 59, 82, 33];
myChart01.update();

/** myChart02 - Line chart */
const chart02Labels = ['January', 'February', 'March', 'April', 'May', 'June'];
const chart02Data = {
  labels: chart02Labels,
  datasets: [
    {
      label: 'My Second dataset',
      // backgroundColor: 'rgb(255, 99, 132)',
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
      ],
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};

const chart02Config = {
  type: 'line',
  data: chart02Data,
  options: {},
};

const myChart02 = new Chart(
  document.getElementById('myChart02'),
  chart02Config
);

/** myChart03 - Bubble chart */
const chart03Data = {
  // labels: ['First', 'Second', 'Third', ],
  datasets: [
    {
      label: 'Third Dataset',
      data: [
        {
          x: 20,
          y: 30,
          r: 10,
        },
        {
          x: 40,
          y: 10,
          r: 10,
        },
        {
          x: 26,
          y: 23,
          r: 8,
        },
      ],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
      ],
    },
  ],
};

const chart03Config = {
  type: 'bubble',
  data: chart03Data,
  options: {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};

const myChart03 = new Chart(
  document.getElementById('myChart03'),
  chart03Config
);

/** mychart04 - Doughnut chart */
const chart04Data = {
  labels: ['One', 'Two', 'Three'],
  datasets: [
    {
      label: 'My Doughnut Dataset',
      data: [300, 500, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

const chart04Config = {
  type: 'doughnut',
  data: chart04Data,
};

const myChart04 = new Chart(
  document.getElementById('myChart04'),
  chart04Config
);

/** myChart05 - Pie chart */
const myChart05Data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: 'My Pie chart',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 206, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

const myChart05Config = {
  type: 'pie',
  data: myChart05Data,
};

const myChart05 = new Chart(
  document.getElementById('myChart05'),
  myChart05Config
);

/** myChart06 - Line chart */
// const myChart06Labels = Utils.months({count: 7});
const myChart06Labels = [
  'January',
  'February',
  'March',
  'Aprill',
  'May',
  'June',
];
const myChart06Data = {
  labels: myChart06Labels,
  datasets: [
    {
      label: 'My Line chart',
      data: [65, 59, 80, 81, 56, 55, 40],
      // fill: 'rgb(255,255,255)',
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

const myChart06Config = {
  type: 'line',
  data: myChart06Data,
};

const myChart06 = new Chart(
  document.getElementById('myChart06'),
  myChart06Config
);

/** myChart07 - Mixed chart */
const myChart07Data = {
  labels: ['January', 'February', 'March', 'Aprill'],
  datasets: [
    {
      type: 'bar',
      label: 'Bar Dataset',
      data: [10, 20, 30, 40],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
      type: 'line',
      label: 'Line Dataset',
      data: [50, 50, 37, 50],
      fill: false,
      borderColor: 'rgb(54, 162, 235)',
    },
  ],
};

const myChart07Config = {
  type: 'scatter',
  data: myChart07Data,
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
};

const myChart07 = new Chart(
  document.getElementById('myChart07'),
  myChart07Config
);

/** myChart08 - Polar Area chart */
const myChart08Data = {
  labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
  datasets: [
    {
      label: 'My Polar Area chart',
      data: [11, 16, 7, 3, 14],
      backgroundColor: [
        'rgba(255, 99, 132,0.5)',
        'rgba(54, 162, 235,0.5)',
        'rgba(255, 206, 86,0.5)',
        'rgba(75, 192, 192,0.5)',
        'rgba(153, 102, 255,0.5)',
      ],
    },
  ],
};

const myChart08Config = {
  type: 'polarArea',
  data: myChart08Data,
  options: {},
};

const myChart08 = new Chart(
  document.getElementById('myChart08'),
  myChart08Config
);

/** myChart09 - Radar chart */
const myChart09Data = {
  labels: [
    'Eating',
    'Drinking',
    'Sleeping',
    'Designing',
    'Coding',
    'Cycling',
    'Running',
  ],
  datasets: [
    {
      label: 'First dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgb(255, 99, 132)',
      pointBackgroundColor: 'rgb(255, 99, 132)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(255, 99, 132)',
    },
    {
      label: 'Second dataset',
      data: [28, 48, 40, 19, 56, 27, 81],
      fill: true,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      pointBackgroundColor: 'rgb(54, 162, 235)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(54, 162, 235)',
    },
  ],
};

const myChart09Config = {
  type: 'radar',
  data: myChart09Data,
  options: {
    // 단계 0 ~ 100 10씩으로 고정하기 test start
    scales: {
      r: {
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          // 아래는 단계별 숫자 표기 지우기
          display: false,
          stepSize: 10,
        },
      },
    },
    // test end
    elements: {
      line: {
        borderWidth: 3,
      },
    },
  },
};

const myChart09 = new Chart(
  document.getElementById('myChart09'),
  myChart09Config
);

/** myChart10 - Scatter chart */
const myChart10Data = {
  datasets: [
    {
      label: 'Scatter Dataset',
      data: [
        {
          x: -10,
          y: 0,
        },
        {
          x: 0,
          y: 10,
        },
        {
          x: 10,
          y: 5,
        },
        {
          x: 0.5,
          y: 5.5,
        },
      ],
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ],
};

const myChart10Config = {
  type: 'scatter',
  data: myChart10Data,
  options: {
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
    },
  },
};

const myChart10 = new Chart(
  document.getElementById('myChart10'),
  myChart10Config
);

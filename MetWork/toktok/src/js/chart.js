const colorSetPosit = ['#699ff1', '#dadada', '#fb6761'];
const colorSet = [
  '#699ff1',
  '#fb6761',
  '#f0f040',
  '#ffcb51',
  '#81e778',
  '#a384eb',
  '#69ecec',
  '#ffaab8',
  '#83af5a',
  '#586bd1',
  '#4dc457',
  '#bb5b5b',
  '#c559bc',
  '#ff9c2a',
  '#dadada',
];

const chartSentimentData = {
  labels: ['긍정', '중립', '부정'],
  datasets: [
    {
      label: 'SENTIMENT',
      data: [258, 57, 21],
      backgroundColor: [colorSetPosit[0], colorSetPosit[1], colorSetPosit[2]],
      hoverOffset: 4,
      datalabels: {
        color: '#fff',
      },
    },
    // {
    //   label: 'SENTIMENT',
    //   data: [300, 50, 100],
    //   backgroundColor: [colorSetPosit[0], colorSetPosit[1], colorSetPosit[2]],
    //   hoverOffset: 4,
    //   datalabels: {
    //     color: '#fff',
    //   },
    // },
    // {
    //   label: 'SENTIMENT',
    //   data: [300, 50, 100],
    //   backgroundColor: [colorSetPosit[0], colorSetPosit[1], colorSetPosit[2]],
    //   hoverOffset: 4,
    //   datalabels: {
    //     color: '#aaa',
    //   },
    // },
  ],
};

const chartSentimentConfig = {
  plugins: [ChartDataLabels],
  type: 'pie',
  data: chartSentimentData,
  options: {
    layout: {
      padding: 4,
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        formatter: function (value, context) {
          const empty = '';
          let idx = context.dataIndex;
          const valueTotal = chartSentimentData.datasets[0].data.reduce(
            (accumulator, currentNumber) => accumulator + currentNumber
          );
          const valuePercent = (value / valueTotal) * 100;
          // return `${context.chart.data.labels[idx]} ${value} 건`;
          // return `${(value / valueTotal) * 100} %`;
          // return `${valuePercent.toFixed(2)}%`;
          return valuePercent < 13 ? empty : `${valuePercent.toFixed(1)}%`;
        },
        align: 'top',
        font: {
          size: '14px',
        },
        textAlign: 'center',
      },
    },
    elements: {
      arc: {
        borderWidth: 5,
      },
    },
  },
};

const chartSentiment = new Chart(
  document.getElementById('chartSentiment'),
  chartSentimentConfig
);

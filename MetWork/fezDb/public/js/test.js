// 데이터 배열
const chartData = [
  {
    labels: ['복합물류', '스마트제조', '헬스케어', '관광서비스'],
    data: [845, 540, 138, 482],
  },
  {
    labels: ['ICT로봇제조', '미래모빌리티', '의료'],
    data: [636, 73, 398],
  },
  {
    labels: ['항공물류', '금속소재', '복합물류', '첨단소재'],
    data: [734, 632, 378, 512],
  },
  {
    labels: ['그린에너지', '기능성화학', '스마트IT부품', '에너지소재'],
    data: [587, 332, 432, 198],
  },
  {
    labels: ['복합물류', '스마트제조', '헬스케어', '관광서비스'],
    data: [845, 540, 138, 482],
  },
  {
    labels: ['ICT로봇제조', '미래모빌리티', '의료'],
    data: [636, 73, 398],
  },
  {
    labels: ['항공물류', '금속소재', '복합물류', '첨단소재'],
    data: [734, 632, 378, 512],
  },
  {
    labels: ['그린에너지', '기능성화학', '스마트IT부품', '에너지소재'],
    data: [587, 332, 432, 198],
  },
];

// 막대차트를 그릴 컨텍스트 배열
const ctx = Array.from({ length: chartData.length }, (_, i) =>
  document.getElementById(`barChart${i + 1}`)
);

// 막대차트 생성 (가로)
ctx.forEach((ctx, index) => {
  new Chart(ctx, {
    plugins: [ChartDataLabels], // 차트 label 관련 플러그인
    type: 'bar',
    data: {
      labels: chartData[index].labels,
      datasets: [
        {
          data: chartData[index].data,
          backgroundColor: [
            '#ff747333',
            '#ffc85233',
            '#47b8e033',
            '#6a60a933',
            '#f1d14b33',
            '#fc913a33',
            '#4556c733',
            '#8fa6bf33',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            '#ff7473',
            '#ffc852',
            '#47b8e0',
            '#6a60a9',
            '#f1d14b',
            '#fc913a',
            '#4556c7',
            '#8fa6bf',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      maxBarThickness: 50, // 막대 폭
      plugins: {
        legend: {
          display: false, // 범례 off
        },
        tooltip: {
          enabled: false, // 툴팁 off
        },
        datalabels: {
          formatter: function (value, context) {
            // 툴팁 내용 항시 노출
            var idx = context.dataIndex; // 각 데이터 인덱스
            // 출력 텍스트
            return context.chart.data.labels[idx] + `\n` + value + '개';
          },
          color: [
            '#ff7473',
            '#ffc852',
            '#47b8e0',
            '#6a60a9',
            '#f1d14b',
            '#fc913a',
            '#4556c7',
            '#8fa6bf',
            'rgba(255, 159, 64, 1)',
          ],
          font: {
            weight: '500',
            size: '15px',
          },
          textAlign: 'center',
          align: 'center',
        },
      },
    },
  });
});

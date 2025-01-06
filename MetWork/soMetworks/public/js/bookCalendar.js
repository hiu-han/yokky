$(document).ready(function () {
  let date = new Date();

  function stateCalendar() {
    const calendarYear = date.getFullYear(),
      calendarMonth = date.getMonth() + 1,
      calendarToday = date.getDate();

    const monthLastDate = new Date(calendarYear, calendarMonth, 0);
    // 달력 월의 마지막 일
    const calendarMonthLastDate = monthLastDate.getDate();

    const monthStartDay = new Date(calendarYear, date.getMonth(), 1);
    // 달력 월의 시작 요일
    const calendarMonthStartDay = monthStartDay.getDay();

    // 주 카운트
    const calendarWeekCount = Math.ceil(
      (calendarMonthStartDay + calendarMonthLastDate) / 7
    );

    // 현재 보고 있는 년 월 표기
    document.querySelector(
      '.year-month'
    ).textContent = `${calendarYear}년 ${calendarMonth}월`;

    let today = new Date();

    let html = '';
    html += '<table>';
    html += '<thead>';
    html += '<tr>';
    html +=
      '<th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
    // 위치
    let calendarPos = 0;
    // 날짜
    let calendarDay = 0;
    for (let i = 0; i < calendarWeekCount; i++) {
      html += '<tr>';
      for (let j = 0; j < 7; j++) {
        html += '<td>';
        if (
          calendarMonthStartDay <= calendarPos &&
          calendarDay < calendarMonthLastDate
        ) {
          calendarDay++;
          html += `<p class="date-num`;

          // 오늘 날짜 체크
          if (
            calendarYear == today.getFullYear() &&
            calendarMonth == today.getMonth() + 1 &&
            calendarDay == today.getDate()
          ) {
            html += ` today`;
          }
          html += `"><span>${calendarDay}</span></p>`;
        }
        html += '</td>';
        calendarPos++;
      }
      html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
    $('#stateCalendar').html(html);
  }
  stateCalendar();

  // 전월로
  const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    stateCalendar();
  };

  // 명월로
  const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    stateCalendar();
  };

  // 오늘로
  const goToday = () => {
    date = new Date();
    stateCalendar();
  };

  $('#calPrev').on('click', prevMonth);
  $('#calNext').on('click', nextMonth);
  $('#calToday').on('click', goToday);
});

$(document).ready(function () {
  const now = new Date();

  let year = now.getFullYear();
  let month = now.getMonth();

  // 해당 월의 총 일 수 반환
  function getMonthDays(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }
  let totalDays = getMonthDays(year, month);

  // 해당 월 첫째 요일
  let firstDay = new Date(year, month, 1).getDay();
  console.log(firstDay);

  const calendarBody = document.getElementById('calBody');
  const calendarMonthYear = document.getElementById('monthYear');

  // 달력 타이틀 년 월
  calendarMonthYear.textContent = `${year}년 ${month + 1}월`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      cell.setAttribute('class', `date-${month + 1}-${date}`);
      if (i === 0 && j < firstDay) {
        const cellText = document.createTextNode('');
        cell.appendChild(cellText);
      } else if (date > totalDays) {
        break;
      } else {
        const cellText = document.createTextNode(date);
        cell.appendChild(cellText);
        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }

  document.getElementById('calPrev').addEventListener('click', function () {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }
    updateCalendar();
    console.log('clicked');
  });

  document.getElementById('calNext').addEventListener('click', function () {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }
    updateCalendar();
    console.log('clicked');
  });

  function updateCalendar() {
    totalDays = getMonthDays(year, month);

    firstDay = new Date(year, month, 1).getDay();

    calendarMonthYear.textContent = `${year}년 ${month + 1}월`;

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = calendarBody.childNodes[i];
      for (let j = 0; j < 7; j++) {
        const cell = row.childNodes[j];
        cell.setAttribute('class', `date-${month + 1}-${date}`);

        if (i === 0 && j < firstDay) {
          cell.textContent = '';
        } else if (date > totalDays) {
          cell.textContent = '';
          // break;
        } else {
          cell.textContent = date;
          date++;
        }
      }
    }
  }

  updateCalendar();
});

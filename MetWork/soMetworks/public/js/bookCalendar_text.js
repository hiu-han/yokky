$(document).ready(function () {
  let date = new Date();

  const renderCalendar = () => {
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    // year-month
    document.querySelector('.year-month').textContent = `${viewYear}년 ${
      viewMonth + 1
    }월`;

    // 지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    // Date 기본 배열
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // prevDates 계샨
    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }

    // nextDates 계산
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }

    // Dates 합치기
    const dates = prevDates.concat(thisDates, nextDates);

    const firstDateIndex = dates.indexOf(1);
    const lastDateIndex = dates.lastIndexOf(TLDate);

    // Dates 정리
    dates.forEach((date, i) => {
      const condition =
        i >= firstDateIndex && i < lastDateIndex + 1 ? 'this' : 'other';
      dates[
        i
      ] = `<p class="date"><span class="${condition}">${date}</span></p>`;
    });

    // Dates 그리기
    document.querySelector('.cal-dates').innerHTML = dates.join('');

    const today = new Date();
    if (viewMonth === today.getMonth() && viewYear === today.getFullYear()) {
      for (let dates of document.querySelectorAll('.this')) {
        if (+dates.innerText === today.getDate()) {
          dates.classList.add('today');
          break;
        }
      }
    }
  };

  renderCalendar();

  const prevMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
  };

  const nextMonth = () => {
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
  };

  const goToday = () => {
    date = new Date();
    renderCalendar();
  };
  function hel() {
    console.log('1');
  }

  $('#calendarPrev').on('click', prevMonth);
  $('#goToday').on('click', goToday);
  $('#calendarNext').on('click', nextMonth);
});

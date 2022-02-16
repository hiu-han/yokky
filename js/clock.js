const today = document.querySelector("#today");
const clock = document.querySelector("#clock");

function getDate() {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const toDate = String(date.getDate()).padStart(2, "0");
  const day = date.getDay();
  let dayString = "";
  function getDateString(day) {
    if (day === 0) {
      dayString = "SUN";
    } else if (day === 1) {
      dayString = "MON";
    } else if (day === 2) {
      dayString = "TUE";
    } else if (day === 3 ) {
      dayString = "WED";
    } else if (day === 4) {
      dayString = "THU";
    } else if (day === 5) {
      dayString = "FRI";
    } else {
      dayString = "SAT";
    }
  }
  getDateString(day);
  today.innerText = `${year}. ${month}. ${toDate} ${dayString}`;
}

function getClock() {
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getDate();
getClock();
setInterval(getClock, 1000);
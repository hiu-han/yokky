const API_KEY = "f00fcbfb39959be72f1286bafd033826";

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = document.querySelector("#weather span:first-child");
      const weather = document.querySelector("#weather span:nth-child(2)");
      const city = document.querySelector("#weather span:last-child");
      temp.innerText = `${Math.round(data.main.temp)}°`;
      weather.innerText = data.weather[0].main;
      city.innerText = data.name;
  });
}

function onGeoError() {
  alert("Can't fing you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
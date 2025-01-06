const images = [
  "background_1.jpg",
  "background_2.jpg",
  "background_3.jpg",
  "background_4.jpg",
  "background_5.jpg",
  "background_6.jpg",
]

const chosenImage = images[Math.floor(Math.random() * images.length)];
const body = document.querySelector("body");

body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(./img/main/${chosenImage})`;
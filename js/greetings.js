const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const greetingWrap = document.querySelector(".greeting_wrap");

const logoutBtn = document.querySelector("#logout");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const typedUsername = loginInput.value;
  localStorage.setItem(USERNAME_KEY, typedUsername);
  paintGreetings(typedUsername);
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}!`;
  greetingWrap.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
  // show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  // show the greetings
  paintGreetings(savedUsername);
}

function onLogoutBtn() {
  localStorage.removeItem(USERNAME_KEY);
  window.location.reload();
}

logoutBtn.addEventListener("click", onLogoutBtn);
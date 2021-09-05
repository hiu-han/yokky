const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");
const greetingWrap = document.querySelector(".greeting_wrap");

const logoutBtn = document.querySelector("#logout"); // 개인적으로 작성해봄.

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) { // 여기에 event(관행표기)등의 argument로 공간을 만들어주면 js가 첫번째 argument로 발생된 이벤트의 정보를 채워준다.
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const typedUsername = loginInput.value;
  localStorage.setItem(USERNAME_KEY, typedUsername);
  // greeting.innerText = `Hello ${username}!`;
  // greeting.classList.remove(HIDDEN_CLASSNAME);
  paintGreetings(typedUsername);
}

function paintGreetings(username) {
  greeting.innerText = `Hello ${username}!`;
  greetingWrap.classList.remove(HIDDEN_CLASSNAME);

  // logoutBtn.classList.remove(HIDDEN_CLASSNAME); // 개인적으로 작성해봄.
  // 로그아웃 했을때 다시 HIDDEN_CLASSNAME을 붙여줘야하나 싶었지만 
  // savedUsername === null일때 페이지를 새로고침하면서 자동으로 .hidden이 붙는 것을 확인함.
}

const savedUsername = localStorage.getItem(USERNAME_KEY);
// console.log(savedUsername);

if (savedUsername === null) {
  // show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  // show the greetings
  // greeting.innerText = `Hello ${savedUsername}`; // 이줄과 아랫줄은 onLoginSubmit의 내용과 중복되므로 함수로 만들어 주자!!
  // greeting.classList.remove(HIDDEN_CLASSNAME);
  paintGreetings(savedUsername);
}

// 이하는 개인적으로 작성해봄.


function onLogoutBtn() {
  localStorage.removeItem(USERNAME_KEY);
  window.location.reload();
}

logoutBtn.addEventListener("click", onLogoutBtn);
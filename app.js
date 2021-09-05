// const loginForm = document.getElementById("login-form");
// const loginInput = loginForm.querySelector("input");
// const loginButton = loginForm.querySelector("button");

const loginInput = document.querySelector("#login-form input");
// const loginButton = document.querySelector("#login-form button");

function onLoginBtnClick() {
  // console.dir(loginInput.value);
  const username = loginInput.value;
  // if (username === "") {
  //   alert("Please write your name!");
  // } else if (username.length > 15) {
  //   alert("Your name is too long!");
  // } else if (username.length <= 4) {
  //   alert("Your name is too short!");
  // }
  // 이러한 방법도 좋지만 우리는 브라우저의 기능을 모두 활용해보자
  // html에서 form 내부의 input에서 유효성 기능을 사용할 수 있다.
}

// loginButton.addEventListener("click", onLoginBtnClick);
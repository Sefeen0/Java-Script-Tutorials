let btns = document.querySelectorAll(".container .buttons span"),
  keyInput = document.querySelector(".container #key"),
  valueInput = document.querySelector(".container #value"),
  no = document.querySelector(".container .result .res");

window.onload = () => {
  keyInput.focus();
};
btns.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("check")) {
      check();
    }
    if (e.target.classList.contains("add")) {
      add();
    }
    if (e.target.classList.contains("del")) {
      del();
    }
    if (e.target.classList.contains("show")) {
      show();
    }
  });
});
function checkInput() {
  if (keyInput.value === "" || valueInput.value === "") {
    no.textContent = `Input Can't be empty`;
  }
}
function check() {
  if (keyInput.value !== "") {
    if (localStorage.getItem(keyInput.value)) {
      no.innerHTML = `found <span>${keyInput.value}</span> in local storage`;
    } else {
      no.innerHTML = `No found  <span>${keyInput.value}</span> in local storage`;
    }
    keyInput.value = "";
    valueInput.value = "";
    keyInput.focus();
  } else {
    checkInput();
  }
}
function add() {
  if (keyInput.value !== "" && valueInput.value !== "") {
    localStorage.setItem(keyInput.value, valueInput.value);
    no.innerHTML = `<span>${keyInput.value}</span> added in local storage`;
    keyInput.value = "";
    valueInput.value = "";
    keyInput.focus();
  } else {
    checkInput();
    valueInput.focus();
  }
}
function del() {
  if (keyInput.value !== "") {
    if (localStorage.getItem(keyInput.value)) {
      localStorage.removeItem(keyInput.value);
      no.innerHTML = `<span>${keyInput.value}</span> deleted from local storage`;
    } else {
      no.innerHTML = `No found  <span>${keyInput.value}</span> in local storage`;
    }
    keyInput.value = "";
    valueInput.value = "";
    keyInput.focus();
  } else {
    checkInput();
  }
}
function show() {
  if (localStorage.length) {
    no.innerHTML = "";
    for (let [key, value] of Object.entries(localStorage)) {
      no.innerHTML += `<span>${key} => ${value}</span>`;
    }

    keyInput.value = "";
    valueInput.value = "";
    keyInput.focus();
  } else {
    checkInput();
  }
}

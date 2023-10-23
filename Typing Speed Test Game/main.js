let arrWords = [
  "c",
  "c++",
  "c#",
  "r",
  "php",
  "pyhton",
  "java",
  "typescript",
  "javascript",
  "css",
  "html",
  "sass",
  "ruby",
  "node",
  "react",
  "vue",
  "laravel",
  "angular",
  "flask",
  "styling",
  "wordpress",
  "wix",
  "dependencies",
  "json",
  "template",
];
let levels = {
  easy: 5,
  normal: 4,
  hard: 2,
};
let level = document.querySelector(".game .container .level"),
  seconds = document.querySelector(".game .container .seconds"),
  theWord = document.querySelector(".game .container .random-word"),
  btn = document.querySelector(".game .container button"),
  input = document.querySelector(".game .container input"),
  upComingWord = document.querySelector(".game .container .up-coming-words"),
  time = document.querySelector(".game .container .footer .time span"),
  scoreZero = document.querySelector(".game .container .footer .score .zero"),
  scoreTotal = document.querySelector(".game .container .footer .score .total"),
  finish = document.querySelector(".game .container .finish"),
  control = document.querySelector(".control"),
  btns = document.querySelectorAll(".control button"),
  arrWordsLength = arrWords.length;
btns.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("easy")) {
      control.style.display = "none";
      (defaultLevelName = "easy"),
        (defaultLevelSeconds = levels[defaultLevelName]);
      let firstTime = Number(defaultLevelSeconds) * 2;
      level.textContent = defaultLevelName;
      seconds.textContent = defaultLevelSeconds;
      time.innerHTML = firstTime;
    }
    if (e.target.classList.contains("normal")) {
      control.style.display = "none";
      (defaultLevelName = "normal"),
        (defaultLevelSeconds = levels[defaultLevelName]);
      let firstTime = Number(defaultLevelSeconds) * 2;
      level.textContent = defaultLevelName;
      seconds.textContent = defaultLevelSeconds;
      time.textContent = firstTime;
    }
    if (e.target.classList.contains("hard")) {
      control.style.display = "none";
      (defaultLevelName = "hard"),
        (defaultLevelSeconds = levels[defaultLevelName]);
      let firstTime = Number(defaultLevelSeconds) * 2;
      level.textContent = defaultLevelName;
      seconds.textContent = defaultLevelSeconds;
      time.textContent = firstTime;
    }
  });
});
window.onload = function () {
  theWord.style.display = "none";
  upComingWord.style.display = "none";
  input.setAttribute("disabled", true);
};
input.addEventListener("paste", function (e) {
  e.preventDefault();
});
scoreTotal.textContent = arrWords.length;
btn.addEventListener("click", function () {
  this.remove();
  theWord.style.display = "block";
  upComingWord.style.display = "flex";
  input.removeAttribute("disabled");
  input.focus();
  generate();
});
function generate() {
  let randomWord = arrWords[Math.floor(Math.random() * arrWords.length)];
  let wordIndex = arrWords.indexOf(randomWord);
  arrWords.splice(wordIndex, 1);
  theWord.textContent = randomWord;
  upComingWord.innerHTML = "";
  for (i = 0; i < arrWords.length; i++) {
    let div = document.createElement("div");
    let text = document.createTextNode(arrWords[i]);
    div.appendChild(text);
    upComingWord.appendChild(div);
  }
  start();
}
function start() {
  if (arrWords.length == arrWordsLength - 1) {
    time.innerHTML = defaultLevelSeconds * 2;
  } else {
    time.innerHTML = defaultLevelSeconds;
  }
  let sec = setInterval(() => {
    time.innerHTML--;
    if (time.innerHTML === "0") {
      clearInterval(sec);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreZero.innerHTML++;
        if (arrWords.length > 0) {
          generate();
          if (upComingWord.innerHTML == "") {
            upComingWord.remove();
          }
        } else {
          input.setAttribute("disabled", true);
          let span = document.createElement("span");
          let text = document.createTextNode("congratulations");
          span.className = "good";
          span.appendChild(text);
          finish.appendChild(span);
          setTimeout(function () {
            document.location.reload();
          }, 1000);
        }
      } else {
        input.setAttribute("disabled", true);
        let span = document.createElement("span");
        let text = document.createTextNode("game over");
        span.className = "bad";
        span.appendChild(text);
        finish.appendChild(span);
        setTimeout(function () {
          document.location.reload();
        }, 1000);
      }
    }
  }, 1000);
}

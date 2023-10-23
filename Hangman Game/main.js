let letters = "abcdefghijklmnopqrstuvwxyz",
  lettersArr = Array.from(letters),
  lettersContainer = document.querySelector(".container .letters");
lettersArr.forEach((letter) => {
  let span = document.createElement("span");
  let textSpan = document.createTextNode(letter);
  span.className = "letterBox";
  span.appendChild(textSpan);
  lettersContainer.appendChild(span);
});
let words = {
  programming: [
    "go",
    "javascript",
    "php",
    "c",
    "typescript",
    "python",
    "r",
    "ruby",
  ],
  movies: [
    "conjuring",
    "the nun",
    "insidous",
    "evil dead",
    "god father",
    "smile",
    "coco",
    "barbie",
  ],
  famousPeople: [
    "albert einstein",
    "scott adkins",
    "mike tison",
    "bruce lee",
    "mohamed ali",
  ],
  countries: [
    "egypt",
    "yemen",
    "palestine",
    "syria",
    "america",
    "england",
    "france",
    "spain",
  ],
};
let keys = Object.keys(words);
let randIndexKeys = Math.floor(Math.random() * keys.length);
let randKeys = keys[randIndexKeys];
let values = words[randKeys];
let randIndexValues = Math.floor(Math.random() * values.length);
let randValues = values[randIndexValues];
document.querySelector(".container .game-info .category span").innerHTML =
  randKeys;

let valuesArr = Array.from(randValues);
let guessLettersContainer = document.querySelector(".container .gues-letters");
valuesArr.forEach((letter) => {
  let span = document.createElement("span");
  if (letter === " ") {
    span.className = "space";
  }
  guessLettersContainer.appendChild(span);
});
let guessSpans = document.querySelectorAll(".container .gues-letters span");
let hangmanDetails = document.querySelectorAll(
  ".container .row  .hangeman .the-draw div "
);
let theDraw = document.querySelector(".container .row  .hangeman .the-draw ");
let control = document.querySelector(".control"),
  btn = document.querySelector(".control button"),
  p = document.querySelector(".control .text p"),
  h1 = document.querySelector(".control .text h1");
let wrong = 0;
let testArr = [];
addEventListener("click", (e) => {
  if (e.target.className === "try") {
    control.style.display = "none";
    document.location.reload();
  }
  let status = false;
  if (e.target.className === "letterBox") {
    e.target.classList.add("clicked");
    let clickedletter = e.target.innerHTML;
    valuesArr.forEach((letter, index) => {
      if (letter === clickedletter) {
        guessSpans[index].innerHTML = clickedletter;
        testArr.push(clickedletter);
        status = true;
      }
    });
    if (testArr.length === valuesArr.length) {
      control.style.display = "flex";
      h1.innerHTML = `Congratulations`;
      p.innerHTML = `number of wrongs  =>  ${wrong}`;
      btn.innerHTML = `play again`;
    }
    if (status !== true) {
      theDraw.style.display = "block";
      hangmanDetails[wrong].style.display = "block";
      wrong++;
      if (wrong === hangmanDetails.length) {
        control.style.display = "flex";
        p.innerHTML = `the right word  =>  ${randValues}`;
      }
    }
  }
});

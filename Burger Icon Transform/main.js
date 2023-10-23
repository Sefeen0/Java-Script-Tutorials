let spans = document.querySelectorAll("div span"),
  div = document.querySelector("div");
div.addEventListener("click", () => {
  spans[0].classList.toggle("x-1");
  spans[1].classList.toggle("none");
  spans[2].classList.toggle("x-2");
});

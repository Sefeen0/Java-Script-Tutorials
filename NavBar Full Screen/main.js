let nav = document.querySelector("nav"),
  toggleBtn = document.querySelector(".toggle"),
  closeBtn = document.querySelector(".close");
toggleBtn.addEventListener("click", () => {
  nav.style.transform = "translateX(0)";
});
closeBtn.addEventListener("click", () => {
  nav.style.transform = "translateX(-100%)";
});
document.onkeyup = function (e){
  if (e.key === "Control") {
    nav.style.transform = "translateX(0)";
  }
  if (e.key === "Escape") {
    nav.style.transform = "translateX(-100%)";
  }
};

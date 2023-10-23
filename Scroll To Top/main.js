let upBtn = document.querySelector("button");
window.onscroll = function () {
  if (scrollY >= 1000) {
    upBtn.style.opacity = "1";
  } else {
    upBtn.style.opacity = "0";
  }
};

upBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

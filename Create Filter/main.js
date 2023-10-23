let lis = document.querySelectorAll("ul li"),
  divs = document.querySelectorAll(".content div");
lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    lis.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
    divs.forEach((div) => {
    //   div.style.opacity = "0";
      div.style.display = "none";
    });
    document.querySelectorAll(e.target.dataset.content).forEach((div) => {
    //   div.style.opacity = "1";
      div.style.display = "flex";
    });
  });
});

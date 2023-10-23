let imgs = document.querySelectorAll(" .img-container img");
let current = 1;
let num = document.getElementById("num");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let list = document.querySelector("#list");
let ul = document.createElement("ul");
ul.setAttribute("id", "pagination");
prev.addEventListener("click", prevV);
next.addEventListener("click", nextT);
function prevV() {
  if (current == 1) {
    return false;
  } else {
    current--;
    check();
  }
}
function nextT() {
  if (current == imgs.length) {
    return false;
  } else {
    current++;
    check();
  }
}

for (let i = 1; i <= imgs.length; i++) {
  li = document.createElement("li");
  li.setAttribute("data", [i]);
  li.appendChild(document.createTextNode([i]));
  ul.appendChild(li);
}
list.appendChild(ul);

for (
  let i = 0;
  i < document.getElementById("pagination").children.length;
  i++
) {
  document
    .getElementById("pagination")
    .children[i].addEventListener("click", () => {
      current = parseInt(
        document.getElementById("pagination").children[i].getAttribute("data")
      );
      check();
    });
}
check();
function check() {
  num.textContent = `#Slide ${current} Of ${imgs.length}`;
  rmAll();
  imgs[current - 1].classList.add("active");
  document
    .getElementById("pagination")
    .children[current - 1].classList.add("active");
  if (current == 1) {
    prev.classList.add("disabled");
  } else {
    prev.classList.remove("disabled");
  }
  if (current == imgs.length) {
    next.classList.add("disabled");
  } else {
    next.classList.remove("disabled");
  }
}
function rmAll() {
  imgs.forEach((e) => {
    e.classList.remove("active");
  });
  document.querySelectorAll("#pagination li").forEach((e) => {
    e.classList.remove("active");
  });
}

let user = document.querySelector(".info .name span");
document.querySelector(".control button").addEventListener("click", () => {
  userName = prompt("What's your name?");
  if (userName == "" || userName == null) {
    user.textContent = "Unknown";
    user.style.color = "blue";
  } else {
    user.textContent = userName;
  }
  document.querySelector(".control").remove();
});
let duration = 1000;
let blocks = document.querySelectorAll(".block");
let range = [...Array(blocks.length).keys()];
blocks.forEach((block, i) => {
  rand(range);
  block.style.order = range[i];
  block.addEventListener("click", () => {
    flipp(block);
  });
});
function flipp(block) {
  block.classList.add("flipped");
  let collectAll = Array.from(blocks).filter((block) =>
    block.classList.contains("flipped")
  );
  if (collectAll.length === 2) {
    stop();
    match(collectAll[0], collectAll[1]);
  }
}
function match(block1, block2) {
  let tries = document.querySelector(".tries span");
  if (block1.dataset.tech === block2.dataset.tech) {
    block1.classList.remove("flipped");
    block2.classList.remove("flipped");
    block1.classList.add("matched");
    block2.classList.add("matched");
  } else {
    tries.textContent = parseInt(tries.textContent) + 1;
    tries.style.color = "red";
    setTimeout(() => {
      block1.classList.remove("flipped");
      block2.classList.remove("flipped");
    }, duration);
  }
}
function stop() {
  document.querySelector(".blocks").classList.add("stop");
  setTimeout(() => {
    document.querySelector(".blocks").classList.remove("stop");
  }, duration);
}
function rand(arr) {
  let current = arr.length,
    random,
    temp;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = arr[current];
    arr[current] = arr[random];
    arr[random] = temp;
    return arr;
  }
}

//   let time = document.querySelector(".time");
//   time.appendChild(document.createTextNode("5"));
//   function count() {
//     time.textContent--;
//     if (time.textContent == 0) {
//       clearInterval(counter);
//     }
//   }
//   counter = setInterval(count, 1000);

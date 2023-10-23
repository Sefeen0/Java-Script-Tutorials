let input = document.querySelector(".container .add input"),
  content = document.querySelector(".container .content"),
  add = document.querySelector(".container .add button"),
  no = document.querySelector(".container .content .no"),
  count = document.querySelector(".status .count span"),
  completed = document.querySelector(".status .completed span"),
  finishAll = document.querySelector(".status .finish-all"),
  delAll = document.querySelector(".status .del-all"),
  alert = document.querySelector(".alert"),
  h2Text = document.querySelector(".alert h2"),
  ok = document.querySelector(".alert .ok"),
  total = [];
window.onload = () => {
  input.focus();
  if (content.children.length == 0) {
    content.appendChild(no);
  }
};
getFromLocal();
if (window.localStorage.getItem("tasks")) {
  total = JSON.parse(window.localStorage.getItem("tasks"));
}
add.addEventListener("click", () => {
  if (input.value == "" || null == input.value) {
    alert.style.display = "flex";
    ok.addEventListener("click", () => {
      alert.style.display = "none";
      input.focus();
    });
  }
  if (input.value != "") {
    addToArray(input.value);
    no.remove();
    input.value = "";
    input.focus();
  }
});

function addToArray(value) {
  obj = {
    id: Date.now(),
    title: value,
    complete: false,
  };
  total.push(obj);
  // **************************************************************************(duplicated)(sweetAlert) ****************************************************************
  const unique = [];
  for (const item of total) {
    const duplicate = unique.find((ob) => ob.title == item.title);
    if (duplicate) {
      alert.style.display = "flex";
      input.blur();
      h2Text.textContent = "Task has already been stored";
      ok.addEventListener("click", () => {
        alert.style.display = "none";
        window.location.reload();
      });
    }
    if (!duplicate) {
      unique.push(item);
    }
  }
  // *******************************************************************************************************************************************************************
  addToPage(unique);
  addToLocal(unique);
}

function addToPage(arr) {
  content.innerHTML = "";
  arr.forEach((e) => {
    let tasks = document.createElement("span");
    tasks.className = "tasks";
    tasks.setAttribute("id", e.id);
    let task = document.createElement("span");
    task.className = "task";
    if (e.complete) {
      task.className = "task finished";
    }
    let taskText = document.createTextNode(e.title);
    task.appendChild(taskText);
    let del = document.createElement("span");
    del.className = "delete";
    let delText = document.createTextNode("delete");
    del.appendChild(delText);
    tasks.appendChild(task);
    tasks.appendChild(del);
    content.appendChild(tasks);
    calculateTasks();
  });
}
finishAll.addEventListener("click", () => {
  for (let i = 0; i < content.children.length; i++) {
    content.children[i].children[0].classList.toggle("finished");
    statusInLocal(content.children[i].children[0].textContent);
    calculateTasks();
  }
});
content.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    removeFromlocal(e.target.parentElement.getAttribute("id"));
    e.target.parentElement.remove();
    calculateTasks();
    if (content.children.length == 0) {
      content.appendChild(no);
      calculateTasks();
    }
    input.focus();
  }
  if (e.target.classList.contains("task")) {
    statusInLocal(e.target.textContent);
    e.target.classList.toggle("finished");
    calculateTasks();
    input.focus();
  }
});
function statusInLocal(text) {
  for (i = 0; i < total.length; i++) {
    if (total[i].title == text) {
      total[i].complete == false
        ? (total[i].complete = true)
        : (total[i].complete = false);
    }
  }
  addToLocal(total);
}
function removeFromlocal(id) {
  total = total.filter((e) => e.id != id);
  addToLocal(total);
}
function addToLocal(total) {
  window.localStorage.setItem("tasks", JSON.stringify(total));
}
function getFromLocal(data) {
  data = window.localStorage.getItem("tasks");
  if (data) {
    d = JSON.parse(data);
    addToPage(d);
  }
}
function calculateTasks() {
  count.innerHTML = document.querySelectorAll(".content .tasks .task").length;

  // Calculate Completed Tasks
  completed.innerHTML = document.querySelectorAll(
    ".content .tasks .finished"
  ).length;
}
delAll.addEventListener("click", () => {
  content.innerHTML = "";
  window.localStorage.removeItem("tasks");
  calculateTasks();
  content.appendChild(no);
  document.location.reload();
  input.focus();
});

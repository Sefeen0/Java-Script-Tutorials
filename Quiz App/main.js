let container = document.querySelector(".container"),
  category = document.querySelector(".container .info .cat"),
  Quescount = document.querySelector(".container .info .count"),
  quesArea = document.querySelector(".container .ques"),
  ansArea = document.querySelector(".container .answers"),
  btn = document.querySelector(".container .submit"),
  bullets = document.querySelector(".container .bullets .list"),
  timer = document.querySelector(".container .bullets .time"),
  results = document.querySelector(".container .result"),
  control = document.querySelector(".control"),
  btns = document.querySelectorAll(".control button"),
  arrA = [],
  arrQ = [],
  arrkey = [],
  currentIndex = 0,
  rightAnswers = 0,
  interval;
window.onload = () => {
  container.style.display = "none";
};
btns.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.classList.contains("html")) {
      control.style.display = "none";
      container.style.display = "block";
      function getQues() {
        myreq = new XMLHttpRequest();
        myreq.onreadystatechange = () => {
          if (myreq.readyState == 4 && myreq.status == 200) {
            ques = JSON.parse(myreq.responseText);
            quesS = ques.ques;
            numQues = quesS.length;
            quesAbout = ques.quesAbout;
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
            //   ************************************************************************
            for (let [key, value] of Object.entries(quesS[0])) {
              let x = key;
              arrA.push(x);
            }
            ans = arrA.filter((e) => e.includes("answer_"));
            rand(ans);
            ansArr = Array.from(ans);
            ansNum = Array.from(ans).length;
            //***********************************************************************************
            for (let [key, value] of Object.entries(quesS)) {
              let x = value,
                z = key;
              arrkey.push(z);
              arrQ.push(x);
            }
            rand(arrkey);
            rand(arrQ);
            quesArr = Array.from(arrQ);
            keyArr = Array.from(arrkey);
            // **********************************************************************************
            results.remove();
            addBullets(numQues, quesAbout);
            addQues(quesS[keyArr[currentIndex]], numQues, ansNum, ansArr);
            time(10, numQues);
            btn.addEventListener("click", () => {
              rAns = quesS[keyArr[currentIndex]]["right_answer"];
              checkRanswer(rAns, ansNum);
              currentIndex++;
              quesArea.innerHTML = "";
              ansArea.innerHTML = "";
              addQues(quesS[keyArr[currentIndex]], numQues, ansNum, ansNum);
              handle();
              clearInterval(interval);
              time(10, numQues);
              showResults(numQues);
            });
          }
        };
        myreq.open("GET", "ques.json", true);
        myreq.send();
      }
      getQues();
      function addBullets(num, title) {
        num = 10;
        cat = document.createElement("span");
        cat.className = "perfect";
        cat.appendChild(document.createTextNode(num));
        Quescount.appendChild(cat);
        count = document.createElement("span");
        count.className = "perfect";
        count.appendChild(document.createTextNode(title));
        category.appendChild(count);
        bullets.appendChild(document.createElement("ul"));
        for (i = 0; i < num; i++) {
          document
            .querySelector("ul")
            .appendChild(document.createElement("li"));
          if (i == 0) {
            document.querySelector("li").className = "active";
          }
        }
      }
      function addQues(ques, numQ, numA, ans) {
        numQ = 10;
        if (currentIndex < numQ) {
          quesArea.appendChild(document.createElement("h2"));
          document
            .querySelector("h2")
            .appendChild(document.createTextNode(ques.title));
          for (i = 0; i < numA; i++) {
            input = document.createElement("input");
            input.type = "radio";
            input.dataset.answer = ques[`${ansArr[i]}`];
            input.id = `${ansArr[i]}`;
            input.name = "question";
            if (i == 0) {
              input.checked = true;
            }
            label = document.createElement("label");
            label.appendChild(document.createTextNode(ques[`${ansArr[i]}`]));
            label.htmlFor = `${ansArr[i]}`;
            ans = document.createElement("div");
            ans.appendChild(input);
            ans.appendChild(label);
            ans.className = "answer";
            ansArea.appendChild(ans);
          }
        }
      }
      function checkRanswer(rans, numA) {
        ansS = document.getElementsByName("question");
        let choosen;
        for (i = 0; i < numA; i++) {
          if (ansS[i].checked) {
            choosen = ansS[i].dataset.answer;
          }
        }
        if (choosen === rans) {
          rightAnswers++;
        }
      }
      function handle() {
        bulls = document.querySelectorAll(".container .bullets .list ul li");
        bulls.forEach((e, i) => {
          if (currentIndex === i && currentIndex < 10) {
            e.className = "active";
          }
        });
      }

      function showResults(num) {
        num = 10;
        if (currentIndex === num) {
          quesArea.remove();
          ansArea.remove();
          document.querySelector(".container .bullets").remove();
          btn.remove();
          if (rightAnswers < num && rightAnswers > num / 2) {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "good";
            ansNum.className = "good";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`good `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          } else if (rightAnswers == num) {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "perfect";
            ansNum.className = "perfect";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`perfect `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          } else {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "bad";
            ansNum.className = "bad";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`bad `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          }
        }
      }

      function time(duration, num) {
        num = 10;
        if (currentIndex < num) {
          let minutes, seconds;
          interval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            timer.innerHTML = `${minutes} : ${seconds}`;
            if (--duration < 0) {
              clearInterval(interval);
              btn.click();
            }
          }, 1000);
        }
      }
    }
    if (e.target.classList.contains("java")) {
      control.style.display = "none";
      container.style.display = "block";
      function getQues() {
        myreq = new XMLHttpRequest();
        myreq.onreadystatechange = () => {
          if (myreq.readyState == 4 && myreq.status == 200) {
            ques = JSON.parse(myreq.responseText);
            quesS = ques.ques;
            numQues = quesS.length;
            quesAbout = ques.quesAbout;
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
            //   ************************************************************************
            for (let [key, value] of Object.entries(quesS[0])) {
              let x = key;
              arrA.push(x);
            }
            ans = arrA.filter((e) => e.includes("answer_"));
            rand(ans);
            ansArr = Array.from(ans);
            ansNum = Array.from(ans).length;
            //***********************************************************************************
            for (let [key, value] of Object.entries(quesS)) {
              let x = value,
                z = key;
              arrkey.push(z);
              arrQ.push(x);
            }
            rand(arrkey);
            rand(arrQ);
            quesArr = Array.from(arrQ);
            keyArr = Array.from(arrkey);
            // **********************************************************************************
            results.remove();
            addBullets(numQues, quesAbout);
            addQues(quesS[keyArr[currentIndex]], numQues, ansNum, ansArr);
            time(10, numQues);
            btn.addEventListener("click", () => {
              rAns = quesS[keyArr[currentIndex]]["right_answer"];
              checkRanswer(rAns, ansNum);
              currentIndex++;
              quesArea.innerHTML = "";
              ansArea.innerHTML = "";
              addQues(quesS[keyArr[currentIndex]], numQues, ansNum, ansNum);
              handle();
              clearInterval(interval);
              time(10, numQues);
              showResults(numQues);
            });
          }
        };
        myreq.open("GET", "ques1.json", true);
        myreq.send();
      }
      getQues();
      function addBullets(num, title) {
        num = 10;
        cat = document.createElement("span");
        cat.className = "perfect";
        cat.appendChild(document.createTextNode(num));
        Quescount.appendChild(cat);
        count = document.createElement("span");
        count.className = "perfect";
        count.appendChild(document.createTextNode(title));
        category.appendChild(count);
        bullets.appendChild(document.createElement("ul"));
        for (i = 0; i < num; i++) {
          document
            .querySelector("ul")
            .appendChild(document.createElement("li"));
          if (i == 0) {
            document.querySelector("li").className = "active";
          }
        }
      }
      function addQues(ques, numQ, numA, ans) {
        numQ = 10;
        if (currentIndex < numQ) {
          quesArea.appendChild(document.createElement("h2"));
          document
            .querySelector("h2")
            .appendChild(document.createTextNode(ques.title));
          for (i = 0; i < numA; i++) {
            input = document.createElement("input");
            input.type = "radio";
            input.dataset.answer = ques[`${ansArr[i]}`];
            input.id = `${ansArr[i]}`;
            input.name = "question";
            if (i == 0) {
              input.checked = true;
            }
            label = document.createElement("label");
            label.appendChild(document.createTextNode(ques[`${ansArr[i]}`]));
            label.htmlFor = `${ansArr[i]}`;
            ans = document.createElement("div");
            ans.appendChild(input);
            ans.appendChild(label);
            ans.className = "answer";
            ansArea.appendChild(ans);
          }
        }
      }
      function checkRanswer(rans, numA) {
        ansS = document.getElementsByName("question");
        let choosen;
        for (i = 0; i < numA; i++) {
          if (ansS[i].checked) {
            choosen = ansS[i].dataset.answer;
          }
        }
        if (choosen === rans) {
          rightAnswers++;
        }
      }
      function handle() {
        bulls = document.querySelectorAll(".container .bullets .list ul li");
        bulls.forEach((e, i) => {
          if (currentIndex === i && currentIndex < 10) {
            e.className = "active";
          }
        });
      }

      function showResults(num) {
        num = 10;
        if (currentIndex === num) {
          quesArea.remove();
          ansArea.remove();
          document.querySelector(".container .bullets").remove();
          btn.remove();
          if (rightAnswers < num && rightAnswers > num / 2) {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "good";
            ansNum.className = "good";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`good `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          } else if (rightAnswers == num) {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "perfect";
            ansNum.className = "perfect";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`perfect `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          } else {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "bad";
            ansNum.className = "bad";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`bad `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          }
        }
      }

      function time(duration, num) {
        num = 10;
        if (currentIndex < num) {
          let minutes, seconds;
          interval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            timer.innerHTML = `${minutes} : ${seconds}`;
            if (--duration < 0) {
              clearInterval(interval);
              btn.click();
            }
          }, 1000);
        }
      }
    }
    if (e.target.classList.contains("css")) {
      control.style.display = "none";
      container.style.display = "block";
      function getQues() {
        myreq = new XMLHttpRequest();
        myreq.onreadystatechange = () => {
          if (myreq.readyState == 4 && myreq.status == 200) {
            ques = JSON.parse(myreq.responseText);
            quesS = ques.ques;
            numQues = quesS.length;
            quesAbout = ques.quesAbout;
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
            //   ************************************************************************
            for (let [key, value] of Object.entries(quesS[0])) {
              let x = key;
              arrA.push(x);
            }
            ans = arrA.filter((e) => e.includes("answer_"));
            rand(ans);
            ansArr = Array.from(ans);
            ansNum = Array.from(ans).length;
            //***********************************************************************************
            for (let [key, value] of Object.entries(quesS)) {
              let x = value,
                z = key;
              arrkey.push(z);
              arrQ.push(x);
            }
            rand(arrkey);
            rand(arrQ);
            quesArr = Array.from(arrQ);
            keyArr = Array.from(arrkey);
            // **********************************************************************************
            results.remove();
            addBullets(numQues, quesAbout);
            addQues(quesS[keyArr[currentIndex]], numQues, ansNum, ansArr);
            time(10, numQues);
            btn.addEventListener("click", () => {
              rAns = quesS[keyArr[currentIndex]]["right_answer"];
              checkRanswer(rAns, ansNum);
              currentIndex++;
              quesArea.innerHTML = "";
              ansArea.innerHTML = "";
              addQues(quesS[keyArr[currentIndex]], numQues, ansNum, ansNum);
              handle();
              clearInterval(interval);
              time(10, numQues);
              showResults(numQues);
            });
          }
        };
        myreq.open("GET", "ques2.json", true);
        myreq.send();
      }
      getQues();
      function addBullets(num, title) {
        num = 10;
        cat = document.createElement("span");
        cat.className = "perfect";
        cat.appendChild(document.createTextNode(num));
        Quescount.appendChild(cat);
        count = document.createElement("span");
        count.className = "perfect";
        count.appendChild(document.createTextNode(title));
        category.appendChild(count);
        bullets.appendChild(document.createElement("ul"));
        for (i = 0; i < num; i++) {
          document
            .querySelector("ul")
            .appendChild(document.createElement("li"));
          if (i == 0) {
            document.querySelector("li").className = "active";
          }
        }
      }
      function addQues(ques, numQ, numA, ans) {
        numQ = 10;
        if (currentIndex < numQ) {
          quesArea.appendChild(document.createElement("h2"));
          document
            .querySelector("h2")
            .appendChild(document.createTextNode(ques.title));
          for (i = 0; i < numA; i++) {
            input = document.createElement("input");
            input.type = "radio";
            input.dataset.answer = ques[`${ansArr[i]}`];
            input.id = `${ansArr[i]}`;
            input.name = "question";
            if (i == 0) {
              input.checked = true;
            }
            label = document.createElement("label");
            label.appendChild(document.createTextNode(ques[`${ansArr[i]}`]));
            label.htmlFor = `${ansArr[i]}`;
            ans = document.createElement("div");
            ans.appendChild(input);
            ans.appendChild(label);
            ans.className = "answer";
            ansArea.appendChild(ans);
          }
        }
      }
      function checkRanswer(rans, numA) {
        ansS = document.getElementsByName("question");
        let choosen;
        for (i = 0; i < numA; i++) {
          if (ansS[i].checked) {
            choosen = ansS[i].dataset.answer;
          }
        }
        if (choosen === rans) {
          rightAnswers++;
        }
      }
      function handle() {
        bulls = document.querySelectorAll(".container .bullets .list ul li");
        bulls.forEach((e, i) => {
          if (currentIndex === i && currentIndex < 10) {
            e.className = "active";
          }
        });
      }

      function showResults(num) {
        num = 10;
        if (currentIndex === num) {
          quesArea.remove();
          ansArea.remove();
          document.querySelector(".container .bullets").remove();
          btn.remove();
          if (rightAnswers < num && rightAnswers > num / 2) {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "good";
            ansNum.className = "good";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`good `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          } else if (rightAnswers == num) {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "perfect";
            ansNum.className = "perfect";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`perfect `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          } else {
            document.querySelector(".container").appendChild(results);
            statuS = document.createElement("span");
            ansNum = document.createElement("span");
            numques = document.createElement("span");
            statuS.className = "bad";
            ansNum.className = "bad";
            numques.className = "perfect";
            statuS.appendChild(document.createTextNode(`bad `));
            ansNum.appendChild(document.createTextNode(` ${rightAnswers} `));
            numques.appendChild(document.createTextNode(`from ${num}`));
            results.appendChild(statuS);
            results.appendChild(ansNum);
            results.appendChild(numques);
          }
        }
      }

      function time(duration, num) {
        num = 10;
        if (currentIndex < num) {
          let minutes, seconds;
          interval = setInterval(() => {
            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;
            timer.innerHTML = `${minutes} : ${seconds}`;
            if (--duration < 0) {
              clearInterval(interval);
              btn.click();
            }
          }, 1000);
        }
      }
    }
  });
});

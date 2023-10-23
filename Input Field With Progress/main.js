let user = document.querySelector("form input"),
  count = document.querySelector("form .count"),
  progress = document.querySelector("form .progress"),
  maxLength = user.getAttribute("maxlength");
count.textContent = maxLength;
user.oninput=function(){
  count.textContent = maxLength - user.value.length;
 count.textContent==0?count.classList.add('zero'):count.classList.remove('zero');
progress.style.width=`${user.value.length * 100 / maxLength}%`;
};

let input = document.querySelector(".container .get input"),
  btn = document.querySelector(".container .get .get-button"),
  no = document.querySelector(".container .show .no"),
  showRepo = document.querySelector(".container .show");
window.onload = () => {
  input.focus();
};

btn.addEventListener("click", () => {
  get();
});
function get() {
  if (input.value == "") {
    no.textContent = `input can't be empty`;
  } else {
    fetch(`http://api.github.com/users/${input.value}/repos`)
      .then((res) => res.json())
      .then((data) => {
        no.remove();
        showRepo.innerHTML = "";
        data.forEach((repo) => {
          repoName = document.createElement("div");
          repoName.className = "data";
          span = document.createElement("span");
          span.className = "text";
          repoText = document.createTextNode(repo.name);
          span.appendChild(repoText);
          repoName.appendChild(span);
          url = document.createElement("a");
          url.href = `https://github.com/${input.value}/${repo.name}`;
          url.target = "_blank";
          ulrText = document.createTextNode("visit");
          url.appendChild(ulrText);
          stars = document.createElement("span");
          stars.className = "stars";
          starsText = document.createTextNode(
            `stars : ${repo.stargazers_count}`
          );
          stars.appendChild(starsText);
          repoName.appendChild(stars);
          repoName.appendChild(url);
          showRepo.appendChild(repoName);
        });
        input.value = "";
      });
  }
}

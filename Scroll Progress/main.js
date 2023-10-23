let scroll = document.querySelector(".scroller"),
  height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
addEventListener("scroll", () => {
  let topScroll = document.documentElement.scrollTop;
  scroll.style.width = `${(topScroll / height) * 100}%`;
});

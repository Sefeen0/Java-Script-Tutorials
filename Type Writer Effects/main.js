let h1 = document.querySelector("h1"),
  h1Width = `${h1.clientWidth + 23}px`,
  h1Length = h1.outerText.length;
document.styleSheets[0].cssRules[0].style.setProperty("--text-width", h1Width);
h1.style.animation = `width-effect 6s steps(${h1Length}) 2s infinite both , blink 0.3s infinite`;

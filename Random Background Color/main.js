const hexArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"],
  colorArr = [];
for (i = 0; i < 6; i++) {
  colorArr.push(hexArr[Math.floor(Math.random() * hexArr.length)]);
}
let color = `#${colorArr.join("")}`;
document.body.append(color);
document.body.style.backgroundColor = color;


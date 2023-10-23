let serial = document.querySelector(".serial"),
  btn = document.querySelector("button");

btn.addEventListener("click", () => {
  let characters =
    "0123456789abcdefghijklmnopqrstuvwxyz!#$%^&*+~ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let serialLength = 20;
  let serialText = "";
  for (i = 0; i < serialLength; i++) {
    randomSerial = characters[Math.trunc(Math.random() * characters.length)];
    serialText += randomSerial;
  }
  serial.innerHTML = serialText;
});

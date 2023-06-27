let colorsRef = document.getElementsByClassName("colors");
let canvas = document.getElementById("canvas");
let clearButton = document.getElementById("button-clear");
let eraseButton = document.getElementById("button-erase");
let backgroundButton = document.getElementById("color-background");
let colorButton = document.getElementById("color-input");
let penButton = document.getElementById("button-pen");
let penSize = document.getElementById("pen-slider");
let toolType = document.getElementById("tool-type"),
saveImg = document.querySelector(".save-img");
let erase_bool = false,draw_bool = false;
let context = canvas.getContext("2d");
let mouseX = 0,mouseY = 0;
let rectLeft = canvas.getBoundingClientRect().left;
let rectTop = canvas.getBoundingClientRect().top;
const initial = () => {
  context.strokeStyle = "black";
  context.lineWidth = 1;
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  toolType.innerHTML = "Pen";
  canvas.style.backgroundColor = "#ffffff";
  backgroundButton.value = "#ffffff";
  penButton.value = context.strokeStyle;
};
const getXY = (e) => {
  mouseX = e.pageX - rectLeft;
  mouseY = e.pageY- rectTop;
};
const stopDrawing = () => {
  context.beginPath();
  draw_bool = false;
};
const startDrawing = (e) => {
  draw_bool = true;
  getXY(e);
  context.beginPath();
  context.moveTo(mouseX, mouseY);
};
const drawOnCanvas = (e) => {
  getXY(e);
  if (draw_bool) {
    context.lineTo(mouseX, mouseY);
    context.stroke();
       if (erase_bool) {
      context.globalCompositeOperation = "destination-out";
    } else {
      context.globalCompositeOperation = "source-over"; }}
};
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawOnCanvas);
canvas.addEventListener("mouseup", stopDrawing);
penButton.addEventListener("click", () => {
  toolType.innerHTML = "Pen";
  erase_bool = false;
});
eraseButton.addEventListener("click", () => {
  erase_bool = true;
  toolType.innerHTML = "Eraser";
});
penSize.addEventListener("input", () => {
  context.lineWidth = penSize.value;
});
colorButton.addEventListener("change", () => {
  context.strokeStyle = colorButton.value;
});
backgroundButton.addEventListener("change", () => {
  canvas.style.backgroundColor = backgroundButton.value;
});
clearButton.addEventListener("click", () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  canvas.style.backgroundColor = "#fff";
  backgroundButton.value = "fff";
});
saveImg.addEventListener("click", () => {
  const link = document.createElement("a"); 
  link.download = `${Date.now()}.jpg`; 
  link.href = canvas.toDataURL(); 
  link.click();
});
window.onload = initial();
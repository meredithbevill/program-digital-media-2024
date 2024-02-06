//define array of colors 
let colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#00FFFF', '#0000FF', '#FF00FF', '#A52A2A', '#FFFFFF', '#000000'];
//initialize current color as black
let currentColor = '#000000';

function setup() {
  createCanvas(1500, 900);
  drawColorPalette();
}

function draw() {
  // check if mouse is pressed within boundaries
  if (mouseIsPressed && mouseX < width && mouseY < height && mouseX > 65) {
    strokeWeight(5);
    stroke(currentColor);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }
}

function drawColorPalette() {
  // Draw color palette on the left side
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(0, i * 65, 65, 65);
  }
}

function mousePressed() {
  // Check if the mouse is pressed on the color palette
  if (mouseX < 65 && mouseY < height) {
    // Determine the selected color from the palette
    let colorIndex = int(mouseY / 65);
    currentColor = colors[colorIndex];
  }
}

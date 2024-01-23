function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0, 255, 0); // Set background color to green

  fill(255); // Set fill color to white

  // Draw a circle on the left
  ellipse(100, height / 2, 50, 50);

  // Draw a square on the right
  rect(width - 150, height / 2 - 25, 50, 50);
}

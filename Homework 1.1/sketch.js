function setup() {
  createCanvas(300, 175); 
}

function draw() {
  background(0, 255, 0); // Set background color to green

  fill(255); // Set fill color to white

  // Draw a circle 
  ellipse(75, height / 2, 130, 130);

  // Draw a square 
  rect(160, height / 2 - 65 , 130, 130);
}

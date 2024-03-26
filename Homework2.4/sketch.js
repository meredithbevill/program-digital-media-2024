let bugSpriteSheet;
let bugFrames = [];
let bugs = [];
let squishedBugs = 0;
let timer = 30;
let gameOver = false;
let gameStarted = false; 

function preload() {
  // Load the bug sprite sheet
  bugSpriteSheet = loadImage('bugspritesheet.png');
}

function setup() {
  createCanvas(1000, 600);

  // Calculate frame width and height from the sprite sheet
  let frameWidth = bugSpriteSheet.width / 8; // 8 frames in sprite sheet
  let frameHeight = bugSpriteSheet.height; // single row of frames
  
  // Extract frames from the bug sprite sheet
  for (let i = 0; i < 8; i++) {
    let frame = bugSpriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    bugFrames.push(frame);
  }

  // Start with multiple bugs on the screen
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug());
  }

  // Click to start message
  textAlign(CENTER, CENTER);
  textSize(30);
  fill(0);
  text("Click to Start", width / 2, height / 2);

}


function draw() {
  background(220);
    // Check if the game has started
    if (!gameStarted) {
      textAlign(CENTER, CENTER);
      textSize(30);
      fill(0);
      text("Click to Start", width / 2, height / 2);
      return; 
    }

    // Game logic
    //If a bug moves off the screen, it removes that bug from the array and spawns a new one to replace it
    for (let i = bugs.length - 1; i >= 0; i--) {
      bugs[i].update();
      bugs[i].display();
      if (bugs[i].offScreen()) {
        bugs.splice(i, 1);
        bugs.push(new Bug());
      }
    }

    // Display squished bug count and timer
    textSize(20);
    textAlign(RIGHT, TOP);
    fill(0);
    text("Squished: " + squishedBugs, width - 10, 10);
    text("Time: " + timer, width - 10, 40);

    // Update the timer
    if (frameCount % 60 === 0 && timer > 0) { // Update timer once per second
        timer--;
      }

    // Game over condition
    if (timer <= 0) {
      gameOver = true;
      // Display game over message
      fill(255, 0, 0, 200); // Red with transparency
      rect(0, 0, width, height); // Background rectangle
      textSize(50);
      textAlign(CENTER, CENTER);
      fill(255);
      text("Game Over", width / 2, height / 2);
      text("Squished Bugs: " + squishedBugs, width / 2, height / 2 + 50); // Display squished bugs count
      // Start over button
      textSize(30);
      fill(255);
      rectMode(CENTER);
      rect(width / 2, height / 2 + 150, 200, 50); 
      fill(0);
      text("Start Over", width / 2, height / 2 + 150);
      noLoop();
    }
}
  

  function mousePressed() {
    // Start the game when clicked
    if (!gameStarted) {
      gameStarted = true;
      return;
    }
  
    // Check if a bug is clicked and squish it
    if (!gameOver) {
      let bugClicked = false; 
      for (let i = bugs.length - 1; i >= 0; i--) {
        if (bugs[i].contains(mouseX, mouseY)) {
          bugs[i].squish();
          squishedBugs++;
          // Increase speed of the bugs
          bugs[i].increaseSpeed();
          bugClicked = true; 
        }
      }
      // If no bug is clicked, add a new bug
      if (!bugClicked) {
        bugs.push(new Bug());
      }
    }
    //if start button is clicked
    if (gameOver && mouseX > width / 2 - 100 && mouseX < width / 2 + 100 && mouseY > height / 2 + 125 && mouseY < height / 2 + 175) {
      resetGame();
    }

  }
  function resetGame() {
    // Reset game variables
    squishedBugs = 0;
    timer = 30;
    gameOver = false;
    gameStarted = false;
    bugs = [];
    // Start with multiple bugs on the screen
    for (let i = 0; i < 5; i++) {
      bugs.push(new Bug());
    }
    loop(); // Restart the draw loop
  }


class Bug {
  constructor() {
    // Initialize bug properties
    this.x = random(width);
    this.y = random(height);
    this.size = random(40, 80); 
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.angle = 0; // Angle for rotation
    this.isSquished = false;
  }

  // Update bug position and animation
  update() {
    if (!this.isSquished) {
      this.x += this.speedX;
      this.y += this.speedY;
      // Bounce off walls
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
      // Calculate angle based on velocity
      this.angle = atan2(this.speedY, this.speedX);
    }
  }

  // Display bug
  display() {
    push(); // Save the current drawing state
    translate(this.x, this.y); // Move the origin to the bug's position
    rotate(this.angle + HALF_PI); // Rotate bug to face the direction it's moving

    if (!this.isSquished) {
      // Display walking animation if bug is not squished
      let walkingFrameIndex = floor(frameCount / 5) % 7; // Animate frames every 5 frames
      image(bugFrames[walkingFrameIndex], -this.size / 2, -this.size / 2, this.size, this.size);
    } else {
      // Display squished bug image if bug is squished
      image(bugFrames[7], -this.size / 2, -this.size / 2, this.size, this.size);
    }

    pop(); // Restore the previous drawing state
  }

  // Check if bug is off-screen
  offScreen() {
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }

  // Check if bug contains given point
  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return (d < this.size / 2);
  }

  // Squish the bug
  squish() {
    this.isSquished = true;
    // Respawn bug after 1 second
    setTimeout(() => {
      this.respawn();
    }, 1000);
  }

  // Respawn the bug
  respawn() {
    this.x = random(width);
    this.y = random(height);
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.angle = 0; // Reset angle
    this.isSquished = false;
  }

  // Increase bug speed for all bugs
    increaseSpeed() {
      // Increase speed for all bugs in the bugs array
      for (let i = 0; i < bugs.length; i++) {
          bugs[i].speedX *= 1.1;
          bugs[i].speedY *= 1.1;
      }
    }

}
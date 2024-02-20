let bugs = [];
let squishedBugs = 0;
let timer = 30;
let gameStarted = false;
let bugSpritesheet, squishedBugImage;
let bugFrames = [];
let currentFrame = 0;
let frameDelay = 6;
let frameCount = 0;

function preload() {
  bugSpritesheet = loadImage('bugspritesheet.png');
  squishedBugImage = loadImage('bugsquished.png');
}

function setup() {
  createCanvas(1000, 600);
  for (let i = 0; i < 10; i++) {
    bugs.push(new Bug());
  }
  
  // Split the sprite sheet into individual frames
  for (let y = 0; y < bugSpritesheet.height; y += 4) {
    for (let x = 0; x < bugSpritesheet.width; x += 4) {
      let frame = bugSpritesheet.get(x, y, 4, 4);
      bugFrames.push(frame);
    }
  }
}

function draw() {
  background(220);
  
  if (!gameStarted) {
    textAlign(CENTER);
    textSize(32);
    text("Click to start", width/2, height/2);
    return;
  }
  
  if (timer > 0) {
    textAlign(RIGHT);
    textSize(24);
    text("Time: " + timer.toFixed(0), width - 20, 30);
    text("Squished: " + squishedBugs, width - 20, 60);
    timer -= 0.02;
    
    // Increase difficulty by making bugs move faster over time
    for (let bug of bugs) {
      bug.updateSpeed();
    }
  } else {
    textAlign(CENTER);
    textSize(32);
    text("Game over! Squished: " + squishedBugs, width/2, height/2);
    noLoop();
  }
  
  // Animate bugs and display
  for (let bug of bugs) {
    bug.animate();
    bug.move();
    bug.display();
  }
}

function mousePressed() {
  if (gameStarted) {
    // Check if the mouse is pressed directly on a bug to squish it
    for (let i = bugs.length - 1; i >= 0; i--) {
      if (bugs[i].contains(mouseX, mouseY)) {
        squishedBugs++;
        bugs.splice(i, 1);
        bugs.push(new Bug());
        break;
      }
    }
  } else {
    gameStarted = true;
  }
}

class Bug {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.speed = random(1, 3);
    this.diameter = 4; // Width and height of each frame
    this.frameIndex = 0; // Current frame index
    this.image = bugFrames[0]; // Set initial frame
    this.xSpeed = random(-this.speed, this.speed);
    this.ySpeed = random(-this.speed, this.speed);
  }
  
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  updateSpeed() {
    // Increase speed to make the game harder
    this.speed += 0.01;
  }
  
  animate() {
    // Animate bug walking
    frameCount++;
    if (frameCount >= frameDelay) {
      this.frameIndex = (this.frameIndex + 1) % bugFrames.length;
      this.image = bugFrames[this.frameIndex];
      frameCount = 0;
    }
  }
  
  display() {
    image(this.image, this.x, this.y, this.diameter, this.diameter);
  }
  
  contains(px, py) {
    // Check if the point is within the bug's bounding box
    return px > this.x && px < this.x + this.diameter && py > this.y && py < this.y + this.diameter;
  }
}

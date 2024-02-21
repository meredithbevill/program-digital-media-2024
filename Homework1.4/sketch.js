let bugs = [];
let squishedBugs = 0;
let timer = 30;
let gameOver = false;

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug());
  }
  setInterval(() => {
    if (!gameOver) timer--;
  }, 1000);
}

function draw() {
  background(220);
  
  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].update();
    bugs[i].display();
    if (bugs[i].offScreen()) {
      bugs.splice(i, 1);
      bugs.push(new Bug());
    }
  }
  
  textSize(20);
  textAlign(RIGHT, TOP);
  fill(0);
  text("Squished: " + squishedBugs, width - 10, 10);
  text("Time: " + timer, width - 10, 40);
  
  if (timer <= 0) {
    gameOver = true;
    textSize(50);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    text("Game Over", width / 2, height / 2);
    noLoop();
  }
}

function mousePressed() {
  if (!gameOver) {
    for (let i = bugs.length - 1; i >= 0; i--) {
      if (bugs[i].contains(mouseX, mouseY)) {
        bugs[i].squish();
        squishedBugs++;
      }
    }
  }
}

class Bug {
  constructor() {
    this.respawn();
  }
  
  respawn() {
    this.x = random(width);
    this.y = random(height);
    this.diameter = random(20, 40);
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.color = color(random(255), random(255), random(255));
    this.dead = false;
  }
  
  update() {
    if (!this.dead) {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
  }
  
  display() {
    if (!this.dead) {
      fill(this.color);
      ellipse(this.x, this.y, this.diameter);
    } else {
      fill(100);
      ellipse(this.x, this.y, this.diameter);
      fill(255, 0, 0);
      ellipse(this.x, this.y, this.diameter * 0.7); // Display dead bug
    }
  }
  
  offScreen() {
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }
  
  contains(x, y) {
    if (this.dead) return false;
    let d = dist(x, y, this.x, this.y);
    return (d < this.diameter / 2);
  }
  
  squish() {
    this.dead = true;
    setTimeout(() => {
      this.respawn();
    }, 1000); // Respawn after 1 second
  }
}

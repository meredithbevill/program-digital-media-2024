let bugSpriteSheet;
let bugFrames = [];
let bugs = [];
let squishedBugs = 0;
let timer = 30;
let gameOver = false;
let gameStarted = false;
let squishSynth;
let missSynth;

function preload() {
  bugSpriteSheet = loadImage('assets/bugspritesheet.png');
  squishSynth = new Tone.Player('sounds/bugsquish.mp3').toDestination();
  missSynth = new Tone.Synth({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 0.3
    }
  }).toDestination();
}

function setup() {
  createCanvas(1000, 600);
  extractBugFrames();
  startGame();
}

function draw() {
  background(220);
  if (!gameStarted) {
    displayStartScreen();
    return;
  }
  updateGame();
}

function extractBugFrames() {
  let frameWidth = bugSpriteSheet.width / 8;
  let frameHeight = bugSpriteSheet.height;
  for (let i = 0; i < 8; i++) {
    let frame = bugSpriteSheet.get(i * frameWidth, 0, frameWidth, frameHeight);
    bugFrames.push(frame);
  }
}

function startGame() {
  for (let i = 0; i < 5; i++) {
    bugs.push(new Bug());
  }
  displayStartMessage();
}

function updateGame() {
  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].update();
    bugs[i].display();
    if (bugs[i].offScreen()) {
      bugs.splice(i, 1);
      bugs.push(new Bug());
    }
  }
  displayGameInfo();
  updateTimer();
  checkGameOver();
}

function displayStartMessage() {
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  text("Click to Start", width / 2, height / 2);
  textSize(20);
  text("Squash the bugs before the time runs out!", width / 2, height / 2 + 100);
}

function displayStartScreen() {
  background(0, 200, 0);
  displayStartMessage();
}

function displayGameInfo() {
  textSize(20);
  textAlign(RIGHT, TOP);
  fill(0);
  text("Squished: " + squishedBugs, width - 10, 10);
  text("Time: " + timer, width - 10, 40);
}

function updateTimer() {
  if (frameCount % 60 === 0 && timer > 0) {
    timer--;
  }
}

function checkGameOver() {
  if (timer === 0) {
    gameOver = true;
    displayGameOver();
    noLoop();
  }
}

function displayGameOver() {
  fill(255, 0, 0, 200);
  rect(0, 0, width, height);
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(255);
  text("Game Over", width / 2, height / 2);
  text("Squished Bugs: " + squishedBugs, width / 2, height / 2 + 50);
  displayStartOverButton();
}

function displayStartOverButton() {
  textSize(30);
  fill(255);
  rectMode(CENTER);
  rect(width / 2, height / 2 + 150, 200, 50);
  fill(0);
  text("Start Over", width / 2, height / 2 + 150);
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    return;
  }
  if (!gameOver) {
    checkBugSquish();
  } else {
    checkStartOverButtonClick();
  }
}

function checkBugSquish() {
  let bugClicked = false;
  for (let i = bugs.length - 1; i >= 0; i--) {
    if (bugs[i].contains(mouseX, mouseY)) {
      bugs[i].squish();
      squishedBugs++;
      squishSynth.start();
      bugClicked = true;
    }
  }
  if (!bugClicked) {
    bugs.push(new Bug());
    missSynth.triggerAttackRelease('C4', '8n');
  }
}

function checkStartOverButtonClick() {
  if (
    mouseX > width / 2 - 100 &&
    mouseX < width / 2 + 100 &&
    mouseY > height / 2 + 125 &&
    mouseY < height / 2 + 175
  ) {
    resetGame();
  }
}

function resetGame() {
  squishedBugs = 0;
  timer = 30;
  gameOver = false;
  gameStarted = false;
  bugs = [];
  startGame();
  loop();
}

class Bug {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(40, 80);
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.angle = 0;
    this.isSquished = false;
  }

  update() {
    if (!this.isSquished) {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
      this.angle = atan2(this.speedY, this.speedX);
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle + HALF_PI);
    let frameIndex = this.isSquished ? 7 : floor(frameCount / 5) % 7;
    image(bugFrames[frameIndex], -this.size / 2, -this.size / 2, this.size, this.size);
    pop();
  }

  offScreen() {
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }

  contains(x, y) {
    let d = dist(x, y, this.x, this.y);
    return (d < this.size / 2);
  }

  squish() {
    this.isSquished = true;
    setTimeout(() => {
      this.respawn();
    }, 1000);
  }

  respawn() {
    this.x = random(width);
    this.y = random(height);
    this.speedX = random(-3, 3);
    this.speedY = random(-3, 3);
    this.angle = 0;
    this.isSquished = false;
  }
}

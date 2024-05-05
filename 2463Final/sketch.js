// Variables for graphics
let cowImage, dogImage;
let cowX, cowY, dogX, dogY;
let cowWidth = 100, cowHeight = 100; 
let dogWidth = 100, dogHeight = 100; 
let gameState = 'welcome'; // Initial state

// Variables for sound
let cowSound, dogSound;

// Variables for Arduino 
let port;
let cowButtonState = 0;
let dogButtonState = 0;

// Game variables
let timer = 20; // Game time in seconds
let score = 0;
let currentAnimal = null; // Variable to store the currently displayed animal
let flashInterval = 3000; // Flash interval in milliseconds 
let lastFlashTime = 0; // Variable to store the time of the last flash
let animalDisplayDuration = 2000; // Duration to display the animal in milliseconds 
let lastAnimalTime = 0; // Variable to store the time when the animal was displayed

function preload() {
  // Load images
  cowImage = loadImage('images/cow.png');
  dogImage = loadImage('images/dog.png');

  // Create Tone.js synthesizers for sounds
  cowSound = new Tone.Player({
    url: "sounds/cowMoo.wav",
    loop: false
  }).toDestination();

  dogSound = new Tone.Player({
    url: "sounds/dogBark.wav",
    loop: false
  }).toDestination();
}

function setup() {
  createCanvas(800, 600);

   // Initialize image positions
   cowX = width / 4;
   cowY = height / 2;
   dogX = width * 3 / 4;
   dogY = height / 2;
 
  // Arduino serial communication
  port = createSerial();

  let usedPorts = usedSerialPorts();
  if (usedPorts.length > 0) {
    port.open(usedPorts[0], 9600);
  }

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(325, 100);
  connectBtn.mousePressed(connectBtnClick);
}

function draw() {
  background(220);
  
  // Display different scenes based on game state
  if (gameState === 'welcome') {
    displayWelcome();
  } else if (gameState === 'gameplay') {
    displayGameplay();
  } else if (gameState === 'gameover') {
    displayGameOver();
  }
}


function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 9600);
  } else {
    port.close();
  }
}

function displayWelcome() {
  // Display welcome message
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text('Welcome to Animal Sound Match!', width / 2, height / 2 - 50);
  text('Press any key to start the game', width / 2, height / 2);
}

function displayGameplay() {
  // Check if it's time to display a new animal
  if (millis() - lastFlashTime > flashInterval) {
    lastFlashTime = millis();
    currentAnimal = random(['cow', 'dog']); // Randomly select cow or dog
    lastAnimalTime = millis(); // Store the time when the animal was displayed
    console.log("Current animal:", currentAnimal); // Log current animal
  }

  // Display the current animal
  if (currentAnimal === 'cow') {
    image(cowImage, cowX, cowY, cowWidth, cowHeight);
  } else if (currentAnimal === 'dog') {
    image(dogImage, dogX, dogY, dogWidth, dogHeight);
  }

  // Display timer and score
  textSize(16);
  textAlign(RIGHT);
  fill(0);
  text('Time: ' + timer, width - 20, 20);
  text('Score: ' + score, width - 20, 40);
  
  // Update timer
  if (millis() - lastAnimalTime > animalDisplayDuration) {
    timer--;
    lastAnimalTime = millis(); // Reset last animal time
  }
  
  // Check if it's time to switch to the game over state
  if (timer === 0) {
    gameState = 'gameover';
  }
}

function displayGameOver() {
  // Display game over message
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text('Game Over!', width / 2, height / 2 - 50);
  text('Your score: ' + score, width / 2, height / 2);
}

function flashImages() {
  // Flash cow image
  fill(255);
  rect(cowX, cowY, cowWidth, cowHeight);

  // Flash dog image
  fill(255);
  rect(dogX, dogY, dogWidth, dogHeight);
}

function playCowSound() {
  cowSound.start();
}

function playDogSound() {
  dogSound.start();
}

// Handle button presses from Arduino
function serialEvent() {
  console.log("Serial event received");
  let data = port.readStringUntil('\n');
  if (data !== null) {
    data = data.trim();
    console.log("Received data:", data); // Log received data
    if (data === "CowButtonPressed") {
      cowButtonState = 1; // Update cow button state
      checkAnswer('cow'); // Check the answer
    } else if (data === "DogButtonPressed") {
      dogButtonState = 1; // Update dog button state
      checkAnswer('dog'); // Check the answer
    }
  }
}

// Handle button releases from Arduino
function serialButtonReleased(data) {
  console.log("Serial button released:", data);
  data = data.trim();
  console.log("Button released:", data); // Log button release event
  if (data === "CowButtonReleased") {
    cowButtonState = 0; // Reset cow button state
  } else if (data === "DogButtonReleased") {
    dogButtonState = 0; // Reset dog button state
  }
}


function checkAnswer(animal) {
  // Check if correct animal button pressed
  if ((animal === 'cow' && cowButtonState === 1) || (animal === 'dog' && dogButtonState === 1)) {
    score++;
    // Send command to Arduino for correct answer
    port.write('Correct\n');
  } else {
    score--;
    // Send command to Arduino for wrong answer
    port.write('Wrong\n');
  }
}


function keyPressed() {
  if (gameState === 'welcome') {
    gameState = 'gameplay';
  }
}

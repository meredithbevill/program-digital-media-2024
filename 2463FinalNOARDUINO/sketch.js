// Variables for graphics
let cowImage, dogImage;
let cowX, cowY, dogX, dogY;
let cowWidth = 150, cowHeight = 150; // Increased image size
let dogWidth = 150, dogHeight = 150; // Increased image size
let gameState = 'welcome'; // Initial state

// Variables for sound
let cowSound, dogSound;

// Game variables
let timer = 30; // Game time in seconds
let score = 0;
let currentAnimal = null; // Variable to store the currently displayed animal
let lastFlashTime = 0; // Variable to store the time of the last flash
let animalDisplayDuration = 2000; // Duration to display the animal in milliseconds 
let lastAnimalTime = 0; // Variable to store the time when the animal was displayed
let feedback = null; // Variable to store feedback for player action
let feedbackDuration = 1000; // Initial duration for feedback display in milliseconds
let feedbackStartTime = 0; // Variable to store the time when the feedback was triggered
let lastSecondUpdateTime = 0; // Variable to store the time when the timer was last updated
let displayAnimal = false; // Flag to control whether to display an animal
let pauseStartTime = 0; // Variable to store the start time of the pause
let initialFlashInterval = 3000; // Initial flash interval in milliseconds
let initialPauseDuration = 1000; // Initial pause duration in milliseconds
let flashInterval = initialFlashInterval; // Flash interval in milliseconds 
let pauseDuration = initialPauseDuration; // Pause duration in milliseconds
let maxDifficultyLevel = 5; // Maximum difficulty level
let currentDifficultyLevel = 1; // Initial difficulty level

function preload() {
  // Load images
  cowImage = loadImage('images/cow.png');
  dogImage = loadImage('images/dog.png');

}

function setup() {
  createCanvas(800, 600);

   // Initialize image positions
   cowX = width / 4;
   cowY = height / 2;
   dogX = width * 3 / 4;
   dogY = height / 2;

  // Start the game
  gameState = 'welcome';

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
  
  // Display feedback message
  if (feedback === 'correct' || feedback === 'wrong') {
    let feedbackDurationAdjusted = feedbackDuration - (millis() - feedbackStartTime);
    if (feedbackDurationAdjusted > 0) {
      if (feedback === 'correct') {
        fill(0, 255, 0);
      } else {
        fill(255, 0, 0);
      }
      rect(0, 0, width, 50);
      fill(0);
      textSize(20);
      textAlign(CENTER);
      if (feedback === 'correct') {
        text("Correct! +1 point", width / 2, 30);
      } else {
        text("Wrong! -1 point", width / 2, 30);
      }
    } else {
      feedback = null;
    }
  }
}

function displayWelcome() {
  // Display welcome message
  textAlign(CENTER);
  textSize(24);
  fill(0);
  text('Welcome to Animal Sound Match!', width / 2, height / 2 - 50);
  text('Press any key to start the game', width / 2, height / 2);
  text('Instructions:', width / 2, height / 2 + 50);
  textSize(16);
  text('Press "C" to play cow sound and "D" to play dog sound', width / 2, height / 2 + 80);
}

function displayGameplay() {
  // Check if it's time to display a new animal
  if (millis() - lastFlashTime > flashInterval) {
    if (!displayAnimal) {
      lastFlashTime = millis();
      currentAnimal = random(['cow', 'dog']); // Randomly select cow or dog
      lastAnimalTime = millis(); // Store the time when the animal was displayed
      displayAnimal = true; // Set the flag to display the animal
      console.log("Current animal:", currentAnimal); // Log current animal
    } else if (millis() - pauseStartTime > pauseDuration) {
      displayAnimal = false; // Reset the flag to not display the animal
    }
  }

  // Display the current animal if the flag is true
  if (displayAnimal) {
    if (currentAnimal === 'cow') {
      image(cowImage, cowX, cowY, cowWidth, cowHeight);
    } else if (currentAnimal === 'dog') {
      image(dogImage, dogX, dogY, dogWidth, dogHeight);
    }
  }

  // If the flag is false and the pause has just started, record the start time of the pause
  if (!displayAnimal && millis() - lastFlashTime > flashInterval && millis() - pauseStartTime === 0) {
    pauseStartTime = millis();
  }

  // Display timer and score
  textSize(16);
  textAlign(RIGHT);
  fill(0);
  text('Time: ' + timer, width - 20, 20);
  text('Score: ' + score, width - 20, 40);

  // Update difficulty as the game progresses
  if (currentDifficultyLevel < maxDifficultyLevel && millis() > initialFlashInterval * currentDifficultyLevel * 2) {
    currentDifficultyLevel++;
    flashInterval = initialFlashInterval / currentDifficultyLevel;
    pauseDuration = initialPauseDuration * currentDifficultyLevel;
  }

  // Update timer once per second
  if (millis() - lastSecondUpdateTime >= 1000) {
    timer--;
    lastSecondUpdateTime = millis(); // Update last second update time
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

function keyPressed() {
  if (gameState === 'welcome') {
    gameState = 'gameplay';
  }
}

// Handle keyboard input
function keyTyped() {
  if (gameState === 'gameplay') {
    if (currentAnimal === 'cow') {
      if (key === 'c' || key === 'C') {
        cowSound.start();
        score++;
        feedback = 'correct';
      } else if (key === 'd' || key === 'D'){
        dogSound.start();
        score--;
        feedback = 'wrong';
      }
    } else if (currentAnimal === 'dog') {
      if (key === 'd' || key === 'D') {
        dogSound.start();
        score++;
        feedback = 'correct';
      } else if (key === 'c' || key === 'C'){
        cowSound.start();
        score--;
        feedback = 'wrong';
      }
    }
    feedbackStartTime = millis(); // Update feedback start time
  }
}

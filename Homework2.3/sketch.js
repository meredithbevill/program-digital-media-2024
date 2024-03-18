// Declare variables
let canvas; // Canvas element
let ctx; // Context for drawing on canvas
let jumpImage; // Image object for jump image
let audioContext; // Audio context for sound synthesis

// Preload function: Load assets before setup()
function preload() {
  jumpImage = loadImage('jump.avif');
}

// Setup function: Initialize canvas and audio context
function setup() {
  canvas = createCanvas(800, 600);
  // Set the parent of the canvas to a container with ID 'canvas-container'
  canvas.parent('canvas-container');
  // Get the drawing context of the canvas
  ctx = canvas.drawingContext;
  // Create an audio context for sound synthesis
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

// Function to play the jump sound
function playJumpSound() {
  // Create oscillator, noise, filter, and gain nodes for sound synthesis
  let osc = audioContext.createOscillator();
  let noise = audioContext.createBufferSource();
  let filter = audioContext.createBiquadFilter();
  let gainNode = audioContext.createGain();

  // Oscillator for tonal element
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(220, audioContext.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
  osc.connect(filter);

  // Noise for texture
  let bufferSize = audioContext.sampleRate * 0.1;
  let buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
  let data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  noise.buffer = buffer;
  noise.loop = true;
  noise.connect(filter);

  // Filter to shape the sound
  filter.type = 'lowpass';
  filter.frequency.value = 1000;
  filter.Q.value = 10;
  filter.connect(gainNode);

  // Gain for volume control
  gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
  gainNode.connect(audioContext.destination);

  // Start sound
  osc.start();
  noise.start();

  // Stop after 300 milliseconds
  setTimeout(() => {
    osc.stop();
    noise.stop();
  }, 300);
}

// Function called when the mouse is clicked
function mouseClicked() {
  // Clear canvas
  clear();
  // Draw the picture 
  image(jumpImage, 0, 0, width, height);
  // Play the sound
  playJumpSound();
  // Clear the picture after 500 milliseconds
  setTimeout(() => {
    clear();
  }, 500);
}

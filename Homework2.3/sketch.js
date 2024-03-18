let canvas; //canvas element
let ctx; //context for drawing on canvas
let jumpImage; 
let audioContext; //for sound synthesis 

function preload() {
  jumpImage = loadImage('jump.avif');
}

function setup() {
  canvas = createCanvas(800, 600);
  canvas.parent('canvas-container'); 
  ctx = canvas.drawingContext;
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function draw() {
  // draw function empty 
}


function playJumpSound() {
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
  setTimeout(() => {
    osc.stop();
    noise.stop();
  }, 300);
}

function mouseClicked() {
  clear();
  image(jumpImage, 0, 0, width, height);
  playJumpSound();
  setTimeout(() => {
    clear();
  }, 500); // time to control how long the image stays visible
}

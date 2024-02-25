let sampler, distortion;

function preload() {
    // Load audio files
    soundFormats('mp3', 'ogg');
    sampler = [
        loadSound('assets/popcorn.mp3'),
        loadSound('assets/water.mp3'),
        //loadSound('path/to/sample3.mp3'),
        //loadSound('path/to/sample4.mp3')
    ];
}

function setup() {
    createCanvas(400, 400);

    // Create buttons to trigger each sample
    for (let i = 0; i < sampler.length; i++) {
        createButton('Sample ' + (i + 1)).position(10, 40 * i + 10).mousePressed(() => {
            sampler[i].play();
        });
    }

    // Create a distortion effect
    distortion = new Tone.Distortion(0.8);

    // Connect the sampler to the distortion effect
    for (let i = 0; i < sampler.length; i++) {
        sampler[i].disconnect();
        sampler[i].connect(distortion);
    }

    // Connect the distortion effect to the output
    distortion.toDestination();
}

function draw() {
    background(220);
    
}

// Control the effect using the mouse position
function mouseMoved() {
    let amount = map(mouseX, 0, width, 0, 1);
    distortion.distortion = amount;
}

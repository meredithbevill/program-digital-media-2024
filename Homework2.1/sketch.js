let sampler, reverb;

    function preload() {
    //initialize sampler with audio files and maps it to the notes for Tone.Sampler
      sampler = new Tone.Sampler({
        "C4": "assets/alarm.mp3",
        "D4": "assets/arcaderetro.mp3",
        "E4": "assets/popcorn.mp3",
        "F4": "assets/water.mp3",
      }).toDestination(); //connect sampler to audio

      //initialize the reverb effect 
      reverb = new Tone.Reverb({
        decay: 5, //how long it takes for reverb to fade out
        wet: 0.5 //initial amount of effect mixed with the dry signal
      }).toDestination(); //connect reverb to audio
      
      //connect sampler to reverb 
      sampler.connect(reverb);

      //once all samples are loaded, log a message to the console
      Tone.loaded().then(() => {
        console.log('Samples loaded');
      });
    }

    function setup() {
      createCanvas(400, 400);
    }

    //function to play a sample based on the note passed
    function playSample(note) {
    //array of notes cooresponding to the array
      const notes = ['C4', 'D4', 'E4', 'F4'];
      //trigger sound
      sampler.triggerAttackRelease(notes[note]); //knows what sound to play based off the note it is assigned to
    }

    function changeReverbMix(value) {
      reverb.wet.value = value;
    }
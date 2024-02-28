let sampler, pitchShift;

    function preload() {
    //initialize sampler with audio files and maps it to the notes for Tone.Sampler
      sampler = new Tone.Sampler({
        "C4": "assets/alarm.mp3",
        "D4": "assets/arcaderetro.mp3",
        "E4": "assets/popcorn.mp3",
        "F4": "assets/water.mp3",
      }).toDestination(); //connect sampler to audio

      pitchShift = new Tone.PitchShift().toDestination();
      //connect sampler to the pitch shift
      sampler.connect(pitchShift);

    }

    function setup() {
      createCanvas(400, 400);
    }

    //plays a sample based on the note passed
    function playSample(note) {
    //array of notes cooresponding to sounds
      const notes = ['C4', 'D4', 'E4', 'F4'];
      //trigger sound
      sampler.triggerAttackRelease(notes[note]); //knows what sound to play based off the note it is assigned to
    }

    function changePitch(value) {
      // Convert slider value to semitones
      const pitchSemitones = parseInt(value);
      // Convert semitones to frequency ratio
      const pitchRatio = Tone.intervalToFrequencyRatio(pitchSemitones);
      // Set the pitch shift effect to the calculated ratio
      pitchShift.pitch = pitchRatio;
    }
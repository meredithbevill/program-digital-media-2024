const synth = new Tone.PolySynth().toDestination();
const filter = new Tone.Filter().toDestination();

synth.connect(filter);


// Keyboard mapping
const keyboardMap = {
    'z': 'C4',
    'x': 'D4',
    'c': 'E4',
    'v': 'F4',
    'b': 'G4',
    'n': 'A4',
    'm': 'B4',
    ',': 'C5',
};

// Key press event listener
document.addEventListener('keydown', e => {
  const key = e.key.toLowerCase();
  if (keyboardMap[key]) {
      synth.triggerAttackRelease(keyboardMap[key], '8n');
      const pressedKey = document.querySelector(`.key[data-key="${key}"]`);
      if (pressedKey) {
          pressedKey.classList.add('pressed');
      }
  }
});

document.addEventListener('keyup', e => {
  const key = e.key.toLowerCase();
  const pressedKey = document.querySelector(`.key[data-key="${key}"]`);
  if (pressedKey) {
      pressedKey.classList.remove('pressed');
  }
});
// Filter control

/*Filter Frequency:
controls cutoff frequency
darker...brighter sounds*/
const filterFrequencyInput = document.getElementById('filter-frequency');
filterFrequencyInput.addEventListener('input', e => {
    const frequency = parseFloat(e.target.value);
    filter.frequency.value = frequency; 
});


/*Filter Q:
Quality Factor
smoother...pronounced
*/
const filterQInput = document.getElementById('filter-q');
filterQInput.addEventListener('input', e => {
    const q = parseFloat(e.target.value);
    filter.Q.value = q;
});




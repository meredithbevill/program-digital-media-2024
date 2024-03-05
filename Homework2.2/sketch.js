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
            }
        });

        // Filter control
        const filterFrequencyInput = document.getElementById('filter-frequency');
        filterFrequencyInput.addEventListener('input', e => {
            const frequency = parseInt(e.target.value);
            filter.frequency.value = frequency;
        });
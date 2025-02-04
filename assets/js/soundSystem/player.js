
export const player = new Tone.Sampler({
    urls: {
        E2: "E2.wav",
        A2: "A2.wav",
        D3: "D3.wav",
        G3: "G3.wav",
        B3: "B3.wav",
        E4: "E4.wav",
        
    },
    baseUrl: "assets/samples/", 
    attack: 1,
    sustain: 0.5,
    release: 5
}).toDestination()


const reverb = new Tone.Reverb({ decay: 3,preDelay: 0.01}).toDestination();
player.connect(reverb);

export const fft = new Tone.FFT(64); // Create an FFT analyzer
player.connect(fft); 

export const waveform = new Tone.Waveform(256); // Waveform analyzer
player.connect(waveform);

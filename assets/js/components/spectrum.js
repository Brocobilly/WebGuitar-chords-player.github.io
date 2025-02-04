import { fft } from "../soundSystem/player.js";

// Get canvas and set up drawing context
const spectrumCanvas = document.getElementById("spectrumCanvas");
const spectrumCtx = spectrumCanvas.getContext("2d");

async function drawSpectrum() {
    await Tone.start();
    requestAnimationFrame(drawSpectrum);

    // Get frequency data
    const values = fft.getValue();
    const barWidth = spectrumCanvas.width / values.length;
    
    // Clear canvas
    spectrumCtx.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

    values.forEach((val, i) => {
        const barHeight = (val +100) * 2; // Normalize
        spectrumCtx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`;
        spectrumCtx.fillRect(i * barWidth, spectrumCanvas.height - barHeight, barWidth - 2, barHeight);
    });


}

drawSpectrum();


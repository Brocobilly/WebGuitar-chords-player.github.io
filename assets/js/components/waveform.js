import { waveform } from "../soundSystem/player.js";

const waveformCanvas = document.getElementById("waveformCanvas");
const waveformCtx = waveformCanvas.getContext("2d");

async function drawWaveform() {
    // await Tone.start();
    requestAnimationFrame(drawWaveform);

    // Get waveform data
    const values = waveform.getValue();
    waveformCtx.clearRect(0, 0, waveformCanvas.width, waveformCanvas.height);

    waveformCtx.beginPath();
    waveformCtx.strokeStyle = "#ffed4d";
    waveformCtx.lineWidth = 2;

    const sliceWidth = waveformCanvas.width / values.length;
    let x = 0;

    for (let i = 0; i < values.length; i++) {
        // const y = (values[i] + 1) * waveformCanvas.height / 2;
        const scale = 10; // Increase this factor to amplify the waveform
        const y = ((values[i] * scale) + 1) * waveformCanvas.height / 2;

        if (i === 0) {
            waveformCtx.moveTo(x, y);
        } else {
            waveformCtx.lineTo(x, y);
        }
        x += sliceWidth;
    }

    waveformCtx.stroke();
}

drawWaveform();
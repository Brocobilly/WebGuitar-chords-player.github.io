import { strings } from '../guitar/string.js'
import { player } from '../soundSystem/player.js'
// import { createWaveformAnalyzer } from '../soundSystem/waveformAnalyzer.js'
 
const bridge = document.querySelector('.bridge')
const template = document.querySelector('#bridge-string')

let stringWidth = 6

for (const number in strings) {
    const clone = document.importNode(template.content, true)

    const stringContainer = clone.querySelector('.bridge_string-container');
    const stringTrigger = clone.querySelector('.bridge_string-trigger');

    stringContainer.classList.add('bridge_string-container_' + number)
    stringTrigger.classList.add('bridge_string-trigger_' + number)

    const stringWaweform = clone.querySelector('.bridge_string-waveform');
    const waveformCtx = stringWaweform.getContext('2d')

    stringWaweform.id = "waveform-" + number

    const mutePlayer = new Tone.Sampler({
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
        release: 5,
    })
    
    const analyzer = new Tone.Waveform(256)
    mutePlayer.connect(analyzer);
    
    let frameId
    const drawVerticalWaveform = () => {
        
        frameId = requestAnimationFrame(drawVerticalWaveform) 

        // Get waveform data
        const values = analyzer.getValue();
        waveformCtx.clearRect(0, 0, stringWaweform.width, stringWaweform.height);
    
        waveformCtx.beginPath();
        waveformCtx.strokeStyle = "#00ff00";
        waveformCtx.lineWidth = stringWidth;
    
        const sliceHeight = stringWaweform.height / values.length;
        let y = 0;
    
        for (let i = 0; i < values.length; i++) {
            const x = (values[i] + 1) * stringWaweform.width / 2;
            if (i === 0) {
                waveformCtx.moveTo(x, y);
            } else {
                waveformCtx.lineTo(x, y);
            }
            y += sliceHeight;
        }
    
        waveformCtx.stroke();
        console.log('draw')
    }

    stringWidth -= 1

    drawVerticalWaveform()
    setTimeout(() => cancelAnimationFrame(frameId))

    const triggerSound = () => { 
        if (strings[number].frettedNote) {

            Tone.start().then(() => {
                const now = Tone.now()
                mutePlayer.triggerAttackRelease(strings[number].frettedNote, "8n", now) 
                player.triggerAttackRelease(strings[number].frettedNote, "8n", now + 0.1) 
            })

            setTimeout(() => cancelAnimationFrame(frameId), 2500)
        } 
    }
    
    stringTrigger.addEventListener('pointerenter', () => {
        if (strings[number].frettedNote) frameId = requestAnimationFrame(drawVerticalWaveform)
    })
    
    // const handleStrumming = () => {

        stringContainer.addEventListener('pointerenter', () => {
            stringTrigger.addEventListener('pointerleave', triggerSound , { once: true })
        })

        stringContainer.addEventListener('pointerleave', () => {
            stringTrigger.removeEventListener('pointerenter', triggerSound , { once: true })
        })   
    // }
    // document.addEventListener('pointerdown', handleStrumming )
    // document.removeEventListener('pointerdown', handleStrumming)

    bridge.append(clone)
}
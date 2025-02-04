import { strings } from '../guitar/string.js'
import { player } from '../soundSystem/player.js'
 
const bridge = document.querySelector('.bridge')

const template = document.querySelector('#bridge-string')

for (const number in strings) {
    const clone = document.importNode(template.content, true)

    const stringContainer = clone.querySelector('.bridge_string-container');
    const stringTrigger = clone.querySelector('.bridge_string-trigger');

    stringContainer.classList.add('bridge_string-container_' + number)
    stringTrigger.classList.add('bridge_string-trigger_' + number)



    stringContainer.addEventListener('pointerover', () => {
        stringTrigger.addEventListener(
            'pointerleave', 
            () => { if (strings[number].frettedNote) player.triggerAttackRelease(strings[number].frettedNote, "8n") },
            { once: true }
        )
    })

    bridge.append(clone)
}

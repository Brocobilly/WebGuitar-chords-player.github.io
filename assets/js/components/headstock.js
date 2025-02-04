import { strings } from "../guitar/string.js"

const headstock = document.querySelector('.headstock')
const tunerTemplate = document.querySelector('#tuner')


for (const number in strings) {

    const tunerClone = document.importNode(tunerTemplate.content, true)
    const tunerElement = tunerClone.querySelector('.tuner')
    const string = strings[number]

    for (const note of string.tuningRange) {
        const option = document.createElement('option')
        option.value = option.textContent = note
        tunerElement.append(option)
    }

    tunerElement.addEventListener('input', () => string.tune(tunerElement.value))
    
    headstock.append(tunerClone)
}
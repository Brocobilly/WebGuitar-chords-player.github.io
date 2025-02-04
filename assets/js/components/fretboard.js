import { strings } from "../guitar/string.js"
import { Fret } from "../guitar/fret.js"

const fretboardElement = document.querySelector('.fretboard')
const noteTemplate = document.querySelector('#fretboard-note')

for (const number in strings) {

    const stringElement = document.createElement('fieldset')
    stringElement.classList.add('fretboard_string-container')

    const string = strings[number]

    for (let note of string.pitchRange) {

        const noteClone = document.importNode(noteTemplate.content, true)
        const checkbox = noteClone.querySelector('input[type="checkbox"]')
        const label = noteClone.querySelector('label')

        const fret = new Fret(checkbox, label, number)
        fret.note = note

        string.frets.push(fret)

        checkbox.addEventListener('input', () => !checkbox.checked ? string.muting(fret) : string.press(fret))

        stringElement.append(noteClone)
    }

    fretboardElement.append(stringElement)
}
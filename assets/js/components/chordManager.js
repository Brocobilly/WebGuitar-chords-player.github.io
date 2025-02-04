import { storage } from "../guitar/chordStorage.js"
import { strings } from "../guitar/string.js"

const chordManagerForm = document.querySelector('.chordStorage')

const chordStorerElement = document.querySelector('.chordStorer')
const chordApplyerElement = document.querySelector('.chordApplyer')
const chordRemoverElement = document.querySelector('.chordRemover')
const chordRemoverAllElement = document.querySelector('.chordRemoverAll')

chordStorerElement.addEventListener('pointerdown', () => {

    const chord = []

    for (const stringNumber in strings) {

        let data = {
            string: stringNumber,
            tuningNote: strings[stringNumber].tuned,
            pitch: strings[stringNumber].fretPosition?.pitch ?? 'x',
            octave: strings[stringNumber].fretPosition?.octave,
            fretPosition: strings[stringNumber]?.fretPosition,
        }
        
        chord.push(data)
    }

    if (chord.every(string => string.pitch === 'x')) {
        
        chordStorerElement.setCustomValidity('No string has been selected.')
        return chordStorerElement.reportValidity()
    } 

    storage.store(chord)
})

chordApplyerElement.addEventListener('pointerdown', () => {

    const checked = chordManagerForm.querySelector('input:checked')

    if (! checked) {
        chordApplyerElement.setCustomValidity('No chord has been selected.')
        return chordApplyerElement.reportValidity()
    }  
    
    storage.apply(checked.value)
})

chordRemoverElement.addEventListener('pointerdown', () => {

    const checked = chordManagerForm.querySelector('input:checked')

    if (! checked) {
        chordRemoverElement.setCustomValidity('No chord has been selected.')
        return chordRemoverElement.reportValidity()
    }  

    storage.remove(checked.value)
})

chordRemoverAllElement.addEventListener('pointerdown', () => {

    const checked = [...chordManagerForm.querySelectorAll('input')]

    if (checked.length <= 0) {
        chordRemoverAllElement.setCustomValidity('No chord saved.')
        return chordRemoverAllElement.reportValidity()
    }  

    storage.removeAll()
})
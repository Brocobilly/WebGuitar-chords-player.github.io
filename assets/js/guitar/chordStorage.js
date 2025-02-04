import { chordsList } from './../settings/chordsList.js'
import { strings } from "./string.js"

class ChordStorage {

    storage = []

    constructor (strings, managerElement, storedChoredTemplate) {
        this.strings = strings
        this.managerElement = managerElement
        this.storedChoredTemplate = storedChoredTemplate
    }

    store(storedChord) {

        let [matchingChord] = chordsList.filter(chord => {

            return chord.strings.every(chordString => {

                let comparedString = storedChord.find(data => data.string === chordString.string)

                return (comparedString.pitch === chordString.pitch) && (comparedString.octave === chordString.octave)
            })
        })

        let chordName = matchingChord?.name ?? storedChord.map(string => string.pitch).join('')
        storedChord.index = `${Date.now()}`
        storedChord.element = this.createTag(chordName, storedChord.index)
        
        this.storage.push(storedChord)
    }

    apply(index) {

        let retrievedChord = this.find(index)

        for (const number in this.strings) {

            let string = retrievedChord.find(data => number === data.string)
            let tuningNote = string.tuningNote.pitch + string.tuningNote.octave

            strings[number].tune(tuningNote)
            strings[number].press(string.fretPosition)
        }
    }

    remove (index) {
        let retrievedChord = this.find(index)

        retrievedChord.element.remove()
        this.storage.splice(this.storage.indexOf(retrievedChord), 1)
    }

    removeAll () {
        this.storage.forEach(chord => chord.element.remove())
        this.storage = []
    }

    createTag (chordName, index) {
        let storedChoredClone = document.importNode(this.storedChoredTemplate.content, true)
        let container = storedChoredClone.querySelector('.stored-chord_container')
        let label = storedChoredClone.querySelector('.stored-chord_label')
        let radio = storedChoredClone.querySelector('.stored-chord_radio')
        
        label.htmlFor = radio.id = radio.value = index
        label.textContent = chordName
        radio.name = 'chords'

        this.managerElement.append(storedChoredClone)

        return container
    }

    find (index) {
        let [matchingChord] = this.storage.filter(chord => chord.index === index)
        return matchingChord
    }
}

const managerElement = document.querySelector('.chordManager')
const storedChordTemplate = document.querySelector('#stored-chord')

export const storage = new ChordStorage(strings, managerElement, storedChordTemplate)
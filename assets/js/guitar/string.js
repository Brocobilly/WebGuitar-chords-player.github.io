import { Tuner } from './tuner.js'

class String extends Tuner {

    scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    totalNotes = 22

    frets = []

    tuned = {}

    min = {}

    max = {
        pitch: 'G',
        octave: 5,
    }

    constructor (pitch, octave) {
        super()
        this.min.pitch = pitch
        this.min.octave = octave
    }


    muting(fret) {
        fret.pressed = false
        this.frettedNote = ''
    }

    press(fret) {
        if (this.frettedNote) {
            const previous = this.frets.find(fret => fret.note === this.frettedNote)
            previous.pressed = false
        }
        fret.pressed = true
        this.frettedNote = fret.note
    }
}

const defaultStrings = [
    ['one' ,'E', 3],
    ['two' ,'A', 3],
    ['three' ,'D', 4],
    ['four' ,'G', 4],
    ['five' ,'B', 4],
    ['six' ,'E', 5],
]

export const strings = {}

for (let [name, pitch, octave] of defaultStrings) {
    strings[name] = new String(pitch, octave)
    strings[name].tune("A#4")
}
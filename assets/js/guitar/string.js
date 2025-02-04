import { Tuner } from './tuner.js'
import { defaultStrings as stringSettings } from '../settings/defaultStrings.js'

class String extends Tuner {

    totalNotes = 22

    frets = []

    tuned = {}

    min = {}

    max = {}

    constructor (setting) {
        super()
        this.tuned = setting.tuned
        this.min = setting.min
        this.max = setting.max
        this.color = setting.color
    }


    muting() {
        this.frets.forEach(fret => fret.pressed = false)
        this.fretPosition = false
    }

    press(fret) {
        this.frets.forEach(fret => fret.pressed = false)
        if (fret) fret.pressed = true
        this.fretPosition = fret
    }
}

export const strings = {}

for (let setting of stringSettings) {
    strings[setting.number] = new String(setting)
}
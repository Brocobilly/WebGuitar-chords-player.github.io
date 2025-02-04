export class Fret {

    noteRegex = /^([A-Z]#?)(\d)$/

    constructor (checkbox, label, span, string) {
        this.checkbox = checkbox
        this.label = label
        this.span = span
        this.parentString = string
    }

    set note (note) {
        this.checkbox.value = this.span.textContent = note
        this.checkbox.id = this.label.htmlFor = this.parentString + note

        const [pitch, octave] = note.match(this.noteRegex).splice(1, 2)

        this.pitch = pitch
        this.octave = parseInt(octave)
    }

    set pressed (bool) {
        this.checkbox.checked = bool
    }

    get note () {
        return this.checkbox.value
    }
}


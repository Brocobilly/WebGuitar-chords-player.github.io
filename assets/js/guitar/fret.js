export class Fret {

    constructor (checkbox, label, string) {
        this.checkbox = checkbox
        this.label = label
        this.parentString = string
    }

    set note (str) {
        this.checkbox.value = this.label.textContent = str
        this.checkbox.id = this.label.htmlFor = this.parentString + str
    }

    set pressed (bool) {
        this.checkbox.checked = bool
    }

    get note () {
        return this.checkbox.value
    }
}


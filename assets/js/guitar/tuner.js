export class Tuner {

    scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

    noteRegex = /^([A-Z]#?)(\d)$/

    get tuningRange () {
        const range = []
        const tunedScaleIndex = this.scale.indexOf(this.min.pitch)
    
        let scaleIndex = tunedScaleIndex
        let octave = this.min.octave

        while (this.hasReachedMaxNote(this.scale[scaleIndex], this.max.pitch, octave, this.max.octave)) {

            if (this.scale[scaleIndex] === 'C') octave += 1
    
            const note = this.scale[scaleIndex] + octave
            range.push(note)
    
            scaleIndex = scaleIndex < this.scale.length - 1
                ? scaleIndex + 1
                : 0
        }

        return range
    }

    hasReachedMaxNote(note, maxNote, octave, maxOctave) {
        return (note !== maxNote) || (octave < maxOctave)
    }

    get pitchRange () {

        const range = []
        const tunedScaleIndex = this.scale.indexOf(this.tuned.pitch)
    
        let scaleIndex = tunedScaleIndex
        let octave = this.tuned.octave
    
        for (let index = 0; index < this.totalNotes; index++) {
            if (this.scale[scaleIndex] === 'C') octave += 1
    
            const note = this.scale[scaleIndex] + octave
            range.push(note)
    
            scaleIndex = scaleIndex < this.scale.length - 1
                ? scaleIndex + 1
                : 0
        }

        return range
    }

    get tuningNote () {
        return this.tuned.pitch + this.tuned.octave
    }

    tune(note) {
        const [pitch, octave] = note.match(this.noteRegex).splice(1, 2)

        this.tuned.pitch = pitch
        this.tuned.octave = parseInt(octave)

        if (this.frets.length > 0) {
            const range = this.pitchRange
            this.frets.forEach((fret, index) => fret.note = range[index])
        }
    }

}
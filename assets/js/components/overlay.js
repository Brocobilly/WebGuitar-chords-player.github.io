const overlay = document.querySelector('.overlay')

overlay.addEventListener('pointerdown', () => overlay.classList.add("hidden"))

overlay.addEventListener("pointerdown", async () => {
    await Tone.start(); // Ensures Tone.js starts properly
    console.log("Audio started");
});
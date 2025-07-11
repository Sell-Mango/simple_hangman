import { renderLetterButtons, createLetterObjects, resizeCanvas } from './setup.js';
import { handleGameClick, drawRevealedLetters } from './logic.js';

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer ul");
const canvas = document.getElementById("hangmanGame");
const ctx = canvas.getContext("2d");

// SETUP UI
navLettersContainer.innerHTML = renderLetterButtons();

// PREPARE WORD
const incomingWord = "Hvit monster";
ctx.font = "15px serif";
let placing = 10;

let letterObjects = createLetterObjects(incomingWord);


// EVENTS
// document.addEventListener("resize", resizeCanvas(canvas, mainTag))
navLettersContainer.addEventListener("click", (key) => {
    if(key.target.matches(".letterButton button")) {        
        handleGameClick(key, letterObjects);

        drawRevealedLetters(key, letterObjects);
    }
});

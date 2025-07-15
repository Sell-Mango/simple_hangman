import { renderLetterButtons, createLetterObjects, resizeCanvas } from './setup.js';
import { handleGameClick, drawRevealedLetters } from './logic.js';
import drawHangman from './drawHangman.js';

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer ul");
const canvas = document.getElementById("hangmanGame");
const mainTag = canvas.parentElement;
const ctx = canvas.getContext("2d");

// SETUP UI
navLettersContainer.innerHTML = renderLetterButtons();

// PREPARE WORD
const incomingWord = "hvit mosss is";
incomingWord.trimEnd();
let difficultyTurn = 0;

let letterObjects = createLetterObjects(incomingWord);


function initGame() {
    resizeCanvas(canvas, mainTag);
    drawRevealedLetters(canvas, letterObjects);
    drawHangman(canvas, difficultyTurn);
}


window.onload = initGame();

// EVENTS
window.addEventListener("resize", () => {
    resizeCanvas(canvas, mainTag);
    drawRevealedLetters(canvas, letterObjects);
    drawHangman(canvas, difficultyTurn);
})

navLettersContainer.addEventListener("click", (key) => {
    if(key.target.matches(".letterButton button")) {       
        resizeCanvas(canvas, mainTag);
        if(!handleGameClick(key, letterObjects)) {
            difficultyTurn++;
        }
        drawHangman(canvas, difficultyTurn);
        drawRevealedLetters(canvas, letterObjects);
    }
});


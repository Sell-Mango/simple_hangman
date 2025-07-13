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
const incomingWord = "Hvit monster";
const fontSize = "20px serif";
let wordsPlacing = 400;
let difficultyTurn = 0;

let letterObjects = createLetterObjects(incomingWord);


function initGame() {
    resizeCanvas(canvas, mainTag);
    drawRevealedLetters(canvas, letterObjects, fontSize, wordsPlacing, 20);
    drawHangman(canvas, difficultyTurn);
}


window.onload = initGame();

// EVENTS
window.addEventListener("resize", () => {
    resizeCanvas(canvas, mainTag);
    // drawRevealedLetters(letterObjects);
    drawHangman(canvas, difficultyTurn);
})

navLettersContainer.addEventListener("click", (key) => {
    if(key.target.matches(".letterButton button")) {       
        resizeCanvas(canvas, mainTag);
        if(!handleGameClick(key, letterObjects)) {
            difficultyTurn++;
        }
        drawHangman(canvas, difficultyTurn);
        drawRevealedLetters(canvas, letterObjects, fontSize, wordsPlacing, 20);
    }
});


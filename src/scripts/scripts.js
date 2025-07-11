import { renderLetterButtons, resizeCanvas } from './setup.js';
import { drawRevealedLetters, checkMathcingLetter } from './logic.js';

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer ul");
const canvas = document.getElementById("hangmanGame");
const ctx = canvas.getContext("2d");
const mainTag = canvas.parentElement;

// Generate letter menu
navLettersContainer.innerHTML = renderLetterButtons();
const letterButtons = document.querySelectorAll(".letterButton button");

// Prepare word
const incomingWord = "Hvit monster";
ctx.font = "15px serif";

let placing = 10;


let letterObjects = incomingWord.split("").map((e) => {
    return { 
        letter: e,
        revealed: e === ' ' ? true : false
     }
});


// EVENTS
// document.addEventListener("resize", resizeCanvas(canvas, mainTag))
letterButtons.forEach((button) => {
    button.addEventListener("click", (key) => {
        console.log(key.target.value)
        
        handleGameClick(button, letterObjects);

    });
});

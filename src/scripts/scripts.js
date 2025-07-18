import { initGame, chooseDifficulty, setSecretWord, renderLetterButtons, createLetterObjects, fetchSecretWord } from './setup.js';
import { handleGameClick, drawRevealedLetters, resizeCanvas } from './logic.js';
import { drawHangman } from './drawShapes.js';

let gameInfo = {
    difficulty: null,
    secretWord: null
}

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer ul");
const canvas = document.getElementById("hangmanGame");

// PREPARE WORD
const incomingWord = "hvit mosss is";
incomingWord.trimEnd();

let letterObjects = createLetterObjects(incomingWord);
let ordListe;

// START GAME
function startGame(difficulty) {
    gameInfo.difficulty = difficulty;

    fetchSecretWord().then(function(e) {
        ordListe = e;
        testOrd();
    });

    //ordListe = setSecretWord(difficulty);
    resizeCanvas(canvas);
    drawRevealedLetters(canvas, letterObjects);
    drawHangman(canvas, gameInfo.difficulty);

    // RENDER LETTER BUTTONS
    navLettersContainer.innerHTML = renderLetterButtons();
}

function testOrd() {
    console.log(ordListe);
}



window.onload = initGame(canvas, chooseDifficulty)

// EVENTS
navLettersContainer.addEventListener("click", (key) => {
    if(key.target.matches(".letterButton button")) {       
        resizeCanvas(canvas);
        //console.log(gameInfo.difficulty)
        if(!handleGameClick(key, letterObjects)) {
            gameInfo.difficulty++;
        }
        drawHangman(canvas, gameInfo.difficulty);
        drawRevealedLetters(canvas, letterObjects);
        console.log(ordListe);
    }
});







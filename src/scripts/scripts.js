import GameManager from './gameManager.js';
import { renderLetterButtons, createLetterObjects } from './setup.js';
import { handleGameClick, drawRevealedLetters, isCanvasButtonClicked } from './logic.js';
import { drawHangman, drawOptionButton } from './drawShapes.js';

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer ul");
const canvas = document.getElementById("hangmanGame");''

// SETUP UI
navLettersContainer.innerHTML = renderLetterButtons();

// CONSTRUCTORS
const gameManager = new GameManager(canvas);

// PREPARE WORD
const incomingWord = "hvit mosss is";
incomingWord.trimEnd();
gameManager.setDifficulty(canvas);
let difficultyTurn = gameManager.difficultyLevel;

let letterObjects = createLetterObjects(incomingWord);

const easyButton = {
    x: 100,
    y: 100,
    width: 150,
    height: 80,
    text: "Test knapp",
    fillColor: "blue"
}



// START GAME
function initGame() {
    gameManager.resizeCanvas(canvas);
    drawRevealedLetters(canvas, letterObjects);
    drawHangman(canvas, difficultyTurn);
}


window.onload = initGame();

// EVENTS
window.addEventListener("resize", () => {
    gameManager.resizeCanvas(canvas);
    drawRevealedLetters(canvas, letterObjects);
    drawHangman(canvas, difficultyTurn);
})

navLettersContainer.addEventListener("click", (key) => {
    if(key.target.matches(".letterButton button")) {       
        gameManager.resizeCanvas(canvas);
        if(!handleGameClick(key, letterObjects)) {
            difficultyTurn++;
        }
        drawHangman(canvas, difficultyTurn);
        drawRevealedLetters(canvas, letterObjects);
    }
});

canvas.addEventListener("click", event => {
    if(isCanvasButtonClicked(canvas, easyButton, event)) {
        console.log("YES");
    }
});







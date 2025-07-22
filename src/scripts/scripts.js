import { splashScreen, startScreen, chooseDifficulty, setSecretWord, renderLetterButtons, createLetterObjects, startOverButton } from './setup.js';
import { handleGameClick, drawRevealedLetters, redrawCanvas, gameComplete } from './logic.js';
import { drawHangman } from './drawShapes.js';

const maxTurns = 9;

let gameInfo = {
    difficulty: null,
    secretWord: null,
    turn: null,
    letterObjects: null,
    attempts: []
}

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer");
const canvas = document.getElementById("hangmanGame");

async function initGame() {
    const gameTest = JSON.parse(sessionStorage.getItem("gameInfo"));
    if(gameTest !== null) {
        gameInfo = gameTest;
        startGame();
    }
    else {
        await splashScreen(canvas);
        let words = await startScreen(canvas);
        let difficulty = await chooseDifficulty(canvas);
        let secretWord = await setSecretWord(difficulty, words);

        if(difficulty === 3) gameInfo.turn = 5;
        else if(difficulty === 2) gameInfo.turn = 3;
        else gameInfo.turn === 1;

        gameInfo.difficulty = difficulty;
        gameInfo.secretWord = secretWord.word;
        gameInfo.letterObjects = createLetterObjects(gameInfo.secretWord);
        sessionStorage.setItem("gameInfo", JSON.stringify(gameInfo));
        startGame();
    }
}

// START GAME
function startGame() {
    redrawCanvas(canvas);
    drawRevealedLetters(canvas, gameInfo.letterObjects);
    drawHangman(canvas, gameInfo.turn);

    // RENDER LETTER BUTTONS
    navLettersContainer.appendChild(renderLetterButtons(gameInfo.attempts));
    startOverButton(canvas, {x: canvas.width - 180, y: canvas.height - 80, width: 150, height: 50, text: "Nytt spill", fillColor: "yellow"});
    console.log(gameInfo.secretWord);
}

window.onload = initGame;

// EVENTS
navLettersContainer.addEventListener("click", (key) => {
    if(key.target.matches(".letterButton button")) {       
        redrawCanvas(canvas);
        if(!handleGameClick(key, gameInfo.letterObjects)) {
            gameInfo.turn++;
            gameInfo.attempts.push({letter: key.target.value.toLowerCase(), isCorrect: false});
        }
        else {
            gameInfo.attempts.push({letter: key.target.value.toLowerCase(), isCorrect: true});
        }

        sessionStorage.setItem("gameInfo", JSON.stringify(gameInfo)); 
        drawHangman(canvas, gameInfo.turn);
        drawRevealedLetters(canvas, gameInfo.letterObjects);

        let foundLetter = gameInfo.letterObjects.find(e => e.revealed === false);

        if(foundLetter === undefined && gameInfo.turn <= maxTurns) {
            gameComplete(canvas, true, gameInfo.secretWord);
        }
        else if(foundLetter !== undefined && gameInfo.turn >= maxTurns) {
            gameComplete(canvas, false, gameInfo.secretWord);
        }
        else {
            startOverButton(canvas, {x: canvas.width - 180, y: canvas.height - 80, width: 150, height: 50, text: "Nytt spill", fillColor: "yellow"});
        }
    }
});
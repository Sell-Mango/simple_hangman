import { fetchSession, splashScreen, startScreen, setCategory, chooseDifficulty, setSecretWord, createLetterPressed, createLetterObjects, newRenderLetterButtons } from './setup.js';
import { handleGameClick, drawRevealedLetters, redrawCanvas, checkGameStatus, delay } from './logic.js';
import { drawHangman } from './drawShapes.js';

let gameInfo = {
    difficulty: null,
    secretWord: null,
    turn: null,
    letterObjects: null,
    lettersPressed: [],
    maxTurns: 9,
}

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer");
const canvas = document.getElementById("hangmanGame");

async function initGame() {
    const getSession = JSON.parse(sessionStorage.getItem("hangSession"));
    if(getSession !== null) {
        gameInfo = await fetchSession(getSession);
        await startGame();
    }
    else {
        await splashScreen(canvas);
        await startScreen(canvas);
        let category = await setCategory(canvas);
        let difficulty = await chooseDifficulty(canvas);
        let secretWord = await setSecretWord(category);

        if(difficulty === 3) gameInfo.turn = 3;
        else if(difficulty === 2) gameInfo.turn = 3;
        else gameInfo.turn === 1;

        gameInfo.lettersPressed = createLetterPressed(difficulty, secretWord);

        gameInfo.difficulty = difficulty;
        gameInfo.secretWord = secretWord.slice(0, 1).toUpperCase() + secretWord.slice(1);
        gameInfo.letterObjects = createLetterObjects(gameInfo.secretWord, gameInfo.lettersPressed);
        sessionStorage.setItem("hangSession", JSON.stringify({lettersPressed: gameInfo.lettersPressed, secretWord: gameInfo.secretWord, difficulty: gameInfo.difficulty}));
        startGame();
    }
}

// START GAME
async function startGame() {
    redrawCanvas(canvas);
    await delay(100);
    drawHangman(canvas, gameInfo.turn);
    drawRevealedLetters(canvas, gameInfo.letterObjects);

    // RENDER LETTER BUTTONS
    navLettersContainer.appendChild(newRenderLetterButtons(gameInfo.lettersPressed, gameInfo.secretWord));
    const gameStatus = checkGameStatus(gameInfo, canvas, navLettersContainer);

    
}

window.onload = initGame;

// EVENTS
navLettersContainer.addEventListener("click", (key) => {
    if(key.target.matches(".letterButton button")) {       
        redrawCanvas(canvas);
        if(!handleGameClick(key, gameInfo.letterObjects)) {
            gameInfo.turn++;
        }

        gameInfo.lettersPressed.forEach(e => {
            if(key.target.value.toLowerCase() === e.letter.toLowerCase()) {
                e.isPressed = true;
            }
        });

        sessionStorage.setItem("hangSession", JSON.stringify({lettersPressed: gameInfo.lettersPressed, secretWord: gameInfo.secretWord, difficulty: gameInfo.difficulty}));

        drawHangman(canvas, gameInfo.turn);
        drawRevealedLetters(canvas, gameInfo.letterObjects);

        const gameStatus = checkGameStatus(gameInfo, canvas, navLettersContainer);
    }
});
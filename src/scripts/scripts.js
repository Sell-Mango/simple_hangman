import { splashScreen, startScreen, chooseDifficulty, setSecretWord, renderLetterButtons, createLetterPressed, createLetterObjects, startOverButton, newRenderLetterButtons } from './setup.js';
import { handleGameClick, drawRevealedLetters, redrawCanvas, gameComplete, checkGameStatus } from './logic.js';
import { drawHangman } from './drawShapes.js';

const maxTurns = 9;

let gameInfo = {
    difficulty: null,
    secretWord: null,
    turn: null,
    letterObjects: null,
    lettersPressed: [],
    attempts: []
}

// GET HTML ELEMENTS
const navLettersContainer = document.querySelector("#letterContainer");
const canvas = document.getElementById("hangmanGame");

async function initGame() {
    const getSession = JSON.parse(sessionStorage.getItem("hangSession"));
    if(getSession !== null) {
        continueGame(getSession);
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

        gameInfo.lettersPressed = createLetterPressed();

        gameInfo.difficulty = difficulty;
        gameInfo.secretWord = secretWord.word.slice(0, 1).toUpperCase() + secretWord.word.slice(1);
        gameInfo.letterObjects = createLetterObjects(gameInfo.secretWord);
        sessionStorage.setItem("hangSession", JSON.stringify({lettersPressed: gameInfo.lettersPressed, secretWord: gameInfo.secretWord, difficulty: gameInfo.difficulty}));
        startGame();
    }
}

function continueGame(session) {
    gameInfo.lettersPressed = session.lettersPressed;
    gameInfo.difficulty = session.difficulty;
    gameInfo.secretWord = session.secretWord;
    gameInfo.letterObjects = createLetterObjects(session.secretWord);
    const wordSplit = Array.from(session.secretWord);

    session.lettersPressed.forEach((obj, index) => {
       if(wordSplit.some(letter => obj.letter.toLowerCase() === letter.toLowerCase())) {
        gameInfo.turn++;
       }
    });
}

// START GAME
function startGame() {
    redrawCanvas(canvas);
    drawRevealedLetters(canvas, gameInfo.letterObjects);
    drawHangman(canvas, gameInfo.turn);

    // RENDER LETTER BUTTONS
    navLettersContainer.appendChild(newRenderLetterButtons(gameInfo.lettersPressed, gameInfo.secretWord));
    
    const gameStatus = checkGameStatus(gameInfo, maxTurns);
    switch(gameStatus) {
        case 1:
            gameComplete(canvas, true, gameInfo.secretWord, navLettersContainer);
            break;
        case 2:
            gameComplete(canvas, false, gameInfo.secretWord, navLettersContainer);
            break;
        default:
            startOverButton(canvas, {x: canvas.width - 180, y: canvas.height - 80, width: 150, height: 50, text: "Nytt spill", fillColor: "yellow"});
    }   
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
            if(key.target.value === e.letter.toLowerCase()) {
                e.isPressed = true;
            }
        });

        sessionStorage.setItem("hangSession", JSON.stringify({lettersPressed: gameInfo.lettersPressed, secretWord: gameInfo.secretWord, difficulty: gameInfo.difficulty}));

        drawHangman(canvas, gameInfo.turn);
        drawRevealedLetters(canvas, gameInfo.letterObjects);

        const gameStatus = checkGameStatus(gameInfo, maxTurns);
        switch(gameStatus) {
            case 1:
                gameComplete(canvas, true, gameInfo.secretWord, navLettersContainer);
                break;
            case 2:
                gameComplete(canvas, false, gameInfo.secretWord, navLettersContainer);
                break;
            default:
                startOverButton(canvas, {x: canvas.width - 180, y: canvas.height - 80, width: 150, height: 50, text: "Nytt spill", fillColor: "yellow"});
        }
    }
});
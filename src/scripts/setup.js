import { redrawCanvas, delay, isCanvasButtonClicked } from './logic.js';
import { drawOptionButton } from './drawShapes.js'

export function fetchSession(session) {

    const lettersPressed = session.lettersPressed;
    const difficulty = session.difficulty;
    const secretWord = session.secretWord;
    const letterObjects = createLetterObjects(session.secretWord, session.lettersPressed);
    let turn = 0;

    if(difficulty === 3) turn = 3;
    else if(difficulty === 2) turn = 3;
    else turn === 1;

    const wordSplit = Array.from(session.secretWord);
    session.lettersPressed.forEach((obj) => {
        if(obj.isPressed) {
            if(!wordSplit.some(letter => obj.letter.toLowerCase() === letter.toLowerCase())) {
                turn++;
            }
        }
    });

    return { difficulty: difficulty, secretWord: secretWord, turn: turn, letterObjects: letterObjects, lettersPressed: lettersPressed, maxTurns: 9 };
}

export async function splashScreen(canvas) {
    redrawCanvas(canvas);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "../logo.png";

    let splashScreenScale = 1;

    return new Promise((resolve, reject) => {
        img.onload = async () => {
            while (splashScreenScale <= 1.8) {
            
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.save();

                splashScreenScale += 0.005

                ctx.translate(canvas.width / 2, canvas.height / 2);
                ctx.scale(splashScreenScale / 2, splashScreenScale / 2);
                ctx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height);

                ctx.restore();

                if(splashScreenScale >= 1.4) {
                    ctx.globalAlpha -= 0.2;
                } 
                await delay(10);
            }
            ctx.globalAlpha = 1;
            resolve();
        }
    });
}

export async function startScreen(canvas) {
    redrawCanvas(canvas);
    const ctx = canvas.getContext("2d");
    ctx.globalAlpha = 1;

    const heading = "Hangman"
    const verNum = "0.1.0";

    ctx.font = "600 40px Arial";
    const headingSize = ctx.measureText(heading).width;
    ctx.fillText(heading, canvas.width / 2 - (headingSize / 2), 100);

    const startButton = {x: canvas.width / 2 - (150 / 2), y: 200, width: 150, height: 50, text: "Start", fillColor: "green" };
    drawOptionButton(canvas, startButton, "20px Arial");

    return new Promise((resolve, reject) => {
        canvas.addEventListener("click", (e) => {
            if(isCanvasButtonClicked(canvas, startButton, e)) {
                resolve(fetch('../src/data/words.json')
                    .then((response) => response.json())
                );
            }    
        });
    });
}

// SETUP CANVAS
export async function chooseDifficulty(canvas) {
    const ctx = canvas.getContext("2d");
    redrawCanvas(canvas);

    const diffButtons = [
        {
            x: canvas.width / 2 - (150 / 2), y: 150, width: 150, height: 50, text: "Lett", fillColor: "green", diffLevel: 1
        },
        {
            x: canvas.width / 2 - (150 / 2), y: 230, width: 150, height: 50, text: "Vanlig", fillColor: "orange", diffLevel: 2
        },
        {
            x: canvas.width / 2 - (150 / 2), y: 300, width: 150, height: 50, text: "vanskelig", fillColor: "red", diffLevel: 3
        }
    ];

    const heading = "Velg vanskelighetsgrad";
    ctx.font = "600 30px Arial";
    const headingSize = ctx.measureText(heading).width;
    ctx.fillText(heading, canvas.width / 2 - (headingSize / 2), 100);

    drawOptionButton(canvas, diffButtons[0], "20px Arial");
    drawOptionButton(canvas, diffButtons[1], "20px Arial");
    drawOptionButton(canvas, diffButtons[2], "20px Arial");

    return new Promise((resolve, reject) => {
        canvas.addEventListener("click", (event) => {
        diffButtons.forEach(button => {
            if(isCanvasButtonClicked(canvas, button, event)) {
                resolve(button.diffLevel);
            }
            });
        });
    });
}

export function setSecretWord(difficulty, words) {
    let wordList = words.filter((e) => {
        return e.difficulty <= difficulty;
    });
    const genNum = Math.floor(Math.random() * wordList.length -1);
    if(genNum < 0) genNum = 0;
    return wordList[genNum];  
}

export function createLetterPressed() {
    let letters = [];
    
    for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
        letters.push({letter: String.fromCharCode(i), isPressed: false });
    }

    letters.push({letter: 'æ', isPressed: false });
    letters.push({letter: 'ø', isPressed: false });
    letters.push({letter: 'å', isPressed: false });

    return letters;
}

export function newRenderLetterButtons(lettersPressed, secretWord) {
    const letters = secretWord.split('');
    const lettersUl = document.createElement("ul");

     for(let i = 0; i < lettersPressed.length; i++) {
        const letterLi = document.createElement("li");
        letterLi.setAttribute("class", "letterButton");

        const letterButton = document.createElement("button");
        letterButton.setAttribute("value", lettersPressed[i].letter);
        
        if(lettersPressed[i].isPressed) {
            let letterMatch = letters.find(e => lettersPressed[i].letter === e);
            if(letterMatch !== undefined) {
                letterMatch = letterMatch.toLowerCase();
            }
            lettersPressed[i].letter.toLowerCase() === letterMatch ? letterButton.style.background = "green" : letterButton.style.background = "red";
            letterButton.disabled = true;
        }

        const buttonContent = document.createTextNode(lettersPressed[i].letter.toUpperCase());
        letterButton.appendChild(buttonContent);
        letterLi.appendChild(letterButton);
        lettersUl.appendChild(letterLi);
    }

    return lettersUl;
}

// Generate array of letter objects to be rendered in canvae
export function createLetterObjects(word, lettersPressed = null) {
    const wordSplit = word.split("").map((e) => {

        let isCorrectWordPressed = false;
        if (lettersPressed !== null && lettersPressed.some(l => l.isPressed && l.letter.toLowerCase() === e.toLowerCase())) {
            isCorrectWordPressed = true;
        }

        return { 
            letter: e,
            revealed: e === ' ' || isCorrectWordPressed ? true : false
        }
    });

    return wordSplit;
}

export function startOverButton(canvas, button) {

    // const buttonInfo = {x: canvas.width / 2 - (150 / 2), y: canvas.height - 100, width: 150, height: 50, text: text, fillColor: "yellow"};

    drawOptionButton(canvas, button, "20px Arial");

    canvas.addEventListener("click", e => {
        if(isCanvasButtonClicked(canvas, button, e)) {
            sessionStorage.removeItem("hangSession");
            window.location.assign(window.location.href);
        }
    });
}
import { resizeCanvas, delay, isCanvasButtonClicked } from './logic.js';
import { drawOptionButton } from './drawShapes.js'

let splashScreenScale = 1;

export function initGame(canvas) {
    resizeCanvas(canvas);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = "../logo.png";
    
    img.onload = async () => {
        await animateSplashScreen(canvas, img);
        
        ctx.globalAlpha = 1;
        resizeCanvas(canvas);

        const heading = "Hangman"
        const verNum = "0.1.0";

        ctx.font = "600 40px Arial";
        const headingSize = ctx.measureText(heading).width;
        ctx.fillText(heading, canvas.width / 2 - (headingSize / 2), 100);

    }
    
}

async function animateSplashScreen(canvas, img) {
    const ctx = canvas.getContext("2d");
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
}

// SETUP CANVAS
export function chooseDifficulty(canvas, callNextView) {
    const ctx = canvas.getContext("2d");
    resizeCanvas(canvas);

    const diffButtons = [
        {
            x: canvas.width / 2 - (150 / 2), y: 150, width: 150, height: 50, text: "Lett", fillColor: "green", diffLevel: 1
        },
        {
            x: canvas.width / 2 - (150 / 2), y: 230, width: 150, height: 50, text: "Vanlig", fillColor: "orange", diffLevel: 3
        },
        {
            x: canvas.width / 2 - (150 / 2), y: 300, width: 150, height: 50, text: "vanskelig", fillColor: "red", diffLevel: 5
        }
    ];

    const heading = "Velg vanskelighetsgrad";
    ctx.font = "600 30px Arial";
    const headingSize = ctx.measureText(heading).width;
    ctx.fillText(heading, canvas.width / 2 - (headingSize / 2), 100);

    drawOptionButton(canvas, diffButtons[0], "20px Arial");
    drawOptionButton(canvas, diffButtons[1], "20px Arial");
    drawOptionButton(canvas, diffButtons[2], "20px Arial");

    canvas.addEventListener("click", (event) => {
        diffButtons.forEach((button) => {
            if(isCanvasButtonClicked(canvas, button, event)) {
                callNextView(button.diffLevel);
            }
        })
    });
}

export function setSecretWord(difficulty) {
    let wordList;
    
    return wordList;  
}

export function fetchSecretWord() {
    return fetch('./src/data/words.json')
        .then((response) => {
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        });
}

// Generate html for each letter button
export function renderLetterButtons() {

    let letters = [];

    for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
        letters.push(String.fromCharCode(i));
    }

    letters.push('æ');
    letters.push('ø');
    letters.push('å');

    let lettersOut = "";

    for (let i = 0; i < letters.length; i++) {
        const letterBtn = `
        <li class="letterButton">
            <button value="${letters[i]}">${letters[i].toUpperCase()}</button>
        </li>`
        lettersOut += letterBtn;
    }
    return lettersOut;
}

// Generate array of letter objects to be rendered in canvae
export function createLetterObjects(word) {
    const wordSplit = word.split("").map((e) => {
        return { 
            letter: e,
            revealed: e === ' ' ? true : false
        }
    });
    return wordSplit;
}
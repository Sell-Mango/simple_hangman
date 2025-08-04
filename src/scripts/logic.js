import { startOverButton } from './setup.js';

export function redrawCanvas(canvas) {
    const parentElement = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    canvas.width = parentElement.offsetWidth;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export const delay = (ms) => new Promise(r => setTimeout(r, ms));


// Draw each letter in the secret word
export function drawRevealedLetters(canvas, letters) {

    const ctx = canvas.getContext("2d");
    ctx.font = "600 30px Grandstander, cursive";
    
    const initPosX = canvas.width / 2 - (canvas.width * 0.05);
    const initPosY = 150;

    let positionX = initPosX;
    let positionY = initPosY;
    let pathLength = 25;
    let spacing = 8;

    let tempWord = [];
    let currentWL = 0;
    let globalWL = 0;
    for (let i = 0; i < letters.length; i++) {

        // Calculates length of each word, pushing letters in the current word to a temporary array before rendering out.
        if (letters[i].letter !== ' ' || i >= letters.length) {
            currentWL += spacing + (letters[i].reavealed === true ? ctx.measureText(letters[i].letter).width : pathLength);
            tempWord.push(letters[i]);
        }

        // Render word on canvas
        if(letters[i].letter === ' ' || i >= (letters.length -1)) {
            globalWL += currentWL;
            const currentWLCanvas = currentWL + initPosX;
            const globalWLCanvas = globalWL + initPosX;
            const wordBoundary = canvas.width - 50;
            
            // Check if a single word is stretching beyond the canvas boundary.
            // Scale down fontsize and underline, then adjust the word size
            // Continue until the word fits the canvas.
            if(currentWLCanvas >= wordBoundary) {
                while (currentWL + initPosX >= (canvas.width - 50)) {
                    // Scales down font size and path/line length
                    const fontArgs = ctx.font.split(' ');
                    const scaleFont = parseInt(fontArgs[1].slice(0, -2)) - 2;
                    ctx.font = `${fontArgs[0]} ${scaleFont}px ${fontArgs.slice(2).join(" ")}`;
                    pathLength -= 2;

                    // Measure and adjust the currentWL
                    let newcurrentWL = 0;
                    tempWord.forEach(e => {
                        newcurrentWL += spacing + (e.reavealed === true ? ctx.measureText(e.letter).width : pathLength);
                    });

                    currentWL = newcurrentWL;
                }
            }

            // pushes a word to a new line if it hits the end of canvas, but not taking the whole space.
            if(globalWLCanvas >= wordBoundary && currentWLCanvas < wordBoundary) {
                positionX = initPosX;
                globalWL = initPosX;
                positionY += 50;
                currentWL = 0;
            }

            // Render out each word in a sentence, leaving unrevealed letters as blank lines.
            for(let j = 0; j < tempWord.length; j++) {
                let charLength = pathLength;

                if(tempWord[j].revealed) {
                    charLength = ctx.measureText(tempWord[j].letter).width;
                    ctx.fillText(tempWord[j].letter, positionX, positionY);
                }

                ctx.beginPath();
                ctx.moveTo(positionX, positionY + 5);
                positionX += charLength;

                ctx.lineTo(positionX, positionY + 5);
                ctx.stroke();
                positionX += spacing;
                
            }
            // Adds a blank line after word is rendered
            positionX += pathLength;
            // Clearing temporary word array and adjust for the font size.
            tempWord = [];
            currentWL = 0;
            ctx.font = "600 30px Arial";
        }
    }
}

// Check if clicked button matches any letter in secret word
function isLetterMatching(clickedButton, letters) {

    let foundLetter = false;
    letters.forEach((e, index) => {
        if(e.letter.toLowerCase() === clickedButton.target.value) {
            letters[index].revealed = true;
            foundLetter = true;
        }

        return foundLetter;
    });
    
    return foundLetter;
}


function updateClickedButton(button, isCorrect) {
    const currentButton = button.target;
    currentButton.disabled = true;

    if(isCorrect) {
        currentButton.style.backgroundColor = "green";
    }
    else {
        currentButton.style.backgroundColor = "red";
    }
}

export function handleGameClick(clickedButton, letters) {
    if(isLetterMatching(clickedButton, letters)) {
        updateClickedButton(clickedButton, true);
        return true;
    }
    else {
        updateClickedButton(clickedButton, false)
        return false;
    }
}

export function isCanvasButtonClicked(canvas, rectElement, event) {
        const boundary = canvas.getBoundingClientRect();
        const position = {
            x: event.clientX - boundary.left,
            y: event.clientY - boundary.top
        }

        return (position.x > rectElement.x && position.x < rectElement.x + rectElement.width) && (position.y > rectElement.y && position.y < rectElement.y + rectElement.height);
}

export function checkGameStatus(gameInfo, canvas, navLettersContainer) {
    let foundLetter = gameInfo.letterObjects.find(e => e.revealed === false);

    if(foundLetter === undefined && gameInfo.turn <= gameInfo.maxTurns) {
        gameComplete(canvas, true, gameInfo.secretWord, navLettersContainer);
        return 1;
    }
    else if(foundLetter !== undefined && gameInfo.turn >= gameInfo.maxTurns) {
        gameComplete(canvas, false, gameInfo.secretWord, navLettersContainer);
        return 2;
    }
    else {
        startOverButton(canvas, {x: canvas.width - 180, y: canvas.height - 80, width: 150, height: 50, text: "Nytt spill", fillColor: "yellow"});
        return 3;
    }
}

export function gameComplete(canvas, hasWon, secretWord, navLettersContainer) {
    const ctx = canvas.getContext("2d");
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;

    const heading = hasWon === true ? "Gratulerer, du vant!" : "GAME OVER";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "600 40px Arial";
    ctx.fillText(heading, canvas.width / 2, 200);
    ctx.font = "400 25px Arial";
    ctx.fillText("Hemmelig ord var: ", canvas.width / 2, 280);
    ctx.font = "600 30px Arial";
    ctx.cursor = "pointer";
    ctx.fillText(secretWord, canvas.width / 2, 320);

    startOverButton(canvas, {x: canvas.width / 2 - (150 / 2), y: canvas.height - 100, width: 150, height: 50, text: "Nytt spill", fillColor: "yellow"});

    navLettersContainer.querySelectorAll("li").forEach(e => {
        e.firstChild.disabled = true;
    })

}
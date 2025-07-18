export function resizeCanvas(canvas) {
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
    let wordSize = positionX;

    for (let i = 0; i < letters.length; i++) {

        if (letters[i].letter !== ' ' || i >= letters.length) {
            wordSize += spacing + (letters[i].reavealed === true ? ctx.measureText(letters[i].letter).width : pathLength);
            tempWord.push(letters[i]);
        }

        // Adds a newline if word is colliding with edge of canvas
        if (wordSize >= (canvas.width - canvas.width / 9)) {
            positionX = initPosX;
            positionY += 50;
            wordSize = positionX;
        }    

        // Render word on canvas
        if(letters[i].letter === ' ' || i >= (letters.length -1)) {
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
            // Clearing temporary word array
            tempWord = [];
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
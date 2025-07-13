// Draw each letter in the secret word
export function drawRevealedLetters(canvas, letters, fontSize, pathPosition = 10, pathOffset = 12) {

    const ctx = canvas.getContext("2d");
    ctx.font = fontSize;

    for (let i = 0; i < letters.length; i++) {
        if(letters[i].letter === ' ') {
            pathPosition += pathOffset
            continue;
        }

        if(letters[i].revealed) {
            ctx.fillText(letters[i].letter, pathPosition, 200);
        }

        ctx.beginPath();
        ctx.moveTo(pathPosition, 210);
        pathPosition += pathOffset;
        ctx.lineTo(pathPosition-2, 210);
        ctx.stroke();
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
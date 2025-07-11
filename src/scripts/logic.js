const canvas = document.getElementById("hangmanGame");
const ctx = canvas.getContext("2d");

// Draw each letter in the secret word
export function drawRevealedLetters(clickedButton, letters) {
    let pathPosition = 10;
    for (let i = 0; i < letters.length; i++) {
        
        if(letters[i].revealed) {
            letters[i].letter === ' ' ? 
            pathPosition += 12 : 
            ctx.fillText(letters[i].letter.toLowerCase(), pathPosition, 50);
        }
        ctx.beginPath();
        ctx.moveTo(pathPosition, 55);
        pathPosition += 12;
        ctx.lineTo(pathPosition-2, 55);
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
    }
    else {
        updateClickedButton(clickedButton, false)
    }
}
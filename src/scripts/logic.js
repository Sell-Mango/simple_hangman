const canvas = document.getElementById("hangmanGame");
const ctx = canvas.getContext("2d");

// Draw each letter in the secret word
export function drawRevealedLetters(letters, clickedButton) {
    let pathPosition = 10;
    for (let i = 0; i < letters.length; i++) {
        
        if(letters[i].revealed) {
            letters[i].letter === ' ' ? 
            pathPosition += 12 : 
            ctx.fillText(letters.find((element) => element.letter.toLowerCase() === clickedButton.value).letter, pathPosition, 50);
        }
        ctx.beginPath();
        ctx.moveTo(pathPosition, 55);
        pathPosition += 12;
        ctx.lineTo(pathPosition-2, 55);
        ctx.stroke();
    }
}

// Check if clicked button matches any letter in secret word
export function checkMathcingLetter(letters, clickedButton) {

    if(letters.find(element => element.letter.toLowerCase() == clickedButton.value)) {
        return true;
    }
    else {
        return false;
    }

    const matchedLetter = letters.find(element => element.letter.toLowerCase() == clickedButton.value);
    console.log(matchedLetter)
    if (matchedLetter !== undefined) {
        matchedLetter.revealed = true;

        drawRevealedLetters(letters, clickedButton);

        clickedButton.style.backgroundColor = "green"
        clickedButton.disabled = true;
    }
    else {
            clickedButton.style.backgroundColor = "red"
            clickedButton.disabled = true;
    }
    
    /*letters.forEach((obj, index) => {
        console.log(clickedButton)
        if (obj.letter.toLowerCase() === clickedButton.value) {
            obj.revealed = true;
            
            drawLetters(letters, clickedButton)   
    
            clickedButton.style.backgroundColor = "red"
            clickedButton.disabled = true;
        }
        else if(obj.letter.toLowerCase() !== clickedButton.value) {
            clickedButton.style.backgroundColor = "green"
            clickedButton.disabled = true;
        }
    }); */
}

function updateClickedButton(isCorrect, button) {
    button.disabled = true;

    if(isCorrect) {
        button.style.backgroundColor = "green";
    }
    else {
        button.style.backgroundColor = "red";
    }
}



export function handleGameClick(clickedButton) {
    if(checkMathcingLetter(letterObjects, button)) {
        updateClickedButton(true, clickedButton);
    }

    updateClickedButton(false, clickedButton);
    drawRevealedLetters(letters, clickedButton);
}
let allLetters = [];


// SETUP CANVAS
export function resizeCanvas(canvas, parentElement) {
    canvas.width = 500;
    canvas.height = 400;
}

// Generate all lowercase letters from a to å
function generateLetters() {
    for (let i = "a".charCodeAt(0); i <= "z".charCodeAt(0); i++) {
        allLetters.push(String.fromCharCode(i));
    }

    allLetters.push('æ');
    allLetters.push('ø');
    allLetters.push('å');
}

// Generate html for each letter button
function renderButtons() {
    let lettersOut = "";
    for (let i = 0; i < allLetters.length; i++) {
        const letterBtn = `
        <li class="letterButton">
            <button value="${allLetters[i]}">${allLetters[i].toUpperCase()}</button>
        </li>`
        lettersOut += letterBtn;
    }
    return lettersOut;
}



export function renderLetterButtons() {

    generateLetters();
    return renderButtons();
}
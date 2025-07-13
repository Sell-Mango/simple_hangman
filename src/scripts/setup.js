// SETUP CANVAS

export function resizeCanvas(canvas, parentElement) {
    const ctx = canvas.getContext("2d");
    canvas.width = parentElement.offsetWidth;
    canvas.height = 500;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
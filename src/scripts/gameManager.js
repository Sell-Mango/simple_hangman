export default class GameManager {

    difficultyLevel;
    secretWord;

    constructor(canvas) {
        this.canvas = canvas;
    }


    constructor(canvas, difficultyLevel, secretWord) {
        this.canvas = canvas;
        this.difficultyLevel = difficultyLevel;
        this.secretWord = secretWord;
    }

    resizeCanvas(canvas) {
        const parentElement = canvas.parentElement;
        const ctx = canvas.getContext("2d");
        canvas.width = parentElement.offsetWidth;
        canvas.height = 500;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    isCanvasButtonClicked(canvas, rectElement, event) {
        const boundary = canvas.getBoundingClientRect();
        const position = {
            x: event.clientX - boundary.left,
            y: event.clientY - boundary.top
        }

        return (position.x > rectElement.x && position.x < rectElement.x + rectElement.width) && (position.y > rectElement.y && position.y < rectElement.y + rectElement.height);
    }

    chooseDifficulty(canvas) {
        this.resizeCanvas(canvas);
    
        // drawOptionButton(canvas, easyButton, "20px Arial");

        this.difficultyLevel = 1;
    
    }

}
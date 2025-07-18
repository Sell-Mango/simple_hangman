export function drawHangman(canvas, turn = 1) {

    function startDraw() {
        ctx.moveTo(50, 350);
        ctx.lineTo(200, 350);
        ctx.moveTo(125, 350);
        ctx.lineTo(125, 100);
        ctx.stroke();
    }

    // EASY DIFFICULTY
    function turnOne() {
        ctx.moveTo(125, 100);
        ctx.lineTo(270, 100);
        ctx.stroke();
    }

    function turnTwo() {
        ctx.moveTo(180, 100);
        ctx.lineTo(125, 150);
        ctx.stroke();
    }

    // MEDIUM DIFFICULTY
    function turnThree() {
        ctx.moveTo(270, 100);
        ctx.lineTo(270, 130);
        ctx.stroke();
    }

    function drawHead() {
        ctx.moveTo(270, 140);
        ctx.arc(270, 140, 20, 0, 2 * Math.PI);
        ctx.fill();
    }

    // HARD DIFFICULTY
    function drawBody() {
        ctx.moveTo(270, 150);
        ctx.lineTo(270, 230);
        ctx.stroke();
    }

    function drawLeftLeg() {
        ctx.moveTo(270, 230);
        ctx.lineTo(240, 280);
        ctx.stroke();
    }

    function drawRightLeg() {
        ctx.moveTo(270, 230);
        ctx.lineTo(300, 280);
        ctx.stroke();
    }

    function drawLeftArm() {
        ctx.moveTo(270, 180);
        ctx.lineTo(240, 210);
        ctx.stroke();
    }

    function drawRightArm() {
        ctx.moveTo(270, 180);
        ctx.lineTo(300, 210);
        ctx.stroke();
    }
    
    const ctx = canvas.getContext("2d");
    const drawings = [startDraw, turnOne, turnTwo, turnThree, drawHead, drawBody, drawLeftLeg, drawRightLeg, drawLeftArm, drawRightArm];

    for (let i = 0; i <= turn; i++) {
        ctx.beginPath();
        drawings[i]();
    }
}

export function drawOptionButton(canvas, rect, fontStyle) {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = rect.fillColor;
    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    ctx.fillStyle = "black";
    ctx.font = fontStyle;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(rect.text, rect.x + rect.width / 2, rect.y + rect.height / 2);
}
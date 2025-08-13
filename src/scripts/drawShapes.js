export function drawHangman(canvas, turn = 1) {

    function startDraw() {
        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.moveTo(80, 350);
        ctx.lineTo(200, 350);
        ctx.moveTo(140, 350);
        ctx.lineTo(140, 100);
        ctx.stroke();
    }

    // EASY DIFFICULTY
    function turnOne() {
        ctx.moveTo(140, 100);
        ctx.lineTo(290, 100);
        ctx.stroke();
    }

    function turnTwo() {
        ctx.moveTo(200, 100);
        ctx.lineTo(140, 150);
        ctx.stroke();
    }

    // MEDIUM DIFFICULTY
    function turnThree() {
        ctx.moveTo(290, 100);
        ctx.lineTo(290, 130);
        ctx.stroke();
    }

    function drawHead() {
        ctx.moveTo(290, 140);
        ctx.arc(290, 140, 20, 0, 2 * Math.PI);
        ctx.fill();
    }

    // HARD DIFFICULTY
    function drawBody() {
        ctx.moveTo(290, 150);
        ctx.lineTo(290, 230);
        ctx.stroke();
    }

    function drawLeftLeg() {
        ctx.moveTo(290, 230);
        ctx.lineTo(250, 280);
        ctx.stroke();
    }

    function drawRightLeg() {
        ctx.moveTo(290, 230);
        ctx.lineTo(320, 280);
        ctx.stroke();
    }

    function drawLeftArm() {
        ctx.moveTo(290, 180);
        ctx.lineTo(260, 210);
        ctx.stroke();
    }

    function drawRightArm() {
        ctx.moveTo(290, 180);
        ctx.lineTo(320, 210);
        ctx.stroke();
    }
    
    const ctx = canvas.getContext("2d");
    const drawings = [startDraw, turnOne, turnTwo, turnThree, drawHead, drawBody, drawLeftLeg, drawRightLeg, drawLeftArm, drawRightArm];

    for (let i = 0; i <= turn; i++) {
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
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
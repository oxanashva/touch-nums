let gNums = [];
let gBoardSize = 16;
let gNextNum = 1;
let gIsGameOn = false;
let gGameTime = 0;
let gInterval = 1000;
let gTimerInterval;
const boardContainer = document.querySelector('.board-container');

function onInit() {
    gNums = fillNums(gBoardSize);
    renderBoard(gBoardSize);
}

function renderBoard(size) {
    shuffle(gNums);
    
    boardContainer.innerHTML = '';
    boardContainer.innerHTML = '<table class="board"></table>';
    const elBoard = boardContainer.querySelector(".board");
    let strHTML = "";
    for (let i = 0; i < Math.sqrt(size); i++) {
        strHTML += '<tr>'
        for (let j = 0; j < Math.sqrt(size); j++) {
            strHTML += `<td><button class="board-btn" onclick="onCellBtnClick(this)"></button></td>`;
        }
        strHTML+= "</tr>";
    }
    elBoard.innerHTML = strHTML;

    const elBoardBtns = elBoard.querySelectorAll('.board-btn');
    for (let i = 0; i < elBoardBtns.length; i++) {
        elBoardBtns[i].innerHTML = gNums[i];
    }
}

function fillNums(size) {
    let nums = Array.from({length: size}, (_, i) => i + 1)
    return nums;
}

function onStartGame() {
    gIsGameOn = false;
    gNextNum = 1;
    gGameTime = 0;
    endTimer();
    onInit();
    showNextNum(gNextNum);
}

function onCellBtnClick(cellBtn) {  
    if (!gIsGameOn && gNextNum === 1) {
        startTimer();
        showNextNum(gNextNum);
    }  
    if (Number(cellBtn.innerText) === gNextNum) {
        gNextNum++;
        cellBtn.classList.add('disabled');
        if (gNextNum > gBoardSize) {
            gIsGameOn = true;
        }
    }
    renderGameOff(gIsGameOn);
    showNextNum(gNextNum);  
    return;
}

function renderGameOff(isGameOn) {
    if (isGameOn) {
        boardContainer.innerHTML = `<div>
            <img src="img/trophy.png" />
            <p>Congrats! You Won!</p>
        </div>`;
        endTimer();
        gNextNum = null;
    }
}

function startTimer() {
    endTimer();
    gTimerInterval = setInterval(() => {
        gGameTime++;
        showGameTime();
    }, gInterval) 
}

function endTimer() {
    clearInterval(gTimerInterval);
}

function showGameTime() {
    const elGameTime = document.querySelector('#gameTime');
    elGameTime.innerText = `${secondsToMMSS(gGameTime)}`;
}

function showNextNum(nextNum) {
    const elNextNumber = document.querySelector('#nextNumber');    
    elNextNumber.innerText = nextNum;
}

function onSetLevel(level) {
    gBoardSize = level;
    gIsGameOn = false;
    gNextNum = 1;
    gGameTime = 0;
    endTimer();
    showGameTime()
    showNextNum(gNextNum);
    onInit();
}
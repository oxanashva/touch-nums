const gGame = {
    numbers: [],
    boardSize: 16,
    gameTime: 0,
    nextNumber: 1,
    isGameActive: false,
    timerInterval: null,
}

const elBoardContainer = document.querySelector('.board-container');
const elGameTime = document.querySelector('#gameTime');
const elNextNumber = document.querySelector('#nextNumber');

function onInit() {
    gGame.numbers = generateNumbers(gGame.boardSize);
    renderGameBoard(gGame.boardSize, gGame.numbers);
    displayGameTime(gGame.gameTime);
    displayNextNumber(gGame.nextNumber);
}

function generateNumbers(size) {
    return Array.from({length: size}, (_, i) => i + 1)
}

function renderGameBoard(size, numbers) {
    const shuffledNumbers = shuffle([...numbers]);
    const boardDimension = Math.sqrt(size);
    elBoardContainer.innerHTML = '';
    elBoardContainer.innerHTML = '<table class="board"></table>';
    const elBoard = elBoardContainer.querySelector(".board");
    let strHTML = "";
    for (let i = 0; i < boardDimension; i++) {
        strHTML += '<tr>'
        for (let j = 0; j < boardDimension; j++) {
            const num = shuffledNumbers[i * boardDimension + j]
            strHTML += `<td><button class="board-btn" onclick="onCellClick(this, ${num})">${num}</button></td>`;
        }
        strHTML+= "</tr>";
    }
    elBoard.innerHTML = strHTML;
}

function displayGameTime(totalSeconds) {
    elGameTime.innerText = `${formatTime(totalSeconds)}`;
}

function displayNextNumber(nextNum) {
    elNextNumber.innerText = nextNum;
}

function onStartGame() {
  resetGame();
  onInit();
}

function onCellClick(clickedButton, clickedNumber) {  
    if (!gGame.isGameActive && gGame.nextNumber === 1) {
        startTimer();
    }  
    if (clickedNumber === gGame.nextNumber) {
        gGame.nextNumber++;
        clickedButton.classList.add('disabled');
        if (gGame.nextNumber > gGame.boardSize) {
            endGame();
            return;
        }
    }
    displayNextNumber(gGame.nextNumber);  
}

function endGame() {
    stopTimer();
    gGame.isGameActive = false;
    elBoardContainer.innerHTML = `
        <div>
            <img src="img/trophy.png" alt="Trophy" />
            <p>Congrats! You Won!</p>
        </div>
    `;
    displayNextNumber('Done!')
}

function startTimer() {
    stopTimer();
    gGame.timerInterval = setInterval(() => {
        gGame.gameTime++;
        displayGameTime(gGame.gameTime);
    }, 1000);
}

function stopTimer() {
    clearInterval(gGame.timerInterval);
    gGame.timerInterval = null;
}

function onSetLevel(level) {
    gGame.boardSize = level;
    resetGame();
    onInit();
}

function resetGame() {
    gGame.isGameActive = false;
    gGame.gameTime = 0;
    gGame.nextNumber = 1;
    stopTimer();
    displayGameTime(gGame.gameTime);
    displayNextNumber(gGame.nextNumber);
}
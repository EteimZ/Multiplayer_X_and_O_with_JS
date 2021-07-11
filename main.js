
const statusDisplay = document.querySelector('.game--status');

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


const cells = document.getElementsByClassName('cell');

function handleCellPlayed(clickedCell, clickedCellIndex) {

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
    


function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        statusDisplay.style.display = "block";
        statusDisplay.style.color = "blue";
        console.log(cells[0])
        cells[a].style.background = "#0d8b70";
        cells[a].style.color = "white";
        cells[b].style.background = "#0d8b70";
        cells[b].style.color = "white";
        cells[c].style.background = "#0d8b70";
        cells[c].style.color = "white";  
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}



function handleCellClick(clickedCellEvent) {
   
    
    const clickedCell = clickedCellEvent.target;
    
    
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
   
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
    
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

function showWinner(x, y, z) {
    boxes[x].style.background = "#0d8b70";
    boxes[x].style.color = "white";
    boxes[y].style.background = "#0d8b70";
    boxes[y].style.color = "white";
    boxes[z].style.background = "#0d8b70";
    boxes[z].style.color = "white";
    document.getElementById("winner").innerHTML =
      currentPlayer == "x" ? "O" : "X";
    document.getElementById("message").style.display = "block";
    gameStatus = "Game Over";
  }


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

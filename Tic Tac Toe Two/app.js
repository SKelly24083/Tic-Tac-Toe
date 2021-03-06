const statusDisplay = document.querySelector(".game-status");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
let gameActive = true;
let currentPlayer = "X";

let gameState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const drawMessage = () => `Game is a draw!`;

const currentPlayerTurn = () => {
  let playerName = currentPlayer === "X" ? player1.value : player2.value;
  return `It's ${playerName}'s turn`;
};

const winningMessage = () => {
  let playerName = currentPlayer === "X" ? player1.value : player2.value;
  return ` ${playerName} has won!`;
};

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));

document
  .querySelector(".game-restart")
  .addEventListener("click", handleRestartGame);

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  console.log(clickedCell);
  const clickedCellIndex = clickedCell.id;
  if (
    gameState[clickedCellIndex[0]][clickedCellIndex[1]] !== "" ||
    !gameActive
  ) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}
function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex[0]][clickedCellIndex[1]] = currentPlayer;
  clickedCell.innerHTML = currentPlayer;
}

const winningConditions = [
  ["00", "01", "02"],
  ["10", "11", "12"],
  ["20", "21", "22"],
  ["00", "10", "20"],
  ["01", "11", "21"],
  ["02", "12", "22"],
  ["00", "11", "22"],
  ["20", "11", "02"],
];
function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i < 8; i++) {
    const winCondition = winningConditions[i];
    let a = document.getElementById(winCondition[0]).innerText;
    let b = document.getElementById(winCondition[1]).innerText;
    let c = document.getElementById(winCondition[2]).innerText;
    console.log("winConditions", a, b, c);
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = true;
  gameState.forEach((row) => {
    if (row[0] === "" || row[1] === "" || row[2] === "") {
      roundDraw = false;
    }
  });
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}
function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}
function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  gameState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}

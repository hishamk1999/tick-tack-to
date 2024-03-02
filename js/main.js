/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let boardState = [],
  playerTurn,
  winner,
  tie;

/*------------------------ Cached Element References ------------------------*/
const messageElement = document.getElementById("message"),
  squaresElement = document.querySelectorAll(".squares"),
  resetBtn = document.getElementById("reset-btn");

/*----------------------------- Event Listeners -----------------------------*/
squaresElement.forEach((ele) => {
  ele.addEventListener("click", handleClick);
});

resetBtn.addEventListener("click", init);

/*-------------------------------- Functions --------------------------------*/
init();

/**
 *
 * @date 2/27/2024 - 11:12:08 PM
 */
function init() {
  boardState = [null, null, null, null, null, null, null, null, null];
  playerTurn = 1; // represents player x.
  winner = false;
  tie = false;

  render();
}

/**
 * The function `updateBoard` updates the game board based on the current state stored in the
 * `boardState` array.
 * @date 2/27/2024 - 11:19:19 PM
 */
function updateBoard() {
  if (!Array.isArray(boardState)) {
    throw new Error("Oops, Board state is not an array💥!");
  }

  boardState.forEach((element, index) => {
    let value = typeof element === "string" ? Number(element) : element;

    switch (value) {
      case 1:
        squaresElement[index].textContent = "x";
        break;
      case -1:
        squaresElement[index].textContent = "o";
        break;
      default:
        squaresElement[index].textContent = " ";
        break;
    }
  });
}

/**
 *
 * @date 2/27/2024 - 11:18:12 PM
 */
function render() {
  updateBoard();
  updateMessage();
}

/**
 * @date 3/2/2024 - 3:32:34 PM
 *
 * @param {*} event
 */
function handleClick(event) {
  const sqIndex = parseInt(event.target.id[2]);
  if (boardState[sqIndex] || winner) return;

  placePiece(sqIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

/**
 * @date 3/2/2024 - 4:14:34 PM
 *
 * @param {*} index
 */
function placePiece(index) {
  boardState[index] = playerTurn;
}

/**
 * @date 3/2/2024 - 4:17:27 PM
 */
function checkForTie() {
  if (boardState.includes(null)) {
    return;
  } else {
    tie = true;
  }
}

/**
 * @date 3/2/2024 - 4:18:06 PM
 */
function checkForWinner() {
  winningCombos.forEach((combo) => {
    if (
      Math.abs(
        boardState[combo[0]] + boardState[combo[1]] + boardState[combo[2]]
      ) === 3
    ) {
      winner = true;
    }
  });
}

/**
 * @date 3/2/2024 - 4:39:12 PM
 */
function switchPlayerTurn() {
  if (!winner) {
    playerTurn *= -1;
  }
}

/**
 *
 * @date 2/28/2024 - 12:03:37 AM
 */
function reset() {
  init();
}

/**
 *
 * @date 2/28/2024 - 12:03:08 AM
 */
function updateMessage() {
  const player = playerTurn === 1 ? "X" : "O";

  if (!winner && !tie) {
    messageElement.textContent = `It's ${player}'s turn`;
  } else if (!winner && tie) {
    messageElement.textContent = `It's a cat's came. 🐈🐈🐈 MEOW!!`;
  } else {
    messageElement.textContent = `${player} wins! `;
  }
}

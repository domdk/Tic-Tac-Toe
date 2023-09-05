/* Attribution: Bro Code on Youtube. Link to Video: https://www.youtube.com/watch?v=AnmwHjpEhtA */
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const strike = document.querySelector("#strike"); //strike line




const restartButton = document.querySelector("#restartButton");
const winConditions = [
    { combo: [0, 1, 2], strikeClass: "strike-row-1" },
    { combo: [3, 4, 5], strikeClass: "strike-row-2" },
    { combo: [6, 7, 8], strikeClass: "strike-row-3" },
    { combo: [0, 3, 6], strikeClass: "strike-column-1" },
    { combo: [1, 4, 7], strikeClass: "strike-column-2" },
    { combo: [2, 5, 8], strikeClass: "strike-column-3" },
    { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
    { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

//Sounds
const gameOverSound = new Audio("sounds/game_over.wav");
const clickSound = new Audio("sounds/click.wav");
const drawSound = new Audio("sounds/draw.wav");



function initilizeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);

    statusText.textContent = `Player ${currentPlayer}'s turn`;
    running = true;
}

function cellClicked() {

    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) {
        return;

    }
    clickSound.play();
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for (const winCondition of winConditions) {
        const { combo, strikeClass } = winCondition;
        const cellA = options[combo[0]];
        const cellB = options[combo[1]];
        const cellC = options[combo[2]];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            strike.classList.add(strikeClass);
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} Wins!`;
        statusText.style.backgroundColor = "green";
        gameOverSound.play();
        running = false;
    }
    else if (!options.includes("")) {
        statusText.textContent = `Draw!`;
        statusText.style.backgroundColor = "orange";
        drawSound.play();
        running = false;
    }
    else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    strike.className = "strike";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    statusText.style.backgroundColor = "";

    running = true;

}

initilizeGame();



// function toggleMute() {
//     gameOverSound.muted = !gameOverSound.muted;
//     clickSound.muted = !clickSound.muted;
//     drawSound.muted = !drawSound.muted;
// }

// muteBtn.addEventListener("click", toggleMute());



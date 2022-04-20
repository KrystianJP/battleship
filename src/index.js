import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import "../styles/style.css";

// global variables
const gameGrids = document.querySelectorAll(".battleship-grid");
const [humanGrid, computerGrid] = gameGrids;
const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");
const hitMark = document.createElement("div");
hitMark.textContent = "X";
hitMark.classList.add("hitmark", "hidden");
gridCell.appendChild(hitMark);
let humanGameboard = new Gameboard();
let computerGameboard = new Gameboard();
let human = new Player(true, humanGameboard);
let computer = new Player(false, computerGameboard);
let playing = true;

// initial styling
function gridCreation() {
  gameGrids.forEach((gameGrid) => {
    gameGrid.style["grid-template-rows"] = `repeat(10, auto)`;
    gameGrid.style["grid-template-columns"] = `repeat(10, auto)`;
    // entering all grid items
    insertGridCells(10, 10, gameGrid, gridCell);
  });
  cellEventListeners(computerGrid);
}

// rows, cols : int,
// grid, cell : DOM elements
function insertGridCells(rows, cols, grid, cell) {
  for (let i = 0; i < rows * cols; i++) {
    grid.appendChild(cell.cloneNode(true));
  }
}

function cellEventListeners(grid) {
  grid.childNodes.forEach((node) => {
    node.addEventListener("click", function () {
      let gridNr = Array.prototype.indexOf.call(grid.children, node);
      humanPlays(grid, gridNr);
    });
  });
}

// *** THIS IS WHERE THE TURNS HAPPEN
function humanPlays(grid, gridNr) {
  Gameboard.markHit(grid, gridNr);
  human.attack(computer, Gameboard.findPositionFromGridNr(gridNr, 10));
  // check if human has won
  if (checkWin()) {
    // later reset

    return;
  }
  computerPlays();
}

// computer's turn
function computerPlays() {
  let attackPosition = computer.attack(human);
  let rowValue = Gameboard.getRowValue(attackPosition);
  let colValue = Gameboard.getColValue(attackPosition);
  let gridNr = Gameboard.findGridNr(10, rowValue, colValue);
  Gameboard.markHit(humanGrid, gridNr);
  if (checkWin()) {
    // later reset
    return;
  }
}

function checkWin() {
  if (humanGameboard.allSunk()) {
    winMessage("computer");
    playing = false;
    return true;
  } else if (computerGameboard.allSunk()) {
    winMessage("human");
    playing = false;
    return true;
  }
  return false;
}

function winMessage(winner) {
  alert(winner + " won");
}

// *** FOR LATER
function reset() {}

// *** DELETE ONCE CUSTOM METHODS CREATED
function placeInitialBoats() {
  let destroyer = new Ship(["2:2", "3:2"]);
  let cruiser = new Ship(["5:2", "5:3", "5:4"]);
  humanGameboard.place(destroyer);
  humanGameboard.placeInGrid(humanGrid, destroyer);
  humanGameboard.place(cruiser);
  humanGameboard.placeInGrid(humanGrid, cruiser);

  let destroyer2 = new Ship(["2:2", "3:2"]);
  let cruiser2 = new Ship(["5:2", "5:3", "5:4"]);
  computerGameboard.place(destroyer2);
  computerGameboard.placeInGrid(computerGrid, destroyer2);
  computerGameboard.place(cruiser);
  computerGameboard.placeInGrid(computerGrid, cruiser2);
}

gridCreation();
placeInitialBoats();

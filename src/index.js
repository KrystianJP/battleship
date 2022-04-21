import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import "../styles/style.css";

// global variables
const gameGrids = document.querySelectorAll(".battleship-grid");
const [humanGrid, computerGrid] = gameGrids;
const shipSelection = document.querySelector(".ship-selection");
const resetButt = document.querySelector(".reset");

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
let playing = false;

let selection = true;
let shipSelected = false;
let selectedSize;
let direction = "col";
let selectionValid = false;

// event listeners
function cellEventListeners(grid) {
  grid.querySelectorAll(".grid-cell").forEach((node) => {
    node.addEventListener("click", function () {
      if (playing) {
        let gridNr = Array.prototype.indexOf.call(grid.children, node);
        humanPlays(grid, gridNr);
      }
    });
  });
}

resetButt.addEventListener("click", function () {
  if (selection) {
    rotate(shipSelection, ".selection-ship");
  }
});

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

// *** THIS IS WHERE THE TURNS HAPPEN
function humanPlays(grid, gridNr) {
  Gameboard.markHit(grid, gridNr);
  human.attack(computer, Gameboard.findPositionFromGridNr(gridNr, 10));
  // check if human has won
  if (checkWin()) {
    // later reset
    playing = false;
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
    playing = false;
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
  // create modal
  alert(winner + " won");
}

// *** FOR LATER
function reset() {}

// rotate button
// TEMPORARY VERSION
function rotate(parent, shipSelector) {
  switch (direction) {
    case "col":
      direction = "row";
      break;
    case "row":
      direction = "col";
      break;
  }

  parent.querySelectorAll(shipSelector).forEach((ship) => {
    let width = ship.offsetWidth;
    let height = ship.offsetHeight;
    ship.style.width = String(height) + "px";
    ship.style.height = String(width) + "px";
  });
}

// *** DELETE ONCE CUSTOM METHODS CREATED
function placeInitialBoats() {
  let patrolBoat = new Ship(["2:2", "2:3"], "P");
  let submarine = new Ship(["4:4", "4:5", "4:6"], "S");
  humanGameboard.place(humanGrid, patrolBoat);
  humanGameboard.place(humanGrid, submarine);

  let patrolBoatC = new Ship(["1:2", "1:3"], "P");
  let submarineC = new Ship(["3:2", "3:3", "3:4"], "S");
  computerGameboard.place(computerGrid, patrolBoatC);
  computerGameboard.place(computerGrid, submarineC);
}

gridCreation();
placeInitialBoats();

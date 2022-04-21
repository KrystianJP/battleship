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
let shipLengths = {
  C: 5,
  B: 4,
  S: 3,
  D: 3,
  P: 2,
};

// event listeners
function cellShootListener(grid) {
  grid.querySelectorAll(".grid-cell").forEach((node) => {
    node.addEventListener("click", function () {
      if (playing) {
        let gridNr = Array.prototype.indexOf.call(grid.children, node);
        humanPlays(grid, gridNr);
      }
    });
  });
}

function cellHoverListener(grid) {
  for (let gridNr = 0; gridNr < 100; gridNr++) {
    let gridCells = grid.querySelectorAll(".grid-cell");
    let cell = gridCells[gridNr];
    // when hovering, highlight the correct cells
    cell.addEventListener("mouseover", () => {
      if (selection && shipSelected) {
        selectionValid = true;

        for (let i = 0; i < selectedSize; i++) {
          let startPosition = Gameboard.findPositionFromGridNr(gridNr, 10);
          let position = Gameboard.addToPosition(startPosition, direction, i);
          // making sure to flag position as invalid if it is too close to other ships too
          if (position) {
            if (!humanGameboard.checkValidPosition(position)) {
              position = false;
            }
          }
          if (position) {
            gridCells[
              Gameboard.findGridNrFromPosition(position, 10)
            ].classList.add("selected");
          } else {
            selectionValid = false;
            // highlight them all as invalid
            for (let i = 0; i < selectedSize; i++) {
              let startPosition = Gameboard.findPositionFromGridNr(gridNr, 10);
              let position = Gameboard.addToPosition(
                startPosition,
                direction,
                i,
              );
              if (position) {
                gridCells[
                  Gameboard.findGridNrFromPosition(position, 10)
                ].classList.add("selected-invalid");
              }
            }
          }
        }
      }
    });

    // when hovering off, get rid of all the changes
    cell.addEventListener("mouseout", () => {
      if (selection && shipSelected) {
        selectionValid = false;

        for (let i = 0; i < selectedSize; i++) {
          let startPosition = Gameboard.findPositionFromGridNr(gridNr, 10);
          let position = Gameboard.addToPosition(startPosition, direction, i);
          if (position) {
            gridCells[
              Gameboard.findGridNrFromPosition(position, 10)
            ].classList.remove("selected", "selected-invalid");
          }
        }
      }
    });
  }
}

resetButt.addEventListener("click", function () {
  if (selection) {
    rotate(shipSelection, ".selection-ship");
  }
});

shipSelection.querySelectorAll(".selection-ship").forEach((ship) => {
  ship.addEventListener("click", () => {
    if (selection) {
      let id = shipLengths[ship.id.substring(ship.id.length - 1)];
      if (selectedSize !== id) {
        selectShip(ship, shipSelection.querySelectorAll(".selection-ship"));
      } else {
        unselectShip(ship);
      }
    }
  });
});

// initial styling
function gridCreation() {
  gameGrids.forEach((gameGrid) => {
    gameGrid.style["grid-template-rows"] = `repeat(10, auto)`;
    gameGrid.style["grid-template-columns"] = `repeat(10, auto)`;
    // entering all grid items
    insertGridCells(10, 10, gameGrid, gridCell);
  });
  // adding initial cell event listeners
  // since they only exist once grid is created
  cellShootListener(computerGrid);
  cellHoverListener(humanGrid);
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
  // switching the direction
  switch (direction) {
    case "col":
      direction = "row";
      break;
    case "row":
      direction = "col";
      break;
  }

  // rotating all the ships
  parent.querySelectorAll(shipSelector).forEach((ship) => {
    let width = ship.offsetWidth;
    let height = ship.offsetHeight;
    ship.style.width = String(height) + "px";
    ship.style.height = String(width) + "px";
  });
}

function selectShip(selectedShip, ships) {
  // make sure the rest are unselected first
  ships.forEach((ship) => {
    unselectShip(ship);
  });

  let shipId = selectedShip.id.substring(selectedShip.id.length - 1);

  shipSelected = true;
  selectedSize = shipLengths[shipId];
  selectionValid = false;

  // add border to selected ship
  selectedShip.style.border = "2px solid red";
}

function unselectShip(ship) {
  shipSelected = false;
  selectedSize = 0;
  selectionValid = false;

  // add border to selected ship
  ship.style.border = "none";
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

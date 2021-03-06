import { Ship } from "./ship";
import { Gameboard } from "./gameboard";
import { Player } from "./player";
import "../styles/style.css";

// global variables
const gameGrids = document.querySelectorAll(".battleship-grid");
const [humanGrid, computerGrid] = gameGrids;
const shipSelection = document.querySelector(".ship-selection");
const multiButt = document.querySelector(".multi-button");
const randomButt = document.querySelector(".random-button");

const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");

let humanGameboard = new Gameboard();
let computerGameboard = new Gameboard();
let human = new Player(true, humanGameboard);
let computer = new Player(false, computerGameboard);
let playing = false;

let selection = true;
let isShipSelected = false;
let selectedId;
let direction = "col";
let selectionValid = false;
let placedShipIds = [];
let shipLengths = {
  C: 5,
  B: 4,
  D: 3,
  S: 3,
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

function hoverSelection(shipId, gridNr, gridCells) {
  for (let i = 0; i < shipLengths[shipId]; i++) {
    let startPosition = Gameboard.findPositionFromGridNr(gridNr, 10);
    let position = Gameboard.addToPosition(startPosition, direction, i);
    // making sure to flag position as invalid if it is too close to other ships too
    if (position) {
      if (!humanGameboard.checkValidPosition(position, humanGameboard.ships)) {
        position = false;
      }
    }
    if (position) {
      gridCells[Gameboard.findGridNrFromPosition(position, 10)].classList.add(
        "selected",
      );
    } else {
      selectionValid = false;
      // highlight them all as invalid
      for (let i = 0; i < shipLengths[selectedId]; i++) {
        let startPosition = Gameboard.findPositionFromGridNr(gridNr, 10);
        let position = Gameboard.addToPosition(startPosition, direction, i);
        if (position) {
          gridCells[
            Gameboard.findGridNrFromPosition(position, 10)
          ].classList.add("selected-invalid");
        }
      }
    }
  }
}

function cellGridListeners(grid) {
  for (let gridNr = 0; gridNr < 100; gridNr++) {
    let gridCells = grid.querySelectorAll(".grid-cell");
    let cell = gridCells[gridNr];
    // when hovering, highlight the correct cells
    cell.addEventListener("mouseover", () => {
      if (selection && isShipSelected) {
        selectionValid = true;
        hoverSelection(selectedId, gridNr, gridCells);
      }
    });

    // when hovering off, get rid of all the changes
    cell.addEventListener("mouseout", () => {
      if (selection && isShipSelected) {
        selectionValid = false;

        for (let i = 0; i < shipLengths[selectedId]; i++) {
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
    // removing placed ship when clicked
    cell.addEventListener("click", () => {
      if (!isShipSelected && selection) {
        let selectedShip;
        let position = Gameboard.findPositionFromGridNr(gridNr, 10);
        for (let ship of humanGameboard.ships) {
          if (ship.positions.includes(position)) {
            selectedShip = ship;
            break;
          }
        }

        if (selectedShip) {
          let shipElement = shipSelection.querySelector(
            "#selection" + selectedShip.id,
          );
          for (let selectedPos of selectedShip.positions) {
            let posGridNr = Gameboard.findGridNrFromPosition(selectedPos, 10);
            gridCells[posGridNr].classList.remove("selected");
          }
          humanGameboard.removeShip(grid, selectedShip.id);
          placedShipIds.splice(placedShipIds.indexOf(selectedShip.id), 1);
          selectShip(
            shipElement,
            shipSelection.querySelectorAll(".selection-ship"),
          );
          shipElement.classList.remove("greyed-out");
          hoverSelection(selectedShip.id, gridNr, gridCells);
          multiButt.textContent = "ROTATE";
        }
      }
    });

    // when clicking on the grid to place
    cell.addEventListener("click", () => {
      if (isShipSelected && selection && selectionValid) {
        let positions = [];
        let shipElement = shipSelection.querySelector(
          "#selection" + selectedId,
        );
        for (let i = 0; i < shipLengths[selectedId]; i++) {
          let startPosition = Gameboard.findPositionFromGridNr(gridNr, 10);
          let position = Gameboard.addToPosition(startPosition, direction, i);
          positions.push(position);
        }
        let ship = new Ship(positions, selectedId);
        humanGameboard.place(grid, ship);
        placedShipIds.push(selectedId);
        // grey it out
        unselectShip(shipElement);
        shipElement.classList.add("greyed-out");
        if (placedShipIds.length >= 5) {
          multiButt.textContent = "START";
        }
      }
    });
  }
}

multiButt.addEventListener("click", function () {
  if (multiButt.textContent === "START") {
    startGame();
  } else if (multiButt.textContent === "ROTATE") {
    rotate(shipSelection, ".selection-ship");
  } else if (multiButt.textContent === "RESET") {
    reset();
    multiButt.textContent = "ROTATE";
  }
});

shipSelection.addEventListener("click", function () {
  if (selection && isShipSelected) {
    unselectShip(shipSelection.querySelector("#selection" + selectedId));
  }
});

shipSelection.querySelectorAll(".selection-ship").forEach((ship) => {
  ship.addEventListener("click", (e) => {
    let id = ship.id.substring(ship.id.length - 1);
    if (selection && !placedShipIds.includes(id)) {
      if (selectedId !== id) {
        selectShip(ship, shipSelection.querySelectorAll(".selection-ship"));
      } else {
        unselectShip(ship);
      }
      e.stopPropagation();
    }
  });
});

randomButt.addEventListener("click", () => {
  reset();
  humanGameboard.generateRandomShips(human, humanGrid);
  placedShipIds = Object.keys(shipLengths);
  shipSelection.querySelectorAll(".selection-ship").forEach((ship) => {
    ship.classList.add("greyed-out");
  });
  multiButt.textContent = "START";
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
  cellGridListeners(humanGrid);
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
  if (
    computerGrid
      .querySelectorAll(".grid-cell")
      [gridNr].classList.contains("hit")
  ) {
    return;
  }
  Gameboard.markHit(grid, gridNr);
  human.humanAttack(computer, Gameboard.findPositionFromGridNr(gridNr, 10));

  // check if any ships are sunk
  sinkShips(grid, computerGameboard);
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
  let attackPosition = computer.computerAttack(human, humanGrid);
  let rowValue = Gameboard.getRowValue(attackPosition);
  let colValue = Gameboard.getColValue(attackPosition);
  let gridNr = Gameboard.findGridNr(10, rowValue, colValue);

  Gameboard.markHit(humanGrid, gridNr);
  sinkShips(humanGrid, humanGameboard);

  if (checkWin()) {
    // later reset
    playing = false;
    return;
  }
}

function sinkShips(grid, gameboard) {
  gameboard.ships.forEach((ship) => {
    if (ship.isSunk()) {
      ship.sink(grid);
      return true;
    }
    return false;
  });
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
function reset() {
  gameGrids.forEach((grid) => {
    grid.textContent = "";
  });
  gridCreation();
  shipSelection.querySelectorAll(".selection-ship").forEach((ship) => {
    ship.classList.remove("greyed-out");
  });
  humanGameboard.hitPositions = [];
  humanGameboard.ships = [];
  computerGameboard.hitPositions = [];
  computerGameboard.ships = [];
  selection = true;
  isShipSelected = false;
  selectedId;
  selectionValid = false;
  placedShipIds = [];
  playing = false;
  randomButt.style.display = "initial";
}

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

function selectShip(selectedShipElement, shipElements) {
  // make sure the rest are unselected first
  shipElements.forEach((ship) => {
    unselectShip(ship);
  });

  let shipId = selectedShipElement.id.substring(
    selectedShipElement.id.length - 1,
  );

  isShipSelected = true;
  selectedId = shipId;
  selectionValid = false;

  // add border to selected ship
  selectedShipElement.style.border = "2px solid red";
}

function unselectShip(ship) {
  isShipSelected = false;
  selectedId = "";
  selectionValid = false;

  // add border to selected ship
  ship.style.border = "none";
}

function startGame() {
  playing = true;
  selection = false;
  multiButt.textContent = "RESET";
  randomButt.style.display = "none";
  computerGameboard.generateRandomShips(computer, computerGrid);
}

gridCreation();

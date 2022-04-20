import * as shipFile from "./ship";
import * as gameboardFile from "./gameboard";
import * as playerFile from "./player";
import "../styles/style.css";

// DOM elements
const gameGrids = document.querySelectorAll(".battleship-grid");
const [humanGrid, computerGrid] = gameGrids;
const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");
const hitMark = document.createElement("div");
hitMark.textContent = "X";
hitMark.classList.add("hitmark", "hidden");
gridCell.appendChild(hitMark);

// initial styling
function gridCreation() {
  gameGrids.forEach((gameGrid) => {
    gameGrid.style["grid-template-rows"] = `repeat(10, auto)`;
    gameGrid.style["grid-template-columns"] = `repeat(10, auto)`;
    // entering all grid items
    insertGridCells(10, 10, gameGrid, gridCell);
  });
  indexEventListeners(computerGrid);
}

// rows, cols : int,
// grid, cell : DOM elements
function insertGridCells(rows, cols, grid, cell) {
  for (let i = 0; i < rows * cols; i++) {
    grid.appendChild(cell.cloneNode(true));
  }
}

function indexEventListeners(grid) {
  grid.childNodes.forEach((node) => {
    node.addEventListener("click", function () {
      // console.log(Array.prototype.indexOf.call(grid.children, node));
      // if (node.id) {
      //   console.log(node.id);
      // }
      gameboardFile.Gameboard.markHit(
        grid,
        Array.prototype.indexOf.call(grid.children, node),
      );
    });
  });
}

// *** DELETE ONCE CUSTOM METHODS CREATED
function placeInitialBoats() {
  let humanGameboard = new gameboardFile.Gameboard();
  let destroyer = new shipFile.Ship(["2:2", "3:2"]);
  let cruiser = new shipFile.Ship(["5:2", "5:3", "5:4"]);
  humanGameboard.place(destroyer);
  humanGameboard.placeInGrid(humanGrid, destroyer);
  humanGameboard.place(cruiser);
  humanGameboard.placeInGrid(humanGrid, cruiser);

  let computerGameboard = new gameboardFile.Gameboard();
  let destroyer2 = new shipFile.Ship(["2:2", "3:2"]);
  let cruiser2 = new shipFile.Ship(["5:2", "5:3", "5:4"]);
  computerGameboard.place(destroyer2);
  computerGameboard.placeInGrid(computerGrid, destroyer2);
  computerGameboard.place(cruiser);
  computerGameboard.placeInGrid(computerGrid, cruiser2);
}

gridCreation();
placeInitialBoats();

let running = true;
let humanTurn = true;
while (running) {}

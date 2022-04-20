import * as shipFile from "./ship";
import * as gameboardFile from "./gameboard";
import * as playerFile from "./player";
import "../styles/style.css";

// DOM elements
const gameGrids = document.querySelectorAll(".battleship-grid");
const [humanGrid, computerGrid] = gameGrids;
const gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");

// initial styling
function gridCreation() {
  gameGrids.forEach((gameGrid) => {
    gameGrid.style["grid-template-rows"] = `repeat(10, auto)`;
    gameGrid.style["grid-template-columns"] = `repeat(10, auto)`;
    // entering all grid items
    insertGridCells(10, 10, gameGrid, gridCell);
    indexEventListeners(gameGrid);
  });
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
      console.log(Array.prototype.indexOf.call(grid.children, node));
    });
  });
}

gridCreation();

let gameboard = new gameboardFile.Gameboard();
let ship1 = new shipFile.Ship(["2:1", "2:2", "2:3", "2:4"]);

gameboard.placeInGrid(humanGrid, ship1.positions);

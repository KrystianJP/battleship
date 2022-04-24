/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

// 10x10 x:A-J y: 1-10
var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    _classCallCheck(this, Gameboard);

    this.hitPositions = [];
    this.ships = [];
  }

  _createClass(Gameboard, [{
    key: "placeLogically",
    value: function placeLogically(ship) {
      if (this.checkValidShipPosition(ship)) {
        this.ships.push(ship);
        return true;
      }

      return false;
    }
  }, {
    key: "place",
    value: function place(grid, ship) {
      if (this.placeLogically(ship)) {
        this.placeInGrid(grid, ship);
        return true;
      }

      return false;
    }
  }, {
    key: "_minRowValue",
    value: function _minRowValue(ship) {
      var minimum = ship.positions.reduce(function (stored, placedPos) {
        if (Gameboard.getRowValue(placedPos) < stored) {
          return Gameboard.getRowValue(placedPos);
        }

        return stored;
      }, Infinity);
      return minimum;
    }
  }, {
    key: "_minColValue",
    value: function _minColValue(ship) {
      return ship.positions.reduce(function (stored, placedPos) {
        if (Gameboard.getColValue(placedPos) < stored) {
          return Gameboard.getColValue(placedPos);
        }

        return stored;
      }, Infinity);
    }
  }, {
    key: "_maxRowValue",
    value: function _maxRowValue(ship) {
      return ship.positions.reduce(function (stored, placedPos) {
        if (Gameboard.getRowValue(placedPos) > stored) {
          return Gameboard.getRowValue(placedPos);
        }

        return stored;
      }, -Infinity);
    }
  }, {
    key: "_maxColValue",
    value: function _maxColValue(ship) {
      return ship.positions.reduce(function (stored, placedPos) {
        if (Gameboard.getColValue(placedPos) > stored) {
          return Gameboard.getColValue(placedPos);
        }

        return stored;
      }, -Infinity);
    } // direction = "row" / "col"
    // pos = "row:col"

  }, {
    key: "checkValidShipPosition",
    value: // checks if ship's position is valid by checking it is near or overlapping existing ship
    function checkValidShipPosition(newShip) {
      var _this = this;

      // gives true if a single value is invalid, so must be inverted
      return !newShip.positions.some(function (newPos) {
        return !_this.checkValidPosition(newPos, _this.ships);
      });
    }
  }, {
    key: "checkValidPosition",
    value: function checkValidPosition(pos, ships) {
      var _this2 = this;

      var newRowValue = Gameboard.getRowValue(pos);
      var newColValue = Gameboard.getColValue(pos); // get min + max value of row and col for each ship and check if the new position values are within them +-1
      // if a single value is INVALID, return TRUE

      return !ships.some(function (placedShip) {
        var minRowValue = _this2._minRowValue(placedShip);

        var maxRowValue = _this2._maxRowValue(placedShip);

        var minColValue = _this2._minColValue(placedShip);

        var maxColValue = _this2._maxColValue(placedShip);

        if (newRowValue >= minRowValue - 1 && newRowValue <= maxRowValue + 1 && newColValue >= minColValue - 1 && newColValue <= maxColValue + 1) {
          // INVALID THEREFORE TRUE
          return true;
        }

        return false;
      });
    } // will check if valid position and send the hit, the ship will then check if it is hit

  }, {
    key: "receiveAttack",
    value: function receiveAttack(pos) {
      if (!this.hitPositions.includes(pos)) {
        this.hitPositions.push(pos);

        for (var i = 0; i < this.ships.length; i++) {
          if (this.ships[i].hit(pos)) {
            break;
          }
        }

        return true;
      }

      return false;
    }
  }, {
    key: "allSunk",
    value: function allSunk() {
      if (this.ships.every(function (ship) {
        return ship.isSunk();
      })) {
        return true;
      }

      return false;
    }
  }, {
    key: "placeInGrid",
    value: // DOM manipulation
    // placing the ship visually on given grid
    function placeInGrid(grid, ship) {
      var shipLength = ship.positions.length;
      ship.positions.forEach(function (pos) {
        var gridNr = Gameboard.findGridNr(10, Gameboard.getRowValue(pos), Gameboard.getColValue(pos));
        var gridNode = grid.children[gridNr];
        gridNode.classList.add("ship");
        gridNode.setAttribute("id", "ship" + String(ship.id));
      });
    }
  }, {
    key: "removeShipLogically",
    value: function removeShipLogically(id) {
      var _this3 = this;

      this.ships.some(function (ship) {
        if (ship.id === id) {
          _this3.ships.splice(_this3.ships.indexOf(ship), 1);

          return true;
        }

        return false;
      });
    }
  }, {
    key: "removeShipFromGrid",
    value: function removeShipFromGrid(grid, id) {
      grid.querySelectorAll(".grid-cell").forEach(function (cell) {
        if (cell.id.substring(4) === id) {
          cell.classList.remove("ship");
          return true;
        }

        return false;
      });
    }
  }, {
    key: "removeShip",
    value: function removeShip(grid, id) {
      this.removeShipLogically(id);
      this.removeShipFromGrid(grid, id);
    }
  }, {
    key: "generateRandomShips",
    value: function generateRandomShips(player, grid) {
      for (var _i = 0, _arr = [["C", 5], ["B", 4], ["D", 3], ["S", 3], ["P", 2]]; _i < _arr.length; _i++) {
        var shipType = _arr[_i];

        while (true) {
          var ship = player.randomShipPosition(shipType[1], shipType[0]); // ship object / false

          if (ship) {
            this.place(grid, ship);
            break;
          }
        }
      }
    }
  }], [{
    key: "getRowValue",
    value: function getRowValue(pos) {
      return Number(pos.substring(0, pos.indexOf(":")));
    }
  }, {
    key: "getColValue",
    value: function getColValue(pos) {
      return Number(pos.substring(pos.indexOf(":") + 1));
    }
  }, {
    key: "addToPosition",
    value: function addToPosition(pos, direction, val) {
      if (direction === "row") {
        // getting first number
        var rowValue = Gameboard.getRowValue(pos);
        var newRowValue = rowValue + val; // making sure it is within range

        if (newRowValue > 10 || newRowValue < 1) {
          return false;
        } // concatenating to it the rest of the position


        return String(newRowValue) + pos.substring(pos.indexOf(":"));
      } else if (direction === "col") {
        // this is the reverse of the row branch
        var colValue = Gameboard.getColValue(pos);
        var newColValue = colValue + val;

        if (newColValue > 10 || newColValue < 1) {
          return false;
        }

        return pos.substring(0, pos.indexOf(":") + 1) + String(newColValue);
      } else {
        throw new TypeError("INVALID DIRECTION PARAMETER");
      }
    }
  }, {
    key: "findGridRow",
    value: function findGridRow(nr, cols) {
      return Math.floor(nr / cols) + 1;
    }
  }, {
    key: "findGridCol",
    value: function findGridCol(nr, row, cols) {
      return nr - (row - 1) * cols + 1;
    }
  }, {
    key: "findPositionFromGridNr",
    value: function findPositionFromGridNr(nr, cols) {
      var row = Gameboard.findGridRow(nr, cols);
      var col = Gameboard.findGridCol(nr, row, cols);
      return String(row) + ":" + String(col);
    } // row and col starting from 1

  }, {
    key: "findGridNr",
    value: function findGridNr(cols, row, col) {
      return cols * (row - 1) + (col - 1);
    }
  }, {
    key: "findGridNrFromPosition",
    value: function findGridNrFromPosition(pos, cols) {
      var row = Gameboard.getRowValue(pos);
      var col = Gameboard.getColValue(pos);
      return Gameboard.findGridNr(cols, row, col);
    }
  }, {
    key: "markHit",
    value: function markHit(grid, gridNr) {
      var gridNode = grid.children[gridNr];
      gridNode.classList.add("hit");
    }
  }, {
    key: "checkHit",
    value: function checkHit(grid, gridNr) {
      if (grid.children[gridNr].classList.contains("ship")) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Gameboard;
}();



/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }




var Player = /*#__PURE__*/function () {
  // isHuman = true / false
  function Player(isHuman, gameboard) {
    _classCallCheck(this, Player);

    this.isHuman = isHuman;
    this.gameboard = gameboard;
  }

  _createClass(Player, [{
    key: "humanAttack",
    value: function humanAttack(otherPlayer, pos) {
      otherPlayer.gameboard.receiveAttack(pos);
      return pos;
    } // returns eventual attacked position

  }, {
    key: "computerAttack",
    value: function computerAttack(otherPlayer) {
      var otherGrid = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var useAi = false;

      if (otherGrid) {
        var gridCells = otherGrid.querySelectorAll(".grid-cell");

        for (var i = 0; i < gridCells.length; i++) {
          if (gridCells[i].classList.contains("ship") && gridCells[i].classList.contains("hit") && !gridCells[i].classList.contains("sunk")) {
            useAi = true;
            break;
          }
        }
      }

      if (!useAi) {
        var sunkShips = otherPlayer.gameboard.ships.filter(function (ship) {
          return ship.isSunk();
        });

        do {
          var _this$_randomPair = this._randomPair(),
              _this$_randomPair2 = _slicedToArray(_this$_randomPair, 2),
              randomNr1 = _this$_randomPair2[0],
              randomNr2 = _this$_randomPair2[1];

          var position = String(randomNr1) + ":" + String(randomNr2);
          var valid = otherPlayer.gameboard.checkValidPosition(position, sunkShips);
        } while (!valid || !otherPlayer.gameboard.receiveAttack(position));

        return position;
      } else {
        var _position = this.aiChooseHit(otherGrid.querySelectorAll(".grid-cell"), otherPlayer);

        otherPlayer.gameboard.receiveAttack(_position);
        return _position;
      }
    }
  }, {
    key: "_randomPair",
    value: function _randomPair() {
      var randomNr1 = Math.floor(Math.random() * 10) + 1;
      var randomNr2 = Math.floor(Math.random() * 10) + 1;
      return [randomNr1, randomNr2];
    } // this methods requires both gameboard and ship classes

  }, {
    key: "randomShipPosition",
    value: function randomShipPosition(shipLength, shipId) {
      var positions;

      while (true) {
        positions = [];
        var startPos = String(Math.floor(Math.random() * 9) + 1) + ":" + String(Math.floor(Math.random() * 9) + 1);
        var direction = ["col", "row"][Math.floor(Math.random() * 2)];

        for (var i = 0; i < shipLength; i++) {
          positions.push(_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(startPos, direction, i));
        }

        if (positions.some(function (pos) {
          return pos === false;
        })) {
          continue;
        }

        break;
      }

      var ship = new _ship__WEBPACK_IMPORTED_MODULE_1__.Ship(positions, shipId);

      if (this.gameboard.checkValidShipPosition(ship)) {
        return ship;
      }

      return false;
    } // under the assumption that there is an existing hit

  }, {
    key: "aiChooseHit",
    value: function aiChooseHit(oppGridCells, opponent) {
      var sunkShips = opponent.gameboard.ships.filter(function (ship) {
        return ship.isSunk();
      });
      var shipHits = opponent.gameboard.hitPositions.filter(function (pos) {
        for (var i = 0; i < opponent.gameboard.ships.length; i++) {
          if (!opponent.gameboard.ships[i].isSunk() && opponent.gameboard.ships[i].positions.includes(pos)) {
            return true;
          }
        }

        return false;
      });
      var positions = [];

      if (shipHits.length === 1) {
        // check all cells adjacent
        var left = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(shipHits[0], "col", -1);
        var right = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(shipHits[0], "col", 1);
        var top = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(shipHits[0], "row", -1);
        var bottom = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(shipHits[0], "row", 1);
        var adjacent = [left, right, top, bottom];
        adjacent.forEach(function (pos) {
          if (pos) {
            var cell = oppGridCells[_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.findGridNrFromPosition(pos, 10)];

            if (!cell.classList.contains("hit") && opponent.gameboard.checkValidPosition(pos, sunkShips)) {
              positions.push(pos);
            }
          }
        });
      } else if (shipHits.length > 1) {
        var direction;

        if (shipHits[0] === _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(shipHits[1], "row", 1) || shipHits[0] === _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(shipHits[1], "row", -1)) {
          direction = "row";
        } else {
          direction = "col";
        }

        shipHits.forEach(function (pos) {
          var behind = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(pos, direction, -1);
          var front = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.addToPosition(pos, direction, 1); // check if behind is valid

          if (behind && !oppGridCells[_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.findGridNrFromPosition(behind, 10)].classList.contains("hit") && opponent.gameboard.checkValidPosition(behind, sunkShips)) {
            positions.push(behind);
          } else if (front && !oppGridCells[_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.findGridNrFromPosition(front, 10)].classList.contains("hit") && opponent.gameboard.checkValidPosition(front, sunkShips)) {
            positions.push(front);
          }
        });
      }

      return positions[Math.floor(Math.random() * positions.length)];
    }
  }]);

  return Player;
}();



/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Ship = /*#__PURE__*/function () {
  // positions = ["1:1", "1:2" , "1:3"] "row:col"
  // id = "C" / "B" / "D" / "S" / "P"
  function Ship(positions, id) {
    _classCallCheck(this, Ship);

    this.shipLength = positions.length;
    this.positions = positions;
    this.hitPositions = [];
    this.sunk = false;
    this.id = id;
  } // duplicate validation occurs in Gameboard objects


  _createClass(Ship, [{
    key: "hit",
    value: function hit(position) {
      if (this.positions.includes(position)) {
        this.hitPositions.push(position);
        return true;
      }

      return false;
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      if (this.hitPositions.length === this.shipLength) {
        this.sunk = true;
        return true;
      }

      return false;
    }
  }, {
    key: "sink",
    value: function sink(grid) {
      var _iterator = _createForOfIteratorHelper(this.positions),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pos = _step.value;
          var gridNr = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.findGridNrFromPosition(pos, 10);
          grid.querySelectorAll(".grid-cell")[gridNr].classList.add("sunk");
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "findGridNrFromPosition",
    value: function findGridNrFromPosition(pos, cols) {
      var row = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.getRowValue(pos);
      var col = _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.getColValue(pos);
      return _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard.findGridNr(cols, row, col);
    }
  }]);

  return Ship;
}();



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./styles/style.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./styles/style.css ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 1fr 300px;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n  border: 1px solid black;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.human .ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 68, 68);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.selection-ship.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(59, 59, 255);\n  color: white;\n}\n.button:hover {\n  background: rgb(84, 84, 255);\n  cursor: pointer;\n}\n\n.ship.hit.sunk {\n  background: rgb(116, 15, 15);\n}\n\n.buttons {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}\n", "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,SAAS;EACT,sBAAsB;EACtB,UAAU;AACZ;AACA;;EAEE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,6BAA6B;EAC7B,8BAA8B;EAC9B;;mBAEiB;EACjB,MAAM;AACR;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,SAAS;EACT,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,MAAM;EACN,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;EACjB,uBAAuB;AACzB;;AAEA,gDAAgD;AAChD;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;EACjB,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,aAAa;EACb,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;AACA;;EAEE,YAAY;AACd;AACA;EACE,WAAW;AACb;;AAEA;EACE,8BAA8B;AAChC;AACA;EACE,yCAAyC;AAC3C;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,4BAA4B;EAC5B,YAAY;AACd;AACA;EACE,4BAA4B;EAC5B,eAAe;AACjB;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,SAAS;AACX","sourcesContent":["* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  display: grid;\n  grid-template-rows: 1fr 300px;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n  border: 1px solid black;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.human .ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 68, 68);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.selection-ship.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(59, 59, 255);\n  color: white;\n}\n.button:hover {\n  background: rgb(84, 84, 255);\n  cursor: pointer;\n}\n\n.ship.hit.sunk {\n  background: rgb(116, 15, 15);\n}\n\n.buttons {\n  display: flex;\n  justify-content: center;\n  gap: 20px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./styles/style.css":
/*!**************************!*\
  !*** ./styles/style.css ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/style.css */ "./styles/style.css");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




 // global variables

var gameGrids = document.querySelectorAll(".battleship-grid");

var _gameGrids = _slicedToArray(gameGrids, 2),
    humanGrid = _gameGrids[0],
    computerGrid = _gameGrids[1];

var shipSelection = document.querySelector(".ship-selection");
var multiButt = document.querySelector(".multi-button");
var randomButt = document.querySelector(".random-button");
var gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");
var humanGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
var computerGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
var human = new _player__WEBPACK_IMPORTED_MODULE_2__.Player(true, humanGameboard);
var computer = new _player__WEBPACK_IMPORTED_MODULE_2__.Player(false, computerGameboard);
var playing = false;
var selection = true;
var isShipSelected = false;
var selectedId;
var direction = "col";
var selectionValid = false;
var placedShipIds = [];
var shipLengths = {
  C: 5,
  B: 4,
  D: 3,
  S: 3,
  P: 2
}; // event listeners

function cellShootListener(grid) {
  grid.querySelectorAll(".grid-cell").forEach(function (node) {
    node.addEventListener("click", function () {
      if (playing) {
        var gridNr = Array.prototype.indexOf.call(grid.children, node);
        humanPlays(grid, gridNr);
      }
    });
  });
}

function hoverSelection(shipId, gridNr, gridCells) {
  for (var i = 0; i < shipLengths[shipId]; i++) {
    var startPosition = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10);
    var position = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.addToPosition(startPosition, direction, i); // making sure to flag position as invalid if it is too close to other ships too

    if (position) {
      if (!humanGameboard.checkValidPosition(position, humanGameboard.ships)) {
        position = false;
      }
    }

    if (position) {
      gridCells[_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findGridNrFromPosition(position, 10)].classList.add("selected");
    } else {
      selectionValid = false; // highlight them all as invalid

      for (var _i2 = 0; _i2 < shipLengths[selectedId]; _i2++) {
        var _startPosition = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10);

        var _position = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.addToPosition(_startPosition, direction, _i2);

        if (_position) {
          gridCells[_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findGridNrFromPosition(_position, 10)].classList.add("selected-invalid");
        }
      }
    }
  }
}

function cellGridListeners(grid) {
  var _loop = function _loop(gridNr) {
    var gridCells = grid.querySelectorAll(".grid-cell");
    var cell = gridCells[gridNr]; // when hovering, highlight the correct cells

    cell.addEventListener("mouseover", function () {
      if (selection && isShipSelected) {
        selectionValid = true;
        hoverSelection(selectedId, gridNr, gridCells);
      }
    }); // when hovering off, get rid of all the changes

    cell.addEventListener("mouseout", function () {
      if (selection && isShipSelected) {
        selectionValid = false;

        for (var i = 0; i < shipLengths[selectedId]; i++) {
          var startPosition = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10);
          var position = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.addToPosition(startPosition, direction, i);

          if (position) {
            gridCells[_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findGridNrFromPosition(position, 10)].classList.remove("selected", "selected-invalid");
          }
        }
      }
    }); // removing placed ship when clicked

    cell.addEventListener("click", function () {
      if (!isShipSelected && selection) {
        var selectedShip;
        var position = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10);

        var _iterator = _createForOfIteratorHelper(humanGameboard.ships),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var ship = _step.value;

            if (ship.positions.includes(position)) {
              selectedShip = ship;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        if (selectedShip) {
          var shipElement = shipSelection.querySelector("#selection" + selectedShip.id);

          var _iterator2 = _createForOfIteratorHelper(selectedShip.positions),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var selectedPos = _step2.value;
              var posGridNr = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findGridNrFromPosition(selectedPos, 10);
              gridCells[posGridNr].classList.remove("selected");
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }

          humanGameboard.removeShip(grid, selectedShip.id);
          placedShipIds.splice(placedShipIds.indexOf(selectedShip.id), 1);
          selectShip(shipElement, shipSelection.querySelectorAll(".selection-ship"));
          shipElement.classList.remove("greyed-out");
          hoverSelection(selectedShip.id, gridNr, gridCells);
          multiButt.textContent = "ROTATE";
        }
      }
    }); // when clicking on the grid to place

    cell.addEventListener("click", function () {
      if (isShipSelected && selection && selectionValid) {
        var positions = [];
        var shipElement = shipSelection.querySelector("#selection" + selectedId);

        for (var i = 0; i < shipLengths[selectedId]; i++) {
          var startPosition = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10);
          var position = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.addToPosition(startPosition, direction, i);
          positions.push(position);
        }

        var ship = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(positions, selectedId);
        humanGameboard.place(grid, ship);
        placedShipIds.push(selectedId); // grey it out

        unselectShip(shipElement);
        shipElement.classList.add("greyed-out");

        if (placedShipIds.length >= 5) {
          multiButt.textContent = "START";
        }
      }
    });
  };

  for (var gridNr = 0; gridNr < 100; gridNr++) {
    _loop(gridNr);
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
shipSelection.querySelectorAll(".selection-ship").forEach(function (ship) {
  ship.addEventListener("click", function (e) {
    var id = ship.id.substring(ship.id.length - 1);

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
randomButt.addEventListener("click", function () {
  humanGameboard.generateRandomShips(human, humanGrid);
  multiButt.textContent = "START";
}); // initial styling

function gridCreation() {
  gameGrids.forEach(function (gameGrid) {
    gameGrid.style["grid-template-rows"] = "repeat(10, auto)";
    gameGrid.style["grid-template-columns"] = "repeat(10, auto)"; // entering all grid items

    insertGridCells(10, 10, gameGrid, gridCell);
  }); // adding initial cell event listeners
  // since they only exist once grid is created

  cellShootListener(computerGrid);
  cellGridListeners(humanGrid);
} // rows, cols : int,
// grid, cell : DOM elements


function insertGridCells(rows, cols, grid, cell) {
  for (var i = 0; i < rows * cols; i++) {
    grid.appendChild(cell.cloneNode(true));
  }
} // *** THIS IS WHERE THE TURNS HAPPEN


function humanPlays(grid, gridNr) {
  if (computerGrid.querySelectorAll(".grid-cell")[gridNr].classList.contains("hit")) {
    return;
  }

  _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.markHit(grid, gridNr);
  human.humanAttack(computer, _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10)); // check if any ships are sunk

  sinkShips(grid, computerGameboard); // check if human has won

  if (checkWin()) {
    // later reset
    playing = false;
    return;
  }

  computerPlays();
} // computer's turn


function computerPlays() {
  var attackPosition = computer.computerAttack(human, humanGrid);
  var rowValue = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.getRowValue(attackPosition);
  var colValue = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.getColValue(attackPosition);
  var gridNr = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findGridNr(10, rowValue, colValue);
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.markHit(humanGrid, gridNr);
  sinkShips(humanGrid, humanGameboard);

  if (checkWin()) {
    // later reset
    playing = false;
    return;
  }
}

function sinkShips(grid, gameboard) {
  gameboard.ships.forEach(function (ship) {
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
} // *** FOR LATER


function reset() {
  gameGrids.forEach(function (grid) {
    grid.textContent = "";
  });
  gridCreation();
  shipSelection.querySelectorAll(".selection-ship").forEach(function (ship) {
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
} // rotate button
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
  } // rotating all the ships


  parent.querySelectorAll(shipSelector).forEach(function (ship) {
    var width = ship.offsetWidth;
    var height = ship.offsetHeight;
    ship.style.width = String(height) + "px";
    ship.style.height = String(width) + "px";
  });
}

function selectShip(selectedShipElement, shipElements) {
  // make sure the rest are unselected first
  shipElements.forEach(function (ship) {
    unselectShip(ship);
  });
  var shipId = selectedShipElement.id.substring(selectedShipElement.id.length - 1);
  isShipSelected = true;
  selectedId = shipId;
  selectionValid = false; // add border to selected ship

  selectedShipElement.style.border = "2px solid red";
}

function unselectShip(ship) {
  isShipSelected = false;
  selectedId = "";
  selectionValid = false; // add border to selected ship

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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LFVBQVUsR0FBR2hDLE1BQWI7QUFDQWlDLEVBQUFBLGNBQWMsR0FBRyxLQUFqQixDQVpxRCxDQWNyRDs7QUFDQTJELEVBQUFBLG1CQUFtQixDQUFDeEIsS0FBcEIsQ0FBMEIwQixNQUExQixHQUFtQyxlQUFuQztBQUNEOztBQUVELFNBQVNuQyxZQUFULENBQXNCeEosSUFBdEIsRUFBNEI7QUFDMUI0SCxFQUFBQSxjQUFjLEdBQUcsS0FBakI7QUFDQUMsRUFBQUEsVUFBVSxHQUFHLEVBQWI7QUFDQUMsRUFBQUEsY0FBYyxHQUFHLEtBQWpCLENBSDBCLENBSzFCOztBQUNBOUgsRUFBQUEsSUFBSSxDQUFDaUssS0FBTCxDQUFXMEIsTUFBWCxHQUFvQixNQUFwQjtBQUNEOztBQUVELFNBQVNsQyxTQUFULEdBQXFCO0FBQ25CL0IsRUFBQUEsT0FBTyxHQUFHLElBQVY7QUFDQUMsRUFBQUEsU0FBUyxHQUFHLEtBQVo7QUFDQVQsRUFBQUEsU0FBUyxDQUFDcUMsV0FBVixHQUF3QixPQUF4QjtBQUNBcEMsRUFBQUEsVUFBVSxDQUFDOEMsS0FBWCxDQUFpQmlCLE9BQWpCLEdBQTJCLE1BQTNCO0FBQ0EzRCxFQUFBQSxpQkFBaUIsQ0FBQ3VDLG1CQUFsQixDQUFzQ3JDLFFBQXRDLEVBQWdEVixZQUFoRDtBQUNEOztBQUVEZ0QsWUFBWSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcz9hMmY1Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAxMHgxMCB4OkEtSiB5OiAxLTEwXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhpdFBvc2l0aW9ucyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIHBsYWNlTG9naWNhbGx5KHNoaXApIHtcbiAgICBpZiAodGhpcy5jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKHNoaXApKSB7XG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcGxhY2UoZ3JpZCwgc2hpcCkge1xuICAgIGlmICh0aGlzLnBsYWNlTG9naWNhbGx5KHNoaXApKSB7XG4gICAgICB0aGlzLnBsYWNlSW5HcmlkKGdyaWQsIHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRSb3dWYWx1ZShwb3MpIHtcbiAgICByZXR1cm4gTnVtYmVyKHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29sVmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKHBvcy5pbmRleE9mKFwiOlwiKSArIDEpKTtcbiAgfVxuXG4gIF9taW5Sb3dWYWx1ZShzaGlwKSB7XG4gICAgbGV0IG1pbmltdW0gPSBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcykgPCBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCBJbmZpbml0eSk7XG4gICAgcmV0dXJuIG1pbmltdW07XG4gIH1cbiAgX21pbkNvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpIDwgc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICB9XG4gIF9tYXhSb3dWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKSA+IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIC1JbmZpbml0eSk7XG4gIH1cbiAgX21heENvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgLUluZmluaXR5KTtcbiAgfVxuXG4gIC8vIGRpcmVjdGlvbiA9IFwicm93XCIgLyBcImNvbFwiXG4gIC8vIHBvcyA9IFwicm93OmNvbFwiXG4gIHN0YXRpYyBhZGRUb1Bvc2l0aW9uKHBvcywgZGlyZWN0aW9uLCB2YWwpIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAvLyBnZXR0aW5nIGZpcnN0IG51bWJlclxuICAgICAgbGV0IHJvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgICBsZXQgbmV3Um93VmFsdWUgPSByb3dWYWx1ZSArIHZhbDtcbiAgICAgIC8vIG1ha2luZyBzdXJlIGl0IGlzIHdpdGhpbiByYW5nZVxuICAgICAgaWYgKG5ld1Jvd1ZhbHVlID4gMTAgfHwgbmV3Um93VmFsdWUgPCAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbmNhdGVuYXRpbmcgdG8gaXQgdGhlIHJlc3Qgb2YgdGhlIHBvc2l0aW9uXG4gICAgICByZXR1cm4gU3RyaW5nKG5ld1Jvd1ZhbHVlKSArIHBvcy5zdWJzdHJpbmcocG9zLmluZGV4T2YoXCI6XCIpKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgcmV2ZXJzZSBvZiB0aGUgcm93IGJyYW5jaFxuICAgICAgbGV0IGNvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgICBsZXQgbmV3Q29sVmFsdWUgPSBjb2xWYWx1ZSArIHZhbDtcbiAgICAgIGlmIChuZXdDb2xWYWx1ZSA+IDEwIHx8IG5ld0NvbFZhbHVlIDwgMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9zLnN1YnN0cmluZygwLCBwb3MuaW5kZXhPZihcIjpcIikgKyAxKSArIFN0cmluZyhuZXdDb2xWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJTlZBTElEIERJUkVDVElPTiBQQVJBTUVURVJcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2tzIGlmIHNoaXAncyBwb3NpdGlvbiBpcyB2YWxpZCBieSBjaGVja2luZyBpdCBpcyBuZWFyIG9yIG92ZXJsYXBwaW5nIGV4aXN0aW5nIHNoaXBcbiAgY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihuZXdTaGlwKSB7XG4gICAgLy8gZ2l2ZXMgdHJ1ZSBpZiBhIHNpbmdsZSB2YWx1ZSBpcyBpbnZhbGlkLCBzbyBtdXN0IGJlIGludmVydGVkXG4gICAgcmV0dXJuICFuZXdTaGlwLnBvc2l0aW9ucy5zb21lKChuZXdQb3MpID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5jaGVja1ZhbGlkUG9zaXRpb24obmV3UG9zLCB0aGlzLnNoaXBzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWRQb3NpdGlvbihwb3MsIHNoaXBzKSB7XG4gICAgbGV0IG5ld1Jvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgbGV0IG5ld0NvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG5cbiAgICAvLyBnZXQgbWluICsgbWF4IHZhbHVlIG9mIHJvdyBhbmQgY29sIGZvciBlYWNoIHNoaXAgYW5kIGNoZWNrIGlmIHRoZSBuZXcgcG9zaXRpb24gdmFsdWVzIGFyZSB3aXRoaW4gdGhlbSArLTFcbiAgICAvLyBpZiBhIHNpbmdsZSB2YWx1ZSBpcyBJTlZBTElELCByZXR1cm4gVFJVRVxuICAgIHJldHVybiAhc2hpcHMuc29tZSgocGxhY2VkU2hpcCkgPT4ge1xuICAgICAgbGV0IG1pblJvd1ZhbHVlID0gdGhpcy5fbWluUm93VmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWF4Um93VmFsdWUgPSB0aGlzLl9tYXhSb3dWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtaW5Db2xWYWx1ZSA9IHRoaXMuX21pbkNvbFZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1heENvbFZhbHVlID0gdGhpcy5fbWF4Q29sVmFsdWUocGxhY2VkU2hpcCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbmV3Um93VmFsdWUgPj0gbWluUm93VmFsdWUgLSAxICYmXG4gICAgICAgIG5ld1Jvd1ZhbHVlIDw9IG1heFJvd1ZhbHVlICsgMSAmJlxuICAgICAgICBuZXdDb2xWYWx1ZSA+PSBtaW5Db2xWYWx1ZSAtIDEgJiZcbiAgICAgICAgbmV3Q29sVmFsdWUgPD0gbWF4Q29sVmFsdWUgKyAxXG4gICAgICApIHtcbiAgICAgICAgLy8gSU5WQUxJRCBUSEVSRUZPUkUgVFJVRVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHdpbGwgY2hlY2sgaWYgdmFsaWQgcG9zaXRpb24gYW5kIHNlbmQgdGhlIGhpdCwgdGhlIHNoaXAgd2lsbCB0aGVuIGNoZWNrIGlmIGl0IGlzIGhpdFxuICByZWNlaXZlQXR0YWNrKHBvcykge1xuICAgIGlmICghdGhpcy5oaXRQb3NpdGlvbnMuaW5jbHVkZXMocG9zKSkge1xuICAgICAgdGhpcy5oaXRQb3NpdGlvbnMucHVzaChwb3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLmhpdChwb3MpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhbGxTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZFJvdyhuciwgY29scykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG5yIC8gY29scykgKyAxO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkQ29sKG5yLCByb3csIGNvbHMpIHtcbiAgICByZXR1cm4gbnIgLSAocm93IC0gMSkgKiBjb2xzICsgMTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kUG9zaXRpb25Gcm9tR3JpZE5yKG5yLCBjb2xzKSB7XG4gICAgbGV0IHJvdyA9IEdhbWVib2FyZC5maW5kR3JpZFJvdyhuciwgY29scyk7XG4gICAgbGV0IGNvbCA9IEdhbWVib2FyZC5maW5kR3JpZENvbChuciwgcm93LCBjb2xzKTtcbiAgICByZXR1cm4gU3RyaW5nKHJvdykgKyBcIjpcIiArIFN0cmluZyhjb2wpO1xuICB9XG5cbiAgLy8gcm93IGFuZCBjb2wgc3RhcnRpbmcgZnJvbSAxXG4gIHN0YXRpYyBmaW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKSB7XG4gICAgcmV0dXJuIGNvbHMgKiAocm93IC0gMSkgKyAoY29sIC0gMSk7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3MsIGNvbHMpIHtcbiAgICBsZXQgcm93ID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgbGV0IGNvbCA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuICAgIHJldHVybiBHYW1lYm9hcmQuZmluZEdyaWROcihjb2xzLCByb3csIGNvbCk7XG4gIH1cblxuICAvLyBET00gbWFuaXB1bGF0aW9uXG4gIC8vIHBsYWNpbmcgdGhlIHNoaXAgdmlzdWFsbHkgb24gZ2l2ZW4gZ3JpZFxuICBwbGFjZUluR3JpZChncmlkLCBzaGlwKSB7XG4gICAgbGV0IHNoaXBMZW5ndGggPSBzaGlwLnBvc2l0aW9ucy5sZW5ndGg7XG4gICAgc2hpcC5wb3NpdGlvbnMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICBsZXQgZ3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnIoXG4gICAgICAgIDEwLFxuICAgICAgICBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKSxcbiAgICAgICAgR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyksXG4gICAgICApO1xuICAgICAgbGV0IGdyaWROb2RlID0gZ3JpZC5jaGlsZHJlbltncmlkTnJdO1xuICAgICAgZ3JpZE5vZGUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICBncmlkTm9kZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNoaXBcIiArIFN0cmluZyhzaGlwLmlkKSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbWFya0hpdChncmlkLCBncmlkTnIpIHtcbiAgICBsZXQgZ3JpZE5vZGUgPSBncmlkLmNoaWxkcmVuW2dyaWROcl07XG4gICAgZ3JpZE5vZGUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfVxuXG4gIHN0YXRpYyBjaGVja0hpdChncmlkLCBncmlkTnIpIHtcbiAgICBpZiAoZ3JpZC5jaGlsZHJlbltncmlkTnJdLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU2hpcExvZ2ljYWxseShpZCkge1xuICAgIHRoaXMuc2hpcHMuc29tZSgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaWQgPT09IGlkKSB7XG4gICAgICAgIHRoaXMuc2hpcHMuc3BsaWNlKHRoaXMuc2hpcHMuaW5kZXhPZihzaGlwKSwgMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlU2hpcEZyb21HcmlkKGdyaWQsIGlkKSB7XG4gICAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoY2VsbC5pZC5zdWJzdHJpbmcoNCkgPT09IGlkKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInNoaXBcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlU2hpcChncmlkLCBpZCkge1xuICAgIHRoaXMucmVtb3ZlU2hpcExvZ2ljYWxseShpZCk7XG4gICAgdGhpcy5yZW1vdmVTaGlwRnJvbUdyaWQoZ3JpZCwgaWQpO1xuICB9XG5cbiAgZ2VuZXJhdGVSYW5kb21TaGlwcyhwbGF5ZXIsIGdyaWQpIHtcbiAgICBmb3IgKGxldCBzaGlwVHlwZSBvZiBbXG4gICAgICBbXCJDXCIsIDVdLFxuICAgICAgW1wiQlwiLCA0XSxcbiAgICAgIFtcIkRcIiwgM10sXG4gICAgICBbXCJTXCIsIDNdLFxuICAgICAgW1wiUFwiLCAyXSxcbiAgICBdKSB7XG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBsZXQgc2hpcCA9IHBsYXllci5yYW5kb21TaGlwUG9zaXRpb24oc2hpcFR5cGVbMV0sIHNoaXBUeXBlWzBdKTsgLy8gc2hpcCBvYmplY3QgLyBmYWxzZVxuICAgICAgICBpZiAoc2hpcCkge1xuICAgICAgICAgIHRoaXMucGxhY2UoZ3JpZCwgc2hpcCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbmNsYXNzIFBsYXllciB7XG4gIC8vIGlzSHVtYW4gPSB0cnVlIC8gZmFsc2VcbiAgY29uc3RydWN0b3IoaXNIdW1hbiwgZ2FtZWJvYXJkKSB7XG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcbiAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgfVxuXG4gIGh1bWFuQXR0YWNrKG90aGVyUGxheWVyLCBwb3MpIHtcbiAgICBvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICAgIHJldHVybiBwb3M7XG4gIH1cblxuICAvLyByZXR1cm5zIGV2ZW50dWFsIGF0dGFja2VkIHBvc2l0aW9uXG4gIGNvbXB1dGVyQXR0YWNrKG90aGVyUGxheWVyLCBvdGhlckdyaWQgPSB1bmRlZmluZWQpIHtcbiAgICBsZXQgdXNlQWkgPSBmYWxzZTtcbiAgICBpZiAob3RoZXJHcmlkKSB7XG4gICAgICBsZXQgZ3JpZENlbGxzID0gb3RoZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncmlkQ2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGdyaWRDZWxsc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpICYmXG4gICAgICAgICAgZ3JpZENlbGxzW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJlxuICAgICAgICAgICFncmlkQ2VsbHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic3Vua1wiKVxuICAgICAgICApIHtcbiAgICAgICAgICB1c2VBaSA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCF1c2VBaSkge1xuICAgICAgbGV0IHN1bmtTaGlwcyA9IG90aGVyUGxheWVyLmdhbWVib2FyZC5zaGlwcy5maWx0ZXIoKHNoaXApID0+XG4gICAgICAgIHNoaXAuaXNTdW5rKCksXG4gICAgICApO1xuICAgICAgZG8ge1xuICAgICAgICBsZXQgW3JhbmRvbU5yMSwgcmFuZG9tTnIyXSA9IHRoaXMuX3JhbmRvbVBhaXIoKTtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gU3RyaW5nKHJhbmRvbU5yMSkgKyBcIjpcIiArIFN0cmluZyhyYW5kb21OcjIpO1xuICAgICAgICB2YXIgdmFsaWQgPSBvdGhlclBsYXllci5nYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHN1bmtTaGlwcyxcbiAgICAgICAgKTtcbiAgICAgIH0gd2hpbGUgKCF2YWxpZCB8fCAhb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zaXRpb24pKTtcbiAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHBvc2l0aW9uID0gdGhpcy5haUNob29zZUhpdChcbiAgICAgICAgb3RoZXJHcmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpLFxuICAgICAgICBvdGhlclBsYXllcixcbiAgICAgICk7XG4gICAgICBvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3NpdGlvbik7XG4gICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfVxuICB9XG5cbiAgX3JhbmRvbVBhaXIoKSB7XG4gICAgbGV0IHJhbmRvbU5yMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgbGV0IHJhbmRvbU5yMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgcmV0dXJuIFtyYW5kb21OcjEsIHJhbmRvbU5yMl07XG4gIH1cblxuICAvLyB0aGlzIG1ldGhvZHMgcmVxdWlyZXMgYm90aCBnYW1lYm9hcmQgYW5kIHNoaXAgY2xhc3Nlc1xuICByYW5kb21TaGlwUG9zaXRpb24oc2hpcExlbmd0aCwgc2hpcElkKSB7XG4gICAgbGV0IHBvc2l0aW9ucztcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBwb3NpdGlvbnMgPSBbXTtcbiAgICAgIGxldCBzdGFydFBvcyA9XG4gICAgICAgIFN0cmluZyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KSArIDEpICtcbiAgICAgICAgXCI6XCIgK1xuICAgICAgICBTdHJpbmcoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSkgKyAxKTtcbiAgICAgIGxldCBkaXJlY3Rpb24gPSBbXCJjb2xcIiwgXCJyb3dcIl1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9zaXRpb25zLnB1c2goR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3MsIGRpcmVjdGlvbiwgaSkpO1xuICAgICAgfVxuICAgICAgaWYgKHBvc2l0aW9ucy5zb21lKChwb3MpID0+IHBvcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxldCBzaGlwID0gbmV3IFNoaXAocG9zaXRpb25zLCBzaGlwSWQpO1xuICAgIGlmICh0aGlzLmdhbWVib2FyZC5jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKHNoaXApKSB7XG4gICAgICByZXR1cm4gc2hpcDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gdW5kZXIgdGhlIGFzc3VtcHRpb24gdGhhdCB0aGVyZSBpcyBhbiBleGlzdGluZyBoaXRcbiAgYWlDaG9vc2VIaXQob3BwR3JpZENlbGxzLCBvcHBvbmVudCkge1xuICAgIGxldCBzdW5rU2hpcHMgPSBvcHBvbmVudC5nYW1lYm9hcmQuc2hpcHMuZmlsdGVyKChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKTtcbiAgICBsZXQgc2hpcEhpdHMgPSBvcHBvbmVudC5nYW1lYm9hcmQuaGl0UG9zaXRpb25zLmZpbHRlcigocG9zKSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wcG9uZW50LmdhbWVib2FyZC5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIW9wcG9uZW50LmdhbWVib2FyZC5zaGlwc1tpXS5pc1N1bmsoKSAmJlxuICAgICAgICAgIG9wcG9uZW50LmdhbWVib2FyZC5zaGlwc1tpXS5wb3NpdGlvbnMuaW5jbHVkZXMocG9zKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgbGV0IHBvc2l0aW9ucyA9IFtdO1xuICAgIGlmIChzaGlwSGl0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIGNoZWNrIGFsbCBjZWxscyBhZGphY2VudFxuICAgICAgbGV0IGxlZnQgPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzaGlwSGl0c1swXSwgXCJjb2xcIiwgLTEpO1xuICAgICAgbGV0IHJpZ2h0ID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc2hpcEhpdHNbMF0sIFwiY29sXCIsIDEpO1xuICAgICAgbGV0IHRvcCA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHNoaXBIaXRzWzBdLCBcInJvd1wiLCAtMSk7XG4gICAgICBsZXQgYm90dG9tID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc2hpcEhpdHNbMF0sIFwicm93XCIsIDEpO1xuICAgICAgbGV0IGFkamFjZW50ID0gW2xlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbV07XG4gICAgICBhZGphY2VudC5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgIGxldCBjZWxsID0gb3BwR3JpZENlbGxzW0dhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvcywgMTApXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhY2VsbC5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgJiZcbiAgICAgICAgICAgIG9wcG9uZW50LmdhbWVib2FyZC5jaGVja1ZhbGlkUG9zaXRpb24ocG9zLCBzdW5rU2hpcHMpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwb3NpdGlvbnMucHVzaChwb3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChzaGlwSGl0cy5sZW5ndGggPiAxKSB7XG4gICAgICBsZXQgZGlyZWN0aW9uO1xuICAgICAgaWYgKFxuICAgICAgICBzaGlwSGl0c1swXSA9PT0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc2hpcEhpdHNbMV0sIFwicm93XCIsIDEpIHx8XG4gICAgICAgIHNoaXBIaXRzWzBdID09PSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzaGlwSGl0c1sxXSwgXCJyb3dcIiwgLTEpXG4gICAgICApIHtcbiAgICAgICAgZGlyZWN0aW9uID0gXCJyb3dcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICB9XG5cbiAgICAgIHNoaXBIaXRzLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICBsZXQgYmVoaW5kID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24ocG9zLCBkaXJlY3Rpb24sIC0xKTtcbiAgICAgICAgbGV0IGZyb250ID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24ocG9zLCBkaXJlY3Rpb24sIDEpO1xuICAgICAgICAvLyBjaGVjayBpZiBiZWhpbmQgaXMgdmFsaWRcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGJlaGluZCAmJlxuICAgICAgICAgICFvcHBHcmlkQ2VsbHNbXG4gICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihiZWhpbmQsIDEwKVxuICAgICAgICAgIF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpICYmXG4gICAgICAgICAgb3Bwb25lbnQuZ2FtZWJvYXJkLmNoZWNrVmFsaWRQb3NpdGlvbihiZWhpbmQsIHN1bmtTaGlwcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgcG9zaXRpb25zLnB1c2goYmVoaW5kKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBmcm9udCAmJlxuICAgICAgICAgICFvcHBHcmlkQ2VsbHNbXG4gICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihmcm9udCwgMTApXG4gICAgICAgICAgXS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgJiZcbiAgICAgICAgICBvcHBvbmVudC5nYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKGZyb250LCBzdW5rU2hpcHMpXG4gICAgICAgICkge1xuICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKGZyb250KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb3NpdGlvbnMubGVuZ3RoKV07XG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJpbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuY2xhc3MgU2hpcCB7XG4gIC8vIHBvc2l0aW9ucyA9IFtcIjE6MVwiLCBcIjE6MlwiICwgXCIxOjNcIl0gXCJyb3c6Y29sXCJcbiAgLy8gaWQgPSBcIkNcIiAvIFwiQlwiIC8gXCJEXCIgLyBcIlNcIiAvIFwiUFwiXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9ucywgaWQpIHtcbiAgICB0aGlzLnNoaXBMZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zO1xuICAgIHRoaXMuaGl0UG9zaXRpb25zID0gW107XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgLy8gZHVwbGljYXRlIHZhbGlkYXRpb24gb2NjdXJzIGluIEdhbWVib2FyZCBvYmplY3RzXG4gIGhpdChwb3NpdGlvbikge1xuICAgIGlmICh0aGlzLnBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgIHRoaXMuaGl0UG9zaXRpb25zLnB1c2gocG9zaXRpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRQb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLnNoaXBMZW5ndGgpIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc2luayhncmlkKSB7XG4gICAgZm9yIChsZXQgcG9zIG9mIHRoaXMucG9zaXRpb25zKSB7XG4gICAgICBsZXQgZ3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zLCAxMCk7XG4gICAgICBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpW2dyaWROcl0uY2xhc3NMaXN0LmFkZChcInN1bmtcIik7XG4gICAgfVxuICB9XG5cbiAgZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3MsIGNvbHMpIHtcbiAgICBsZXQgcm93ID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgbGV0IGNvbCA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuICAgIHJldHVybiBHYW1lYm9hcmQuZmluZEdyaWROcihjb2xzLCByb3csIGNvbCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbmJvZHksXFxuaHRtbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMzAwcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICBcXFwiaHVtYW4gY29tcHV0ZXJcXFwiXFxuICAgIFxcXCJib3R0b20gYm90dG9tXFxcIjtcXG4gIGdhcDogMDtcXG59XFxuXFxuLmh1bWFuIHtcXG4gIGdyaWQtYXJlYTogaHVtYW47XFxufVxcblxcbi5jb21wdXRlciB7XFxuICBncmlkLWFyZWE6IGNvbXB1dGVyO1xcbn1cXG5cXG4ucGxheWVyLWNvbnRhaW5lciB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDIwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLyogQ0hBTkdFIFRISVMgVE8gSFVNQU4gVE8gSElERSBDT01QVVRFUiBTSElQUyAqL1xcbi5odW1hbiAuc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE2NywgMTY3LCAxNjcpO1xcbn1cXG5cXG4uc2hpcC5oaXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgNjgsIDY4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiBib3R0b207XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi5zaGlwLXNlbGVjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuI3NlbGVjdGlvbkMsXFxuI3NlbGVjdGlvbkIsXFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMsXFxuI3NlbGVjdGlvblAge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4jc2VsZWN0aW9uQyB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNzZWxlY3Rpb25CIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG4jc2VsZWN0aW9uUCB7XFxuICB3aWR0aDogODBweDtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMjU1KTtcXG59XFxuLnNlbGVjdGVkLWludmFsaWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgMTU4LCAxNTgpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcC5ncmV5ZWQtb3V0IHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxufVxcblxcbi5idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTksIDU5LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zaGlwLmhpdC5zdW5rIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxMTYsIDE1LCAxNSk7XFxufVxcblxcbi5idXR0b25zIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGVzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlDQUF5QztFQUN6QyxTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLFVBQVU7QUFDWjtBQUNBOztFQUVFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsNkJBQTZCO0VBQzdCLDhCQUE4QjtFQUM5Qjs7bUJBRWlCO0VBQ2pCLE1BQU07QUFDUjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLE1BQU07RUFDTix1QkFBdUI7RUFDdkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7RUFDakIsdUJBQXVCO0FBQ3pCOztBQUVBLGdEQUFnRDtBQUNoRDtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsWUFBWTtFQUNaLFlBQVk7RUFDWixlQUFlO0VBQ2YscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBOzs7OztFQUtFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7O0VBRUUsWUFBWTtBQUNkO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQiw0QkFBNEI7RUFDNUIsWUFBWTtBQUNkO0FBQ0E7RUFDRSw0QkFBNEI7RUFDNUIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7RUFDdkIsU0FBUztBQUNYXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG59XFxuYm9keSxcXG5odG1sIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAzMDBweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgIFxcXCJodW1hbiBjb21wdXRlclxcXCJcXG4gICAgXFxcImJvdHRvbSBib3R0b21cXFwiO1xcbiAgZ2FwOiAwO1xcbn1cXG5cXG4uaHVtYW4ge1xcbiAgZ3JpZC1hcmVhOiBodW1hbjtcXG59XFxuXFxuLmNvbXB1dGVyIHtcXG4gIGdyaWQtYXJlYTogY29tcHV0ZXI7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxufVxcblxcbi5wbGF5ZXItdGl0bGUge1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbn1cXG5cXG4ubGluZSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTBweDtcXG4gIGJhY2tncm91bmQ6IHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLmJhdHRsZXNoaXAtZ3JpZCB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBmbGV4LXNocmluazogMDtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4vKiBDSEFOR0UgVEhJUyBUTyBIVU1BTiBUTyBISURFIENPTVBVVEVSIFNISVBTICovXFxuLmh1bWFuIC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTY3LCAxNjcsIDE2Nyk7XFxufVxcblxcbi5zaGlwLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCA2OCwgNjgpO1xcbn1cXG5cXG4uYm90dG9tLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IGJvdHRvbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnNoaXAtc2VsZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4jc2VsZWN0aW9uQyxcXG4jc2VsZWN0aW9uQixcXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyxcXG4jc2VsZWN0aW9uUCB7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcblxcbiNzZWxlY3Rpb25DIHtcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuI3NlbGVjdGlvbkIge1xcbiAgd2lkdGg6IDE2MHB4O1xcbn1cXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyB7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcbiNzZWxlY3Rpb25QIHtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4uc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAyNTUpO1xcbn1cXG4uc2VsZWN0ZWQtaW52YWxpZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCkgIWltcG9ydGFudDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwLmdyZXllZC1vdXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcXG4gIGJhY2tncm91bmQ6IHJnYig1OSwgNTksIDI1NSk7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNoaXAuaGl0LnN1bmsge1xcbiAgYmFja2dyb3VuZDogcmdiKDExNiwgMTUsIDE1KTtcXG59XFxuXFxuLmJ1dHRvbnMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9zdHlsZS5jc3NcIjtcblxuLy8gZ2xvYmFsIHZhcmlhYmxlc1xuY29uc3QgZ2FtZUdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYXR0bGVzaGlwLWdyaWRcIik7XG5jb25zdCBbaHVtYW5HcmlkLCBjb21wdXRlckdyaWRdID0gZ2FtZUdyaWRzO1xuY29uc3Qgc2hpcFNlbGVjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1zZWxlY3Rpb25cIik7XG5jb25zdCBtdWx0aUJ1dHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm11bHRpLWJ1dHRvblwiKTtcbmNvbnN0IHJhbmRvbUJ1dHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJhbmRvbS1idXR0b25cIik7XG5cbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG5cbmxldCBodW1hbkdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBjb21wdXRlckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBodW1hbiA9IG5ldyBQbGF5ZXIodHJ1ZSwgaHVtYW5HYW1lYm9hcmQpO1xubGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcihmYWxzZSwgY29tcHV0ZXJHYW1lYm9hcmQpO1xubGV0IHBsYXlpbmcgPSBmYWxzZTtcblxubGV0IHNlbGVjdGlvbiA9IHRydWU7XG5sZXQgaXNTaGlwU2VsZWN0ZWQgPSBmYWxzZTtcbmxldCBzZWxlY3RlZElkO1xubGV0IGRpcmVjdGlvbiA9IFwiY29sXCI7XG5sZXQgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcbmxldCBwbGFjZWRTaGlwSWRzID0gW107XG5sZXQgc2hpcExlbmd0aHMgPSB7XG4gIEM6IDUsXG4gIEI6IDQsXG4gIEQ6IDMsXG4gIFM6IDMsXG4gIFA6IDIsXG59O1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNlbGxTaG9vdExpc3RlbmVyKGdyaWQpIHtcbiAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHBsYXlpbmcpIHtcbiAgICAgICAgbGV0IGdyaWROciA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZ3JpZC5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICAgIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhvdmVyU2VsZWN0aW9uKHNoaXBJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwSWRdOyBpKyspIHtcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgLy8gbWFraW5nIHN1cmUgdG8gZmxhZyBwb3NpdGlvbiBhcyBpbnZhbGlkIGlmIGl0IGlzIHRvbyBjbG9zZSB0byBvdGhlciBzaGlwcyB0b29cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGlmICghaHVtYW5HYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKHBvc2l0aW9uLCBodW1hbkdhbWVib2FyZC5zaGlwcykpIHtcbiAgICAgICAgcG9zaXRpb24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICBncmlkQ2VsbHNbR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKV0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgXCJzZWxlY3RlZFwiLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcbiAgICAgIC8vIGhpZ2hsaWdodCB0aGVtIGFsbCBhcyBpbnZhbGlkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NlbGVjdGVkSWRdOyBpKyspIHtcbiAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgZ3JpZENlbGxzW1xuICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKVxuICAgICAgICAgIF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLWludmFsaWRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2VsbEdyaWRMaXN0ZW5lcnMoZ3JpZCkge1xuICBmb3IgKGxldCBncmlkTnIgPSAwOyBncmlkTnIgPCAxMDA7IGdyaWROcisrKSB7XG4gICAgbGV0IGdyaWRDZWxscyA9IGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG4gICAgbGV0IGNlbGwgPSBncmlkQ2VsbHNbZ3JpZE5yXTtcbiAgICAvLyB3aGVuIGhvdmVyaW5nLCBoaWdobGlnaHQgdGhlIGNvcnJlY3QgY2VsbHNcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3Rpb25WYWxpZCA9IHRydWU7XG4gICAgICAgIGhvdmVyU2VsZWN0aW9uKHNlbGVjdGVkSWQsIGdyaWROciwgZ3JpZENlbGxzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gaG92ZXJpbmcgb2ZmLCBnZXQgcmlkIG9mIGFsbCB0aGUgY2hhbmdlc1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgIGlmIChzZWxlY3Rpb24gJiYgaXNTaGlwU2VsZWN0ZWQpIHtcbiAgICAgICAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NlbGVjdGVkSWRdOyBpKyspIHtcbiAgICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBncmlkQ2VsbHNbXG4gICAgICAgICAgICAgIEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCAxMClcbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIsIFwic2VsZWN0ZWQtaW52YWxpZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyByZW1vdmluZyBwbGFjZWQgc2hpcCB3aGVuIGNsaWNrZWRcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoIWlzU2hpcFNlbGVjdGVkICYmIHNlbGVjdGlvbikge1xuICAgICAgICBsZXQgc2VsZWN0ZWRTaGlwO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBvZiBodW1hbkdhbWVib2FyZC5zaGlwcykge1xuICAgICAgICAgIGlmIChzaGlwLnBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkU2hpcCA9IHNoaXA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWRTaGlwKSB7XG4gICAgICAgICAgbGV0IHNoaXBFbGVtZW50ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgXCIjc2VsZWN0aW9uXCIgKyBzZWxlY3RlZFNoaXAuaWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBmb3IgKGxldCBzZWxlY3RlZFBvcyBvZiBzZWxlY3RlZFNoaXAucG9zaXRpb25zKSB7XG4gICAgICAgICAgICBsZXQgcG9zR3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24oc2VsZWN0ZWRQb3MsIDEwKTtcbiAgICAgICAgICAgIGdyaWRDZWxsc1twb3NHcmlkTnJdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaHVtYW5HYW1lYm9hcmQucmVtb3ZlU2hpcChncmlkLCBzZWxlY3RlZFNoaXAuaWQpO1xuICAgICAgICAgIHBsYWNlZFNoaXBJZHMuc3BsaWNlKHBsYWNlZFNoaXBJZHMuaW5kZXhPZihzZWxlY3RlZFNoaXAuaWQpLCAxKTtcbiAgICAgICAgICBzZWxlY3RTaGlwKFxuICAgICAgICAgICAgc2hpcEVsZW1lbnQsXG4gICAgICAgICAgICBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIiksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JleWVkLW91dFwiKTtcbiAgICAgICAgICBob3ZlclNlbGVjdGlvbihzZWxlY3RlZFNoaXAuaWQsIGdyaWROciwgZ3JpZENlbGxzKTtcbiAgICAgICAgICBtdWx0aUJ1dHQudGV4dENvbnRlbnQgPSBcIlJPVEFURVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGNsaWNraW5nIG9uIHRoZSBncmlkIHRvIHBsYWNlXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGlzU2hpcFNlbGVjdGVkICYmIHNlbGVjdGlvbiAmJiBzZWxlY3Rpb25WYWxpZCkge1xuICAgICAgICBsZXQgcG9zaXRpb25zID0gW107XG4gICAgICAgIGxldCBzaGlwRWxlbWVudCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkSWQsXG4gICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgICBwb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcChwb3NpdGlvbnMsIHNlbGVjdGVkSWQpO1xuICAgICAgICBodW1hbkdhbWVib2FyZC5wbGFjZShncmlkLCBzaGlwKTtcbiAgICAgICAgcGxhY2VkU2hpcElkcy5wdXNoKHNlbGVjdGVkSWQpO1xuICAgICAgICAvLyBncmV5IGl0IG91dFxuICAgICAgICB1bnNlbGVjdFNoaXAoc2hpcEVsZW1lbnQpO1xuICAgICAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ3JleWVkLW91dFwiKTtcbiAgICAgICAgaWYgKHBsYWNlZFNoaXBJZHMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICBtdWx0aUJ1dHQudGV4dENvbnRlbnQgPSBcIlNUQVJUXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5tdWx0aUJ1dHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKG11bHRpQnV0dC50ZXh0Q29udGVudCA9PT0gXCJTVEFSVFwiKSB7XG4gICAgc3RhcnRHYW1lKCk7XG4gIH0gZWxzZSBpZiAobXVsdGlCdXR0LnRleHRDb250ZW50ID09PSBcIlJPVEFURVwiKSB7XG4gICAgcm90YXRlKHNoaXBTZWxlY3Rpb24sIFwiLnNlbGVjdGlvbi1zaGlwXCIpO1xuICB9IGVsc2UgaWYgKG11bHRpQnV0dC50ZXh0Q29udGVudCA9PT0gXCJSRVNFVFwiKSB7XG4gICAgcmVzZXQoKTtcbiAgICBtdWx0aUJ1dHQudGV4dENvbnRlbnQgPSBcIlJPVEFURVwiO1xuICB9XG59KTtcblxuc2hpcFNlbGVjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBpZiAoc2VsZWN0aW9uICYmIGlzU2hpcFNlbGVjdGVkKSB7XG4gICAgdW5zZWxlY3RTaGlwKHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkSWQpKTtcbiAgfVxufSk7XG5cbnNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgbGV0IGlkID0gc2hpcC5pZC5zdWJzdHJpbmcoc2hpcC5pZC5sZW5ndGggLSAxKTtcbiAgICBpZiAoc2VsZWN0aW9uICYmICFwbGFjZWRTaGlwSWRzLmluY2x1ZGVzKGlkKSkge1xuICAgICAgaWYgKHNlbGVjdGVkSWQgIT09IGlkKSB7XG4gICAgICAgIHNlbGVjdFNoaXAoc2hpcCwgc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuc2VsZWN0U2hpcChzaGlwKTtcbiAgICAgIH1cbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9KTtcbn0pO1xuXG5yYW5kb21CdXR0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGh1bWFuR2FtZWJvYXJkLmdlbmVyYXRlUmFuZG9tU2hpcHMoaHVtYW4sIGh1bWFuR3JpZCk7XG4gIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiU1RBUlRcIjtcbn0pO1xuXG4vLyBpbml0aWFsIHN0eWxpbmdcbmZ1bmN0aW9uIGdyaWRDcmVhdGlvbigpIHtcbiAgZ2FtZUdyaWRzLmZvckVhY2goKGdhbWVHcmlkKSA9PiB7XG4gICAgZ2FtZUdyaWQuc3R5bGVbXCJncmlkLXRlbXBsYXRlLXJvd3NcIl0gPSBgcmVwZWF0KDEwLCBhdXRvKWA7XG4gICAgZ2FtZUdyaWQuc3R5bGVbXCJncmlkLXRlbXBsYXRlLWNvbHVtbnNcIl0gPSBgcmVwZWF0KDEwLCBhdXRvKWA7XG4gICAgLy8gZW50ZXJpbmcgYWxsIGdyaWQgaXRlbXNcbiAgICBpbnNlcnRHcmlkQ2VsbHMoMTAsIDEwLCBnYW1lR3JpZCwgZ3JpZENlbGwpO1xuICB9KTtcbiAgLy8gYWRkaW5nIGluaXRpYWwgY2VsbCBldmVudCBsaXN0ZW5lcnNcbiAgLy8gc2luY2UgdGhleSBvbmx5IGV4aXN0IG9uY2UgZ3JpZCBpcyBjcmVhdGVkXG4gIGNlbGxTaG9vdExpc3RlbmVyKGNvbXB1dGVyR3JpZCk7XG4gIGNlbGxHcmlkTGlzdGVuZXJzKGh1bWFuR3JpZCk7XG59XG5cbi8vIHJvd3MsIGNvbHMgOiBpbnQsXG4vLyBncmlkLCBjZWxsIDogRE9NIGVsZW1lbnRzXG5mdW5jdGlvbiBpbnNlcnRHcmlkQ2VsbHMocm93cywgY29scywgZ3JpZCwgY2VsbCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MgKiBjb2xzOyBpKyspIHtcbiAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxufVxuXG4vLyAqKiogVEhJUyBJUyBXSEVSRSBUSEUgVFVSTlMgSEFQUEVOXG5mdW5jdGlvbiBodW1hblBsYXlzKGdyaWQsIGdyaWROcikge1xuICBpZiAoXG4gICAgY29tcHV0ZXJHcmlkXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIilcbiAgICAgIFtncmlkTnJdLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKVxuICApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgR2FtZWJvYXJkLm1hcmtIaXQoZ3JpZCwgZ3JpZE5yKTtcbiAgaHVtYW4uaHVtYW5BdHRhY2soY29tcHV0ZXIsIEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApKTtcblxuICAvLyBjaGVjayBpZiBhbnkgc2hpcHMgYXJlIHN1bmtcbiAgc2lua1NoaXBzKGdyaWQsIGNvbXB1dGVyR2FtZWJvYXJkKTtcbiAgLy8gY2hlY2sgaWYgaHVtYW4gaGFzIHdvblxuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBjb21wdXRlclBsYXlzKCk7XG59XG5cbi8vIGNvbXB1dGVyJ3MgdHVyblxuZnVuY3Rpb24gY29tcHV0ZXJQbGF5cygpIHtcbiAgbGV0IGF0dGFja1Bvc2l0aW9uID0gY29tcHV0ZXIuY29tcHV0ZXJBdHRhY2soaHVtYW4sIGh1bWFuR3JpZCk7XG4gIGxldCByb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBjb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROcigxMCwgcm93VmFsdWUsIGNvbFZhbHVlKTtcblxuICBHYW1lYm9hcmQubWFya0hpdChodW1hbkdyaWQsIGdyaWROcik7XG4gIHNpbmtTaGlwcyhodW1hbkdyaWQsIGh1bWFuR2FtZWJvYXJkKTtcblxuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiBzaW5rU2hpcHMoZ3JpZCwgZ2FtZWJvYXJkKSB7XG4gIGdhbWVib2FyZC5zaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgaWYgKHNoaXAuaXNTdW5rKCkpIHtcbiAgICAgIHNoaXAuc2luayhncmlkKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjaGVja1dpbigpIHtcbiAgaWYgKGh1bWFuR2FtZWJvYXJkLmFsbFN1bmsoKSkge1xuICAgIHdpbk1lc3NhZ2UoXCJjb21wdXRlclwiKTtcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgd2luTWVzc2FnZShcImh1bWFuXCIpO1xuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHdpbk1lc3NhZ2Uod2lubmVyKSB7XG4gIC8vIGNyZWF0ZSBtb2RhbFxuICBhbGVydCh3aW5uZXIgKyBcIiB3b25cIik7XG59XG5cbi8vICoqKiBGT1IgTEFURVJcbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBnYW1lR3JpZHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgIGdyaWQudGV4dENvbnRlbnQgPSBcIlwiO1xuICB9KTtcbiAgZ3JpZENyZWF0aW9uKCk7XG4gIHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgc2hpcC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JleWVkLW91dFwiKTtcbiAgfSk7XG4gIGh1bWFuR2FtZWJvYXJkLmhpdFBvc2l0aW9ucyA9IFtdO1xuICBodW1hbkdhbWVib2FyZC5zaGlwcyA9IFtdO1xuICBjb21wdXRlckdhbWVib2FyZC5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQuc2hpcHMgPSBbXTtcbiAgc2VsZWN0aW9uID0gdHJ1ZTtcbiAgaXNTaGlwU2VsZWN0ZWQgPSBmYWxzZTtcbiAgc2VsZWN0ZWRJZDtcbiAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcbiAgcGxhY2VkU2hpcElkcyA9IFtdO1xuICBwbGF5aW5nID0gZmFsc2U7XG4gIHJhbmRvbUJ1dHQuc3R5bGUuZGlzcGxheSA9IFwiaW5pdGlhbFwiO1xufVxuXG4vLyByb3RhdGUgYnV0dG9uXG4vLyBURU1QT1JBUlkgVkVSU0lPTlxuZnVuY3Rpb24gcm90YXRlKHBhcmVudCwgc2hpcFNlbGVjdG9yKSB7XG4gIC8vIHN3aXRjaGluZyB0aGUgZGlyZWN0aW9uXG4gIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgY2FzZSBcImNvbFwiOlxuICAgICAgZGlyZWN0aW9uID0gXCJyb3dcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyb3dcIjpcbiAgICAgIGRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIHJvdGF0aW5nIGFsbCB0aGUgc2hpcHNcbiAgcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2hpcFNlbGVjdG9yKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgbGV0IHdpZHRoID0gc2hpcC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gc2hpcC5vZmZzZXRIZWlnaHQ7XG4gICAgc2hpcC5zdHlsZS53aWR0aCA9IFN0cmluZyhoZWlnaHQpICsgXCJweFwiO1xuICAgIHNoaXAuc3R5bGUuaGVpZ2h0ID0gU3RyaW5nKHdpZHRoKSArIFwicHhcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFNoaXAoc2VsZWN0ZWRTaGlwRWxlbWVudCwgc2hpcEVsZW1lbnRzKSB7XG4gIC8vIG1ha2Ugc3VyZSB0aGUgcmVzdCBhcmUgdW5zZWxlY3RlZCBmaXJzdFxuICBzaGlwRWxlbWVudHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHVuc2VsZWN0U2hpcChzaGlwKTtcbiAgfSk7XG5cbiAgbGV0IHNoaXBJZCA9IHNlbGVjdGVkU2hpcEVsZW1lbnQuaWQuc3Vic3RyaW5nKFxuICAgIHNlbGVjdGVkU2hpcEVsZW1lbnQuaWQubGVuZ3RoIC0gMSxcbiAgKTtcblxuICBpc1NoaXBTZWxlY3RlZCA9IHRydWU7XG4gIHNlbGVjdGVkSWQgPSBzaGlwSWQ7XG4gIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5cbiAgLy8gYWRkIGJvcmRlciB0byBzZWxlY3RlZCBzaGlwXG4gIHNlbGVjdGVkU2hpcEVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgcmVkXCI7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0U2hpcChzaGlwKSB7XG4gIGlzU2hpcFNlbGVjdGVkID0gZmFsc2U7XG4gIHNlbGVjdGVkSWQgPSBcIlwiO1xuICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gIC8vIGFkZCBib3JkZXIgdG8gc2VsZWN0ZWQgc2hpcFxuICBzaGlwLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIHBsYXlpbmcgPSB0cnVlO1xuICBzZWxlY3Rpb24gPSBmYWxzZTtcbiAgbXVsdGlCdXR0LnRleHRDb250ZW50ID0gXCJSRVNFVFwiO1xuICByYW5kb21CdXR0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY29tcHV0ZXJHYW1lYm9hcmQuZ2VuZXJhdGVSYW5kb21TaGlwcyhjb21wdXRlciwgY29tcHV0ZXJHcmlkKTtcbn1cblxuZ3JpZENyZWF0aW9uKCk7XG4iXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiaGl0UG9zaXRpb25zIiwic2hpcHMiLCJzaGlwIiwiY2hlY2tWYWxpZFNoaXBQb3NpdGlvbiIsInB1c2giLCJncmlkIiwicGxhY2VMb2dpY2FsbHkiLCJwbGFjZUluR3JpZCIsIm1pbmltdW0iLCJwb3NpdGlvbnMiLCJyZWR1Y2UiLCJzdG9yZWQiLCJwbGFjZWRQb3MiLCJnZXRSb3dWYWx1ZSIsIkluZmluaXR5IiwiZ2V0Q29sVmFsdWUiLCJuZXdTaGlwIiwic29tZSIsIm5ld1BvcyIsImNoZWNrVmFsaWRQb3NpdGlvbiIsInBvcyIsIm5ld1Jvd1ZhbHVlIiwibmV3Q29sVmFsdWUiLCJwbGFjZWRTaGlwIiwibWluUm93VmFsdWUiLCJfbWluUm93VmFsdWUiLCJtYXhSb3dWYWx1ZSIsIl9tYXhSb3dWYWx1ZSIsIm1pbkNvbFZhbHVlIiwiX21pbkNvbFZhbHVlIiwibWF4Q29sVmFsdWUiLCJfbWF4Q29sVmFsdWUiLCJpbmNsdWRlcyIsImkiLCJsZW5ndGgiLCJoaXQiLCJldmVyeSIsImlzU3VuayIsInNoaXBMZW5ndGgiLCJmb3JFYWNoIiwiZ3JpZE5yIiwiZmluZEdyaWROciIsImdyaWROb2RlIiwiY2hpbGRyZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJpZCIsInNwbGljZSIsImluZGV4T2YiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsInN1YnN0cmluZyIsInJlbW92ZSIsInJlbW92ZVNoaXBMb2dpY2FsbHkiLCJyZW1vdmVTaGlwRnJvbUdyaWQiLCJwbGF5ZXIiLCJzaGlwVHlwZSIsInJhbmRvbVNoaXBQb3NpdGlvbiIsInBsYWNlIiwiTnVtYmVyIiwiZGlyZWN0aW9uIiwidmFsIiwicm93VmFsdWUiLCJjb2xWYWx1ZSIsIlR5cGVFcnJvciIsIm5yIiwiY29scyIsIk1hdGgiLCJmbG9vciIsInJvdyIsImZpbmRHcmlkUm93IiwiY29sIiwiZmluZEdyaWRDb2wiLCJjb250YWlucyIsIlNoaXAiLCJQbGF5ZXIiLCJpc0h1bWFuIiwiZ2FtZWJvYXJkIiwib3RoZXJQbGF5ZXIiLCJyZWNlaXZlQXR0YWNrIiwib3RoZXJHcmlkIiwidW5kZWZpbmVkIiwidXNlQWkiLCJncmlkQ2VsbHMiLCJzdW5rU2hpcHMiLCJmaWx0ZXIiLCJfcmFuZG9tUGFpciIsInJhbmRvbU5yMSIsInJhbmRvbU5yMiIsInBvc2l0aW9uIiwidmFsaWQiLCJhaUNob29zZUhpdCIsInJhbmRvbSIsInNoaXBJZCIsInN0YXJ0UG9zIiwiYWRkVG9Qb3NpdGlvbiIsIm9wcEdyaWRDZWxscyIsIm9wcG9uZW50Iiwic2hpcEhpdHMiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJhZGphY2VudCIsImZpbmRHcmlkTnJGcm9tUG9zaXRpb24iLCJiZWhpbmQiLCJmcm9udCIsInN1bmsiLCJnYW1lR3JpZHMiLCJkb2N1bWVudCIsImh1bWFuR3JpZCIsImNvbXB1dGVyR3JpZCIsInNoaXBTZWxlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwibXVsdGlCdXR0IiwicmFuZG9tQnV0dCIsImdyaWRDZWxsIiwiY3JlYXRlRWxlbWVudCIsImh1bWFuR2FtZWJvYXJkIiwiY29tcHV0ZXJHYW1lYm9hcmQiLCJodW1hbiIsImNvbXB1dGVyIiwicGxheWluZyIsInNlbGVjdGlvbiIsImlzU2hpcFNlbGVjdGVkIiwic2VsZWN0ZWRJZCIsInNlbGVjdGlvblZhbGlkIiwicGxhY2VkU2hpcElkcyIsInNoaXBMZW5ndGhzIiwiQyIsIkIiLCJEIiwiUyIsIlAiLCJjZWxsU2hvb3RMaXN0ZW5lciIsIm5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiaHVtYW5QbGF5cyIsImhvdmVyU2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsImZpbmRQb3NpdGlvbkZyb21HcmlkTnIiLCJjZWxsR3JpZExpc3RlbmVycyIsInNlbGVjdGVkU2hpcCIsInNoaXBFbGVtZW50Iiwic2VsZWN0ZWRQb3MiLCJwb3NHcmlkTnIiLCJyZW1vdmVTaGlwIiwic2VsZWN0U2hpcCIsInRleHRDb250ZW50IiwidW5zZWxlY3RTaGlwIiwic3RhcnRHYW1lIiwicm90YXRlIiwicmVzZXQiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiZ2VuZXJhdGVSYW5kb21TaGlwcyIsImdyaWRDcmVhdGlvbiIsImdhbWVHcmlkIiwic3R5bGUiLCJpbnNlcnRHcmlkQ2VsbHMiLCJyb3dzIiwiYXBwZW5kQ2hpbGQiLCJjbG9uZU5vZGUiLCJtYXJrSGl0IiwiaHVtYW5BdHRhY2siLCJzaW5rU2hpcHMiLCJjaGVja1dpbiIsImNvbXB1dGVyUGxheXMiLCJhdHRhY2tQb3NpdGlvbiIsImNvbXB1dGVyQXR0YWNrIiwic2luayIsImFsbFN1bmsiLCJ3aW5NZXNzYWdlIiwid2lubmVyIiwiYWxlcnQiLCJkaXNwbGF5IiwicGFyZW50Iiwic2hpcFNlbGVjdG9yIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsInNlbGVjdGVkU2hpcEVsZW1lbnQiLCJzaGlwRWxlbWVudHMiLCJib3JkZXIiXSwic291cmNlUm9vdCI6IiJ9
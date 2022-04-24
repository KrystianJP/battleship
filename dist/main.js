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

          var position = String(randomNr1) + ":" + String(randomNr2); // making sure not chosen next to hit

          var nextToShip = !otherPlayer.gameboard.checkValidPosition(position, sunkShips);
        } while (nextToShip || !otherPlayer.gameboard.receiveAttack(position));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFqQjtBQUNBQyxFQUFBQSxVQUFVLEdBQUdoQyxNQUFiO0FBQ0FpQyxFQUFBQSxjQUFjLEdBQUcsS0FBakIsQ0FacUQsQ0FjckQ7O0FBQ0EyRCxFQUFBQSxtQkFBbUIsQ0FBQ3hCLEtBQXBCLENBQTBCMEIsTUFBMUIsR0FBbUMsZUFBbkM7QUFDRDs7QUFFRCxTQUFTbkMsWUFBVCxDQUFzQnhKLElBQXRCLEVBQTRCO0FBQzFCNEgsRUFBQUEsY0FBYyxHQUFHLEtBQWpCO0FBQ0FDLEVBQUFBLFVBQVUsR0FBRyxFQUFiO0FBQ0FDLEVBQUFBLGNBQWMsR0FBRyxLQUFqQixDQUgwQixDQUsxQjs7QUFDQTlILEVBQUFBLElBQUksQ0FBQ2lLLEtBQUwsQ0FBVzBCLE1BQVgsR0FBb0IsTUFBcEI7QUFDRDs7QUFFRCxTQUFTbEMsU0FBVCxHQUFxQjtBQUNuQi9CLEVBQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0FDLEVBQUFBLFNBQVMsR0FBRyxLQUFaO0FBQ0FULEVBQUFBLFNBQVMsQ0FBQ3FDLFdBQVYsR0FBd0IsT0FBeEI7QUFDQXBDLEVBQUFBLFVBQVUsQ0FBQzhDLEtBQVgsQ0FBaUJpQixPQUFqQixHQUEyQixNQUEzQjtBQUNBM0QsRUFBQUEsaUJBQWlCLENBQUN1QyxtQkFBbEIsQ0FBc0NyQyxRQUF0QyxFQUFnRFYsWUFBaEQ7QUFDRDs7QUFFRGdELFlBQVksRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3N0eWxlcy9zdHlsZS5jc3M/YTJmNSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMTB4MTAgeDpBLUogeTogMS0xMFxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBwbGFjZUxvZ2ljYWxseShzaGlwKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihzaGlwKSkge1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHBsYWNlKGdyaWQsIHNoaXApIHtcbiAgICBpZiAodGhpcy5wbGFjZUxvZ2ljYWxseShzaGlwKSkge1xuICAgICAgdGhpcy5wbGFjZUluR3JpZChncmlkLCBzaGlwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZ2V0Um93VmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKDAsIHBvcy5pbmRleE9mKFwiOlwiKSkpO1xuICB9XG5cbiAgc3RhdGljIGdldENvbFZhbHVlKHBvcykge1xuICAgIHJldHVybiBOdW1iZXIocG9zLnN1YnN0cmluZyhwb3MuaW5kZXhPZihcIjpcIikgKyAxKSk7XG4gIH1cblxuICBfbWluUm93VmFsdWUoc2hpcCkge1xuICAgIGxldCBtaW5pbXVtID0gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpIDwgc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICAgIHJldHVybiBtaW5pbXVtO1xuICB9XG4gIF9taW5Db2xWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKSA8IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIEluZmluaXR5KTtcbiAgfVxuICBfbWF4Um93VmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcykgPiBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCAtSW5maW5pdHkpO1xuICB9XG4gIF9tYXhDb2xWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKSA+IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIC1JbmZpbml0eSk7XG4gIH1cblxuICAvLyBkaXJlY3Rpb24gPSBcInJvd1wiIC8gXCJjb2xcIlxuICAvLyBwb3MgPSBcInJvdzpjb2xcIlxuICBzdGF0aWMgYWRkVG9Qb3NpdGlvbihwb3MsIGRpcmVjdGlvbiwgdmFsKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgLy8gZ2V0dGluZyBmaXJzdCBudW1iZXJcbiAgICAgIGxldCByb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgICAgbGV0IG5ld1Jvd1ZhbHVlID0gcm93VmFsdWUgKyB2YWw7XG4gICAgICAvLyBtYWtpbmcgc3VyZSBpdCBpcyB3aXRoaW4gcmFuZ2VcbiAgICAgIGlmIChuZXdSb3dWYWx1ZSA+IDEwIHx8IG5ld1Jvd1ZhbHVlIDwgMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBjb25jYXRlbmF0aW5nIHRvIGl0IHRoZSByZXN0IG9mIHRoZSBwb3NpdGlvblxuICAgICAgcmV0dXJuIFN0cmluZyhuZXdSb3dWYWx1ZSkgKyBwb3Muc3Vic3RyaW5nKHBvcy5pbmRleE9mKFwiOlwiKSk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIHJvdyBicmFuY2hcbiAgICAgIGxldCBjb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuICAgICAgbGV0IG5ld0NvbFZhbHVlID0gY29sVmFsdWUgKyB2YWw7XG4gICAgICBpZiAobmV3Q29sVmFsdWUgPiAxMCB8fCBuZXdDb2xWYWx1ZSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpICsgMSkgKyBTdHJpbmcobmV3Q29sVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSU5WQUxJRCBESVJFQ1RJT04gUEFSQU1FVEVSXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiBzaGlwJ3MgcG9zaXRpb24gaXMgdmFsaWQgYnkgY2hlY2tpbmcgaXQgaXMgbmVhciBvciBvdmVybGFwcGluZyBleGlzdGluZyBzaGlwXG4gIGNoZWNrVmFsaWRTaGlwUG9zaXRpb24obmV3U2hpcCkge1xuICAgIC8vIGdpdmVzIHRydWUgaWYgYSBzaW5nbGUgdmFsdWUgaXMgaW52YWxpZCwgc28gbXVzdCBiZSBpbnZlcnRlZFxuICAgIHJldHVybiAhbmV3U2hpcC5wb3NpdGlvbnMuc29tZSgobmV3UG9zKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuY2hlY2tWYWxpZFBvc2l0aW9uKG5ld1BvcywgdGhpcy5zaGlwcyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkUG9zaXRpb24ocG9zLCBzaGlwcykge1xuICAgIGxldCBuZXdSb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgIGxldCBuZXdDb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuXG4gICAgLy8gZ2V0IG1pbiArIG1heCB2YWx1ZSBvZiByb3cgYW5kIGNvbCBmb3IgZWFjaCBzaGlwIGFuZCBjaGVjayBpZiB0aGUgbmV3IHBvc2l0aW9uIHZhbHVlcyBhcmUgd2l0aGluIHRoZW0gKy0xXG4gICAgLy8gaWYgYSBzaW5nbGUgdmFsdWUgaXMgSU5WQUxJRCwgcmV0dXJuIFRSVUVcbiAgICByZXR1cm4gIXNoaXBzLnNvbWUoKHBsYWNlZFNoaXApID0+IHtcbiAgICAgIGxldCBtaW5Sb3dWYWx1ZSA9IHRoaXMuX21pblJvd1ZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1heFJvd1ZhbHVlID0gdGhpcy5fbWF4Um93VmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWluQ29sVmFsdWUgPSB0aGlzLl9taW5Db2xWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtYXhDb2xWYWx1ZSA9IHRoaXMuX21heENvbFZhbHVlKHBsYWNlZFNoaXApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG5ld1Jvd1ZhbHVlID49IG1pblJvd1ZhbHVlIC0gMSAmJlxuICAgICAgICBuZXdSb3dWYWx1ZSA8PSBtYXhSb3dWYWx1ZSArIDEgJiZcbiAgICAgICAgbmV3Q29sVmFsdWUgPj0gbWluQ29sVmFsdWUgLSAxICYmXG4gICAgICAgIG5ld0NvbFZhbHVlIDw9IG1heENvbFZhbHVlICsgMVxuICAgICAgKSB7XG4gICAgICAgIC8vIElOVkFMSUQgVEhFUkVGT1JFIFRSVUVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyB3aWxsIGNoZWNrIGlmIHZhbGlkIHBvc2l0aW9uIGFuZCBzZW5kIHRoZSBoaXQsIHRoZSBzaGlwIHdpbGwgdGhlbiBjaGVjayBpZiBpdCBpcyBoaXRcbiAgcmVjZWl2ZUF0dGFjayhwb3MpIHtcbiAgICBpZiAoIXRoaXMuaGl0UG9zaXRpb25zLmluY2x1ZGVzKHBvcykpIHtcbiAgICAgIHRoaXMuaGl0UG9zaXRpb25zLnB1c2gocG9zKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5oaXQocG9zKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWxsU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWRSb3cobnIsIGNvbHMpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihuciAvIGNvbHMpICsgMTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZENvbChuciwgcm93LCBjb2xzKSB7XG4gICAgcmV0dXJuIG5yIC0gKHJvdyAtIDEpICogY29scyArIDE7XG4gIH1cblxuICBzdGF0aWMgZmluZFBvc2l0aW9uRnJvbUdyaWROcihuciwgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZmluZEdyaWRSb3cobnIsIGNvbHMpO1xuICAgIGxldCBjb2wgPSBHYW1lYm9hcmQuZmluZEdyaWRDb2wobnIsIHJvdywgY29scyk7XG4gICAgcmV0dXJuIFN0cmluZyhyb3cpICsgXCI6XCIgKyBTdHJpbmcoY29sKTtcbiAgfVxuXG4gIC8vIHJvdyBhbmQgY29sIHN0YXJ0aW5nIGZyb20gMVxuICBzdGF0aWMgZmluZEdyaWROcihjb2xzLCByb3csIGNvbCkge1xuICAgIHJldHVybiBjb2xzICogKHJvdyAtIDEpICsgKGNvbCAtIDEpO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zLCBjb2xzKSB7XG4gICAgbGV0IHJvdyA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgIGxldCBjb2wgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcbiAgICByZXR1cm4gR2FtZWJvYXJkLmZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpO1xuICB9XG5cbiAgLy8gRE9NIG1hbmlwdWxhdGlvblxuICAvLyBwbGFjaW5nIHRoZSBzaGlwIHZpc3VhbGx5IG9uIGdpdmVuIGdyaWRcbiAgcGxhY2VJbkdyaWQoZ3JpZCwgc2hpcCkge1xuICAgIGxldCBzaGlwTGVuZ3RoID0gc2hpcC5wb3NpdGlvbnMubGVuZ3RoO1xuICAgIHNoaXAucG9zaXRpb25zLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgbGV0IGdyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yKFxuICAgICAgICAxMCxcbiAgICAgICAgR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyksXG4gICAgICAgIEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpLFxuICAgICAgKTtcbiAgICAgIGxldCBncmlkTm9kZSA9IGdyaWQuY2hpbGRyZW5bZ3JpZE5yXTtcbiAgICAgIGdyaWROb2RlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgZ3JpZE5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaGlwXCIgKyBTdHJpbmcoc2hpcC5pZCkpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIG1hcmtIaXQoZ3JpZCwgZ3JpZE5yKSB7XG4gICAgbGV0IGdyaWROb2RlID0gZ3JpZC5jaGlsZHJlbltncmlkTnJdO1xuICAgIGdyaWROb2RlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tIaXQoZ3JpZCwgZ3JpZE5yKSB7XG4gICAgaWYgKGdyaWQuY2hpbGRyZW5bZ3JpZE5yXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVNoaXBMb2dpY2FsbHkoaWQpIHtcbiAgICB0aGlzLnNoaXBzLnNvbWUoKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlkID09PSBpZCkge1xuICAgICAgICB0aGlzLnNoaXBzLnNwbGljZSh0aGlzLnNoaXBzLmluZGV4T2Yoc2hpcCksIDEpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVNoaXBGcm9tR3JpZChncmlkLCBpZCkge1xuICAgIGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIikuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaWQuc3Vic3RyaW5nKDQpID09PSBpZCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVNoaXAoZ3JpZCwgaWQpIHtcbiAgICB0aGlzLnJlbW92ZVNoaXBMb2dpY2FsbHkoaWQpO1xuICAgIHRoaXMucmVtb3ZlU2hpcEZyb21HcmlkKGdyaWQsIGlkKTtcbiAgfVxuXG4gIGdlbmVyYXRlUmFuZG9tU2hpcHMocGxheWVyLCBncmlkKSB7XG4gICAgZm9yIChsZXQgc2hpcFR5cGUgb2YgW1xuICAgICAgW1wiQ1wiLCA1XSxcbiAgICAgIFtcIkJcIiwgNF0sXG4gICAgICBbXCJEXCIsIDNdLFxuICAgICAgW1wiU1wiLCAzXSxcbiAgICAgIFtcIlBcIiwgMl0sXG4gICAgXSkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IHNoaXAgPSBwbGF5ZXIucmFuZG9tU2hpcFBvc2l0aW9uKHNoaXBUeXBlWzFdLCBzaGlwVHlwZVswXSk7IC8vIHNoaXAgb2JqZWN0IC8gZmFsc2VcbiAgICAgICAgaWYgKHNoaXApIHtcbiAgICAgICAgICB0aGlzLnBsYWNlKGdyaWQsIHNoaXApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAvLyBpc0h1bWFuID0gdHJ1ZSAvIGZhbHNlXG4gIGNvbnN0cnVjdG9yKGlzSHVtYW4sIGdhbWVib2FyZCkge1xuICAgIHRoaXMuaXNIdW1hbiA9IGlzSHVtYW47XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIH1cblxuICBodW1hbkF0dGFjayhvdGhlclBsYXllciwgcG9zKSB7XG4gICAgb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zKTtcbiAgICByZXR1cm4gcG9zO1xuICB9XG5cbiAgLy8gcmV0dXJucyBldmVudHVhbCBhdHRhY2tlZCBwb3NpdGlvblxuICBjb21wdXRlckF0dGFjayhvdGhlclBsYXllciwgb3RoZXJHcmlkID0gdW5kZWZpbmVkKSB7XG4gICAgbGV0IHVzZUFpID0gZmFsc2U7XG4gICAgaWYgKG90aGVyR3JpZCkge1xuICAgICAgbGV0IGdyaWRDZWxscyA9IG90aGVyR3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZENlbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBncmlkQ2VsbHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSAmJlxuICAgICAgICAgIGdyaWRDZWxsc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgJiZcbiAgICAgICAgICAhZ3JpZENlbGxzW2ldLmNsYXNzTGlzdC5jb250YWlucyhcInN1bmtcIilcbiAgICAgICAgKSB7XG4gICAgICAgICAgdXNlQWkgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghdXNlQWkpIHtcbiAgICAgIGxldCBzdW5rU2hpcHMgPSBvdGhlclBsYXllci5nYW1lYm9hcmQuc2hpcHMuZmlsdGVyKChzaGlwKSA9PlxuICAgICAgICBzaGlwLmlzU3VuaygpLFxuICAgICAgKTtcbiAgICAgIGRvIHtcbiAgICAgICAgbGV0IFtyYW5kb21OcjEsIHJhbmRvbU5yMl0gPSB0aGlzLl9yYW5kb21QYWlyKCk7XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IFN0cmluZyhyYW5kb21OcjEpICsgXCI6XCIgKyBTdHJpbmcocmFuZG9tTnIyKTtcbiAgICAgICAgLy8gbWFraW5nIHN1cmUgbm90IGNob3NlbiBuZXh0IHRvIGhpdFxuICAgICAgICB2YXIgbmV4dFRvU2hpcCA9ICFvdGhlclBsYXllci5nYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKFxuICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgIHN1bmtTaGlwcyxcbiAgICAgICAgKTtcbiAgICAgIH0gd2hpbGUgKG5leHRUb1NoaXAgfHwgIW90aGVyUGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvc2l0aW9uKSk7XG4gICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuYWlDaG9vc2VIaXQoXG4gICAgICAgIG90aGVyR3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKSxcbiAgICAgICAgb3RoZXJQbGF5ZXIsXG4gICAgICApO1xuICAgICAgb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zaXRpb24pO1xuICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIF9yYW5kb21QYWlyKCkge1xuICAgIGxldCByYW5kb21OcjEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIGxldCByYW5kb21OcjIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIHJldHVybiBbcmFuZG9tTnIxLCByYW5kb21OcjJdO1xuICB9XG5cbiAgLy8gdGhpcyBtZXRob2RzIHJlcXVpcmVzIGJvdGggZ2FtZWJvYXJkIGFuZCBzaGlwIGNsYXNzZXNcbiAgcmFuZG9tU2hpcFBvc2l0aW9uKHNoaXBMZW5ndGgsIHNoaXBJZCkge1xuICAgIGxldCBwb3NpdGlvbnM7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgcG9zaXRpb25zID0gW107XG4gICAgICBsZXQgc3RhcnRQb3MgPVxuICAgICAgICBTdHJpbmcoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSkgKyAxKSArXG4gICAgICAgIFwiOlwiICtcbiAgICAgICAgU3RyaW5nKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpICsgMSk7XG4gICAgICBsZXQgZGlyZWN0aW9uID0gW1wiY29sXCIsIFwicm93XCJdW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvc2l0aW9ucy5wdXNoKEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zLCBkaXJlY3Rpb24sIGkpKTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NpdGlvbnMuc29tZSgocG9zKSA9PiBwb3MgPT09IGZhbHNlKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKHBvc2l0aW9ucywgc2hpcElkKTtcbiAgICBpZiAodGhpcy5nYW1lYm9hcmQuY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihzaGlwKSkge1xuICAgICAgcmV0dXJuIHNoaXA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIHVuZGVyIHRoZSBhc3N1bXB0aW9uIHRoYXQgdGhlcmUgaXMgYW4gZXhpc3RpbmcgaGl0XG4gIGFpQ2hvb3NlSGl0KG9wcEdyaWRDZWxscywgb3Bwb25lbnQpIHtcbiAgICBsZXQgc3Vua1NoaXBzID0gb3Bwb25lbnQuZ2FtZWJvYXJkLnNoaXBzLmZpbHRlcigoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSk7XG4gICAgbGV0IHNoaXBIaXRzID0gb3Bwb25lbnQuZ2FtZWJvYXJkLmhpdFBvc2l0aW9ucy5maWx0ZXIoKHBvcykgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHBvbmVudC5nYW1lYm9hcmQuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFvcHBvbmVudC5nYW1lYm9hcmQuc2hpcHNbaV0uaXNTdW5rKCkgJiZcbiAgICAgICAgICBvcHBvbmVudC5nYW1lYm9hcmQuc2hpcHNbaV0ucG9zaXRpb25zLmluY2x1ZGVzKHBvcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIGxldCBwb3NpdGlvbnMgPSBbXTtcbiAgICBpZiAoc2hpcEhpdHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBjaGVjayBhbGwgY2VsbHMgYWRqYWNlbnRcbiAgICAgIGxldCBsZWZ0ID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc2hpcEhpdHNbMF0sIFwiY29sXCIsIC0xKTtcbiAgICAgIGxldCByaWdodCA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHNoaXBIaXRzWzBdLCBcImNvbFwiLCAxKTtcbiAgICAgIGxldCB0b3AgPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzaGlwSGl0c1swXSwgXCJyb3dcIiwgLTEpO1xuICAgICAgbGV0IGJvdHRvbSA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHNoaXBIaXRzWzBdLCBcInJvd1wiLCAxKTtcbiAgICAgIGxldCBhZGphY2VudCA9IFtsZWZ0LCByaWdodCwgdG9wLCBib3R0b21dO1xuICAgICAgYWRqYWNlbnQuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICBsZXQgY2VsbCA9IG9wcEdyaWRDZWxsc1tHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3MsIDEwKV07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWNlbGwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpICYmXG4gICAgICAgICAgICBvcHBvbmVudC5nYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKHBvcywgc3Vua1NoaXBzKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcG9zaXRpb25zLnB1c2gocG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc2hpcEhpdHMubGVuZ3RoID4gMSkge1xuICAgICAgbGV0IGRpcmVjdGlvbjtcbiAgICAgIGlmIChcbiAgICAgICAgc2hpcEhpdHNbMF0gPT09IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHNoaXBIaXRzWzFdLCBcInJvd1wiLCAxKSB8fFxuICAgICAgICBzaGlwSGl0c1swXSA9PT0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc2hpcEhpdHNbMV0sIFwicm93XCIsIC0xKVxuICAgICAgKSB7XG4gICAgICAgIGRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXJlY3Rpb24gPSBcImNvbFwiO1xuICAgICAgfVxuXG4gICAgICBzaGlwSGl0cy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgbGV0IGJlaGluZCA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHBvcywgZGlyZWN0aW9uLCAtMSk7XG4gICAgICAgIGxldCBmcm9udCA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHBvcywgZGlyZWN0aW9uLCAxKTtcbiAgICAgICAgLy8gY2hlY2sgaWYgYmVoaW5kIGlzIHZhbGlkXG4gICAgICAgIGlmIChcbiAgICAgICAgICBiZWhpbmQgJiZcbiAgICAgICAgICAhb3BwR3JpZENlbGxzW1xuICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24oYmVoaW5kLCAxMClcbiAgICAgICAgICBdLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJlxuICAgICAgICAgIG9wcG9uZW50LmdhbWVib2FyZC5jaGVja1ZhbGlkUG9zaXRpb24oYmVoaW5kLCBzdW5rU2hpcHMpXG4gICAgICAgICkge1xuICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKGJlaGluZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgZnJvbnQgJiZcbiAgICAgICAgICAhb3BwR3JpZENlbGxzW1xuICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24oZnJvbnQsIDEwKVxuICAgICAgICAgIF0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpICYmXG4gICAgICAgICAgb3Bwb25lbnQuZ2FtZWJvYXJkLmNoZWNrVmFsaWRQb3NpdGlvbihmcm9udCwgc3Vua1NoaXBzKVxuICAgICAgICApIHtcbiAgICAgICAgICBwb3NpdGlvbnMucHVzaChmcm9udCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zaXRpb25zLmxlbmd0aCldO1xuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmNsYXNzIFNoaXAge1xuICAvLyBwb3NpdGlvbnMgPSBbXCIxOjFcIiwgXCIxOjJcIiAsIFwiMTozXCJdIFwicm93OmNvbFwiXG4gIC8vIGlkID0gXCJDXCIgLyBcIkJcIiAvIFwiRFwiIC8gXCJTXCIgLyBcIlBcIlxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbnMsIGlkKSB7XG4gICAgdGhpcy5zaGlwTGVuZ3RoID0gcG9zaXRpb25zLmxlbmd0aDtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9ucztcbiAgICB0aGlzLmhpdFBvc2l0aW9ucyA9IFtdO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuXG4gIC8vIGR1cGxpY2F0ZSB2YWxpZGF0aW9uIG9jY3VycyBpbiBHYW1lYm9hcmQgb2JqZWN0c1xuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmhpdFBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0UG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5zaGlwTGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHNpbmsoZ3JpZCkge1xuICAgIGZvciAobGV0IHBvcyBvZiB0aGlzLnBvc2l0aW9ucykge1xuICAgICAgbGV0IGdyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvcywgMTApO1xuICAgICAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKVtncmlkTnJdLmNsYXNzTGlzdC5hZGQoXCJzdW5rXCIpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zLCBjb2xzKSB7XG4gICAgbGV0IHJvdyA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgIGxldCBjb2wgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcbiAgICByZXR1cm4gR2FtZWJvYXJkLmZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpO1xuICB9XG59XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5ib2R5LFxcbmh0bWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDMwMHB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgXFxcImh1bWFuIGNvbXB1dGVyXFxcIlxcbiAgICBcXFwiYm90dG9tIGJvdHRvbVxcXCI7XFxuICBnYXA6IDA7XFxufVxcblxcbi5odW1hbiB7XFxuICBncmlkLWFyZWE6IGh1bWFuO1xcbn1cXG5cXG4uY29tcHV0ZXIge1xcbiAgZ3JpZC1hcmVhOiBjb21wdXRlcjtcXG59XFxuXFxuLnBsYXllci1jb250YWluZXIge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi8qIENIQU5HRSBUSElTIFRPIEhVTUFOIFRPIEhJREUgQ09NUFVURVIgU0hJUFMgKi9cXG4uaHVtYW4gLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNjcsIDE2NywgMTY3KTtcXG59XFxuXFxuLnNoaXAuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDY4LCA2OCk7XFxufVxcblxcbi5ib3R0b20tY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogYm90dG9tO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4uc2hpcC1zZWxlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbiNzZWxlY3Rpb25DLFxcbiNzZWxlY3Rpb25CLFxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TLFxcbiNzZWxlY3Rpb25QIHtcXG4gIGhlaWdodDogNDBweDtcXG59XFxuXFxuI3NlbGVjdGlvbkMge1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jc2VsZWN0aW9uQiB7XFxuICB3aWR0aDogMTYwcHg7XFxufVxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TIHtcXG4gIHdpZHRoOiAxMjBweDtcXG59XFxuI3NlbGVjdGlvblAge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbi5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDI1NSk7XFxufVxcbi5zZWxlY3RlZC1pbnZhbGlkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAuZ3JleWVkLW91dCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDU5LCA1OSwgMjU1KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2hpcC5oaXQuc3VuayB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTE2LCAxNSwgMTUpO1xcbn1cXG5cXG4uYnV0dG9ucyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5Q0FBeUM7RUFDekMsU0FBUztFQUNULHNCQUFzQjtFQUN0QixVQUFVO0FBQ1o7QUFDQTs7RUFFRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDZCQUE2QjtFQUM3Qiw4QkFBOEI7RUFDOUI7O21CQUVpQjtFQUNqQixNQUFNO0FBQ1I7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsU0FBUztFQUNULGFBQWE7QUFDZjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixNQUFNO0VBQ04sdUJBQXVCO0VBQ3ZCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0VBQ2pCLHVCQUF1QjtBQUN6Qjs7QUFFQSxnREFBZ0Q7QUFDaEQ7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULFlBQVk7RUFDWixZQUFZO0VBQ1osZUFBZTtFQUNmLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTs7Ozs7RUFLRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBOztFQUVFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDO0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsNEJBQTRCO0VBQzVCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsNEJBQTRCO0VBQzVCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFNBQVM7QUFDWFwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbmJvZHksXFxuaHRtbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMzAwcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICBcXFwiaHVtYW4gY29tcHV0ZXJcXFwiXFxuICAgIFxcXCJib3R0b20gYm90dG9tXFxcIjtcXG4gIGdhcDogMDtcXG59XFxuXFxuLmh1bWFuIHtcXG4gIGdyaWQtYXJlYTogaHVtYW47XFxufVxcblxcbi5jb21wdXRlciB7XFxuICBncmlkLWFyZWE6IGNvbXB1dGVyO1xcbn1cXG5cXG4ucGxheWVyLWNvbnRhaW5lciB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDIwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLyogQ0hBTkdFIFRISVMgVE8gSFVNQU4gVE8gSElERSBDT01QVVRFUiBTSElQUyAqL1xcbi5odW1hbiAuc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE2NywgMTY3LCAxNjcpO1xcbn1cXG5cXG4uc2hpcC5oaXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgNjgsIDY4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiBib3R0b207XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi5zaGlwLXNlbGVjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuI3NlbGVjdGlvbkMsXFxuI3NlbGVjdGlvbkIsXFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMsXFxuI3NlbGVjdGlvblAge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4jc2VsZWN0aW9uQyB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNzZWxlY3Rpb25CIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG4jc2VsZWN0aW9uUCB7XFxuICB3aWR0aDogODBweDtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMjU1KTtcXG59XFxuLnNlbGVjdGVkLWludmFsaWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgMTU4LCAxNTgpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcC5ncmV5ZWQtb3V0IHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxufVxcblxcbi5idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTksIDU5LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5zaGlwLmhpdC5zdW5rIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxMTYsIDE1LCAxNSk7XFxufVxcblxcbi5idXR0b25zIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGdhcDogMjBweDtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbi8vIGdsb2JhbCB2YXJpYWJsZXNcbmNvbnN0IGdhbWVHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmF0dGxlc2hpcC1ncmlkXCIpO1xuY29uc3QgW2h1bWFuR3JpZCwgY29tcHV0ZXJHcmlkXSA9IGdhbWVHcmlkcztcbmNvbnN0IHNoaXBTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtc2VsZWN0aW9uXCIpO1xuY29uc3QgbXVsdGlCdXR0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tdWx0aS1idXR0b25cIik7XG5jb25zdCByYW5kb21CdXR0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yYW5kb20tYnV0dG9uXCIpO1xuXG5jb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5ncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuXG5sZXQgaHVtYW5HYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5sZXQgY29tcHV0ZXJHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5sZXQgaHVtYW4gPSBuZXcgUGxheWVyKHRydWUsIGh1bWFuR2FtZWJvYXJkKTtcbmxldCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoZmFsc2UsIGNvbXB1dGVyR2FtZWJvYXJkKTtcbmxldCBwbGF5aW5nID0gZmFsc2U7XG5cbmxldCBzZWxlY3Rpb24gPSB0cnVlO1xubGV0IGlzU2hpcFNlbGVjdGVkID0gZmFsc2U7XG5sZXQgc2VsZWN0ZWRJZDtcbmxldCBkaXJlY3Rpb24gPSBcImNvbFwiO1xubGV0IHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5sZXQgcGxhY2VkU2hpcElkcyA9IFtdO1xubGV0IHNoaXBMZW5ndGhzID0ge1xuICBDOiA1LFxuICBCOiA0LFxuICBEOiAzLFxuICBTOiAzLFxuICBQOiAyLFxufTtcblxuLy8gZXZlbnQgbGlzdGVuZXJzXG5mdW5jdGlvbiBjZWxsU2hvb3RMaXN0ZW5lcihncmlkKSB7XG4gIGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIikuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChwbGF5aW5nKSB7XG4gICAgICAgIGxldCBncmlkTnIgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGdyaWQuY2hpbGRyZW4sIG5vZGUpO1xuICAgICAgICBodW1hblBsYXlzKGdyaWQsIGdyaWROcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBob3ZlclNlbGVjdGlvbihzaGlwSWQsIGdyaWROciwgZ3JpZENlbGxzKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcElkXTsgaSsrKSB7XG4gICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgIC8vIG1ha2luZyBzdXJlIHRvIGZsYWcgcG9zaXRpb24gYXMgaW52YWxpZCBpZiBpdCBpcyB0b28gY2xvc2UgdG8gb3RoZXIgc2hpcHMgdG9vXG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICBpZiAoIWh1bWFuR2FtZWJvYXJkLmNoZWNrVmFsaWRQb3NpdGlvbihwb3NpdGlvbiwgaHVtYW5HYW1lYm9hcmQuc2hpcHMpKSB7XG4gICAgICAgIHBvc2l0aW9uID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgZ3JpZENlbGxzW0dhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCAxMCldLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgIFwic2VsZWN0ZWRcIixcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG4gICAgICAvLyBoaWdobGlnaHQgdGhlbSBhbGwgYXMgaW52YWxpZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgIGdyaWRDZWxsc1tcbiAgICAgICAgICAgIEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCAxMClcbiAgICAgICAgICBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZC1pbnZhbGlkXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNlbGxHcmlkTGlzdGVuZXJzKGdyaWQpIHtcbiAgZm9yIChsZXQgZ3JpZE5yID0gMDsgZ3JpZE5yIDwgMTAwOyBncmlkTnIrKykge1xuICAgIGxldCBncmlkQ2VsbHMgPSBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuICAgIGxldCBjZWxsID0gZ3JpZENlbGxzW2dyaWROcl07XG4gICAgLy8gd2hlbiBob3ZlcmluZywgaGlnaGxpZ2h0IHRoZSBjb3JyZWN0IGNlbGxzXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgIGlmIChzZWxlY3Rpb24gJiYgaXNTaGlwU2VsZWN0ZWQpIHtcbiAgICAgICAgc2VsZWN0aW9uVmFsaWQgPSB0cnVlO1xuICAgICAgICBob3ZlclNlbGVjdGlvbihzZWxlY3RlZElkLCBncmlkTnIsIGdyaWRDZWxscyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGhvdmVyaW5nIG9mZiwgZ2V0IHJpZCBvZiBhbGwgdGhlIGNoYW5nZXNcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0aW9uICYmIGlzU2hpcFNlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgZ3JpZENlbGxzW1xuICAgICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiLCBcInNlbGVjdGVkLWludmFsaWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmVtb3ZpbmcgcGxhY2VkIHNoaXAgd2hlbiBjbGlja2VkXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKCFpc1NoaXBTZWxlY3RlZCAmJiBzZWxlY3Rpb24pIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkU2hpcDtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgIGZvciAobGV0IHNoaXAgb2YgaHVtYW5HYW1lYm9hcmQuc2hpcHMpIHtcbiAgICAgICAgICBpZiAoc2hpcC5wb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFNoaXAgPSBzaGlwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkU2hpcCkge1xuICAgICAgICAgIGxldCBzaGlwRWxlbWVudCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRTaGlwLmlkLFxuICAgICAgICAgICk7XG4gICAgICAgICAgZm9yIChsZXQgc2VsZWN0ZWRQb3Mgb2Ygc2VsZWN0ZWRTaGlwLnBvc2l0aW9ucykge1xuICAgICAgICAgICAgbGV0IHBvc0dyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHNlbGVjdGVkUG9zLCAxMCk7XG4gICAgICAgICAgICBncmlkQ2VsbHNbcG9zR3JpZE5yXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGh1bWFuR2FtZWJvYXJkLnJlbW92ZVNoaXAoZ3JpZCwgc2VsZWN0ZWRTaGlwLmlkKTtcbiAgICAgICAgICBwbGFjZWRTaGlwSWRzLnNwbGljZShwbGFjZWRTaGlwSWRzLmluZGV4T2Yoc2VsZWN0ZWRTaGlwLmlkKSwgMSk7XG4gICAgICAgICAgc2VsZWN0U2hpcChcbiAgICAgICAgICAgIHNoaXBFbGVtZW50LFxuICAgICAgICAgICAgc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgc2hpcEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdyZXllZC1vdXRcIik7XG4gICAgICAgICAgaG92ZXJTZWxlY3Rpb24oc2VsZWN0ZWRTaGlwLmlkLCBncmlkTnIsIGdyaWRDZWxscyk7XG4gICAgICAgICAgbXVsdGlCdXR0LnRleHRDb250ZW50ID0gXCJST1RBVEVcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBjbGlja2luZyBvbiB0aGUgZ3JpZCB0byBwbGFjZVxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmIChpc1NoaXBTZWxlY3RlZCAmJiBzZWxlY3Rpb24gJiYgc2VsZWN0aW9uVmFsaWQpIHtcbiAgICAgICAgbGV0IHBvc2l0aW9ucyA9IFtdO1xuICAgICAgICBsZXQgc2hpcEVsZW1lbnQgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgXCIjc2VsZWN0aW9uXCIgKyBzZWxlY3RlZElkLFxuICAgICAgICApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NlbGVjdGVkSWRdOyBpKyspIHtcbiAgICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgICAgICAgcG9zaXRpb25zLnB1c2gocG9zaXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzaGlwID0gbmV3IFNoaXAocG9zaXRpb25zLCBzZWxlY3RlZElkKTtcbiAgICAgICAgaHVtYW5HYW1lYm9hcmQucGxhY2UoZ3JpZCwgc2hpcCk7XG4gICAgICAgIHBsYWNlZFNoaXBJZHMucHVzaChzZWxlY3RlZElkKTtcbiAgICAgICAgLy8gZ3JleSBpdCBvdXRcbiAgICAgICAgdW5zZWxlY3RTaGlwKHNoaXBFbGVtZW50KTtcbiAgICAgICAgc2hpcEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImdyZXllZC1vdXRcIik7XG4gICAgICAgIGlmIChwbGFjZWRTaGlwSWRzLmxlbmd0aCA+PSA1KSB7XG4gICAgICAgICAgbXVsdGlCdXR0LnRleHRDb250ZW50ID0gXCJTVEFSVFwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxubXVsdGlCdXR0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGlmIChtdWx0aUJ1dHQudGV4dENvbnRlbnQgPT09IFwiU1RBUlRcIikge1xuICAgIHN0YXJ0R2FtZSgpO1xuICB9IGVsc2UgaWYgKG11bHRpQnV0dC50ZXh0Q29udGVudCA9PT0gXCJST1RBVEVcIikge1xuICAgIHJvdGF0ZShzaGlwU2VsZWN0aW9uLCBcIi5zZWxlY3Rpb24tc2hpcFwiKTtcbiAgfSBlbHNlIGlmIChtdWx0aUJ1dHQudGV4dENvbnRlbnQgPT09IFwiUkVTRVRcIikge1xuICAgIHJlc2V0KCk7XG4gICAgbXVsdGlCdXR0LnRleHRDb250ZW50ID0gXCJST1RBVEVcIjtcbiAgfVxufSk7XG5cbnNoaXBTZWxlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgIHVuc2VsZWN0U2hpcChzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0aW9uXCIgKyBzZWxlY3RlZElkKSk7XG4gIH1cbn0pO1xuXG5zaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGxldCBpZCA9IHNoaXAuaWQuc3Vic3RyaW5nKHNoaXAuaWQubGVuZ3RoIC0gMSk7XG4gICAgaWYgKHNlbGVjdGlvbiAmJiAhcGxhY2VkU2hpcElkcy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgIGlmIChzZWxlY3RlZElkICE9PSBpZCkge1xuICAgICAgICBzZWxlY3RTaGlwKHNoaXAsIHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bnNlbGVjdFNoaXAoc2hpcCk7XG4gICAgICB9XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfSk7XG59KTtcblxucmFuZG9tQnV0dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBodW1hbkdhbWVib2FyZC5nZW5lcmF0ZVJhbmRvbVNoaXBzKGh1bWFuLCBodW1hbkdyaWQpO1xuICBtdWx0aUJ1dHQudGV4dENvbnRlbnQgPSBcIlNUQVJUXCI7XG59KTtcblxuLy8gaW5pdGlhbCBzdHlsaW5nXG5mdW5jdGlvbiBncmlkQ3JlYXRpb24oKSB7XG4gIGdhbWVHcmlkcy5mb3JFYWNoKChnYW1lR3JpZCkgPT4ge1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1yb3dzXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIC8vIGVudGVyaW5nIGFsbCBncmlkIGl0ZW1zXG4gICAgaW5zZXJ0R3JpZENlbGxzKDEwLCAxMCwgZ2FtZUdyaWQsIGdyaWRDZWxsKTtcbiAgfSk7XG4gIC8vIGFkZGluZyBpbml0aWFsIGNlbGwgZXZlbnQgbGlzdGVuZXJzXG4gIC8vIHNpbmNlIHRoZXkgb25seSBleGlzdCBvbmNlIGdyaWQgaXMgY3JlYXRlZFxuICBjZWxsU2hvb3RMaXN0ZW5lcihjb21wdXRlckdyaWQpO1xuICBjZWxsR3JpZExpc3RlbmVycyhodW1hbkdyaWQpO1xufVxuXG4vLyByb3dzLCBjb2xzIDogaW50LFxuLy8gZ3JpZCwgY2VsbCA6IERPTSBlbGVtZW50c1xuZnVuY3Rpb24gaW5zZXJ0R3JpZENlbGxzKHJvd3MsIGNvbHMsIGdyaWQsIGNlbGwpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzICogY29sczsgaSsrKSB7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsLmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbn1cblxuLy8gKioqIFRISVMgSVMgV0hFUkUgVEhFIFRVUk5TIEhBUFBFTlxuZnVuY3Rpb24gaHVtYW5QbGF5cyhncmlkLCBncmlkTnIpIHtcbiAgaWYgKFxuICAgIGNvbXB1dGVyR3JpZFxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpXG4gICAgICBbZ3JpZE5yXS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIilcbiAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIEdhbWVib2FyZC5tYXJrSGl0KGdyaWQsIGdyaWROcik7XG4gIGh1bWFuLmh1bWFuQXR0YWNrKGNvbXB1dGVyLCBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKSk7XG5cbiAgLy8gY2hlY2sgaWYgYW55IHNoaXBzIGFyZSBzdW5rXG4gIHNpbmtTaGlwcyhncmlkLCBjb21wdXRlckdhbWVib2FyZCk7XG4gIC8vIGNoZWNrIGlmIGh1bWFuIGhhcyB3b25cbiAgaWYgKGNoZWNrV2luKCkpIHtcbiAgICAvLyBsYXRlciByZXNldFxuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29tcHV0ZXJQbGF5cygpO1xufVxuXG4vLyBjb21wdXRlcidzIHR1cm5cbmZ1bmN0aW9uIGNvbXB1dGVyUGxheXMoKSB7XG4gIGxldCBhdHRhY2tQb3NpdGlvbiA9IGNvbXB1dGVyLmNvbXB1dGVyQXR0YWNrKGh1bWFuLCBodW1hbkdyaWQpO1xuICBsZXQgcm93VmFsdWUgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUoYXR0YWNrUG9zaXRpb24pO1xuICBsZXQgY29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUoYXR0YWNrUG9zaXRpb24pO1xuICBsZXQgZ3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnIoMTAsIHJvd1ZhbHVlLCBjb2xWYWx1ZSk7XG5cbiAgR2FtZWJvYXJkLm1hcmtIaXQoaHVtYW5HcmlkLCBncmlkTnIpO1xuICBzaW5rU2hpcHMoaHVtYW5HcmlkLCBodW1hbkdhbWVib2FyZCk7XG5cbiAgaWYgKGNoZWNrV2luKCkpIHtcbiAgICAvLyBsYXRlciByZXNldFxuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZnVuY3Rpb24gc2lua1NoaXBzKGdyaWQsIGdhbWVib2FyZCkge1xuICBnYW1lYm9hcmQuc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICBzaGlwLnNpbmsoZ3JpZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tXaW4oKSB7XG4gIGlmIChodW1hbkdhbWVib2FyZC5hbGxTdW5rKCkpIHtcbiAgICB3aW5NZXNzYWdlKFwiY29tcHV0ZXJcIik7XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGNvbXB1dGVyR2FtZWJvYXJkLmFsbFN1bmsoKSkge1xuICAgIHdpbk1lc3NhZ2UoXCJodW1hblwiKTtcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB3aW5NZXNzYWdlKHdpbm5lcikge1xuICAvLyBjcmVhdGUgbW9kYWxcbiAgYWxlcnQod2lubmVyICsgXCIgd29uXCIpO1xufVxuXG4vLyAqKiogRk9SIExBVEVSXG5mdW5jdGlvbiByZXNldCgpIHtcbiAgZ2FtZUdyaWRzLmZvckVhY2goKGdyaWQpID0+IHtcbiAgICBncmlkLnRleHRDb250ZW50ID0gXCJcIjtcbiAgfSk7XG4gIGdyaWRDcmVhdGlvbigpO1xuICBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHNoaXAuY2xhc3NMaXN0LnJlbW92ZShcImdyZXllZC1vdXRcIik7XG4gIH0pO1xuICBodW1hbkdhbWVib2FyZC5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgaHVtYW5HYW1lYm9hcmQuc2hpcHMgPSBbXTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQuaGl0UG9zaXRpb25zID0gW107XG4gIGNvbXB1dGVyR2FtZWJvYXJkLnNoaXBzID0gW107XG4gIHNlbGVjdGlvbiA9IHRydWU7XG4gIGlzU2hpcFNlbGVjdGVkID0gZmFsc2U7XG4gIHNlbGVjdGVkSWQ7XG4gIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG4gIHBsYWNlZFNoaXBJZHMgPSBbXTtcbiAgcGxheWluZyA9IGZhbHNlO1xuICByYW5kb21CdXR0LnN0eWxlLmRpc3BsYXkgPSBcImluaXRpYWxcIjtcbn1cblxuLy8gcm90YXRlIGJ1dHRvblxuLy8gVEVNUE9SQVJZIFZFUlNJT05cbmZ1bmN0aW9uIHJvdGF0ZShwYXJlbnQsIHNoaXBTZWxlY3Rvcikge1xuICAvLyBzd2l0Y2hpbmcgdGhlIGRpcmVjdGlvblxuICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgIGNhc2UgXCJjb2xcIjpcbiAgICAgIGRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicm93XCI6XG4gICAgICBkaXJlY3Rpb24gPSBcImNvbFwiO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyByb3RhdGluZyBhbGwgdGhlIHNoaXBzXG4gIHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNoaXBTZWxlY3RvcikuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCB3aWR0aCA9IHNoaXAub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHNoaXAub2Zmc2V0SGVpZ2h0O1xuICAgIHNoaXAuc3R5bGUud2lkdGggPSBTdHJpbmcoaGVpZ2h0KSArIFwicHhcIjtcbiAgICBzaGlwLnN0eWxlLmhlaWdodCA9IFN0cmluZyh3aWR0aCkgKyBcInB4XCI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RTaGlwKHNlbGVjdGVkU2hpcEVsZW1lbnQsIHNoaXBFbGVtZW50cykge1xuICAvLyBtYWtlIHN1cmUgdGhlIHJlc3QgYXJlIHVuc2VsZWN0ZWQgZmlyc3RcbiAgc2hpcEVsZW1lbnRzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICB1bnNlbGVjdFNoaXAoc2hpcCk7XG4gIH0pO1xuXG4gIGxldCBzaGlwSWQgPSBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLnN1YnN0cmluZyhcbiAgICBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLmxlbmd0aCAtIDEsXG4gICk7XG5cbiAgaXNTaGlwU2VsZWN0ZWQgPSB0cnVlO1xuICBzZWxlY3RlZElkID0gc2hpcElkO1xuICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gIC8vIGFkZCBib3JkZXIgdG8gc2VsZWN0ZWQgc2hpcFxuICBzZWxlY3RlZFNoaXBFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIHJlZFwiO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdFNoaXAoc2hpcCkge1xuICBpc1NoaXBTZWxlY3RlZCA9IGZhbHNlO1xuICBzZWxlY3RlZElkID0gXCJcIjtcbiAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcblxuICAvLyBhZGQgYm9yZGVyIHRvIHNlbGVjdGVkIHNoaXBcbiAgc2hpcC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBwbGF5aW5nID0gdHJ1ZTtcbiAgc2VsZWN0aW9uID0gZmFsc2U7XG4gIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiUkVTRVRcIjtcbiAgcmFuZG9tQnV0dC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGNvbXB1dGVyR2FtZWJvYXJkLmdlbmVyYXRlUmFuZG9tU2hpcHMoY29tcHV0ZXIsIGNvbXB1dGVyR3JpZCk7XG59XG5cbmdyaWRDcmVhdGlvbigpO1xuIl0sIm5hbWVzIjpbIkdhbWVib2FyZCIsImhpdFBvc2l0aW9ucyIsInNoaXBzIiwic2hpcCIsImNoZWNrVmFsaWRTaGlwUG9zaXRpb24iLCJwdXNoIiwiZ3JpZCIsInBsYWNlTG9naWNhbGx5IiwicGxhY2VJbkdyaWQiLCJtaW5pbXVtIiwicG9zaXRpb25zIiwicmVkdWNlIiwic3RvcmVkIiwicGxhY2VkUG9zIiwiZ2V0Um93VmFsdWUiLCJJbmZpbml0eSIsImdldENvbFZhbHVlIiwibmV3U2hpcCIsInNvbWUiLCJuZXdQb3MiLCJjaGVja1ZhbGlkUG9zaXRpb24iLCJwb3MiLCJuZXdSb3dWYWx1ZSIsIm5ld0NvbFZhbHVlIiwicGxhY2VkU2hpcCIsIm1pblJvd1ZhbHVlIiwiX21pblJvd1ZhbHVlIiwibWF4Um93VmFsdWUiLCJfbWF4Um93VmFsdWUiLCJtaW5Db2xWYWx1ZSIsIl9taW5Db2xWYWx1ZSIsIm1heENvbFZhbHVlIiwiX21heENvbFZhbHVlIiwiaW5jbHVkZXMiLCJpIiwibGVuZ3RoIiwiaGl0IiwiZXZlcnkiLCJpc1N1bmsiLCJzaGlwTGVuZ3RoIiwiZm9yRWFjaCIsImdyaWROciIsImZpbmRHcmlkTnIiLCJncmlkTm9kZSIsImNoaWxkcmVuIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwiaWQiLCJzcGxpY2UiLCJpbmRleE9mIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJzdWJzdHJpbmciLCJyZW1vdmUiLCJyZW1vdmVTaGlwTG9naWNhbGx5IiwicmVtb3ZlU2hpcEZyb21HcmlkIiwicGxheWVyIiwic2hpcFR5cGUiLCJyYW5kb21TaGlwUG9zaXRpb24iLCJwbGFjZSIsIk51bWJlciIsImRpcmVjdGlvbiIsInZhbCIsInJvd1ZhbHVlIiwiY29sVmFsdWUiLCJUeXBlRXJyb3IiLCJuciIsImNvbHMiLCJNYXRoIiwiZmxvb3IiLCJyb3ciLCJmaW5kR3JpZFJvdyIsImNvbCIsImZpbmRHcmlkQ29sIiwiY29udGFpbnMiLCJTaGlwIiwiUGxheWVyIiwiaXNIdW1hbiIsImdhbWVib2FyZCIsIm90aGVyUGxheWVyIiwicmVjZWl2ZUF0dGFjayIsIm90aGVyR3JpZCIsInVuZGVmaW5lZCIsInVzZUFpIiwiZ3JpZENlbGxzIiwic3Vua1NoaXBzIiwiZmlsdGVyIiwiX3JhbmRvbVBhaXIiLCJyYW5kb21OcjEiLCJyYW5kb21OcjIiLCJwb3NpdGlvbiIsIm5leHRUb1NoaXAiLCJhaUNob29zZUhpdCIsInJhbmRvbSIsInNoaXBJZCIsInN0YXJ0UG9zIiwiYWRkVG9Qb3NpdGlvbiIsIm9wcEdyaWRDZWxscyIsIm9wcG9uZW50Iiwic2hpcEhpdHMiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJhZGphY2VudCIsImZpbmRHcmlkTnJGcm9tUG9zaXRpb24iLCJiZWhpbmQiLCJmcm9udCIsInN1bmsiLCJnYW1lR3JpZHMiLCJkb2N1bWVudCIsImh1bWFuR3JpZCIsImNvbXB1dGVyR3JpZCIsInNoaXBTZWxlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwibXVsdGlCdXR0IiwicmFuZG9tQnV0dCIsImdyaWRDZWxsIiwiY3JlYXRlRWxlbWVudCIsImh1bWFuR2FtZWJvYXJkIiwiY29tcHV0ZXJHYW1lYm9hcmQiLCJodW1hbiIsImNvbXB1dGVyIiwicGxheWluZyIsInNlbGVjdGlvbiIsImlzU2hpcFNlbGVjdGVkIiwic2VsZWN0ZWRJZCIsInNlbGVjdGlvblZhbGlkIiwicGxhY2VkU2hpcElkcyIsInNoaXBMZW5ndGhzIiwiQyIsIkIiLCJEIiwiUyIsIlAiLCJjZWxsU2hvb3RMaXN0ZW5lciIsIm5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJjYWxsIiwiaHVtYW5QbGF5cyIsImhvdmVyU2VsZWN0aW9uIiwic3RhcnRQb3NpdGlvbiIsImZpbmRQb3NpdGlvbkZyb21HcmlkTnIiLCJjZWxsR3JpZExpc3RlbmVycyIsInNlbGVjdGVkU2hpcCIsInNoaXBFbGVtZW50Iiwic2VsZWN0ZWRQb3MiLCJwb3NHcmlkTnIiLCJyZW1vdmVTaGlwIiwic2VsZWN0U2hpcCIsInRleHRDb250ZW50IiwidW5zZWxlY3RTaGlwIiwic3RhcnRHYW1lIiwicm90YXRlIiwicmVzZXQiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiZ2VuZXJhdGVSYW5kb21TaGlwcyIsImdyaWRDcmVhdGlvbiIsImdhbWVHcmlkIiwic3R5bGUiLCJpbnNlcnRHcmlkQ2VsbHMiLCJyb3dzIiwiYXBwZW5kQ2hpbGQiLCJjbG9uZU5vZGUiLCJtYXJrSGl0IiwiaHVtYW5BdHRhY2siLCJzaW5rU2hpcHMiLCJjaGVja1dpbiIsImNvbXB1dGVyUGxheXMiLCJhdHRhY2tQb3NpdGlvbiIsImNvbXB1dGVyQXR0YWNrIiwic2luayIsImFsbFN1bmsiLCJ3aW5NZXNzYWdlIiwid2lubmVyIiwiYWxlcnQiLCJkaXNwbGF5IiwicGFyZW50Iiwic2hpcFNlbGVjdG9yIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsInNlbGVjdGVkU2hpcEVsZW1lbnQiLCJzaGlwRWxlbWVudHMiLCJib3JkZXIiXSwic291cmNlUm9vdCI6IiJ9
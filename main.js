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
  reset();
  humanGameboard.generateRandomShips(human, humanGrid);
  placedShipIds = Object.keys(shipLengths);
  shipSelection.querySelectorAll(".selection-ship").forEach(function (ship) {
    console.log(ship);
    ship.classList.add("greyed-out");
  });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzP2EyZjUiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDEweDEwIHg6QS1KIHk6IDEtMTBcbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGl0UG9zaXRpb25zID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgcGxhY2VMb2dpY2FsbHkoc2hpcCkge1xuICAgIGlmICh0aGlzLmNoZWNrVmFsaWRTaGlwUG9zaXRpb24oc2hpcCkpIHtcbiAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwbGFjZShncmlkLCBzaGlwKSB7XG4gICAgaWYgKHRoaXMucGxhY2VMb2dpY2FsbHkoc2hpcCkpIHtcbiAgICAgIHRoaXMucGxhY2VJbkdyaWQoZ3JpZCwgc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGdldFJvd1ZhbHVlKHBvcykge1xuICAgIHJldHVybiBOdW1iZXIocG9zLnN1YnN0cmluZygwLCBwb3MuaW5kZXhPZihcIjpcIikpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb2xWYWx1ZShwb3MpIHtcbiAgICByZXR1cm4gTnVtYmVyKHBvcy5zdWJzdHJpbmcocG9zLmluZGV4T2YoXCI6XCIpICsgMSkpO1xuICB9XG5cbiAgX21pblJvd1ZhbHVlKHNoaXApIHtcbiAgICBsZXQgbWluaW11bSA9IHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKSA8IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIEluZmluaXR5KTtcbiAgICByZXR1cm4gbWluaW11bTtcbiAgfVxuICBfbWluQ29sVmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcykgPCBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCBJbmZpbml0eSk7XG4gIH1cbiAgX21heFJvd1ZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgLUluZmluaXR5KTtcbiAgfVxuICBfbWF4Q29sVmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcykgPiBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCAtSW5maW5pdHkpO1xuICB9XG5cbiAgLy8gZGlyZWN0aW9uID0gXCJyb3dcIiAvIFwiY29sXCJcbiAgLy8gcG9zID0gXCJyb3c6Y29sXCJcbiAgc3RhdGljIGFkZFRvUG9zaXRpb24ocG9zLCBkaXJlY3Rpb24sIHZhbCkge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgIC8vIGdldHRpbmcgZmlyc3QgbnVtYmVyXG4gICAgICBsZXQgcm93VmFsdWUgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICAgIGxldCBuZXdSb3dWYWx1ZSA9IHJvd1ZhbHVlICsgdmFsO1xuICAgICAgLy8gbWFraW5nIHN1cmUgaXQgaXMgd2l0aGluIHJhbmdlXG4gICAgICBpZiAobmV3Um93VmFsdWUgPiAxMCB8fCBuZXdSb3dWYWx1ZSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gY29uY2F0ZW5hdGluZyB0byBpdCB0aGUgcmVzdCBvZiB0aGUgcG9zaXRpb25cbiAgICAgIHJldHVybiBTdHJpbmcobmV3Um93VmFsdWUpICsgcG9zLnN1YnN0cmluZyhwb3MuaW5kZXhPZihcIjpcIikpO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSByZXZlcnNlIG9mIHRoZSByb3cgYnJhbmNoXG4gICAgICBsZXQgY29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcbiAgICAgIGxldCBuZXdDb2xWYWx1ZSA9IGNvbFZhbHVlICsgdmFsO1xuICAgICAgaWYgKG5ld0NvbFZhbHVlID4gMTAgfHwgbmV3Q29sVmFsdWUgPCAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb3Muc3Vic3RyaW5nKDAsIHBvcy5pbmRleE9mKFwiOlwiKSArIDEpICsgU3RyaW5nKG5ld0NvbFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIklOVkFMSUQgRElSRUNUSU9OIFBBUkFNRVRFUlwiKTtcbiAgICB9XG4gIH1cblxuICAvLyBjaGVja3MgaWYgc2hpcCdzIHBvc2l0aW9uIGlzIHZhbGlkIGJ5IGNoZWNraW5nIGl0IGlzIG5lYXIgb3Igb3ZlcmxhcHBpbmcgZXhpc3Rpbmcgc2hpcFxuICBjaGVja1ZhbGlkU2hpcFBvc2l0aW9uKG5ld1NoaXApIHtcbiAgICAvLyBnaXZlcyB0cnVlIGlmIGEgc2luZ2xlIHZhbHVlIGlzIGludmFsaWQsIHNvIG11c3QgYmUgaW52ZXJ0ZWRcbiAgICByZXR1cm4gIW5ld1NoaXAucG9zaXRpb25zLnNvbWUoKG5ld1BvcykgPT4ge1xuICAgICAgcmV0dXJuICF0aGlzLmNoZWNrVmFsaWRQb3NpdGlvbihuZXdQb3MsIHRoaXMuc2hpcHMpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tWYWxpZFBvc2l0aW9uKHBvcywgc2hpcHMpIHtcbiAgICBsZXQgbmV3Um93VmFsdWUgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgbmV3Q29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcblxuICAgIC8vIGdldCBtaW4gKyBtYXggdmFsdWUgb2Ygcm93IGFuZCBjb2wgZm9yIGVhY2ggc2hpcCBhbmQgY2hlY2sgaWYgdGhlIG5ldyBwb3NpdGlvbiB2YWx1ZXMgYXJlIHdpdGhpbiB0aGVtICstMVxuICAgIC8vIGlmIGEgc2luZ2xlIHZhbHVlIGlzIElOVkFMSUQsIHJldHVybiBUUlVFXG4gICAgcmV0dXJuICFzaGlwcy5zb21lKChwbGFjZWRTaGlwKSA9PiB7XG4gICAgICBsZXQgbWluUm93VmFsdWUgPSB0aGlzLl9taW5Sb3dWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtYXhSb3dWYWx1ZSA9IHRoaXMuX21heFJvd1ZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1pbkNvbFZhbHVlID0gdGhpcy5fbWluQ29sVmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWF4Q29sVmFsdWUgPSB0aGlzLl9tYXhDb2xWYWx1ZShwbGFjZWRTaGlwKTtcblxuICAgICAgaWYgKFxuICAgICAgICBuZXdSb3dWYWx1ZSA+PSBtaW5Sb3dWYWx1ZSAtIDEgJiZcbiAgICAgICAgbmV3Um93VmFsdWUgPD0gbWF4Um93VmFsdWUgKyAxICYmXG4gICAgICAgIG5ld0NvbFZhbHVlID49IG1pbkNvbFZhbHVlIC0gMSAmJlxuICAgICAgICBuZXdDb2xWYWx1ZSA8PSBtYXhDb2xWYWx1ZSArIDFcbiAgICAgICkge1xuICAgICAgICAvLyBJTlZBTElEIFRIRVJFRk9SRSBUUlVFXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gd2lsbCBjaGVjayBpZiB2YWxpZCBwb3NpdGlvbiBhbmQgc2VuZCB0aGUgaGl0LCB0aGUgc2hpcCB3aWxsIHRoZW4gY2hlY2sgaWYgaXQgaXMgaGl0XG4gIHJlY2VpdmVBdHRhY2socG9zKSB7XG4gICAgaWYgKCF0aGlzLmhpdFBvc2l0aW9ucy5pbmNsdWRlcyhwb3MpKSB7XG4gICAgICB0aGlzLmhpdFBvc2l0aW9ucy5wdXNoKHBvcyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNbaV0uaGl0KHBvcykpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkUm93KG5yLCBjb2xzKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnIgLyBjb2xzKSArIDE7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWRDb2wobnIsIHJvdywgY29scykge1xuICAgIHJldHVybiBuciAtIChyb3cgLSAxKSAqIGNvbHMgKyAxO1xuICB9XG5cbiAgc3RhdGljIGZpbmRQb3NpdGlvbkZyb21HcmlkTnIobnIsIGNvbHMpIHtcbiAgICBsZXQgcm93ID0gR2FtZWJvYXJkLmZpbmRHcmlkUm93KG5yLCBjb2xzKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmZpbmRHcmlkQ29sKG5yLCByb3csIGNvbHMpO1xuICAgIHJldHVybiBTdHJpbmcocm93KSArIFwiOlwiICsgU3RyaW5nKGNvbCk7XG4gIH1cblxuICAvLyByb3cgYW5kIGNvbCBzdGFydGluZyBmcm9tIDFcbiAgc3RhdGljIGZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpIHtcbiAgICByZXR1cm4gY29scyAqIChyb3cgLSAxKSArIChjb2wgLSAxKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvcywgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgcmV0dXJuIEdhbWVib2FyZC5maW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKTtcbiAgfVxuXG4gIC8vIERPTSBtYW5pcHVsYXRpb25cbiAgLy8gcGxhY2luZyB0aGUgc2hpcCB2aXN1YWxseSBvbiBnaXZlbiBncmlkXG4gIHBsYWNlSW5HcmlkKGdyaWQsIHNoaXApIHtcbiAgICBsZXQgc2hpcExlbmd0aCA9IHNoaXAucG9zaXRpb25zLmxlbmd0aDtcbiAgICBzaGlwLnBvc2l0aW9ucy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROcihcbiAgICAgICAgMTAsXG4gICAgICAgIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpLFxuICAgICAgICBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKSxcbiAgICAgICk7XG4gICAgICBsZXQgZ3JpZE5vZGUgPSBncmlkLmNoaWxkcmVuW2dyaWROcl07XG4gICAgICBncmlkTm9kZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGdyaWROb2RlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2hpcFwiICsgU3RyaW5nKHNoaXAuaWQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBtYXJrSGl0KGdyaWQsIGdyaWROcikge1xuICAgIGxldCBncmlkTm9kZSA9IGdyaWQuY2hpbGRyZW5bZ3JpZE5yXTtcbiAgICBncmlkTm9kZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9XG5cbiAgc3RhdGljIGNoZWNrSGl0KGdyaWQsIGdyaWROcikge1xuICAgIGlmIChncmlkLmNoaWxkcmVuW2dyaWROcl0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTaGlwTG9naWNhbGx5KGlkKSB7XG4gICAgdGhpcy5zaGlwcy5zb21lKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pZCA9PT0gaWQpIHtcbiAgICAgICAgdGhpcy5zaGlwcy5zcGxpY2UodGhpcy5zaGlwcy5pbmRleE9mKHNoaXApLCAxKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVTaGlwRnJvbUdyaWQoZ3JpZCwgaWQpIHtcbiAgICBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChjZWxsLmlkLnN1YnN0cmluZyg0KSA9PT0gaWQpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVTaGlwKGdyaWQsIGlkKSB7XG4gICAgdGhpcy5yZW1vdmVTaGlwTG9naWNhbGx5KGlkKTtcbiAgICB0aGlzLnJlbW92ZVNoaXBGcm9tR3JpZChncmlkLCBpZCk7XG4gIH1cblxuICBnZW5lcmF0ZVJhbmRvbVNoaXBzKHBsYXllciwgZ3JpZCkge1xuICAgIGZvciAobGV0IHNoaXBUeXBlIG9mIFtcbiAgICAgIFtcIkNcIiwgNV0sXG4gICAgICBbXCJCXCIsIDRdLFxuICAgICAgW1wiRFwiLCAzXSxcbiAgICAgIFtcIlNcIiwgM10sXG4gICAgICBbXCJQXCIsIDJdLFxuICAgIF0pIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBzaGlwID0gcGxheWVyLnJhbmRvbVNoaXBQb3NpdGlvbihzaGlwVHlwZVsxXSwgc2hpcFR5cGVbMF0pOyAvLyBzaGlwIG9iamVjdCAvIGZhbHNlXG4gICAgICAgIGlmIChzaGlwKSB7XG4gICAgICAgICAgdGhpcy5wbGFjZShncmlkLCBzaGlwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgLy8gaXNIdW1hbiA9IHRydWUgLyBmYWxzZVxuICBjb25zdHJ1Y3Rvcihpc0h1bWFuLCBnYW1lYm9hcmQpIHtcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuICB9XG5cbiAgaHVtYW5BdHRhY2sob3RoZXJQbGF5ZXIsIHBvcykge1xuICAgIG90aGVyUGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gICAgcmV0dXJuIHBvcztcbiAgfVxuXG4gIC8vIHJldHVybnMgZXZlbnR1YWwgYXR0YWNrZWQgcG9zaXRpb25cbiAgY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIsIG90aGVyR3JpZCA9IHVuZGVmaW5lZCkge1xuICAgIGxldCB1c2VBaSA9IGZhbHNlO1xuICAgIGlmIChvdGhlckdyaWQpIHtcbiAgICAgIGxldCBncmlkQ2VsbHMgPSBvdGhlckdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRDZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZ3JpZENlbGxzW2ldLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikgJiZcbiAgICAgICAgICBncmlkQ2VsbHNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpICYmXG4gICAgICAgICAgIWdyaWRDZWxsc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzdW5rXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIHVzZUFpID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXVzZUFpKSB7XG4gICAgICBsZXQgc3Vua1NoaXBzID0gb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnNoaXBzLmZpbHRlcigoc2hpcCkgPT5cbiAgICAgICAgc2hpcC5pc1N1bmsoKSxcbiAgICAgICk7XG4gICAgICBkbyB7XG4gICAgICAgIGxldCBbcmFuZG9tTnIxLCByYW5kb21OcjJdID0gdGhpcy5fcmFuZG9tUGFpcigpO1xuICAgICAgICB2YXIgcG9zaXRpb24gPSBTdHJpbmcocmFuZG9tTnIxKSArIFwiOlwiICsgU3RyaW5nKHJhbmRvbU5yMik7XG4gICAgICAgIC8vIG1ha2luZyBzdXJlIG5vdCBjaG9zZW4gbmV4dCB0byBoaXRcbiAgICAgICAgdmFyIG5leHRUb1NoaXAgPSAhb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLmNoZWNrVmFsaWRQb3NpdGlvbihcbiAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICBzdW5rU2hpcHMsXG4gICAgICAgICk7XG4gICAgICB9IHdoaWxlIChuZXh0VG9TaGlwIHx8ICFvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3NpdGlvbikpO1xuICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLmFpQ2hvb3NlSGl0KFxuICAgICAgICBvdGhlckdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIiksXG4gICAgICAgIG90aGVyUGxheWVyLFxuICAgICAgKTtcbiAgICAgIG90aGVyUGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBfcmFuZG9tUGFpcigpIHtcbiAgICBsZXQgcmFuZG9tTnIxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICBsZXQgcmFuZG9tTnIyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICByZXR1cm4gW3JhbmRvbU5yMSwgcmFuZG9tTnIyXTtcbiAgfVxuXG4gIC8vIHRoaXMgbWV0aG9kcyByZXF1aXJlcyBib3RoIGdhbWVib2FyZCBhbmQgc2hpcCBjbGFzc2VzXG4gIHJhbmRvbVNoaXBQb3NpdGlvbihzaGlwTGVuZ3RoLCBzaGlwSWQpIHtcbiAgICBsZXQgcG9zaXRpb25zO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHBvc2l0aW9ucyA9IFtdO1xuICAgICAgbGV0IHN0YXJ0UG9zID1cbiAgICAgICAgU3RyaW5nKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpICsgMSkgK1xuICAgICAgICBcIjpcIiArXG4gICAgICAgIFN0cmluZyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KSArIDEpO1xuICAgICAgbGV0IGRpcmVjdGlvbiA9IFtcImNvbFwiLCBcInJvd1wiXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBwb3NpdGlvbnMucHVzaChHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvcywgZGlyZWN0aW9uLCBpKSk7XG4gICAgICB9XG4gICAgICBpZiAocG9zaXRpb25zLnNvbWUoKHBvcykgPT4gcG9zID09PSBmYWxzZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgbGV0IHNoaXAgPSBuZXcgU2hpcChwb3NpdGlvbnMsIHNoaXBJZCk7XG4gICAgaWYgKHRoaXMuZ2FtZWJvYXJkLmNoZWNrVmFsaWRTaGlwUG9zaXRpb24oc2hpcCkpIHtcbiAgICAgIHJldHVybiBzaGlwO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvLyB1bmRlciB0aGUgYXNzdW1wdGlvbiB0aGF0IHRoZXJlIGlzIGFuIGV4aXN0aW5nIGhpdFxuICBhaUNob29zZUhpdChvcHBHcmlkQ2VsbHMsIG9wcG9uZW50KSB7XG4gICAgbGV0IHN1bmtTaGlwcyA9IG9wcG9uZW50LmdhbWVib2FyZC5zaGlwcy5maWx0ZXIoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpO1xuICAgIGxldCBzaGlwSGl0cyA9IG9wcG9uZW50LmdhbWVib2FyZC5oaXRQb3NpdGlvbnMuZmlsdGVyKChwb3MpID0+IHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3Bwb25lbnQuZ2FtZWJvYXJkLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAhb3Bwb25lbnQuZ2FtZWJvYXJkLnNoaXBzW2ldLmlzU3VuaygpICYmXG4gICAgICAgICAgb3Bwb25lbnQuZ2FtZWJvYXJkLnNoaXBzW2ldLnBvc2l0aW9ucy5pbmNsdWRlcyhwb3MpXG4gICAgICAgICkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBsZXQgcG9zaXRpb25zID0gW107XG4gICAgaWYgKHNoaXBIaXRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gY2hlY2sgYWxsIGNlbGxzIGFkamFjZW50XG4gICAgICBsZXQgbGVmdCA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHNoaXBIaXRzWzBdLCBcImNvbFwiLCAtMSk7XG4gICAgICBsZXQgcmlnaHQgPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzaGlwSGl0c1swXSwgXCJjb2xcIiwgMSk7XG4gICAgICBsZXQgdG9wID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc2hpcEhpdHNbMF0sIFwicm93XCIsIC0xKTtcbiAgICAgIGxldCBib3R0b20gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzaGlwSGl0c1swXSwgXCJyb3dcIiwgMSk7XG4gICAgICBsZXQgYWRqYWNlbnQgPSBbbGVmdCwgcmlnaHQsIHRvcCwgYm90dG9tXTtcbiAgICAgIGFkamFjZW50LmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgbGV0IGNlbGwgPSBvcHBHcmlkQ2VsbHNbR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zLCAxMCldO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICFjZWxsLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJlxuICAgICAgICAgICAgb3Bwb25lbnQuZ2FtZWJvYXJkLmNoZWNrVmFsaWRQb3NpdGlvbihwb3MsIHN1bmtTaGlwcylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHBvcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHNoaXBIaXRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGxldCBkaXJlY3Rpb247XG4gICAgICBpZiAoXG4gICAgICAgIHNoaXBIaXRzWzBdID09PSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzaGlwSGl0c1sxXSwgXCJyb3dcIiwgMSkgfHxcbiAgICAgICAgc2hpcEhpdHNbMF0gPT09IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHNoaXBIaXRzWzFdLCBcInJvd1wiLCAtMSlcbiAgICAgICkge1xuICAgICAgICBkaXJlY3Rpb24gPSBcInJvd1wiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGlyZWN0aW9uID0gXCJjb2xcIjtcbiAgICAgIH1cblxuICAgICAgc2hpcEhpdHMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgIGxldCBiZWhpbmQgPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihwb3MsIGRpcmVjdGlvbiwgLTEpO1xuICAgICAgICBsZXQgZnJvbnQgPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihwb3MsIGRpcmVjdGlvbiwgMSk7XG4gICAgICAgIC8vIGNoZWNrIGlmIGJlaGluZCBpcyB2YWxpZFxuICAgICAgICBpZiAoXG4gICAgICAgICAgYmVoaW5kICYmXG4gICAgICAgICAgIW9wcEdyaWRDZWxsc1tcbiAgICAgICAgICAgIEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKGJlaGluZCwgMTApXG4gICAgICAgICAgXS5jbGFzc0xpc3QuY29udGFpbnMoXCJoaXRcIikgJiZcbiAgICAgICAgICBvcHBvbmVudC5nYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKGJlaGluZCwgc3Vua1NoaXBzKVxuICAgICAgICApIHtcbiAgICAgICAgICBwb3NpdGlvbnMucHVzaChiZWhpbmQpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGZyb250ICYmXG4gICAgICAgICAgIW9wcEdyaWRDZWxsc1tcbiAgICAgICAgICAgIEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKGZyb250LCAxMClcbiAgICAgICAgICBdLmNsYXNzTGlzdC5jb250YWlucyhcImhpdFwiKSAmJlxuICAgICAgICAgIG9wcG9uZW50LmdhbWVib2FyZC5jaGVja1ZhbGlkUG9zaXRpb24oZnJvbnQsIHN1bmtTaGlwcylcbiAgICAgICAgKSB7XG4gICAgICAgICAgcG9zaXRpb25zLnB1c2goZnJvbnQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBvc2l0aW9ucy5sZW5ndGgpXTtcbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jbGFzcyBTaGlwIHtcbiAgLy8gcG9zaXRpb25zID0gW1wiMToxXCIsIFwiMToyXCIgLCBcIjE6M1wiXSBcInJvdzpjb2xcIlxuICAvLyBpZCA9IFwiQ1wiIC8gXCJCXCIgLyBcIkRcIiAvIFwiU1wiIC8gXCJQXCJcbiAgY29uc3RydWN0b3IocG9zaXRpb25zLCBpZCkge1xuICAgIHRoaXMuc2hpcExlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cblxuICAvLyBkdXBsaWNhdGUgdmFsaWRhdGlvbiBvY2N1cnMgaW4gR2FtZWJvYXJkIG9iamVjdHNcbiAgaGl0KHBvc2l0aW9uKSB7XG4gICAgaWYgKHRoaXMucG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5oaXRQb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdFBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMuc2hpcExlbmd0aCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzaW5rKGdyaWQpIHtcbiAgICBmb3IgKGxldCBwb3Mgb2YgdGhpcy5wb3NpdGlvbnMpIHtcbiAgICAgIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3MsIDEwKTtcbiAgICAgIGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIilbZ3JpZE5yXS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICB9XG4gIH1cblxuICBmaW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvcywgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgcmV0dXJuIEdhbWVib2FyZC5maW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKTtcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG59XFxuYm9keSxcXG5odG1sIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAzMDBweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgIFxcXCJodW1hbiBjb21wdXRlclxcXCJcXG4gICAgXFxcImJvdHRvbSBib3R0b21cXFwiO1xcbiAgZ2FwOiAwO1xcbn1cXG5cXG4uaHVtYW4ge1xcbiAgZ3JpZC1hcmVhOiBodW1hbjtcXG59XFxuXFxuLmNvbXB1dGVyIHtcXG4gIGdyaWQtYXJlYTogY29tcHV0ZXI7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxufVxcblxcbi5wbGF5ZXItdGl0bGUge1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbn1cXG5cXG4ubGluZSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTBweDtcXG4gIGJhY2tncm91bmQ6IHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLmJhdHRsZXNoaXAtZ3JpZCB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBmbGV4LXNocmluazogMDtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4vKiBDSEFOR0UgVEhJUyBUTyBIVU1BTiBUTyBISURFIENPTVBVVEVSIFNISVBTICovXFxuLmh1bWFuIC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTY3LCAxNjcsIDE2Nyk7XFxufVxcblxcbi5zaGlwLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCA2OCwgNjgpO1xcbn1cXG5cXG4uYm90dG9tLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IGJvdHRvbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnNoaXAtc2VsZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4jc2VsZWN0aW9uQyxcXG4jc2VsZWN0aW9uQixcXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyxcXG4jc2VsZWN0aW9uUCB7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcblxcbiNzZWxlY3Rpb25DIHtcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuI3NlbGVjdGlvbkIge1xcbiAgd2lkdGg6IDE2MHB4O1xcbn1cXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyB7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcbiNzZWxlY3Rpb25QIHtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4uc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAyNTUpO1xcbn1cXG4uc2VsZWN0ZWQtaW52YWxpZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCkgIWltcG9ydGFudDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwLmdyZXllZC1vdXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG59XFxuXFxuLmJ1dHRvbiB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcXG4gIGJhY2tncm91bmQ6IHJnYig1OSwgNTksIDI1NSk7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNoaXAuaGl0LnN1bmsge1xcbiAgYmFja2dyb3VuZDogcmdiKDExNiwgMTUsIDE1KTtcXG59XFxuXFxuLmJ1dHRvbnMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UseUNBQXlDO0VBQ3pDLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsVUFBVTtBQUNaO0FBQ0E7O0VBRUUsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsOEJBQThCO0VBQzlCOzttQkFFaUI7RUFDakIsTUFBTTtBQUNSOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsTUFBTTtFQUNOLHVCQUF1QjtFQUN2QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtFQUNqQix1QkFBdUI7QUFDekI7O0FBRUEsZ0RBQWdEO0FBQ2hEO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxZQUFZO0VBQ1osWUFBWTtFQUNaLGVBQWU7RUFDZixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7Ozs7O0VBS0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTs7RUFFRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLDRCQUE0QjtFQUM1QixZQUFZO0FBQ2Q7QUFDQTtFQUNFLDRCQUE0QjtFQUM1QixlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixTQUFTO0FBQ1hcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5ib2R5LFxcbmh0bWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDMwMHB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgXFxcImh1bWFuIGNvbXB1dGVyXFxcIlxcbiAgICBcXFwiYm90dG9tIGJvdHRvbVxcXCI7XFxuICBnYXA6IDA7XFxufVxcblxcbi5odW1hbiB7XFxuICBncmlkLWFyZWE6IGh1bWFuO1xcbn1cXG5cXG4uY29tcHV0ZXIge1xcbiAgZ3JpZC1hcmVhOiBjb21wdXRlcjtcXG59XFxuXFxuLnBsYXllci1jb250YWluZXIge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi8qIENIQU5HRSBUSElTIFRPIEhVTUFOIFRPIEhJREUgQ09NUFVURVIgU0hJUFMgKi9cXG4uaHVtYW4gLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNjcsIDE2NywgMTY3KTtcXG59XFxuXFxuLnNoaXAuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDY4LCA2OCk7XFxufVxcblxcbi5ib3R0b20tY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogYm90dG9tO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4uc2hpcC1zZWxlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbiNzZWxlY3Rpb25DLFxcbiNzZWxlY3Rpb25CLFxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TLFxcbiNzZWxlY3Rpb25QIHtcXG4gIGhlaWdodDogNDBweDtcXG59XFxuXFxuI3NlbGVjdGlvbkMge1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jc2VsZWN0aW9uQiB7XFxuICB3aWR0aDogMTYwcHg7XFxufVxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TIHtcXG4gIHdpZHRoOiAxMjBweDtcXG59XFxuI3NlbGVjdGlvblAge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbi5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDI1NSk7XFxufVxcbi5zZWxlY3RlZC1pbnZhbGlkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAuZ3JleWVkLW91dCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDU5LCA1OSwgMjU1KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2hpcC5oaXQuc3VuayB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTE2LCAxNSwgMTUpO1xcbn1cXG5cXG4uYnV0dG9ucyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBnYXA6IDIwcHg7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL3N0eWxlLmNzc1wiO1xuXG4vLyBnbG9iYWwgdmFyaWFibGVzXG5jb25zdCBnYW1lR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhdHRsZXNoaXAtZ3JpZFwiKTtcbmNvbnN0IFtodW1hbkdyaWQsIGNvbXB1dGVyR3JpZF0gPSBnYW1lR3JpZHM7XG5jb25zdCBzaGlwU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLXNlbGVjdGlvblwiKTtcbmNvbnN0IG11bHRpQnV0dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubXVsdGktYnV0dG9uXCIpO1xuY29uc3QgcmFuZG9tQnV0dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmFuZG9tLWJ1dHRvblwiKTtcblxuY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcblxubGV0IGh1bWFuR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xubGV0IGNvbXB1dGVyR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xubGV0IGh1bWFuID0gbmV3IFBsYXllcih0cnVlLCBodW1hbkdhbWVib2FyZCk7XG5sZXQgY29tcHV0ZXIgPSBuZXcgUGxheWVyKGZhbHNlLCBjb21wdXRlckdhbWVib2FyZCk7XG5sZXQgcGxheWluZyA9IGZhbHNlO1xuXG5sZXQgc2VsZWN0aW9uID0gdHJ1ZTtcbmxldCBpc1NoaXBTZWxlY3RlZCA9IGZhbHNlO1xubGV0IHNlbGVjdGVkSWQ7XG5sZXQgZGlyZWN0aW9uID0gXCJjb2xcIjtcbmxldCBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xubGV0IHBsYWNlZFNoaXBJZHMgPSBbXTtcbmxldCBzaGlwTGVuZ3RocyA9IHtcbiAgQzogNSxcbiAgQjogNCxcbiAgRDogMyxcbiAgUzogMyxcbiAgUDogMixcbn07XG5cbi8vIGV2ZW50IGxpc3RlbmVyc1xuZnVuY3Rpb24gY2VsbFNob290TGlzdGVuZXIoZ3JpZCkge1xuICBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocGxheWluZykge1xuICAgICAgICBsZXQgZ3JpZE5yID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChncmlkLmNoaWxkcmVuLCBub2RlKTtcbiAgICAgICAgaHVtYW5QbGF5cyhncmlkLCBncmlkTnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaG92ZXJTZWxlY3Rpb24oc2hpcElkLCBncmlkTnIsIGdyaWRDZWxscykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBJZF07IGkrKykge1xuICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAvLyBtYWtpbmcgc3VyZSB0byBmbGFnIHBvc2l0aW9uIGFzIGludmFsaWQgaWYgaXQgaXMgdG9vIGNsb3NlIHRvIG90aGVyIHNoaXBzIHRvb1xuICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgaWYgKCFodW1hbkdhbWVib2FyZC5jaGVja1ZhbGlkUG9zaXRpb24ocG9zaXRpb24sIGh1bWFuR2FtZWJvYXJkLnNoaXBzKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGdyaWRDZWxsc1tHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBcInNlbGVjdGVkXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuICAgICAgLy8gaGlnaGxpZ2h0IHRoZW0gYWxsIGFzIGludmFsaWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICBncmlkQ2VsbHNbXG4gICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXG4gICAgICAgICAgXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtaW52YWxpZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjZWxsR3JpZExpc3RlbmVycyhncmlkKSB7XG4gIGZvciAobGV0IGdyaWROciA9IDA7IGdyaWROciA8IDEwMDsgZ3JpZE5yKyspIHtcbiAgICBsZXQgZ3JpZENlbGxzID0gZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgICBsZXQgY2VsbCA9IGdyaWRDZWxsc1tncmlkTnJdO1xuICAgIC8vIHdoZW4gaG92ZXJpbmcsIGhpZ2hsaWdodCB0aGUgY29ycmVjdCBjZWxsc1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0aW9uICYmIGlzU2hpcFNlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGlvblZhbGlkID0gdHJ1ZTtcbiAgICAgICAgaG92ZXJTZWxlY3Rpb24oc2VsZWN0ZWRJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBob3ZlcmluZyBvZmYsIGdldCByaWQgb2YgYWxsIHRoZSBjaGFuZ2VzXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGdyaWRDZWxsc1tcbiAgICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZC1pbnZhbGlkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJlbW92aW5nIHBsYWNlZCBzaGlwIHdoZW4gY2xpY2tlZFxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICghaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFNoaXA7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBmb3IgKGxldCBzaGlwIG9mIGh1bWFuR2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICAgICAgaWYgKHNoaXAucG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRTaGlwID0gc2hpcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZFNoaXApIHtcbiAgICAgICAgICBsZXQgc2hpcEVsZW1lbnQgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkU2hpcC5pZCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGZvciAobGV0IHNlbGVjdGVkUG9zIG9mIHNlbGVjdGVkU2hpcC5wb3NpdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBwb3NHcmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihzZWxlY3RlZFBvcywgMTApO1xuICAgICAgICAgICAgZ3JpZENlbGxzW3Bvc0dyaWROcl0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBodW1hbkdhbWVib2FyZC5yZW1vdmVTaGlwKGdyaWQsIHNlbGVjdGVkU2hpcC5pZCk7XG4gICAgICAgICAgcGxhY2VkU2hpcElkcy5zcGxpY2UocGxhY2VkU2hpcElkcy5pbmRleE9mKHNlbGVjdGVkU2hpcC5pZCksIDEpO1xuICAgICAgICAgIHNlbGVjdFNoaXAoXG4gICAgICAgICAgICBzaGlwRWxlbWVudCxcbiAgICAgICAgICAgIHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgICAgIGhvdmVyU2VsZWN0aW9uKHNlbGVjdGVkU2hpcC5pZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiUk9UQVRFXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gY2xpY2tpbmcgb24gdGhlIGdyaWQgdG8gcGxhY2VcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uICYmIHNlbGVjdGlvblZhbGlkKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IHNoaXBFbGVtZW50ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRJZCxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKHBvc2l0aW9ucywgc2VsZWN0ZWRJZCk7XG4gICAgICAgIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGdyaWQsIHNoaXApO1xuICAgICAgICBwbGFjZWRTaGlwSWRzLnB1c2goc2VsZWN0ZWRJZCk7XG4gICAgICAgIC8vIGdyZXkgaXQgb3V0XG4gICAgICAgIHVuc2VsZWN0U2hpcChzaGlwRWxlbWVudCk7XG4gICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgICBpZiAocGxhY2VkU2hpcElkcy5sZW5ndGggPj0gNSkge1xuICAgICAgICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiU1RBUlRcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbm11bHRpQnV0dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBpZiAobXVsdGlCdXR0LnRleHRDb250ZW50ID09PSBcIlNUQVJUXCIpIHtcbiAgICBzdGFydEdhbWUoKTtcbiAgfSBlbHNlIGlmIChtdWx0aUJ1dHQudGV4dENvbnRlbnQgPT09IFwiUk9UQVRFXCIpIHtcbiAgICByb3RhdGUoc2hpcFNlbGVjdGlvbiwgXCIuc2VsZWN0aW9uLXNoaXBcIik7XG4gIH0gZWxzZSBpZiAobXVsdGlCdXR0LnRleHRDb250ZW50ID09PSBcIlJFU0VUXCIpIHtcbiAgICByZXNldCgpO1xuICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiUk9UQVRFXCI7XG4gIH1cbn0pO1xuXG5zaGlwU2VsZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGlmIChzZWxlY3Rpb24gJiYgaXNTaGlwU2VsZWN0ZWQpIHtcbiAgICB1bnNlbGVjdFNoaXAoc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRJZCkpO1xuICB9XG59KTtcblxuc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgaWQgPSBzaGlwLmlkLnN1YnN0cmluZyhzaGlwLmlkLmxlbmd0aCAtIDEpO1xuICAgIGlmIChzZWxlY3Rpb24gJiYgIXBsYWNlZFNoaXBJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJZCAhPT0gaWQpIHtcbiAgICAgICAgc2VsZWN0U2hpcChzaGlwLCBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbnJhbmRvbUJ1dHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVzZXQoKTtcbiAgaHVtYW5HYW1lYm9hcmQuZ2VuZXJhdGVSYW5kb21TaGlwcyhodW1hbiwgaHVtYW5HcmlkKTtcbiAgcGxhY2VkU2hpcElkcyA9IE9iamVjdC5rZXlzKHNoaXBMZW5ndGhzKTtcbiAgc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBjb25zb2xlLmxvZyhzaGlwKTtcbiAgICBzaGlwLmNsYXNzTGlzdC5hZGQoXCJncmV5ZWQtb3V0XCIpO1xuICB9KTtcbiAgbXVsdGlCdXR0LnRleHRDb250ZW50ID0gXCJTVEFSVFwiO1xufSk7XG5cbi8vIGluaXRpYWwgc3R5bGluZ1xuZnVuY3Rpb24gZ3JpZENyZWF0aW9uKCkge1xuICBnYW1lR3JpZHMuZm9yRWFjaCgoZ2FtZUdyaWQpID0+IHtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtcm93c1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICAvLyBlbnRlcmluZyBhbGwgZ3JpZCBpdGVtc1xuICAgIGluc2VydEdyaWRDZWxscygxMCwgMTAsIGdhbWVHcmlkLCBncmlkQ2VsbCk7XG4gIH0pO1xuICAvLyBhZGRpbmcgaW5pdGlhbCBjZWxsIGV2ZW50IGxpc3RlbmVyc1xuICAvLyBzaW5jZSB0aGV5IG9ubHkgZXhpc3Qgb25jZSBncmlkIGlzIGNyZWF0ZWRcbiAgY2VsbFNob290TGlzdGVuZXIoY29tcHV0ZXJHcmlkKTtcbiAgY2VsbEdyaWRMaXN0ZW5lcnMoaHVtYW5HcmlkKTtcbn1cblxuLy8gcm93cywgY29scyA6IGludCxcbi8vIGdyaWQsIGNlbGwgOiBET00gZWxlbWVudHNcbmZ1bmN0aW9uIGluc2VydEdyaWRDZWxscyhyb3dzLCBjb2xzLCBncmlkLCBjZWxsKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAqIGNvbHM7IGkrKykge1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG5cbi8vICoqKiBUSElTIElTIFdIRVJFIFRIRSBUVVJOUyBIQVBQRU5cbmZ1bmN0aW9uIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKSB7XG4gIGlmIChcbiAgICBjb21wdXRlckdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKVxuICAgICAgW2dyaWROcl0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuICBHYW1lYm9hcmQubWFya0hpdChncmlkLCBncmlkTnIpO1xuICBodW1hbi5odW1hbkF0dGFjayhjb21wdXRlciwgR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCkpO1xuXG4gIC8vIGNoZWNrIGlmIGFueSBzaGlwcyBhcmUgc3Vua1xuICBzaW5rU2hpcHMoZ3JpZCwgY29tcHV0ZXJHYW1lYm9hcmQpO1xuICAvLyBjaGVjayBpZiBodW1hbiBoYXMgd29uXG4gIGlmIChjaGVja1dpbigpKSB7XG4gICAgLy8gbGF0ZXIgcmVzZXRcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbXB1dGVyUGxheXMoKTtcbn1cblxuLy8gY29tcHV0ZXIncyB0dXJuXG5mdW5jdGlvbiBjb21wdXRlclBsYXlzKCkge1xuICBsZXQgYXR0YWNrUG9zaXRpb24gPSBjb21wdXRlci5jb21wdXRlckF0dGFjayhodW1hbiwgaHVtYW5HcmlkKTtcbiAgbGV0IHJvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKGF0dGFja1Bvc2l0aW9uKTtcbiAgbGV0IGNvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKGF0dGFja1Bvc2l0aW9uKTtcbiAgbGV0IGdyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yKDEwLCByb3dWYWx1ZSwgY29sVmFsdWUpO1xuXG4gIEdhbWVib2FyZC5tYXJrSGl0KGh1bWFuR3JpZCwgZ3JpZE5yKTtcbiAgc2lua1NoaXBzKGh1bWFuR3JpZCwgaHVtYW5HYW1lYm9hcmQpO1xuXG4gIGlmIChjaGVja1dpbigpKSB7XG4gICAgLy8gbGF0ZXIgcmVzZXRcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNpbmtTaGlwcyhncmlkLCBnYW1lYm9hcmQpIHtcbiAgZ2FtZWJvYXJkLnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBpZiAoc2hpcC5pc1N1bmsoKSkge1xuICAgICAgc2hpcC5zaW5rKGdyaWQpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNoZWNrV2luKCkge1xuICBpZiAoaHVtYW5HYW1lYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgd2luTWVzc2FnZShcImNvbXB1dGVyXCIpO1xuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChjb21wdXRlckdhbWVib2FyZC5hbGxTdW5rKCkpIHtcbiAgICB3aW5NZXNzYWdlKFwiaHVtYW5cIik7XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gd2luTWVzc2FnZSh3aW5uZXIpIHtcbiAgLy8gY3JlYXRlIG1vZGFsXG4gIGFsZXJ0KHdpbm5lciArIFwiIHdvblwiKTtcbn1cblxuLy8gKioqIEZPUiBMQVRFUlxuZnVuY3Rpb24gcmVzZXQoKSB7XG4gIGdhbWVHcmlkcy5mb3JFYWNoKChncmlkKSA9PiB7XG4gICAgZ3JpZC50ZXh0Q29udGVudCA9IFwiXCI7XG4gIH0pO1xuICBncmlkQ3JlYXRpb24oKTtcbiAgc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBzaGlwLmNsYXNzTGlzdC5yZW1vdmUoXCJncmV5ZWQtb3V0XCIpO1xuICB9KTtcbiAgaHVtYW5HYW1lYm9hcmQuaGl0UG9zaXRpb25zID0gW107XG4gIGh1bWFuR2FtZWJvYXJkLnNoaXBzID0gW107XG4gIGNvbXB1dGVyR2FtZWJvYXJkLmhpdFBvc2l0aW9ucyA9IFtdO1xuICBjb21wdXRlckdhbWVib2FyZC5zaGlwcyA9IFtdO1xuICBzZWxlY3Rpb24gPSB0cnVlO1xuICBpc1NoaXBTZWxlY3RlZCA9IGZhbHNlO1xuICBzZWxlY3RlZElkO1xuICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuICBwbGFjZWRTaGlwSWRzID0gW107XG4gIHBsYXlpbmcgPSBmYWxzZTtcbiAgcmFuZG9tQnV0dC5zdHlsZS5kaXNwbGF5ID0gXCJpbml0aWFsXCI7XG59XG5cbi8vIHJvdGF0ZSBidXR0b25cbi8vIFRFTVBPUkFSWSBWRVJTSU9OXG5mdW5jdGlvbiByb3RhdGUocGFyZW50LCBzaGlwU2VsZWN0b3IpIHtcbiAgLy8gc3dpdGNoaW5nIHRoZSBkaXJlY3Rpb25cbiAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICBjYXNlIFwiY29sXCI6XG4gICAgICBkaXJlY3Rpb24gPSBcInJvd1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJvd1wiOlxuICAgICAgZGlyZWN0aW9uID0gXCJjb2xcIjtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gcm90YXRpbmcgYWxsIHRoZSBzaGlwc1xuICBwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzaGlwU2VsZWN0b3IpLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgd2lkdGggPSBzaGlwLm9mZnNldFdpZHRoO1xuICAgIGxldCBoZWlnaHQgPSBzaGlwLm9mZnNldEhlaWdodDtcbiAgICBzaGlwLnN0eWxlLndpZHRoID0gU3RyaW5nKGhlaWdodCkgKyBcInB4XCI7XG4gICAgc2hpcC5zdHlsZS5oZWlnaHQgPSBTdHJpbmcod2lkdGgpICsgXCJweFwiO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0U2hpcChzZWxlY3RlZFNoaXBFbGVtZW50LCBzaGlwRWxlbWVudHMpIHtcbiAgLy8gbWFrZSBzdXJlIHRoZSByZXN0IGFyZSB1bnNlbGVjdGVkIGZpcnN0XG4gIHNoaXBFbGVtZW50cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICB9KTtcblxuICBsZXQgc2hpcElkID0gc2VsZWN0ZWRTaGlwRWxlbWVudC5pZC5zdWJzdHJpbmcoXG4gICAgc2VsZWN0ZWRTaGlwRWxlbWVudC5pZC5sZW5ndGggLSAxLFxuICApO1xuXG4gIGlzU2hpcFNlbGVjdGVkID0gdHJ1ZTtcbiAgc2VsZWN0ZWRJZCA9IHNoaXBJZDtcbiAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcblxuICAvLyBhZGQgYm9yZGVyIHRvIHNlbGVjdGVkIHNoaXBcbiAgc2VsZWN0ZWRTaGlwRWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCByZWRcIjtcbn1cblxuZnVuY3Rpb24gdW5zZWxlY3RTaGlwKHNoaXApIHtcbiAgaXNTaGlwU2VsZWN0ZWQgPSBmYWxzZTtcbiAgc2VsZWN0ZWRJZCA9IFwiXCI7XG4gIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5cbiAgLy8gYWRkIGJvcmRlciB0byBzZWxlY3RlZCBzaGlwXG4gIHNoaXAuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgcGxheWluZyA9IHRydWU7XG4gIHNlbGVjdGlvbiA9IGZhbHNlO1xuICBtdWx0aUJ1dHQudGV4dENvbnRlbnQgPSBcIlJFU0VUXCI7XG4gIHJhbmRvbUJ1dHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICBjb21wdXRlckdhbWVib2FyZC5nZW5lcmF0ZVJhbmRvbVNoaXBzKGNvbXB1dGVyLCBjb21wdXRlckdyaWQpO1xufVxuXG5ncmlkQ3JlYXRpb24oKTtcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJoaXRQb3NpdGlvbnMiLCJzaGlwcyIsInNoaXAiLCJjaGVja1ZhbGlkU2hpcFBvc2l0aW9uIiwicHVzaCIsImdyaWQiLCJwbGFjZUxvZ2ljYWxseSIsInBsYWNlSW5HcmlkIiwibWluaW11bSIsInBvc2l0aW9ucyIsInJlZHVjZSIsInN0b3JlZCIsInBsYWNlZFBvcyIsImdldFJvd1ZhbHVlIiwiSW5maW5pdHkiLCJnZXRDb2xWYWx1ZSIsIm5ld1NoaXAiLCJzb21lIiwibmV3UG9zIiwiY2hlY2tWYWxpZFBvc2l0aW9uIiwicG9zIiwibmV3Um93VmFsdWUiLCJuZXdDb2xWYWx1ZSIsInBsYWNlZFNoaXAiLCJtaW5Sb3dWYWx1ZSIsIl9taW5Sb3dWYWx1ZSIsIm1heFJvd1ZhbHVlIiwiX21heFJvd1ZhbHVlIiwibWluQ29sVmFsdWUiLCJfbWluQ29sVmFsdWUiLCJtYXhDb2xWYWx1ZSIsIl9tYXhDb2xWYWx1ZSIsImluY2x1ZGVzIiwiaSIsImxlbmd0aCIsImhpdCIsImV2ZXJ5IiwiaXNTdW5rIiwic2hpcExlbmd0aCIsImZvckVhY2giLCJncmlkTnIiLCJmaW5kR3JpZE5yIiwiZ3JpZE5vZGUiLCJjaGlsZHJlbiIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsIlN0cmluZyIsImlkIiwic3BsaWNlIiwiaW5kZXhPZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxsIiwic3Vic3RyaW5nIiwicmVtb3ZlIiwicmVtb3ZlU2hpcExvZ2ljYWxseSIsInJlbW92ZVNoaXBGcm9tR3JpZCIsInBsYXllciIsInNoaXBUeXBlIiwicmFuZG9tU2hpcFBvc2l0aW9uIiwicGxhY2UiLCJOdW1iZXIiLCJkaXJlY3Rpb24iLCJ2YWwiLCJyb3dWYWx1ZSIsImNvbFZhbHVlIiwiVHlwZUVycm9yIiwibnIiLCJjb2xzIiwiTWF0aCIsImZsb29yIiwicm93IiwiZmluZEdyaWRSb3ciLCJjb2wiLCJmaW5kR3JpZENvbCIsImNvbnRhaW5zIiwiU2hpcCIsIlBsYXllciIsImlzSHVtYW4iLCJnYW1lYm9hcmQiLCJvdGhlclBsYXllciIsInJlY2VpdmVBdHRhY2siLCJvdGhlckdyaWQiLCJ1bmRlZmluZWQiLCJ1c2VBaSIsImdyaWRDZWxscyIsInN1bmtTaGlwcyIsImZpbHRlciIsIl9yYW5kb21QYWlyIiwicmFuZG9tTnIxIiwicmFuZG9tTnIyIiwicG9zaXRpb24iLCJuZXh0VG9TaGlwIiwiYWlDaG9vc2VIaXQiLCJyYW5kb20iLCJzaGlwSWQiLCJzdGFydFBvcyIsImFkZFRvUG9zaXRpb24iLCJvcHBHcmlkQ2VsbHMiLCJvcHBvbmVudCIsInNoaXBIaXRzIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwiYWRqYWNlbnQiLCJmaW5kR3JpZE5yRnJvbVBvc2l0aW9uIiwiYmVoaW5kIiwiZnJvbnQiLCJzdW5rIiwiZ2FtZUdyaWRzIiwiZG9jdW1lbnQiLCJodW1hbkdyaWQiLCJjb21wdXRlckdyaWQiLCJzaGlwU2VsZWN0aW9uIiwicXVlcnlTZWxlY3RvciIsIm11bHRpQnV0dCIsInJhbmRvbUJ1dHQiLCJncmlkQ2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJodW1hbkdhbWVib2FyZCIsImNvbXB1dGVyR2FtZWJvYXJkIiwiaHVtYW4iLCJjb21wdXRlciIsInBsYXlpbmciLCJzZWxlY3Rpb24iLCJpc1NoaXBTZWxlY3RlZCIsInNlbGVjdGVkSWQiLCJzZWxlY3Rpb25WYWxpZCIsInBsYWNlZFNoaXBJZHMiLCJzaGlwTGVuZ3RocyIsIkMiLCJCIiwiRCIsIlMiLCJQIiwiY2VsbFNob290TGlzdGVuZXIiLCJub2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsImh1bWFuUGxheXMiLCJob3ZlclNlbGVjdGlvbiIsInN0YXJ0UG9zaXRpb24iLCJmaW5kUG9zaXRpb25Gcm9tR3JpZE5yIiwiY2VsbEdyaWRMaXN0ZW5lcnMiLCJzZWxlY3RlZFNoaXAiLCJzaGlwRWxlbWVudCIsInNlbGVjdGVkUG9zIiwicG9zR3JpZE5yIiwicmVtb3ZlU2hpcCIsInNlbGVjdFNoaXAiLCJ0ZXh0Q29udGVudCIsInVuc2VsZWN0U2hpcCIsInN0YXJ0R2FtZSIsInJvdGF0ZSIsInJlc2V0IiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsImdlbmVyYXRlUmFuZG9tU2hpcHMiLCJPYmplY3QiLCJrZXlzIiwiY29uc29sZSIsImxvZyIsImdyaWRDcmVhdGlvbiIsImdhbWVHcmlkIiwic3R5bGUiLCJpbnNlcnRHcmlkQ2VsbHMiLCJyb3dzIiwiYXBwZW5kQ2hpbGQiLCJjbG9uZU5vZGUiLCJtYXJrSGl0IiwiaHVtYW5BdHRhY2siLCJzaW5rU2hpcHMiLCJjaGVja1dpbiIsImNvbXB1dGVyUGxheXMiLCJhdHRhY2tQb3NpdGlvbiIsImNvbXB1dGVyQXR0YWNrIiwic2luayIsImFsbFN1bmsiLCJ3aW5NZXNzYWdlIiwid2lubmVyIiwiYWxlcnQiLCJkaXNwbGF5IiwicGFyZW50Iiwic2hpcFNlbGVjdG9yIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsInNlbGVjdGVkU2hpcEVsZW1lbnQiLCJzaGlwRWxlbWVudHMiLCJib3JkZXIiXSwic291cmNlUm9vdCI6IiJ9
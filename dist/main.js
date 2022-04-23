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
      if (this._checkValidShipPosition(ship)) {
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
    key: "_checkValidShipPosition",
    value: // checks if ship's position is valid by checking it is near or overlapping existing ship
    function _checkValidShipPosition(newShip) {
      var _this = this;

      // gives true if a single value is invalid, so must be inverted
      return !newShip.positions.some(function (newPos) {
        return !_this.checkValidPosition(newPos);
      });
    }
  }, {
    key: "checkValidPosition",
    value: function checkValidPosition(pos) {
      var _this2 = this;

      var newRowValue = Gameboard.getRowValue(pos);
      var newColValue = Gameboard.getColValue(pos); // get min + max value of row and col for each ship and check if the new position values are within them +-1
      // if a single value is INVALID, return TRUE

      return !this.ships.some(function (placedShip) {
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
    key: "_humanAttack",
    value: function _humanAttack(otherPlayer, pos) {
      otherPlayer.gameboard.receiveAttack(pos);
    } // returns eventual attacked position

  }, {
    key: "_computerAttack",
    value: function _computerAttack(otherPlayer) {
      do {
        var _this$_randomPair = this._randomPair(),
            _this$_randomPair2 = _slicedToArray(_this$_randomPair, 2),
            randomNr1 = _this$_randomPair2[0],
            randomNr2 = _this$_randomPair2[1];

        var position = String(randomNr1) + ":" + String(randomNr2);
      } while (!otherPlayer.gameboard.receiveAttack(position));

      return position;
    }
  }, {
    key: "_randomPair",
    value: function _randomPair() {
      var randomNr1 = Math.floor(Math.random() * 10) + 1;
      var randomNr2 = Math.floor(Math.random() * 10) + 1;
      return [randomNr1, randomNr2];
    } // returns the position that was attacked

  }, {
    key: "attack",
    value: function attack(otherPlayer) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (this.isHuman) {
        this._humanAttack(otherPlayer, pos);

        return pos;
      } else {
        return this._computerAttack(otherPlayer);
      }
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n}\n\n.grids {\n  display: flex;\n  height: 600px;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 40px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n.human .ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 158, 158);\n}\n\n.bottom-container {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding-top: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.rotate-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.rotate-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,SAAS;EACT,sBAAsB;EACtB,UAAU;AACZ;AACA;;EAEE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,SAAS;EACT,aAAa;EACb,yCAAyC;AAC3C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,MAAM;EACN,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,iBAAiB;EACjB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;AACA;;EAEE,YAAY;AACd;AACA;EACE,WAAW;AACb;;AAEA;EACE,8BAA8B;AAChC;AACA;EACE,yCAAyC;AAC3C;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,4BAA4B;EAC5B,YAAY;AACd;AACA;EACE,8BAA8B;EAC9B,eAAe;AACjB","sourcesContent":["* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n}\n\n.grids {\n  display: flex;\n  height: 600px;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 40px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n.human .ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 158, 158);\n}\n\n.bottom-container {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding-top: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.rotate-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.rotate-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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
var rotateButt = document.querySelector(".rotate-button");
var gridCell = document.createElement("div");
gridCell.classList.add("grid-cell");
var hitMark = document.createElement("div");
hitMark.textContent = "X";
hitMark.classList.add("hitmark", "hidden");
gridCell.appendChild(hitMark);
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
var shipLengths = {
  C: 5,
  B: 4,
  S: 3,
  D: 3,
  P: 2
};
var placedShipIds = []; // event listeners

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
      if (!humanGameboard.checkValidPosition(position)) {
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
      }
    });
  };

  for (var gridNr = 0; gridNr < 100; gridNr++) {
    _loop(gridNr);
  }
}

rotateButt.addEventListener("click", function () {
  if (selection) {
    rotate(shipSelection, ".selection-ship");
  }
});
shipSelection.querySelectorAll(".selection-ship").forEach(function (ship) {
  ship.addEventListener("click", function () {
    var id = ship.id.substring(ship.id.length - 1);

    if (selection && !placedShipIds.includes(id)) {
      if (selectedId !== id) {
        selectShip(ship, shipSelection.querySelectorAll(".selection-ship"));
      } else {
        unselectShip(ship);
      }
    }
  });
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
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.markHit(grid, gridNr);
  human.attack(computer, _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10)); // check if human has won

  if (checkWin()) {
    // later reset
    playing = false;
    return;
  }

  computerPlays();
} // computer's turn


function computerPlays() {
  var attackPosition = computer.attack(human);
  var rowValue = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.getRowValue(attackPosition);
  var colValue = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.getColValue(attackPosition);
  var gridNr = _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findGridNr(10, rowValue, colValue);
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.markHit(humanGrid, gridNr);

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
} // *** FOR LATER


function reset() {} // rotate button
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
} // *** DELETE ONCE CUSTOM METHODS CREATED


function placeInitialBoats() {
  // let patrolBoat = new Ship(["1:2", "1:3"], "P");
  // let submarine = new Ship(["3:2", "3:3", "3:4"], "S");
  // humanGameboard.place(humanGrid, patrolBoat);
  // humanGameboard.place(humanGrid, submarine);
  var patrolBoatC = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(["1:2", "1:3"], "P");
  var submarineC = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(["3:2", "3:3", "3:4"], "S");
  computerGameboard.place(computerGrid, patrolBoatC);
  computerGameboard.place(computerGrid, submarineC);
}

gridCreation();
placeInitialBoats();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWMsR0FBRyxLQUFqQjtBQUNBQyxFQUFBQSxVQUFVLEdBQUcsRUFBYjtBQUNBQyxFQUFBQSxjQUFjLEdBQUcsS0FBakIsQ0FIMEIsQ0FLMUI7O0FBQ0F6RyxFQUFBQSxJQUFJLENBQUMySSxLQUFMLENBQVdzQixNQUFYLEdBQW9CLE1BQXBCO0FBQ0QsRUFFRDs7O0FBQ0EsU0FBU0MsaUJBQVQsR0FBNkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFFQSxNQUFJQyxXQUFXLEdBQUcsSUFBSWhGLHVDQUFKLENBQVMsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUFULEVBQXlCLEdBQXpCLENBQWxCO0FBQ0EsTUFBSWlGLFVBQVUsR0FBRyxJQUFJakYsdUNBQUosQ0FBUyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUFULEVBQWdDLEdBQWhDLENBQWpCO0FBQ0FlLEVBQUFBLGlCQUFpQixDQUFDb0MsS0FBbEIsQ0FBd0I5QyxZQUF4QixFQUFzQzJFLFdBQXRDO0FBQ0FqRSxFQUFBQSxpQkFBaUIsQ0FBQ29DLEtBQWxCLENBQXdCOUMsWUFBeEIsRUFBc0M0RSxVQUF0QztBQUNEOztBQUVEM0IsWUFBWTtBQUNaeUIsaUJBQWlCLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3N0eWxlcy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzP2EyZjUiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIDEweDEwIHg6QS1KIHk6IDEtMTBcbmNsYXNzIEdhbWVib2FyZCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaGl0UG9zaXRpb25zID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgcGxhY2VMb2dpY2FsbHkoc2hpcCkge1xuICAgIGlmICh0aGlzLl9jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKHNoaXApKSB7XG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcGxhY2UoZ3JpZCwgc2hpcCkge1xuICAgIGlmICh0aGlzLnBsYWNlTG9naWNhbGx5KHNoaXApKSB7XG4gICAgICB0aGlzLnBsYWNlSW5HcmlkKGdyaWQsIHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRSb3dWYWx1ZShwb3MpIHtcbiAgICByZXR1cm4gTnVtYmVyKHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29sVmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKHBvcy5pbmRleE9mKFwiOlwiKSArIDEpKTtcbiAgfVxuXG4gIF9taW5Sb3dWYWx1ZShzaGlwKSB7XG4gICAgbGV0IG1pbmltdW0gPSBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcykgPCBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCBJbmZpbml0eSk7XG4gICAgcmV0dXJuIG1pbmltdW07XG4gIH1cbiAgX21pbkNvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpIDwgc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICB9XG4gIF9tYXhSb3dWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKSA+IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIC1JbmZpbml0eSk7XG4gIH1cbiAgX21heENvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgLUluZmluaXR5KTtcbiAgfVxuXG4gIC8vIGRpcmVjdGlvbiA9IFwicm93XCIgLyBcImNvbFwiXG4gIC8vIHBvcyA9IFwicm93OmNvbFwiXG4gIHN0YXRpYyBhZGRUb1Bvc2l0aW9uKHBvcywgZGlyZWN0aW9uLCB2YWwpIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAvLyBnZXR0aW5nIGZpcnN0IG51bWJlclxuICAgICAgbGV0IHJvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgICBsZXQgbmV3Um93VmFsdWUgPSByb3dWYWx1ZSArIHZhbDtcbiAgICAgIC8vIG1ha2luZyBzdXJlIGl0IGlzIHdpdGhpbiByYW5nZVxuICAgICAgaWYgKG5ld1Jvd1ZhbHVlID4gMTAgfHwgbmV3Um93VmFsdWUgPCAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbmNhdGVuYXRpbmcgdG8gaXQgdGhlIHJlc3Qgb2YgdGhlIHBvc2l0aW9uXG4gICAgICByZXR1cm4gU3RyaW5nKG5ld1Jvd1ZhbHVlKSArIHBvcy5zdWJzdHJpbmcocG9zLmluZGV4T2YoXCI6XCIpKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgcmV2ZXJzZSBvZiB0aGUgcm93IGJyYW5jaFxuICAgICAgbGV0IGNvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgICBsZXQgbmV3Q29sVmFsdWUgPSBjb2xWYWx1ZSArIHZhbDtcbiAgICAgIGlmIChuZXdDb2xWYWx1ZSA+IDEwIHx8IG5ld0NvbFZhbHVlIDwgMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9zLnN1YnN0cmluZygwLCBwb3MuaW5kZXhPZihcIjpcIikgKyAxKSArIFN0cmluZyhuZXdDb2xWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJTlZBTElEIERJUkVDVElPTiBQQVJBTUVURVJcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2tzIGlmIHNoaXAncyBwb3NpdGlvbiBpcyB2YWxpZCBieSBjaGVja2luZyBpdCBpcyBuZWFyIG9yIG92ZXJsYXBwaW5nIGV4aXN0aW5nIHNoaXBcbiAgX2NoZWNrVmFsaWRTaGlwUG9zaXRpb24obmV3U2hpcCkge1xuICAgIC8vIGdpdmVzIHRydWUgaWYgYSBzaW5nbGUgdmFsdWUgaXMgaW52YWxpZCwgc28gbXVzdCBiZSBpbnZlcnRlZFxuICAgIHJldHVybiAhbmV3U2hpcC5wb3NpdGlvbnMuc29tZSgobmV3UG9zKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuY2hlY2tWYWxpZFBvc2l0aW9uKG5ld1Bvcyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkUG9zaXRpb24ocG9zKSB7XG4gICAgbGV0IG5ld1Jvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgbGV0IG5ld0NvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG5cbiAgICAvLyBnZXQgbWluICsgbWF4IHZhbHVlIG9mIHJvdyBhbmQgY29sIGZvciBlYWNoIHNoaXAgYW5kIGNoZWNrIGlmIHRoZSBuZXcgcG9zaXRpb24gdmFsdWVzIGFyZSB3aXRoaW4gdGhlbSArLTFcbiAgICAvLyBpZiBhIHNpbmdsZSB2YWx1ZSBpcyBJTlZBTElELCByZXR1cm4gVFJVRVxuICAgIHJldHVybiAhdGhpcy5zaGlwcy5zb21lKChwbGFjZWRTaGlwKSA9PiB7XG4gICAgICBsZXQgbWluUm93VmFsdWUgPSB0aGlzLl9taW5Sb3dWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtYXhSb3dWYWx1ZSA9IHRoaXMuX21heFJvd1ZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1pbkNvbFZhbHVlID0gdGhpcy5fbWluQ29sVmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWF4Q29sVmFsdWUgPSB0aGlzLl9tYXhDb2xWYWx1ZShwbGFjZWRTaGlwKTtcblxuICAgICAgaWYgKFxuICAgICAgICBuZXdSb3dWYWx1ZSA+PSBtaW5Sb3dWYWx1ZSAtIDEgJiZcbiAgICAgICAgbmV3Um93VmFsdWUgPD0gbWF4Um93VmFsdWUgKyAxICYmXG4gICAgICAgIG5ld0NvbFZhbHVlID49IG1pbkNvbFZhbHVlIC0gMSAmJlxuICAgICAgICBuZXdDb2xWYWx1ZSA8PSBtYXhDb2xWYWx1ZSArIDFcbiAgICAgICkge1xuICAgICAgICAvLyBJTlZBTElEIFRIRVJFRk9SRSBUUlVFXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gd2lsbCBjaGVjayBpZiB2YWxpZCBwb3NpdGlvbiBhbmQgc2VuZCB0aGUgaGl0LCB0aGUgc2hpcCB3aWxsIHRoZW4gY2hlY2sgaWYgaXQgaXMgaGl0XG4gIHJlY2VpdmVBdHRhY2socG9zKSB7XG4gICAgaWYgKCF0aGlzLmhpdFBvc2l0aW9ucy5pbmNsdWRlcyhwb3MpKSB7XG4gICAgICB0aGlzLmhpdFBvc2l0aW9ucy5wdXNoKHBvcyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNbaV0uaGl0KHBvcykpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkUm93KG5yLCBjb2xzKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnIgLyBjb2xzKSArIDE7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWRDb2wobnIsIHJvdywgY29scykge1xuICAgIHJldHVybiBuciAtIChyb3cgLSAxKSAqIGNvbHMgKyAxO1xuICB9XG5cbiAgc3RhdGljIGZpbmRQb3NpdGlvbkZyb21HcmlkTnIobnIsIGNvbHMpIHtcbiAgICBsZXQgcm93ID0gR2FtZWJvYXJkLmZpbmRHcmlkUm93KG5yLCBjb2xzKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmZpbmRHcmlkQ29sKG5yLCByb3csIGNvbHMpO1xuICAgIHJldHVybiBTdHJpbmcocm93KSArIFwiOlwiICsgU3RyaW5nKGNvbCk7XG4gIH1cblxuICAvLyByb3cgYW5kIGNvbCBzdGFydGluZyBmcm9tIDFcbiAgc3RhdGljIGZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpIHtcbiAgICByZXR1cm4gY29scyAqIChyb3cgLSAxKSArIChjb2wgLSAxKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvcywgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgcmV0dXJuIEdhbWVib2FyZC5maW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKTtcbiAgfVxuXG4gIC8vIERPTSBtYW5pcHVsYXRpb25cbiAgLy8gcGxhY2luZyB0aGUgc2hpcCB2aXN1YWxseSBvbiBnaXZlbiBncmlkXG4gIHBsYWNlSW5HcmlkKGdyaWQsIHNoaXApIHtcbiAgICBsZXQgc2hpcExlbmd0aCA9IHNoaXAucG9zaXRpb25zLmxlbmd0aDtcbiAgICBzaGlwLnBvc2l0aW9ucy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROcihcbiAgICAgICAgMTAsXG4gICAgICAgIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpLFxuICAgICAgICBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKSxcbiAgICAgICk7XG4gICAgICBsZXQgZ3JpZE5vZGUgPSBncmlkLmNoaWxkcmVuW2dyaWROcl07XG4gICAgICBncmlkTm9kZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGdyaWROb2RlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2hpcFwiICsgU3RyaW5nKHNoaXAuaWQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBtYXJrSGl0KGdyaWQsIGdyaWROcikge1xuICAgIGxldCBncmlkTm9kZSA9IGdyaWQuY2hpbGRyZW5bZ3JpZE5yXTtcbiAgICBncmlkTm9kZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9XG5cbiAgc3RhdGljIGNoZWNrSGl0KGdyaWQsIGdyaWROcikge1xuICAgIGlmIChncmlkLmNoaWxkcmVuW2dyaWROcl0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTaGlwTG9naWNhbGx5KGlkKSB7XG4gICAgdGhpcy5zaGlwcy5zb21lKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pZCA9PT0gaWQpIHtcbiAgICAgICAgdGhpcy5zaGlwcy5zcGxpY2UodGhpcy5zaGlwcy5pbmRleE9mKHNoaXApLCAxKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVTaGlwRnJvbUdyaWQoZ3JpZCwgaWQpIHtcbiAgICBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChjZWxsLmlkLnN1YnN0cmluZyg0KSA9PT0gaWQpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVTaGlwKGdyaWQsIGlkKSB7XG4gICAgdGhpcy5yZW1vdmVTaGlwTG9naWNhbGx5KGlkKTtcbiAgICB0aGlzLnJlbW92ZVNoaXBGcm9tR3JpZChncmlkLCBpZCk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJjbGFzcyBQbGF5ZXIge1xuICAvLyBpc0h1bWFuID0gdHJ1ZSAvIGZhbHNlXG4gIGNvbnN0cnVjdG9yKGlzSHVtYW4sIGdhbWVib2FyZCkge1xuICAgIHRoaXMuaXNIdW1hbiA9IGlzSHVtYW47XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIH1cblxuICBfaHVtYW5BdHRhY2sob3RoZXJQbGF5ZXIsIHBvcykge1xuICAgIG90aGVyUGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gIH1cblxuICAvLyByZXR1cm5zIGV2ZW50dWFsIGF0dGFja2VkIHBvc2l0aW9uXG4gIF9jb21wdXRlckF0dGFjayhvdGhlclBsYXllcikge1xuICAgIGRvIHtcbiAgICAgIGxldCBbcmFuZG9tTnIxLCByYW5kb21OcjJdID0gdGhpcy5fcmFuZG9tUGFpcigpO1xuICAgICAgdmFyIHBvc2l0aW9uID0gU3RyaW5nKHJhbmRvbU5yMSkgKyBcIjpcIiArIFN0cmluZyhyYW5kb21OcjIpO1xuICAgIH0gd2hpbGUgKCFvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3NpdGlvbikpO1xuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIF9yYW5kb21QYWlyKCkge1xuICAgIGxldCByYW5kb21OcjEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIGxldCByYW5kb21OcjIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIHJldHVybiBbcmFuZG9tTnIxLCByYW5kb21OcjJdO1xuICB9XG5cbiAgLy8gcmV0dXJucyB0aGUgcG9zaXRpb24gdGhhdCB3YXMgYXR0YWNrZWRcbiAgYXR0YWNrKG90aGVyUGxheWVyLCBwb3MgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5pc0h1bWFuKSB7XG4gICAgICB0aGlzLl9odW1hbkF0dGFjayhvdGhlclBsYXllciwgcG9zKTtcbiAgICAgIHJldHVybiBwb3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wdXRlckF0dGFjayhvdGhlclBsYXllcik7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY2xhc3MgU2hpcCB7XG4gIC8vIHBvc2l0aW9ucyA9IFtcIjE6MVwiLCBcIjE6MlwiICwgXCIxOjNcIl0gXCJyb3c6Y29sXCJcbiAgLy8gaWQgPSBcIkNcIiAvIFwiQlwiIC8gXCJEXCIgLyBcIlNcIiAvIFwiUFwiXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9ucywgaWQpIHtcbiAgICB0aGlzLnNoaXBMZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zO1xuICAgIHRoaXMuaGl0UG9zaXRpb25zID0gW107XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgLy8gZHVwbGljYXRlIHZhbGlkYXRpb24gb2NjdXJzIGluIEdhbWVib2FyZCBvYmplY3RzXG4gIGhpdChwb3NpdGlvbikge1xuICAgIGlmICh0aGlzLnBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgIHRoaXMuaGl0UG9zaXRpb25zLnB1c2gocG9zaXRpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRQb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLnNoaXBMZW5ndGgpIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5ib2R5LFxcbmh0bWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTc1LCAxNzUpO1xcbn1cXG5cXG4uZ3JpZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNjAwcHg7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNDBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbn1cXG5cXG4uaHVtYW4gLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNjcsIDE2NywgMTY3KTtcXG59XFxuXFxuLnNoaXAuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnNoaXAtc2VsZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4jc2VsZWN0aW9uQyxcXG4jc2VsZWN0aW9uQixcXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyxcXG4jc2VsZWN0aW9uUCB7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcblxcbiNzZWxlY3Rpb25DIHtcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuI3NlbGVjdGlvbkIge1xcbiAgd2lkdGg6IDE2MHB4O1xcbn1cXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyB7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcbiNzZWxlY3Rpb25QIHtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4uc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAyNTUpO1xcbn1cXG4uc2VsZWN0ZWQtaW52YWxpZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCkgIWltcG9ydGFudDtcXG59XFxuXFxuLmdyZXllZC1vdXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTA4LCAxMDgsIDI1NSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5Q0FBeUM7RUFDekMsU0FBUztFQUNULHNCQUFzQjtFQUN0QixVQUFVO0FBQ1o7QUFDQTs7RUFFRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsYUFBYTtFQUNiLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixNQUFNO0VBQ04sdUJBQXVCO0VBQ3ZCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGlCQUFpQjtFQUNqQixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULFlBQVk7RUFDWixZQUFZO0VBQ1osZUFBZTtFQUNmLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTs7Ozs7RUFLRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBOztFQUVFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDO0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsNEJBQTRCO0VBQzVCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsOEJBQThCO0VBQzlCLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5ib2R5LFxcbmh0bWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTc1LCAxNzUpO1xcbn1cXG5cXG4uZ3JpZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGhlaWdodDogNjAwcHg7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNDBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbn1cXG5cXG4uaHVtYW4gLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNjcsIDE2NywgMTY3KTtcXG59XFxuXFxuLnNoaXAuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nLXRvcDogMjBweDtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnNoaXAtc2VsZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4jc2VsZWN0aW9uQyxcXG4jc2VsZWN0aW9uQixcXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyxcXG4jc2VsZWN0aW9uUCB7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcblxcbiNzZWxlY3Rpb25DIHtcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuI3NlbGVjdGlvbkIge1xcbiAgd2lkdGg6IDE2MHB4O1xcbn1cXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyB7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcbiNzZWxlY3Rpb25QIHtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4uc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAyNTUpO1xcbn1cXG4uc2VsZWN0ZWQtaW52YWxpZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCkgIWltcG9ydGFudDtcXG59XFxuXFxuLmdyZXllZC1vdXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG59XFxuXFxuLnJvdGF0ZS1idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4ucm90YXRlLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTA4LCAxMDgsIDI1NSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL3N0eWxlLmNzc1wiO1xuXG4vLyBnbG9iYWwgdmFyaWFibGVzXG5jb25zdCBnYW1lR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhdHRsZXNoaXAtZ3JpZFwiKTtcbmNvbnN0IFtodW1hbkdyaWQsIGNvbXB1dGVyR3JpZF0gPSBnYW1lR3JpZHM7XG5jb25zdCBzaGlwU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLXNlbGVjdGlvblwiKTtcbmNvbnN0IHJvdGF0ZUJ1dHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvdGF0ZS1idXR0b25cIik7XG5cbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG5jb25zdCBoaXRNYXJrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmhpdE1hcmsudGV4dENvbnRlbnQgPSBcIlhcIjtcbmhpdE1hcmsuY2xhc3NMaXN0LmFkZChcImhpdG1hcmtcIiwgXCJoaWRkZW5cIik7XG5ncmlkQ2VsbC5hcHBlbmRDaGlsZChoaXRNYXJrKTtcblxubGV0IGh1bWFuR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xubGV0IGNvbXB1dGVyR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xubGV0IGh1bWFuID0gbmV3IFBsYXllcih0cnVlLCBodW1hbkdhbWVib2FyZCk7XG5sZXQgY29tcHV0ZXIgPSBuZXcgUGxheWVyKGZhbHNlLCBjb21wdXRlckdhbWVib2FyZCk7XG5sZXQgcGxheWluZyA9IGZhbHNlO1xuXG5sZXQgc2VsZWN0aW9uID0gdHJ1ZTtcbmxldCBpc1NoaXBTZWxlY3RlZCA9IGZhbHNlO1xubGV0IHNlbGVjdGVkSWQ7XG5sZXQgZGlyZWN0aW9uID0gXCJjb2xcIjtcbmxldCBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xubGV0IHNoaXBMZW5ndGhzID0ge1xuICBDOiA1LFxuICBCOiA0LFxuICBTOiAzLFxuICBEOiAzLFxuICBQOiAyLFxufTtcbmxldCBwbGFjZWRTaGlwSWRzID0gW107XG5cbi8vIGV2ZW50IGxpc3RlbmVyc1xuZnVuY3Rpb24gY2VsbFNob290TGlzdGVuZXIoZ3JpZCkge1xuICBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAocGxheWluZykge1xuICAgICAgICBsZXQgZ3JpZE5yID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChncmlkLmNoaWxkcmVuLCBub2RlKTtcbiAgICAgICAgaHVtYW5QbGF5cyhncmlkLCBncmlkTnIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaG92ZXJTZWxlY3Rpb24oc2hpcElkLCBncmlkTnIsIGdyaWRDZWxscykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBJZF07IGkrKykge1xuICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAvLyBtYWtpbmcgc3VyZSB0byBmbGFnIHBvc2l0aW9uIGFzIGludmFsaWQgaWYgaXQgaXMgdG9vIGNsb3NlIHRvIG90aGVyIHNoaXBzIHRvb1xuICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgaWYgKCFodW1hbkdhbWVib2FyZC5jaGVja1ZhbGlkUG9zaXRpb24ocG9zaXRpb24pKSB7XG4gICAgICAgIHBvc2l0aW9uID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgZ3JpZENlbGxzW0dhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCAxMCldLmNsYXNzTGlzdC5hZGQoXG4gICAgICAgIFwic2VsZWN0ZWRcIixcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG4gICAgICAvLyBoaWdobGlnaHQgdGhlbSBhbGwgYXMgaW52YWxpZFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgIGdyaWRDZWxsc1tcbiAgICAgICAgICAgIEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCAxMClcbiAgICAgICAgICBdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZC1pbnZhbGlkXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNlbGxHcmlkTGlzdGVuZXJzKGdyaWQpIHtcbiAgZm9yIChsZXQgZ3JpZE5yID0gMDsgZ3JpZE5yIDwgMTAwOyBncmlkTnIrKykge1xuICAgIGxldCBncmlkQ2VsbHMgPSBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpO1xuICAgIGxldCBjZWxsID0gZ3JpZENlbGxzW2dyaWROcl07XG4gICAgLy8gd2hlbiBob3ZlcmluZywgaGlnaGxpZ2h0IHRoZSBjb3JyZWN0IGNlbGxzXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IHtcbiAgICAgIGlmIChzZWxlY3Rpb24gJiYgaXNTaGlwU2VsZWN0ZWQpIHtcbiAgICAgICAgc2VsZWN0aW9uVmFsaWQgPSB0cnVlO1xuICAgICAgICBob3ZlclNlbGVjdGlvbihzZWxlY3RlZElkLCBncmlkTnIsIGdyaWRDZWxscyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGhvdmVyaW5nIG9mZiwgZ2V0IHJpZCBvZiBhbGwgdGhlIGNoYW5nZXNcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0aW9uICYmIGlzU2hpcFNlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICAgIGlmIChwb3NpdGlvbikge1xuICAgICAgICAgICAgZ3JpZENlbGxzW1xuICAgICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXG4gICAgICAgICAgICBdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiLCBcInNlbGVjdGVkLWludmFsaWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gcmVtb3ZpbmcgcGxhY2VkIHNoaXAgd2hlbiBjbGlja2VkXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKCFpc1NoaXBTZWxlY3RlZCAmJiBzZWxlY3Rpb24pIHtcbiAgICAgICAgbGV0IHNlbGVjdGVkU2hpcDtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgIGZvciAobGV0IHNoaXAgb2YgaHVtYW5HYW1lYm9hcmQuc2hpcHMpIHtcbiAgICAgICAgICBpZiAoc2hpcC5wb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICAgICAgICBzZWxlY3RlZFNoaXAgPSBzaGlwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkU2hpcCkge1xuICAgICAgICAgIGxldCBzaGlwRWxlbWVudCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRTaGlwLmlkLFxuICAgICAgICAgICk7XG4gICAgICAgICAgZm9yIChsZXQgc2VsZWN0ZWRQb3Mgb2Ygc2VsZWN0ZWRTaGlwLnBvc2l0aW9ucykge1xuICAgICAgICAgICAgbGV0IHBvc0dyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHNlbGVjdGVkUG9zLCAxMCk7XG4gICAgICAgICAgICBncmlkQ2VsbHNbcG9zR3JpZE5yXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGh1bWFuR2FtZWJvYXJkLnJlbW92ZVNoaXAoZ3JpZCwgc2VsZWN0ZWRTaGlwLmlkKTtcbiAgICAgICAgICBwbGFjZWRTaGlwSWRzLnNwbGljZShwbGFjZWRTaGlwSWRzLmluZGV4T2Yoc2VsZWN0ZWRTaGlwLmlkKSwgMSk7XG4gICAgICAgICAgc2VsZWN0U2hpcChcbiAgICAgICAgICAgIHNoaXBFbGVtZW50LFxuICAgICAgICAgICAgc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgc2hpcEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImdyZXllZC1vdXRcIik7XG4gICAgICAgICAgaG92ZXJTZWxlY3Rpb24oc2VsZWN0ZWRTaGlwLmlkLCBncmlkTnIsIGdyaWRDZWxscyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gY2xpY2tpbmcgb24gdGhlIGdyaWQgdG8gcGxhY2VcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uICYmIHNlbGVjdGlvblZhbGlkKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IHNoaXBFbGVtZW50ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRJZCxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKHBvc2l0aW9ucywgc2VsZWN0ZWRJZCk7XG4gICAgICAgIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGdyaWQsIHNoaXApO1xuICAgICAgICBwbGFjZWRTaGlwSWRzLnB1c2goc2VsZWN0ZWRJZCk7XG4gICAgICAgIC8vIGdyZXkgaXQgb3V0XG4gICAgICAgIHVuc2VsZWN0U2hpcChzaGlwRWxlbWVudCk7XG4gICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbnJvdGF0ZUJ1dHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHNlbGVjdGlvbikge1xuICAgIHJvdGF0ZShzaGlwU2VsZWN0aW9uLCBcIi5zZWxlY3Rpb24tc2hpcFwiKTtcbiAgfVxufSk7XG5cbnNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBsZXQgaWQgPSBzaGlwLmlkLnN1YnN0cmluZyhzaGlwLmlkLmxlbmd0aCAtIDEpO1xuICAgIGlmIChzZWxlY3Rpb24gJiYgIXBsYWNlZFNoaXBJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJZCAhPT0gaWQpIHtcbiAgICAgICAgc2VsZWN0U2hpcChzaGlwLCBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gaW5pdGlhbCBzdHlsaW5nXG5mdW5jdGlvbiBncmlkQ3JlYXRpb24oKSB7XG4gIGdhbWVHcmlkcy5mb3JFYWNoKChnYW1lR3JpZCkgPT4ge1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1yb3dzXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIC8vIGVudGVyaW5nIGFsbCBncmlkIGl0ZW1zXG4gICAgaW5zZXJ0R3JpZENlbGxzKDEwLCAxMCwgZ2FtZUdyaWQsIGdyaWRDZWxsKTtcbiAgfSk7XG4gIC8vIGFkZGluZyBpbml0aWFsIGNlbGwgZXZlbnQgbGlzdGVuZXJzXG4gIC8vIHNpbmNlIHRoZXkgb25seSBleGlzdCBvbmNlIGdyaWQgaXMgY3JlYXRlZFxuICBjZWxsU2hvb3RMaXN0ZW5lcihjb21wdXRlckdyaWQpO1xuICBjZWxsR3JpZExpc3RlbmVycyhodW1hbkdyaWQpO1xufVxuXG4vLyByb3dzLCBjb2xzIDogaW50LFxuLy8gZ3JpZCwgY2VsbCA6IERPTSBlbGVtZW50c1xuZnVuY3Rpb24gaW5zZXJ0R3JpZENlbGxzKHJvd3MsIGNvbHMsIGdyaWQsIGNlbGwpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzICogY29sczsgaSsrKSB7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsLmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbn1cblxuLy8gKioqIFRISVMgSVMgV0hFUkUgVEhFIFRVUk5TIEhBUFBFTlxuZnVuY3Rpb24gaHVtYW5QbGF5cyhncmlkLCBncmlkTnIpIHtcbiAgR2FtZWJvYXJkLm1hcmtIaXQoZ3JpZCwgZ3JpZE5yKTtcbiAgaHVtYW4uYXR0YWNrKGNvbXB1dGVyLCBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKSk7XG4gIC8vIGNoZWNrIGlmIGh1bWFuIGhhcyB3b25cbiAgaWYgKGNoZWNrV2luKCkpIHtcbiAgICAvLyBsYXRlciByZXNldFxuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29tcHV0ZXJQbGF5cygpO1xufVxuXG4vLyBjb21wdXRlcidzIHR1cm5cbmZ1bmN0aW9uIGNvbXB1dGVyUGxheXMoKSB7XG4gIGxldCBhdHRhY2tQb3NpdGlvbiA9IGNvbXB1dGVyLmF0dGFjayhodW1hbik7XG4gIGxldCByb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBjb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROcigxMCwgcm93VmFsdWUsIGNvbFZhbHVlKTtcbiAgR2FtZWJvYXJkLm1hcmtIaXQoaHVtYW5HcmlkLCBncmlkTnIpO1xuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja1dpbigpIHtcbiAgaWYgKGh1bWFuR2FtZWJvYXJkLmFsbFN1bmsoKSkge1xuICAgIHdpbk1lc3NhZ2UoXCJjb21wdXRlclwiKTtcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgd2luTWVzc2FnZShcImh1bWFuXCIpO1xuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHdpbk1lc3NhZ2Uod2lubmVyKSB7XG4gIC8vIGNyZWF0ZSBtb2RhbFxuICBhbGVydCh3aW5uZXIgKyBcIiB3b25cIik7XG59XG5cbi8vICoqKiBGT1IgTEFURVJcbmZ1bmN0aW9uIHJlc2V0KCkge31cblxuLy8gcm90YXRlIGJ1dHRvblxuLy8gVEVNUE9SQVJZIFZFUlNJT05cbmZ1bmN0aW9uIHJvdGF0ZShwYXJlbnQsIHNoaXBTZWxlY3Rvcikge1xuICAvLyBzd2l0Y2hpbmcgdGhlIGRpcmVjdGlvblxuICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgIGNhc2UgXCJjb2xcIjpcbiAgICAgIGRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicm93XCI6XG4gICAgICBkaXJlY3Rpb24gPSBcImNvbFwiO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyByb3RhdGluZyBhbGwgdGhlIHNoaXBzXG4gIHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNoaXBTZWxlY3RvcikuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCB3aWR0aCA9IHNoaXAub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHNoaXAub2Zmc2V0SGVpZ2h0O1xuICAgIHNoaXAuc3R5bGUud2lkdGggPSBTdHJpbmcoaGVpZ2h0KSArIFwicHhcIjtcbiAgICBzaGlwLnN0eWxlLmhlaWdodCA9IFN0cmluZyh3aWR0aCkgKyBcInB4XCI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RTaGlwKHNlbGVjdGVkU2hpcEVsZW1lbnQsIHNoaXBFbGVtZW50cykge1xuICAvLyBtYWtlIHN1cmUgdGhlIHJlc3QgYXJlIHVuc2VsZWN0ZWQgZmlyc3RcbiAgc2hpcEVsZW1lbnRzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICB1bnNlbGVjdFNoaXAoc2hpcCk7XG4gIH0pO1xuXG4gIGxldCBzaGlwSWQgPSBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLnN1YnN0cmluZyhcbiAgICBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLmxlbmd0aCAtIDEsXG4gICk7XG5cbiAgaXNTaGlwU2VsZWN0ZWQgPSB0cnVlO1xuICBzZWxlY3RlZElkID0gc2hpcElkO1xuICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gIC8vIGFkZCBib3JkZXIgdG8gc2VsZWN0ZWQgc2hpcFxuICBzZWxlY3RlZFNoaXBFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIHJlZFwiO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdFNoaXAoc2hpcCkge1xuICBpc1NoaXBTZWxlY3RlZCA9IGZhbHNlO1xuICBzZWxlY3RlZElkID0gXCJcIjtcbiAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcblxuICAvLyBhZGQgYm9yZGVyIHRvIHNlbGVjdGVkIHNoaXBcbiAgc2hpcC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbn1cblxuLy8gKioqIERFTEVURSBPTkNFIENVU1RPTSBNRVRIT0RTIENSRUFURURcbmZ1bmN0aW9uIHBsYWNlSW5pdGlhbEJvYXRzKCkge1xuICAvLyBsZXQgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKFtcIjE6MlwiLCBcIjE6M1wiXSwgXCJQXCIpO1xuICAvLyBsZXQgc3VibWFyaW5lID0gbmV3IFNoaXAoW1wiMzoyXCIsIFwiMzozXCIsIFwiMzo0XCJdLCBcIlNcIik7XG4gIC8vIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGh1bWFuR3JpZCwgcGF0cm9sQm9hdCk7XG4gIC8vIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGh1bWFuR3JpZCwgc3VibWFyaW5lKTtcblxuICBsZXQgcGF0cm9sQm9hdEMgPSBuZXcgU2hpcChbXCIxOjJcIiwgXCIxOjNcIl0sIFwiUFwiKTtcbiAgbGV0IHN1Ym1hcmluZUMgPSBuZXcgU2hpcChbXCIzOjJcIiwgXCIzOjNcIiwgXCIzOjRcIl0sIFwiU1wiKTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2UoY29tcHV0ZXJHcmlkLCBwYXRyb2xCb2F0Qyk7XG4gIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlKGNvbXB1dGVyR3JpZCwgc3VibWFyaW5lQyk7XG59XG5cbmdyaWRDcmVhdGlvbigpO1xucGxhY2VJbml0aWFsQm9hdHMoKTtcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJoaXRQb3NpdGlvbnMiLCJzaGlwcyIsInNoaXAiLCJfY2hlY2tWYWxpZFNoaXBQb3NpdGlvbiIsInB1c2giLCJncmlkIiwicGxhY2VMb2dpY2FsbHkiLCJwbGFjZUluR3JpZCIsIm1pbmltdW0iLCJwb3NpdGlvbnMiLCJyZWR1Y2UiLCJzdG9yZWQiLCJwbGFjZWRQb3MiLCJnZXRSb3dWYWx1ZSIsIkluZmluaXR5IiwiZ2V0Q29sVmFsdWUiLCJuZXdTaGlwIiwic29tZSIsIm5ld1BvcyIsImNoZWNrVmFsaWRQb3NpdGlvbiIsInBvcyIsIm5ld1Jvd1ZhbHVlIiwibmV3Q29sVmFsdWUiLCJwbGFjZWRTaGlwIiwibWluUm93VmFsdWUiLCJfbWluUm93VmFsdWUiLCJtYXhSb3dWYWx1ZSIsIl9tYXhSb3dWYWx1ZSIsIm1pbkNvbFZhbHVlIiwiX21pbkNvbFZhbHVlIiwibWF4Q29sVmFsdWUiLCJfbWF4Q29sVmFsdWUiLCJpbmNsdWRlcyIsImkiLCJsZW5ndGgiLCJoaXQiLCJldmVyeSIsImlzU3VuayIsInNoaXBMZW5ndGgiLCJmb3JFYWNoIiwiZ3JpZE5yIiwiZmluZEdyaWROciIsImdyaWROb2RlIiwiY2hpbGRyZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJpZCIsInNwbGljZSIsImluZGV4T2YiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsInN1YnN0cmluZyIsInJlbW92ZSIsInJlbW92ZVNoaXBMb2dpY2FsbHkiLCJyZW1vdmVTaGlwRnJvbUdyaWQiLCJOdW1iZXIiLCJkaXJlY3Rpb24iLCJ2YWwiLCJyb3dWYWx1ZSIsImNvbFZhbHVlIiwiVHlwZUVycm9yIiwibnIiLCJjb2xzIiwiTWF0aCIsImZsb29yIiwicm93IiwiZmluZEdyaWRSb3ciLCJjb2wiLCJmaW5kR3JpZENvbCIsImNvbnRhaW5zIiwiUGxheWVyIiwiaXNIdW1hbiIsImdhbWVib2FyZCIsIm90aGVyUGxheWVyIiwicmVjZWl2ZUF0dGFjayIsIl9yYW5kb21QYWlyIiwicmFuZG9tTnIxIiwicmFuZG9tTnIyIiwicG9zaXRpb24iLCJyYW5kb20iLCJ1bmRlZmluZWQiLCJfaHVtYW5BdHRhY2siLCJfY29tcHV0ZXJBdHRhY2siLCJTaGlwIiwic3VuayIsImdhbWVHcmlkcyIsImRvY3VtZW50IiwiaHVtYW5HcmlkIiwiY29tcHV0ZXJHcmlkIiwic2hpcFNlbGVjdGlvbiIsInF1ZXJ5U2VsZWN0b3IiLCJyb3RhdGVCdXR0IiwiZ3JpZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiaGl0TWFyayIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJodW1hbkdhbWVib2FyZCIsImNvbXB1dGVyR2FtZWJvYXJkIiwiaHVtYW4iLCJjb21wdXRlciIsInBsYXlpbmciLCJzZWxlY3Rpb24iLCJpc1NoaXBTZWxlY3RlZCIsInNlbGVjdGVkSWQiLCJzZWxlY3Rpb25WYWxpZCIsInNoaXBMZW5ndGhzIiwiQyIsIkIiLCJTIiwiRCIsIlAiLCJwbGFjZWRTaGlwSWRzIiwiY2VsbFNob290TGlzdGVuZXIiLCJub2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsImh1bWFuUGxheXMiLCJob3ZlclNlbGVjdGlvbiIsInNoaXBJZCIsImdyaWRDZWxscyIsInN0YXJ0UG9zaXRpb24iLCJmaW5kUG9zaXRpb25Gcm9tR3JpZE5yIiwiYWRkVG9Qb3NpdGlvbiIsImZpbmRHcmlkTnJGcm9tUG9zaXRpb24iLCJjZWxsR3JpZExpc3RlbmVycyIsInNlbGVjdGVkU2hpcCIsInNoaXBFbGVtZW50Iiwic2VsZWN0ZWRQb3MiLCJwb3NHcmlkTnIiLCJyZW1vdmVTaGlwIiwic2VsZWN0U2hpcCIsInBsYWNlIiwidW5zZWxlY3RTaGlwIiwicm90YXRlIiwiZ3JpZENyZWF0aW9uIiwiZ2FtZUdyaWQiLCJzdHlsZSIsImluc2VydEdyaWRDZWxscyIsInJvd3MiLCJjbG9uZU5vZGUiLCJtYXJrSGl0IiwiYXR0YWNrIiwiY2hlY2tXaW4iLCJjb21wdXRlclBsYXlzIiwiYXR0YWNrUG9zaXRpb24iLCJhbGxTdW5rIiwid2luTWVzc2FnZSIsIndpbm5lciIsImFsZXJ0IiwicmVzZXQiLCJwYXJlbnQiLCJzaGlwU2VsZWN0b3IiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2VsZWN0ZWRTaGlwRWxlbWVudCIsInNoaXBFbGVtZW50cyIsImJvcmRlciIsInBsYWNlSW5pdGlhbEJvYXRzIiwicGF0cm9sQm9hdEMiLCJzdWJtYXJpbmVDIl0sInNvdXJjZVJvb3QiOiIifQ==
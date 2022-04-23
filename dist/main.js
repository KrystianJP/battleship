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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n  display: grid;\n  grid-template-rows: 1fr 300px;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.grid-cell.ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 158, 158);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.selection-ship.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.multi-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.multi-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,SAAS;EACT,sBAAsB;EACtB,UAAU;AACZ;AACA;;EAEE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,8BAA8B;EAC9B,aAAa;EACb,6BAA6B;EAC7B,8BAA8B;EAC9B;;mBAEiB;EACjB,MAAM;AACR;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,SAAS;EACT,aAAa;EACb,yCAAyC;AAC3C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,MAAM;EACN,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA,gDAAgD;AAChD;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,iBAAiB;EACjB,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,aAAa;EACb,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;AACA;;EAEE,YAAY;AACd;AACA;EACE,WAAW;AACb;;AAEA;EACE,8BAA8B;AAChC;AACA;EACE,yCAAyC;AAC3C;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,4BAA4B;EAC5B,YAAY;AACd;AACA;EACE,8BAA8B;EAC9B,eAAe;AACjB","sourcesContent":["* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n  display: grid;\n  grid-template-rows: 1fr 300px;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.grid-cell.ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 158, 158);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.selection-ship.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.multi-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.multi-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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
  if (selection) {
    rotate(shipSelection, ".selection-ship");
  }
});
shipSelection.addEventListener("click", function () {
  if (selection && isShipSelected) {
    console.log("hey");
    unselectShip(shipSelection.querySelector("#selection" + selectedId));
  }
});
shipSelection.querySelectorAll(".selection-ship").forEach(function (ship) {
  ship.addEventListener("click", function (e) {
    var id = ship.id.substring(ship.id.length - 1);

    if (selection && !placedShipIds.includes(id)) {
      console.log("yo");

      if (selectedId !== id) {
        selectShip(ship, shipSelection.querySelectorAll(".selection-ship"));
      } else {
        unselectShip(ship);
      }

      e.stopPropagation();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlCQUFpQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcz9hMmY1Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAxMHgxMCB4OkEtSiB5OiAxLTEwXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhpdFBvc2l0aW9ucyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIHBsYWNlTG9naWNhbGx5KHNoaXApIHtcbiAgICBpZiAodGhpcy5fY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihzaGlwKSkge1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHBsYWNlKGdyaWQsIHNoaXApIHtcbiAgICBpZiAodGhpcy5wbGFjZUxvZ2ljYWxseShzaGlwKSkge1xuICAgICAgdGhpcy5wbGFjZUluR3JpZChncmlkLCBzaGlwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZ2V0Um93VmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKDAsIHBvcy5pbmRleE9mKFwiOlwiKSkpO1xuICB9XG5cbiAgc3RhdGljIGdldENvbFZhbHVlKHBvcykge1xuICAgIHJldHVybiBOdW1iZXIocG9zLnN1YnN0cmluZyhwb3MuaW5kZXhPZihcIjpcIikgKyAxKSk7XG4gIH1cblxuICBfbWluUm93VmFsdWUoc2hpcCkge1xuICAgIGxldCBtaW5pbXVtID0gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpIDwgc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICAgIHJldHVybiBtaW5pbXVtO1xuICB9XG4gIF9taW5Db2xWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKSA8IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIEluZmluaXR5KTtcbiAgfVxuICBfbWF4Um93VmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcykgPiBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCAtSW5maW5pdHkpO1xuICB9XG4gIF9tYXhDb2xWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKSA+IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIC1JbmZpbml0eSk7XG4gIH1cblxuICAvLyBkaXJlY3Rpb24gPSBcInJvd1wiIC8gXCJjb2xcIlxuICAvLyBwb3MgPSBcInJvdzpjb2xcIlxuICBzdGF0aWMgYWRkVG9Qb3NpdGlvbihwb3MsIGRpcmVjdGlvbiwgdmFsKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgLy8gZ2V0dGluZyBmaXJzdCBudW1iZXJcbiAgICAgIGxldCByb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgICAgbGV0IG5ld1Jvd1ZhbHVlID0gcm93VmFsdWUgKyB2YWw7XG4gICAgICAvLyBtYWtpbmcgc3VyZSBpdCBpcyB3aXRoaW4gcmFuZ2VcbiAgICAgIGlmIChuZXdSb3dWYWx1ZSA+IDEwIHx8IG5ld1Jvd1ZhbHVlIDwgMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBjb25jYXRlbmF0aW5nIHRvIGl0IHRoZSByZXN0IG9mIHRoZSBwb3NpdGlvblxuICAgICAgcmV0dXJuIFN0cmluZyhuZXdSb3dWYWx1ZSkgKyBwb3Muc3Vic3RyaW5nKHBvcy5pbmRleE9mKFwiOlwiKSk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIHJvdyBicmFuY2hcbiAgICAgIGxldCBjb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuICAgICAgbGV0IG5ld0NvbFZhbHVlID0gY29sVmFsdWUgKyB2YWw7XG4gICAgICBpZiAobmV3Q29sVmFsdWUgPiAxMCB8fCBuZXdDb2xWYWx1ZSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpICsgMSkgKyBTdHJpbmcobmV3Q29sVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSU5WQUxJRCBESVJFQ1RJT04gUEFSQU1FVEVSXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiBzaGlwJ3MgcG9zaXRpb24gaXMgdmFsaWQgYnkgY2hlY2tpbmcgaXQgaXMgbmVhciBvciBvdmVybGFwcGluZyBleGlzdGluZyBzaGlwXG4gIF9jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKG5ld1NoaXApIHtcbiAgICAvLyBnaXZlcyB0cnVlIGlmIGEgc2luZ2xlIHZhbHVlIGlzIGludmFsaWQsIHNvIG11c3QgYmUgaW52ZXJ0ZWRcbiAgICByZXR1cm4gIW5ld1NoaXAucG9zaXRpb25zLnNvbWUoKG5ld1BvcykgPT4ge1xuICAgICAgcmV0dXJuICF0aGlzLmNoZWNrVmFsaWRQb3NpdGlvbihuZXdQb3MpO1xuICAgIH0pO1xuICB9XG5cbiAgY2hlY2tWYWxpZFBvc2l0aW9uKHBvcykge1xuICAgIGxldCBuZXdSb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgIGxldCBuZXdDb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuXG4gICAgLy8gZ2V0IG1pbiArIG1heCB2YWx1ZSBvZiByb3cgYW5kIGNvbCBmb3IgZWFjaCBzaGlwIGFuZCBjaGVjayBpZiB0aGUgbmV3IHBvc2l0aW9uIHZhbHVlcyBhcmUgd2l0aGluIHRoZW0gKy0xXG4gICAgLy8gaWYgYSBzaW5nbGUgdmFsdWUgaXMgSU5WQUxJRCwgcmV0dXJuIFRSVUVcbiAgICByZXR1cm4gIXRoaXMuc2hpcHMuc29tZSgocGxhY2VkU2hpcCkgPT4ge1xuICAgICAgbGV0IG1pblJvd1ZhbHVlID0gdGhpcy5fbWluUm93VmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWF4Um93VmFsdWUgPSB0aGlzLl9tYXhSb3dWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtaW5Db2xWYWx1ZSA9IHRoaXMuX21pbkNvbFZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1heENvbFZhbHVlID0gdGhpcy5fbWF4Q29sVmFsdWUocGxhY2VkU2hpcCk7XG5cbiAgICAgIGlmIChcbiAgICAgICAgbmV3Um93VmFsdWUgPj0gbWluUm93VmFsdWUgLSAxICYmXG4gICAgICAgIG5ld1Jvd1ZhbHVlIDw9IG1heFJvd1ZhbHVlICsgMSAmJlxuICAgICAgICBuZXdDb2xWYWx1ZSA+PSBtaW5Db2xWYWx1ZSAtIDEgJiZcbiAgICAgICAgbmV3Q29sVmFsdWUgPD0gbWF4Q29sVmFsdWUgKyAxXG4gICAgICApIHtcbiAgICAgICAgLy8gSU5WQUxJRCBUSEVSRUZPUkUgVFJVRVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHdpbGwgY2hlY2sgaWYgdmFsaWQgcG9zaXRpb24gYW5kIHNlbmQgdGhlIGhpdCwgdGhlIHNoaXAgd2lsbCB0aGVuIGNoZWNrIGlmIGl0IGlzIGhpdFxuICByZWNlaXZlQXR0YWNrKHBvcykge1xuICAgIGlmICghdGhpcy5oaXRQb3NpdGlvbnMuaW5jbHVkZXMocG9zKSkge1xuICAgICAgdGhpcy5oaXRQb3NpdGlvbnMucHVzaChwb3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLmhpdChwb3MpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhbGxTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZFJvdyhuciwgY29scykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG5yIC8gY29scykgKyAxO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkQ29sKG5yLCByb3csIGNvbHMpIHtcbiAgICByZXR1cm4gbnIgLSAocm93IC0gMSkgKiBjb2xzICsgMTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kUG9zaXRpb25Gcm9tR3JpZE5yKG5yLCBjb2xzKSB7XG4gICAgbGV0IHJvdyA9IEdhbWVib2FyZC5maW5kR3JpZFJvdyhuciwgY29scyk7XG4gICAgbGV0IGNvbCA9IEdhbWVib2FyZC5maW5kR3JpZENvbChuciwgcm93LCBjb2xzKTtcbiAgICByZXR1cm4gU3RyaW5nKHJvdykgKyBcIjpcIiArIFN0cmluZyhjb2wpO1xuICB9XG5cbiAgLy8gcm93IGFuZCBjb2wgc3RhcnRpbmcgZnJvbSAxXG4gIHN0YXRpYyBmaW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKSB7XG4gICAgcmV0dXJuIGNvbHMgKiAocm93IC0gMSkgKyAoY29sIC0gMSk7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3MsIGNvbHMpIHtcbiAgICBsZXQgcm93ID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgbGV0IGNvbCA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuICAgIHJldHVybiBHYW1lYm9hcmQuZmluZEdyaWROcihjb2xzLCByb3csIGNvbCk7XG4gIH1cblxuICAvLyBET00gbWFuaXB1bGF0aW9uXG4gIC8vIHBsYWNpbmcgdGhlIHNoaXAgdmlzdWFsbHkgb24gZ2l2ZW4gZ3JpZFxuICBwbGFjZUluR3JpZChncmlkLCBzaGlwKSB7XG4gICAgbGV0IHNoaXBMZW5ndGggPSBzaGlwLnBvc2l0aW9ucy5sZW5ndGg7XG4gICAgc2hpcC5wb3NpdGlvbnMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICBsZXQgZ3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnIoXG4gICAgICAgIDEwLFxuICAgICAgICBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKSxcbiAgICAgICAgR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyksXG4gICAgICApO1xuICAgICAgbGV0IGdyaWROb2RlID0gZ3JpZC5jaGlsZHJlbltncmlkTnJdO1xuICAgICAgZ3JpZE5vZGUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICBncmlkTm9kZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNoaXBcIiArIFN0cmluZyhzaGlwLmlkKSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbWFya0hpdChncmlkLCBncmlkTnIpIHtcbiAgICBsZXQgZ3JpZE5vZGUgPSBncmlkLmNoaWxkcmVuW2dyaWROcl07XG4gICAgZ3JpZE5vZGUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfVxuXG4gIHN0YXRpYyBjaGVja0hpdChncmlkLCBncmlkTnIpIHtcbiAgICBpZiAoZ3JpZC5jaGlsZHJlbltncmlkTnJdLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlU2hpcExvZ2ljYWxseShpZCkge1xuICAgIHRoaXMuc2hpcHMuc29tZSgoc2hpcCkgPT4ge1xuICAgICAgaWYgKHNoaXAuaWQgPT09IGlkKSB7XG4gICAgICAgIHRoaXMuc2hpcHMuc3BsaWNlKHRoaXMuc2hpcHMuaW5kZXhPZihzaGlwKSwgMSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlU2hpcEZyb21HcmlkKGdyaWQsIGlkKSB7XG4gICAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKS5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICBpZiAoY2VsbC5pZC5zdWJzdHJpbmcoNCkgPT09IGlkKSB7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZShcInNoaXBcIik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlU2hpcChncmlkLCBpZCkge1xuICAgIHRoaXMucmVtb3ZlU2hpcExvZ2ljYWxseShpZCk7XG4gICAgdGhpcy5yZW1vdmVTaGlwRnJvbUdyaWQoZ3JpZCwgaWQpO1xuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiY2xhc3MgUGxheWVyIHtcbiAgLy8gaXNIdW1hbiA9IHRydWUgLyBmYWxzZVxuICBjb25zdHJ1Y3Rvcihpc0h1bWFuLCBnYW1lYm9hcmQpIHtcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuICB9XG5cbiAgX2h1bWFuQXR0YWNrKG90aGVyUGxheWVyLCBwb3MpIHtcbiAgICBvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICB9XG5cbiAgLy8gcmV0dXJucyBldmVudHVhbCBhdHRhY2tlZCBwb3NpdGlvblxuICBfY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpIHtcbiAgICBkbyB7XG4gICAgICBsZXQgW3JhbmRvbU5yMSwgcmFuZG9tTnIyXSA9IHRoaXMuX3JhbmRvbVBhaXIoKTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IFN0cmluZyhyYW5kb21OcjEpICsgXCI6XCIgKyBTdHJpbmcocmFuZG9tTnIyKTtcbiAgICB9IHdoaWxlICghb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zaXRpb24pKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBfcmFuZG9tUGFpcigpIHtcbiAgICBsZXQgcmFuZG9tTnIxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICBsZXQgcmFuZG9tTnIyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICByZXR1cm4gW3JhbmRvbU5yMSwgcmFuZG9tTnIyXTtcbiAgfVxuXG4gIC8vIHJldHVybnMgdGhlIHBvc2l0aW9uIHRoYXQgd2FzIGF0dGFja2VkXG4gIGF0dGFjayhvdGhlclBsYXllciwgcG9zID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuaXNIdW1hbikge1xuICAgICAgdGhpcy5faHVtYW5BdHRhY2sob3RoZXJQbGF5ZXIsIHBvcyk7XG4gICAgICByZXR1cm4gcG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNsYXNzIFNoaXAge1xuICAvLyBwb3NpdGlvbnMgPSBbXCIxOjFcIiwgXCIxOjJcIiAsIFwiMTozXCJdIFwicm93OmNvbFwiXG4gIC8vIGlkID0gXCJDXCIgLyBcIkJcIiAvIFwiRFwiIC8gXCJTXCIgLyBcIlBcIlxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbnMsIGlkKSB7XG4gICAgdGhpcy5zaGlwTGVuZ3RoID0gcG9zaXRpb25zLmxlbmd0aDtcbiAgICB0aGlzLnBvc2l0aW9ucyA9IHBvc2l0aW9ucztcbiAgICB0aGlzLmhpdFBvc2l0aW9ucyA9IFtdO1xuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgfVxuXG4gIC8vIGR1cGxpY2F0ZSB2YWxpZGF0aW9uIG9jY3VycyBpbiBHYW1lYm9hcmQgb2JqZWN0c1xuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmhpdFBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0UG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5zaGlwTGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG59XFxuYm9keSxcXG5odG1sIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDE3NSwgMTc1KTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAzMDBweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgIFxcXCJodW1hbiBjb21wdXRlclxcXCJcXG4gICAgXFxcImJvdHRvbSBib3R0b21cXFwiO1xcbiAgZ2FwOiAwO1xcbn1cXG5cXG4uaHVtYW4ge1xcbiAgZ3JpZC1hcmVhOiBodW1hbjtcXG59XFxuXFxuLmNvbXB1dGVyIHtcXG4gIGdyaWQtYXJlYTogY29tcHV0ZXI7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbn1cXG5cXG4vKiBDSEFOR0UgVEhJUyBUTyBIVU1BTiBUTyBISURFIENPTVBVVEVSIFNISVBTICovXFxuLmdyaWQtY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTY3LCAxNjcsIDE2Nyk7XFxufVxcblxcbi5zaGlwLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCk7XFxufVxcblxcbi5ib3R0b20tY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogYm90dG9tO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4uc2hpcC1zZWxlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbiNzZWxlY3Rpb25DLFxcbiNzZWxlY3Rpb25CLFxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TLFxcbiNzZWxlY3Rpb25QIHtcXG4gIGhlaWdodDogNDBweDtcXG59XFxuXFxuI3NlbGVjdGlvbkMge1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jc2VsZWN0aW9uQiB7XFxuICB3aWR0aDogMTYwcHg7XFxufVxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TIHtcXG4gIHdpZHRoOiAxMjBweDtcXG59XFxuI3NlbGVjdGlvblAge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbi5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDI1NSk7XFxufVxcbi5zZWxlY3RlZC1pbnZhbGlkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAuZ3JleWVkLW91dCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbn1cXG5cXG4ubXVsdGktYnV0dG9uIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLm11bHRpLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTA4LCAxMDgsIDI1NSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5Q0FBeUM7RUFDekMsU0FBUztFQUNULHNCQUFzQjtFQUN0QixVQUFVO0FBQ1o7QUFDQTs7RUFFRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsOEJBQThCO0VBQzlCLGFBQWE7RUFDYiw2QkFBNkI7RUFDN0IsOEJBQThCO0VBQzlCOzttQkFFaUI7RUFDakIsTUFBTTtBQUNSOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxhQUFhO0VBQ2IseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLE1BQU07RUFDTix1QkFBdUI7RUFDdkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUEsZ0RBQWdEO0FBQ2hEO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxZQUFZO0VBQ1osWUFBWTtFQUNaLGVBQWU7RUFDZixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7Ozs7O0VBS0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTs7RUFFRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLDRCQUE0QjtFQUM1QixZQUFZO0FBQ2Q7QUFDQTtFQUNFLDhCQUE4QjtFQUM5QixlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG59XFxuYm9keSxcXG5odG1sIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDE3NSwgMTc1KTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAzMDBweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgIFxcXCJodW1hbiBjb21wdXRlclxcXCJcXG4gICAgXFxcImJvdHRvbSBib3R0b21cXFwiO1xcbiAgZ2FwOiAwO1xcbn1cXG5cXG4uaHVtYW4ge1xcbiAgZ3JpZC1hcmVhOiBodW1hbjtcXG59XFxuXFxuLmNvbXB1dGVyIHtcXG4gIGdyaWQtYXJlYTogY29tcHV0ZXI7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbn1cXG5cXG4vKiBDSEFOR0UgVEhJUyBUTyBIVU1BTiBUTyBISURFIENPTVBVVEVSIFNISVBTICovXFxuLmdyaWQtY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTY3LCAxNjcsIDE2Nyk7XFxufVxcblxcbi5zaGlwLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCk7XFxufVxcblxcbi5ib3R0b20tY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogYm90dG9tO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4uc2hpcC1zZWxlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbiNzZWxlY3Rpb25DLFxcbiNzZWxlY3Rpb25CLFxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TLFxcbiNzZWxlY3Rpb25QIHtcXG4gIGhlaWdodDogNDBweDtcXG59XFxuXFxuI3NlbGVjdGlvbkMge1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jc2VsZWN0aW9uQiB7XFxuICB3aWR0aDogMTYwcHg7XFxufVxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TIHtcXG4gIHdpZHRoOiAxMjBweDtcXG59XFxuI3NlbGVjdGlvblAge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbi5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDI1NSk7XFxufVxcbi5zZWxlY3RlZC1pbnZhbGlkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAuZ3JleWVkLW91dCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbn1cXG5cXG4ubXVsdGktYnV0dG9uIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLm11bHRpLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTA4LCAxMDgsIDI1NSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL3N0eWxlLmNzc1wiO1xuXG4vLyBnbG9iYWwgdmFyaWFibGVzXG5jb25zdCBnYW1lR3JpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmJhdHRsZXNoaXAtZ3JpZFwiKTtcbmNvbnN0IFtodW1hbkdyaWQsIGNvbXB1dGVyR3JpZF0gPSBnYW1lR3JpZHM7XG5jb25zdCBzaGlwU2VsZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLXNlbGVjdGlvblwiKTtcbmNvbnN0IG11bHRpQnV0dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubXVsdGktYnV0dG9uXCIpO1xuXG5jb25zdCBncmlkQ2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5ncmlkQ2VsbC5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1jZWxsXCIpO1xuXG5sZXQgaHVtYW5HYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5sZXQgY29tcHV0ZXJHYW1lYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XG5sZXQgaHVtYW4gPSBuZXcgUGxheWVyKHRydWUsIGh1bWFuR2FtZWJvYXJkKTtcbmxldCBjb21wdXRlciA9IG5ldyBQbGF5ZXIoZmFsc2UsIGNvbXB1dGVyR2FtZWJvYXJkKTtcbmxldCBwbGF5aW5nID0gZmFsc2U7XG5cbmxldCBzZWxlY3Rpb24gPSB0cnVlO1xubGV0IGlzU2hpcFNlbGVjdGVkID0gZmFsc2U7XG5sZXQgc2VsZWN0ZWRJZDtcbmxldCBkaXJlY3Rpb24gPSBcImNvbFwiO1xubGV0IHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5sZXQgc2hpcExlbmd0aHMgPSB7XG4gIEM6IDUsXG4gIEI6IDQsXG4gIFM6IDMsXG4gIEQ6IDMsXG4gIFA6IDIsXG59O1xubGV0IHBsYWNlZFNoaXBJZHMgPSBbXTtcblxuLy8gZXZlbnQgbGlzdGVuZXJzXG5mdW5jdGlvbiBjZWxsU2hvb3RMaXN0ZW5lcihncmlkKSB7XG4gIGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIikuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChwbGF5aW5nKSB7XG4gICAgICAgIGxldCBncmlkTnIgPSBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGdyaWQuY2hpbGRyZW4sIG5vZGUpO1xuICAgICAgICBodW1hblBsYXlzKGdyaWQsIGdyaWROcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBob3ZlclNlbGVjdGlvbihzaGlwSWQsIGdyaWROciwgZ3JpZENlbGxzKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcElkXTsgaSsrKSB7XG4gICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgIC8vIG1ha2luZyBzdXJlIHRvIGZsYWcgcG9zaXRpb24gYXMgaW52YWxpZCBpZiBpdCBpcyB0b28gY2xvc2UgdG8gb3RoZXIgc2hpcHMgdG9vXG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICBpZiAoIWh1bWFuR2FtZWJvYXJkLmNoZWNrVmFsaWRQb3NpdGlvbihwb3NpdGlvbikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICBncmlkQ2VsbHNbR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKV0uY2xhc3NMaXN0LmFkZChcbiAgICAgICAgXCJzZWxlY3RlZFwiLFxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcbiAgICAgIC8vIGhpZ2hsaWdodCB0aGVtIGFsbCBhcyBpbnZhbGlkXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NlbGVjdGVkSWRdOyBpKyspIHtcbiAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgZ3JpZENlbGxzW1xuICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKVxuICAgICAgICAgIF0uY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLWludmFsaWRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY2VsbEdyaWRMaXN0ZW5lcnMoZ3JpZCkge1xuICBmb3IgKGxldCBncmlkTnIgPSAwOyBncmlkTnIgPCAxMDA7IGdyaWROcisrKSB7XG4gICAgbGV0IGdyaWRDZWxscyA9IGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIik7XG4gICAgbGV0IGNlbGwgPSBncmlkQ2VsbHNbZ3JpZE5yXTtcbiAgICAvLyB3aGVuIGhvdmVyaW5nLCBoaWdobGlnaHQgdGhlIGNvcnJlY3QgY2VsbHNcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3Rpb25WYWxpZCA9IHRydWU7XG4gICAgICAgIGhvdmVyU2VsZWN0aW9uKHNlbGVjdGVkSWQsIGdyaWROciwgZ3JpZENlbGxzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gaG92ZXJpbmcgb2ZmLCBnZXQgcmlkIG9mIGFsbCB0aGUgY2hhbmdlc1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHtcbiAgICAgIGlmIChzZWxlY3Rpb24gJiYgaXNTaGlwU2VsZWN0ZWQpIHtcbiAgICAgICAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NlbGVjdGVkSWRdOyBpKyspIHtcbiAgICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICBncmlkQ2VsbHNbXG4gICAgICAgICAgICAgIEdhbWVib2FyZC5maW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvc2l0aW9uLCAxMClcbiAgICAgICAgICAgIF0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIsIFwic2VsZWN0ZWQtaW52YWxpZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyByZW1vdmluZyBwbGFjZWQgc2hpcCB3aGVuIGNsaWNrZWRcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoIWlzU2hpcFNlbGVjdGVkICYmIHNlbGVjdGlvbikge1xuICAgICAgICBsZXQgc2VsZWN0ZWRTaGlwO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgZm9yIChsZXQgc2hpcCBvZiBodW1hbkdhbWVib2FyZC5zaGlwcykge1xuICAgICAgICAgIGlmIChzaGlwLnBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkU2hpcCA9IHNoaXA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VsZWN0ZWRTaGlwKSB7XG4gICAgICAgICAgbGV0IHNoaXBFbGVtZW50ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgICAgXCIjc2VsZWN0aW9uXCIgKyBzZWxlY3RlZFNoaXAuaWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBmb3IgKGxldCBzZWxlY3RlZFBvcyBvZiBzZWxlY3RlZFNoaXAucG9zaXRpb25zKSB7XG4gICAgICAgICAgICBsZXQgcG9zR3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24oc2VsZWN0ZWRQb3MsIDEwKTtcbiAgICAgICAgICAgIGdyaWRDZWxsc1twb3NHcmlkTnJdLmNsYXNzTGlzdC5yZW1vdmUoXCJzZWxlY3RlZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaHVtYW5HYW1lYm9hcmQucmVtb3ZlU2hpcChncmlkLCBzZWxlY3RlZFNoaXAuaWQpO1xuICAgICAgICAgIHBsYWNlZFNoaXBJZHMuc3BsaWNlKHBsYWNlZFNoaXBJZHMuaW5kZXhPZihzZWxlY3RlZFNoaXAuaWQpLCAxKTtcbiAgICAgICAgICBzZWxlY3RTaGlwKFxuICAgICAgICAgICAgc2hpcEVsZW1lbnQsXG4gICAgICAgICAgICBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIiksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiZ3JleWVkLW91dFwiKTtcbiAgICAgICAgICBob3ZlclNlbGVjdGlvbihzZWxlY3RlZFNoaXAuaWQsIGdyaWROciwgZ3JpZENlbGxzKTtcbiAgICAgICAgICBtdWx0aUJ1dHQudGV4dENvbnRlbnQgPSBcIlJPVEFURVwiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGNsaWNraW5nIG9uIHRoZSBncmlkIHRvIHBsYWNlXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGlzU2hpcFNlbGVjdGVkICYmIHNlbGVjdGlvbiAmJiBzZWxlY3Rpb25WYWxpZCkge1xuICAgICAgICBsZXQgcG9zaXRpb25zID0gW107XG4gICAgICAgIGxldCBzaGlwRWxlbWVudCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkSWQsXG4gICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgICBwb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcChwb3NpdGlvbnMsIHNlbGVjdGVkSWQpO1xuICAgICAgICBodW1hbkdhbWVib2FyZC5wbGFjZShncmlkLCBzaGlwKTtcbiAgICAgICAgcGxhY2VkU2hpcElkcy5wdXNoKHNlbGVjdGVkSWQpO1xuICAgICAgICAvLyBncmV5IGl0IG91dFxuICAgICAgICB1bnNlbGVjdFNoaXAoc2hpcEVsZW1lbnQpO1xuICAgICAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ3JleWVkLW91dFwiKTtcbiAgICAgICAgaWYgKHBsYWNlZFNoaXBJZHMubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICBtdWx0aUJ1dHQudGV4dENvbnRlbnQgPSBcIlNUQVJUXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5tdWx0aUJ1dHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHNlbGVjdGlvbikge1xuICAgIHJvdGF0ZShzaGlwU2VsZWN0aW9uLCBcIi5zZWxlY3Rpb24tc2hpcFwiKTtcbiAgfVxufSk7XG5cbnNoaXBTZWxlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgIGNvbnNvbGUubG9nKFwiaGV5XCIpO1xuICAgIHVuc2VsZWN0U2hpcChzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIjc2VsZWN0aW9uXCIgKyBzZWxlY3RlZElkKSk7XG4gIH1cbn0pO1xuXG5zaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgIGxldCBpZCA9IHNoaXAuaWQuc3Vic3RyaW5nKHNoaXAuaWQubGVuZ3RoIC0gMSk7XG4gICAgaWYgKHNlbGVjdGlvbiAmJiAhcGxhY2VkU2hpcElkcy5pbmNsdWRlcyhpZCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwieW9cIik7XG4gICAgICBpZiAoc2VsZWN0ZWRJZCAhPT0gaWQpIHtcbiAgICAgICAgc2VsZWN0U2hpcChzaGlwLCBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIGluaXRpYWwgc3R5bGluZ1xuZnVuY3Rpb24gZ3JpZENyZWF0aW9uKCkge1xuICBnYW1lR3JpZHMuZm9yRWFjaCgoZ2FtZUdyaWQpID0+IHtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtcm93c1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICAvLyBlbnRlcmluZyBhbGwgZ3JpZCBpdGVtc1xuICAgIGluc2VydEdyaWRDZWxscygxMCwgMTAsIGdhbWVHcmlkLCBncmlkQ2VsbCk7XG4gIH0pO1xuICAvLyBhZGRpbmcgaW5pdGlhbCBjZWxsIGV2ZW50IGxpc3RlbmVyc1xuICAvLyBzaW5jZSB0aGV5IG9ubHkgZXhpc3Qgb25jZSBncmlkIGlzIGNyZWF0ZWRcbiAgY2VsbFNob290TGlzdGVuZXIoY29tcHV0ZXJHcmlkKTtcbiAgY2VsbEdyaWRMaXN0ZW5lcnMoaHVtYW5HcmlkKTtcbn1cblxuLy8gcm93cywgY29scyA6IGludCxcbi8vIGdyaWQsIGNlbGwgOiBET00gZWxlbWVudHNcbmZ1bmN0aW9uIGluc2VydEdyaWRDZWxscyhyb3dzLCBjb2xzLCBncmlkLCBjZWxsKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAqIGNvbHM7IGkrKykge1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG5cbi8vICoqKiBUSElTIElTIFdIRVJFIFRIRSBUVVJOUyBIQVBQRU5cbmZ1bmN0aW9uIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKSB7XG4gIEdhbWVib2FyZC5tYXJrSGl0KGdyaWQsIGdyaWROcik7XG4gIGh1bWFuLmF0dGFjayhjb21wdXRlciwgR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCkpO1xuICAvLyBjaGVjayBpZiBodW1hbiBoYXMgd29uXG4gIGlmIChjaGVja1dpbigpKSB7XG4gICAgLy8gbGF0ZXIgcmVzZXRcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbXB1dGVyUGxheXMoKTtcbn1cblxuLy8gY29tcHV0ZXIncyB0dXJuXG5mdW5jdGlvbiBjb21wdXRlclBsYXlzKCkge1xuICBsZXQgYXR0YWNrUG9zaXRpb24gPSBjb21wdXRlci5hdHRhY2soaHVtYW4pO1xuICBsZXQgcm93VmFsdWUgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUoYXR0YWNrUG9zaXRpb24pO1xuICBsZXQgY29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUoYXR0YWNrUG9zaXRpb24pO1xuICBsZXQgZ3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnIoMTAsIHJvd1ZhbHVlLCBjb2xWYWx1ZSk7XG4gIEdhbWVib2FyZC5tYXJrSGl0KGh1bWFuR3JpZCwgZ3JpZE5yKTtcbiAgaWYgKGNoZWNrV2luKCkpIHtcbiAgICAvLyBsYXRlciByZXNldFxuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbn1cblxuZnVuY3Rpb24gY2hlY2tXaW4oKSB7XG4gIGlmIChodW1hbkdhbWVib2FyZC5hbGxTdW5rKCkpIHtcbiAgICB3aW5NZXNzYWdlKFwiY29tcHV0ZXJcIik7XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2UgaWYgKGNvbXB1dGVyR2FtZWJvYXJkLmFsbFN1bmsoKSkge1xuICAgIHdpbk1lc3NhZ2UoXCJodW1hblwiKTtcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiB3aW5NZXNzYWdlKHdpbm5lcikge1xuICAvLyBjcmVhdGUgbW9kYWxcbiAgYWxlcnQod2lubmVyICsgXCIgd29uXCIpO1xufVxuXG4vLyAqKiogRk9SIExBVEVSXG5mdW5jdGlvbiByZXNldCgpIHt9XG5cbi8vIHJvdGF0ZSBidXR0b25cbi8vIFRFTVBPUkFSWSBWRVJTSU9OXG5mdW5jdGlvbiByb3RhdGUocGFyZW50LCBzaGlwU2VsZWN0b3IpIHtcbiAgLy8gc3dpdGNoaW5nIHRoZSBkaXJlY3Rpb25cbiAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICBjYXNlIFwiY29sXCI6XG4gICAgICBkaXJlY3Rpb24gPSBcInJvd1wiO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcInJvd1wiOlxuICAgICAgZGlyZWN0aW9uID0gXCJjb2xcIjtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgLy8gcm90YXRpbmcgYWxsIHRoZSBzaGlwc1xuICBwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzaGlwU2VsZWN0b3IpLmZvckVhY2goKHNoaXApID0+IHtcbiAgICBsZXQgd2lkdGggPSBzaGlwLm9mZnNldFdpZHRoO1xuICAgIGxldCBoZWlnaHQgPSBzaGlwLm9mZnNldEhlaWdodDtcbiAgICBzaGlwLnN0eWxlLndpZHRoID0gU3RyaW5nKGhlaWdodCkgKyBcInB4XCI7XG4gICAgc2hpcC5zdHlsZS5oZWlnaHQgPSBTdHJpbmcod2lkdGgpICsgXCJweFwiO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0U2hpcChzZWxlY3RlZFNoaXBFbGVtZW50LCBzaGlwRWxlbWVudHMpIHtcbiAgLy8gbWFrZSBzdXJlIHRoZSByZXN0IGFyZSB1bnNlbGVjdGVkIGZpcnN0XG4gIHNoaXBFbGVtZW50cy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICB9KTtcblxuICBsZXQgc2hpcElkID0gc2VsZWN0ZWRTaGlwRWxlbWVudC5pZC5zdWJzdHJpbmcoXG4gICAgc2VsZWN0ZWRTaGlwRWxlbWVudC5pZC5sZW5ndGggLSAxLFxuICApO1xuXG4gIGlzU2hpcFNlbGVjdGVkID0gdHJ1ZTtcbiAgc2VsZWN0ZWRJZCA9IHNoaXBJZDtcbiAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcblxuICAvLyBhZGQgYm9yZGVyIHRvIHNlbGVjdGVkIHNoaXBcbiAgc2VsZWN0ZWRTaGlwRWxlbWVudC5zdHlsZS5ib3JkZXIgPSBcIjJweCBzb2xpZCByZWRcIjtcbn1cblxuZnVuY3Rpb24gdW5zZWxlY3RTaGlwKHNoaXApIHtcbiAgaXNTaGlwU2VsZWN0ZWQgPSBmYWxzZTtcbiAgc2VsZWN0ZWRJZCA9IFwiXCI7XG4gIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5cbiAgLy8gYWRkIGJvcmRlciB0byBzZWxlY3RlZCBzaGlwXG4gIHNoaXAuc3R5bGUuYm9yZGVyID0gXCJub25lXCI7XG59XG5cbi8vICoqKiBERUxFVEUgT05DRSBDVVNUT00gTUVUSE9EUyBDUkVBVEVEXG5mdW5jdGlvbiBwbGFjZUluaXRpYWxCb2F0cygpIHtcbiAgLy8gbGV0IHBhdHJvbEJvYXQgPSBuZXcgU2hpcChbXCIxOjJcIiwgXCIxOjNcIl0sIFwiUFwiKTtcbiAgLy8gbGV0IHN1Ym1hcmluZSA9IG5ldyBTaGlwKFtcIjM6MlwiLCBcIjM6M1wiLCBcIjM6NFwiXSwgXCJTXCIpO1xuICAvLyBodW1hbkdhbWVib2FyZC5wbGFjZShodW1hbkdyaWQsIHBhdHJvbEJvYXQpO1xuICAvLyBodW1hbkdhbWVib2FyZC5wbGFjZShodW1hbkdyaWQsIHN1Ym1hcmluZSk7XG5cbiAgbGV0IHBhdHJvbEJvYXRDID0gbmV3IFNoaXAoW1wiMToyXCIsIFwiMTozXCJdLCBcIlBcIik7XG4gIGxldCBzdWJtYXJpbmVDID0gbmV3IFNoaXAoW1wiMzoyXCIsIFwiMzozXCIsIFwiMzo0XCJdLCBcIlNcIik7XG4gIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlKGNvbXB1dGVyR3JpZCwgcGF0cm9sQm9hdEMpO1xuICBjb21wdXRlckdhbWVib2FyZC5wbGFjZShjb21wdXRlckdyaWQsIHN1Ym1hcmluZUMpO1xufVxuXG5ncmlkQ3JlYXRpb24oKTtcbnBsYWNlSW5pdGlhbEJvYXRzKCk7XG4iXSwibmFtZXMiOlsiR2FtZWJvYXJkIiwiaGl0UG9zaXRpb25zIiwic2hpcHMiLCJzaGlwIiwiX2NoZWNrVmFsaWRTaGlwUG9zaXRpb24iLCJwdXNoIiwiZ3JpZCIsInBsYWNlTG9naWNhbGx5IiwicGxhY2VJbkdyaWQiLCJtaW5pbXVtIiwicG9zaXRpb25zIiwicmVkdWNlIiwic3RvcmVkIiwicGxhY2VkUG9zIiwiZ2V0Um93VmFsdWUiLCJJbmZpbml0eSIsImdldENvbFZhbHVlIiwibmV3U2hpcCIsInNvbWUiLCJuZXdQb3MiLCJjaGVja1ZhbGlkUG9zaXRpb24iLCJwb3MiLCJuZXdSb3dWYWx1ZSIsIm5ld0NvbFZhbHVlIiwicGxhY2VkU2hpcCIsIm1pblJvd1ZhbHVlIiwiX21pblJvd1ZhbHVlIiwibWF4Um93VmFsdWUiLCJfbWF4Um93VmFsdWUiLCJtaW5Db2xWYWx1ZSIsIl9taW5Db2xWYWx1ZSIsIm1heENvbFZhbHVlIiwiX21heENvbFZhbHVlIiwiaW5jbHVkZXMiLCJpIiwibGVuZ3RoIiwiaGl0IiwiZXZlcnkiLCJpc1N1bmsiLCJzaGlwTGVuZ3RoIiwiZm9yRWFjaCIsImdyaWROciIsImZpbmRHcmlkTnIiLCJncmlkTm9kZSIsImNoaWxkcmVuIiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwiaWQiLCJzcGxpY2UiLCJpbmRleE9mIiwicXVlcnlTZWxlY3RvckFsbCIsImNlbGwiLCJzdWJzdHJpbmciLCJyZW1vdmUiLCJyZW1vdmVTaGlwTG9naWNhbGx5IiwicmVtb3ZlU2hpcEZyb21HcmlkIiwiTnVtYmVyIiwiZGlyZWN0aW9uIiwidmFsIiwicm93VmFsdWUiLCJjb2xWYWx1ZSIsIlR5cGVFcnJvciIsIm5yIiwiY29scyIsIk1hdGgiLCJmbG9vciIsInJvdyIsImZpbmRHcmlkUm93IiwiY29sIiwiZmluZEdyaWRDb2wiLCJjb250YWlucyIsIlBsYXllciIsImlzSHVtYW4iLCJnYW1lYm9hcmQiLCJvdGhlclBsYXllciIsInJlY2VpdmVBdHRhY2siLCJfcmFuZG9tUGFpciIsInJhbmRvbU5yMSIsInJhbmRvbU5yMiIsInBvc2l0aW9uIiwicmFuZG9tIiwidW5kZWZpbmVkIiwiX2h1bWFuQXR0YWNrIiwiX2NvbXB1dGVyQXR0YWNrIiwiU2hpcCIsInN1bmsiLCJnYW1lR3JpZHMiLCJkb2N1bWVudCIsImh1bWFuR3JpZCIsImNvbXB1dGVyR3JpZCIsInNoaXBTZWxlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwibXVsdGlCdXR0IiwiZ3JpZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiaHVtYW5HYW1lYm9hcmQiLCJjb21wdXRlckdhbWVib2FyZCIsImh1bWFuIiwiY29tcHV0ZXIiLCJwbGF5aW5nIiwic2VsZWN0aW9uIiwiaXNTaGlwU2VsZWN0ZWQiLCJzZWxlY3RlZElkIiwic2VsZWN0aW9uVmFsaWQiLCJzaGlwTGVuZ3RocyIsIkMiLCJCIiwiUyIsIkQiLCJQIiwicGxhY2VkU2hpcElkcyIsImNlbGxTaG9vdExpc3RlbmVyIiwibm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJodW1hblBsYXlzIiwiaG92ZXJTZWxlY3Rpb24iLCJzaGlwSWQiLCJncmlkQ2VsbHMiLCJzdGFydFBvc2l0aW9uIiwiZmluZFBvc2l0aW9uRnJvbUdyaWROciIsImFkZFRvUG9zaXRpb24iLCJmaW5kR3JpZE5yRnJvbVBvc2l0aW9uIiwiY2VsbEdyaWRMaXN0ZW5lcnMiLCJzZWxlY3RlZFNoaXAiLCJzaGlwRWxlbWVudCIsInNlbGVjdGVkUG9zIiwicG9zR3JpZE5yIiwicmVtb3ZlU2hpcCIsInNlbGVjdFNoaXAiLCJ0ZXh0Q29udGVudCIsInBsYWNlIiwidW5zZWxlY3RTaGlwIiwicm90YXRlIiwiY29uc29sZSIsImxvZyIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJncmlkQ3JlYXRpb24iLCJnYW1lR3JpZCIsInN0eWxlIiwiaW5zZXJ0R3JpZENlbGxzIiwicm93cyIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwibWFya0hpdCIsImF0dGFjayIsImNoZWNrV2luIiwiY29tcHV0ZXJQbGF5cyIsImF0dGFja1Bvc2l0aW9uIiwiYWxsU3VuayIsIndpbk1lc3NhZ2UiLCJ3aW5uZXIiLCJhbGVydCIsInJlc2V0IiwicGFyZW50Iiwic2hpcFNlbGVjdG9yIiwid2lkdGgiLCJvZmZzZXRXaWR0aCIsImhlaWdodCIsIm9mZnNldEhlaWdodCIsInNlbGVjdGVkU2hpcEVsZW1lbnQiLCJzaGlwRWxlbWVudHMiLCJib3JkZXIiLCJwbGFjZUluaXRpYWxCb2F0cyIsInBhdHJvbEJvYXRDIiwic3VibWFyaW5lQyJdLCJzb3VyY2VSb290IjoiIn0=
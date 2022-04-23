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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n  display: grid;\n  grid-template-rows: 1fr auto;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.grid-cell.ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 158, 158);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.multi-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.multi-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n", "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,SAAS;EACT,sBAAsB;EACtB,UAAU;AACZ;AACA;;EAEE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,8BAA8B;EAC9B,aAAa;EACb,4BAA4B;EAC5B,8BAA8B;EAC9B;;mBAEiB;EACjB,MAAM;AACR;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,SAAS;EACT,aAAa;EACb,yCAAyC;AAC3C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,MAAM;EACN,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA,gDAAgD;AAChD;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,iBAAiB;EACjB,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,aAAa;EACb,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;AACA;;EAEE,YAAY;AACd;AACA;EACE,WAAW;AACb;;AAEA;EACE,8BAA8B;AAChC;AACA;EACE,yCAAyC;AAC3C;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,4BAA4B;EAC5B,YAAY;AACd;AACA;EACE,8BAA8B;EAC9B,eAAe;AACjB","sourcesContent":["* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n  display: grid;\n  grid-template-rows: 1fr auto;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.grid-cell.ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 158, 158);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.multi-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.multi-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n"],"sourceRoot":""}]);
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

multiButt.addEventListener("click", function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFiO0FBQ0FDLEVBQUFBLGNBQWMsR0FBRyxLQUFqQixDQUgwQixDQUsxQjs7QUFDQXRHLEVBQUFBLElBQUksQ0FBQ3dJLEtBQUwsQ0FBV3VCLE1BQVgsR0FBb0IsTUFBcEI7QUFDRCxFQUVEOzs7QUFDQSxTQUFTQyxpQkFBVCxHQUE2QjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQUlDLFdBQVcsR0FBRyxJQUFJOUUsdUNBQUosQ0FBUyxDQUFDLEtBQUQsRUFBUSxLQUFSLENBQVQsRUFBeUIsR0FBekIsQ0FBbEI7QUFDQSxNQUFJK0UsVUFBVSxHQUFHLElBQUkvRSx1Q0FBSixDQUFTLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLENBQVQsRUFBZ0MsR0FBaEMsQ0FBakI7QUFDQVksRUFBQUEsaUJBQWlCLENBQUNvQyxLQUFsQixDQUF3QjNDLFlBQXhCLEVBQXNDeUUsV0FBdEM7QUFDQWxFLEVBQUFBLGlCQUFpQixDQUFDb0MsS0FBbEIsQ0FBd0IzQyxZQUF4QixFQUFzQzBFLFVBQXRDO0FBQ0Q7O0FBRUQ1QixZQUFZO0FBQ1owQixpQkFBaUIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3N0eWxlcy9zdHlsZS5jc3M/YTJmNSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMTB4MTAgeDpBLUogeTogMS0xMFxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBwbGFjZUxvZ2ljYWxseShzaGlwKSB7XG4gICAgaWYgKHRoaXMuX2NoZWNrVmFsaWRTaGlwUG9zaXRpb24oc2hpcCkpIHtcbiAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwbGFjZShncmlkLCBzaGlwKSB7XG4gICAgaWYgKHRoaXMucGxhY2VMb2dpY2FsbHkoc2hpcCkpIHtcbiAgICAgIHRoaXMucGxhY2VJbkdyaWQoZ3JpZCwgc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGdldFJvd1ZhbHVlKHBvcykge1xuICAgIHJldHVybiBOdW1iZXIocG9zLnN1YnN0cmluZygwLCBwb3MuaW5kZXhPZihcIjpcIikpKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb2xWYWx1ZShwb3MpIHtcbiAgICByZXR1cm4gTnVtYmVyKHBvcy5zdWJzdHJpbmcocG9zLmluZGV4T2YoXCI6XCIpICsgMSkpO1xuICB9XG5cbiAgX21pblJvd1ZhbHVlKHNoaXApIHtcbiAgICBsZXQgbWluaW11bSA9IHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKSA8IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIEluZmluaXR5KTtcbiAgICByZXR1cm4gbWluaW11bTtcbiAgfVxuICBfbWluQ29sVmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcykgPCBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCBJbmZpbml0eSk7XG4gIH1cbiAgX21heFJvd1ZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgLUluZmluaXR5KTtcbiAgfVxuICBfbWF4Q29sVmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcykgPiBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCAtSW5maW5pdHkpO1xuICB9XG5cbiAgLy8gZGlyZWN0aW9uID0gXCJyb3dcIiAvIFwiY29sXCJcbiAgLy8gcG9zID0gXCJyb3c6Y29sXCJcbiAgc3RhdGljIGFkZFRvUG9zaXRpb24ocG9zLCBkaXJlY3Rpb24sIHZhbCkge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgIC8vIGdldHRpbmcgZmlyc3QgbnVtYmVyXG4gICAgICBsZXQgcm93VmFsdWUgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICAgIGxldCBuZXdSb3dWYWx1ZSA9IHJvd1ZhbHVlICsgdmFsO1xuICAgICAgLy8gbWFraW5nIHN1cmUgaXQgaXMgd2l0aGluIHJhbmdlXG4gICAgICBpZiAobmV3Um93VmFsdWUgPiAxMCB8fCBuZXdSb3dWYWx1ZSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gY29uY2F0ZW5hdGluZyB0byBpdCB0aGUgcmVzdCBvZiB0aGUgcG9zaXRpb25cbiAgICAgIHJldHVybiBTdHJpbmcobmV3Um93VmFsdWUpICsgcG9zLnN1YnN0cmluZyhwb3MuaW5kZXhPZihcIjpcIikpO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSByZXZlcnNlIG9mIHRoZSByb3cgYnJhbmNoXG4gICAgICBsZXQgY29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcbiAgICAgIGxldCBuZXdDb2xWYWx1ZSA9IGNvbFZhbHVlICsgdmFsO1xuICAgICAgaWYgKG5ld0NvbFZhbHVlID4gMTAgfHwgbmV3Q29sVmFsdWUgPCAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBwb3Muc3Vic3RyaW5nKDAsIHBvcy5pbmRleE9mKFwiOlwiKSArIDEpICsgU3RyaW5nKG5ld0NvbFZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIklOVkFMSUQgRElSRUNUSU9OIFBBUkFNRVRFUlwiKTtcbiAgICB9XG4gIH1cblxuICAvLyBjaGVja3MgaWYgc2hpcCdzIHBvc2l0aW9uIGlzIHZhbGlkIGJ5IGNoZWNraW5nIGl0IGlzIG5lYXIgb3Igb3ZlcmxhcHBpbmcgZXhpc3Rpbmcgc2hpcFxuICBfY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihuZXdTaGlwKSB7XG4gICAgLy8gZ2l2ZXMgdHJ1ZSBpZiBhIHNpbmdsZSB2YWx1ZSBpcyBpbnZhbGlkLCBzbyBtdXN0IGJlIGludmVydGVkXG4gICAgcmV0dXJuICFuZXdTaGlwLnBvc2l0aW9ucy5zb21lKChuZXdQb3MpID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5jaGVja1ZhbGlkUG9zaXRpb24obmV3UG9zKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWRQb3NpdGlvbihwb3MpIHtcbiAgICBsZXQgbmV3Um93VmFsdWUgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgbmV3Q29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcblxuICAgIC8vIGdldCBtaW4gKyBtYXggdmFsdWUgb2Ygcm93IGFuZCBjb2wgZm9yIGVhY2ggc2hpcCBhbmQgY2hlY2sgaWYgdGhlIG5ldyBwb3NpdGlvbiB2YWx1ZXMgYXJlIHdpdGhpbiB0aGVtICstMVxuICAgIC8vIGlmIGEgc2luZ2xlIHZhbHVlIGlzIElOVkFMSUQsIHJldHVybiBUUlVFXG4gICAgcmV0dXJuICF0aGlzLnNoaXBzLnNvbWUoKHBsYWNlZFNoaXApID0+IHtcbiAgICAgIGxldCBtaW5Sb3dWYWx1ZSA9IHRoaXMuX21pblJvd1ZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1heFJvd1ZhbHVlID0gdGhpcy5fbWF4Um93VmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWluQ29sVmFsdWUgPSB0aGlzLl9taW5Db2xWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtYXhDb2xWYWx1ZSA9IHRoaXMuX21heENvbFZhbHVlKHBsYWNlZFNoaXApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG5ld1Jvd1ZhbHVlID49IG1pblJvd1ZhbHVlIC0gMSAmJlxuICAgICAgICBuZXdSb3dWYWx1ZSA8PSBtYXhSb3dWYWx1ZSArIDEgJiZcbiAgICAgICAgbmV3Q29sVmFsdWUgPj0gbWluQ29sVmFsdWUgLSAxICYmXG4gICAgICAgIG5ld0NvbFZhbHVlIDw9IG1heENvbFZhbHVlICsgMVxuICAgICAgKSB7XG4gICAgICAgIC8vIElOVkFMSUQgVEhFUkVGT1JFIFRSVUVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyB3aWxsIGNoZWNrIGlmIHZhbGlkIHBvc2l0aW9uIGFuZCBzZW5kIHRoZSBoaXQsIHRoZSBzaGlwIHdpbGwgdGhlbiBjaGVjayBpZiBpdCBpcyBoaXRcbiAgcmVjZWl2ZUF0dGFjayhwb3MpIHtcbiAgICBpZiAoIXRoaXMuaGl0UG9zaXRpb25zLmluY2x1ZGVzKHBvcykpIHtcbiAgICAgIHRoaXMuaGl0UG9zaXRpb25zLnB1c2gocG9zKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5oaXQocG9zKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWxsU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWRSb3cobnIsIGNvbHMpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihuciAvIGNvbHMpICsgMTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZENvbChuciwgcm93LCBjb2xzKSB7XG4gICAgcmV0dXJuIG5yIC0gKHJvdyAtIDEpICogY29scyArIDE7XG4gIH1cblxuICBzdGF0aWMgZmluZFBvc2l0aW9uRnJvbUdyaWROcihuciwgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZmluZEdyaWRSb3cobnIsIGNvbHMpO1xuICAgIGxldCBjb2wgPSBHYW1lYm9hcmQuZmluZEdyaWRDb2wobnIsIHJvdywgY29scyk7XG4gICAgcmV0dXJuIFN0cmluZyhyb3cpICsgXCI6XCIgKyBTdHJpbmcoY29sKTtcbiAgfVxuXG4gIC8vIHJvdyBhbmQgY29sIHN0YXJ0aW5nIGZyb20gMVxuICBzdGF0aWMgZmluZEdyaWROcihjb2xzLCByb3csIGNvbCkge1xuICAgIHJldHVybiBjb2xzICogKHJvdyAtIDEpICsgKGNvbCAtIDEpO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zLCBjb2xzKSB7XG4gICAgbGV0IHJvdyA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgIGxldCBjb2wgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcbiAgICByZXR1cm4gR2FtZWJvYXJkLmZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpO1xuICB9XG5cbiAgLy8gRE9NIG1hbmlwdWxhdGlvblxuICAvLyBwbGFjaW5nIHRoZSBzaGlwIHZpc3VhbGx5IG9uIGdpdmVuIGdyaWRcbiAgcGxhY2VJbkdyaWQoZ3JpZCwgc2hpcCkge1xuICAgIGxldCBzaGlwTGVuZ3RoID0gc2hpcC5wb3NpdGlvbnMubGVuZ3RoO1xuICAgIHNoaXAucG9zaXRpb25zLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgbGV0IGdyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yKFxuICAgICAgICAxMCxcbiAgICAgICAgR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyksXG4gICAgICAgIEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpLFxuICAgICAgKTtcbiAgICAgIGxldCBncmlkTm9kZSA9IGdyaWQuY2hpbGRyZW5bZ3JpZE5yXTtcbiAgICAgIGdyaWROb2RlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgZ3JpZE5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaGlwXCIgKyBTdHJpbmcoc2hpcC5pZCkpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIG1hcmtIaXQoZ3JpZCwgZ3JpZE5yKSB7XG4gICAgbGV0IGdyaWROb2RlID0gZ3JpZC5jaGlsZHJlbltncmlkTnJdO1xuICAgIGdyaWROb2RlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tIaXQoZ3JpZCwgZ3JpZE5yKSB7XG4gICAgaWYgKGdyaWQuY2hpbGRyZW5bZ3JpZE5yXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVNoaXBMb2dpY2FsbHkoaWQpIHtcbiAgICB0aGlzLnNoaXBzLnNvbWUoKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlkID09PSBpZCkge1xuICAgICAgICB0aGlzLnNoaXBzLnNwbGljZSh0aGlzLnNoaXBzLmluZGV4T2Yoc2hpcCksIDEpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVNoaXBGcm9tR3JpZChncmlkLCBpZCkge1xuICAgIGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIikuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaWQuc3Vic3RyaW5nKDQpID09PSBpZCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVNoaXAoZ3JpZCwgaWQpIHtcbiAgICB0aGlzLnJlbW92ZVNoaXBMb2dpY2FsbHkoaWQpO1xuICAgIHRoaXMucmVtb3ZlU2hpcEZyb21HcmlkKGdyaWQsIGlkKTtcbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImNsYXNzIFBsYXllciB7XG4gIC8vIGlzSHVtYW4gPSB0cnVlIC8gZmFsc2VcbiAgY29uc3RydWN0b3IoaXNIdW1hbiwgZ2FtZWJvYXJkKSB7XG4gICAgdGhpcy5pc0h1bWFuID0gaXNIdW1hbjtcbiAgICB0aGlzLmdhbWVib2FyZCA9IGdhbWVib2FyZDtcbiAgfVxuXG4gIF9odW1hbkF0dGFjayhvdGhlclBsYXllciwgcG9zKSB7XG4gICAgb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zKTtcbiAgfVxuXG4gIC8vIHJldHVybnMgZXZlbnR1YWwgYXR0YWNrZWQgcG9zaXRpb25cbiAgX2NvbXB1dGVyQXR0YWNrKG90aGVyUGxheWVyKSB7XG4gICAgZG8ge1xuICAgICAgbGV0IFtyYW5kb21OcjEsIHJhbmRvbU5yMl0gPSB0aGlzLl9yYW5kb21QYWlyKCk7XG4gICAgICB2YXIgcG9zaXRpb24gPSBTdHJpbmcocmFuZG9tTnIxKSArIFwiOlwiICsgU3RyaW5nKHJhbmRvbU5yMik7XG4gICAgfSB3aGlsZSAoIW90aGVyUGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvc2l0aW9uKSk7XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgX3JhbmRvbVBhaXIoKSB7XG4gICAgbGV0IHJhbmRvbU5yMSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgbGV0IHJhbmRvbU5yMiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSArIDE7XG4gICAgcmV0dXJuIFtyYW5kb21OcjEsIHJhbmRvbU5yMl07XG4gIH1cblxuICAvLyByZXR1cm5zIHRoZSBwb3NpdGlvbiB0aGF0IHdhcyBhdHRhY2tlZFxuICBhdHRhY2sob3RoZXJQbGF5ZXIsIHBvcyA9IHVuZGVmaW5lZCkge1xuICAgIGlmICh0aGlzLmlzSHVtYW4pIHtcbiAgICAgIHRoaXMuX2h1bWFuQXR0YWNrKG90aGVyUGxheWVyLCBwb3MpO1xuICAgICAgcmV0dXJuIHBvcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbXB1dGVyQXR0YWNrKG90aGVyUGxheWVyKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJjbGFzcyBTaGlwIHtcbiAgLy8gcG9zaXRpb25zID0gW1wiMToxXCIsIFwiMToyXCIgLCBcIjE6M1wiXSBcInJvdzpjb2xcIlxuICAvLyBpZCA9IFwiQ1wiIC8gXCJCXCIgLyBcIkRcIiAvIFwiU1wiIC8gXCJQXCJcbiAgY29uc3RydWN0b3IocG9zaXRpb25zLCBpZCkge1xuICAgIHRoaXMuc2hpcExlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cblxuICAvLyBkdXBsaWNhdGUgdmFsaWRhdGlvbiBvY2N1cnMgaW4gR2FtZWJvYXJkIG9iamVjdHNcbiAgaGl0KHBvc2l0aW9uKSB7XG4gICAgaWYgKHRoaXMucG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5oaXRQb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdFBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMuc2hpcExlbmd0aCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IHsgU2hpcCB9O1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbmJvZHksXFxuaHRtbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTc1LCAxNzUsIDE3NSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgYXV0bztcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgIFxcXCJodW1hbiBjb21wdXRlclxcXCJcXG4gICAgXFxcImJvdHRvbSBib3R0b21cXFwiO1xcbiAgZ2FwOiAwO1xcbn1cXG5cXG4uaHVtYW4ge1xcbiAgZ3JpZC1hcmVhOiBodW1hbjtcXG59XFxuXFxuLmNvbXB1dGVyIHtcXG4gIGdyaWQtYXJlYTogY29tcHV0ZXI7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbn1cXG5cXG4vKiBDSEFOR0UgVEhJUyBUTyBIVU1BTiBUTyBISURFIENPTVBVVEVSIFNISVBTICovXFxuLmdyaWQtY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTY3LCAxNjcsIDE2Nyk7XFxufVxcblxcbi5zaGlwLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCk7XFxufVxcblxcbi5ib3R0b20tY29udGFpbmVyIHtcXG4gIGdyaWQtYXJlYTogYm90dG9tO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBwYWRkaW5nOiAyMHB4O1xcbiAgZ2FwOiAyMHB4O1xcbn1cXG5cXG4uc2hpcC1zZWxlY3Rpb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMTBweDtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAyNDBweDtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogbGVmdDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbiNzZWxlY3Rpb25DLFxcbiNzZWxlY3Rpb25CLFxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TLFxcbiNzZWxlY3Rpb25QIHtcXG4gIGhlaWdodDogNDBweDtcXG59XFxuXFxuI3NlbGVjdGlvbkMge1xcbiAgd2lkdGg6IDIwMHB4O1xcbn1cXG4jc2VsZWN0aW9uQiB7XFxuICB3aWR0aDogMTYwcHg7XFxufVxcbiNzZWxlY3Rpb25ELFxcbiNzZWxlY3Rpb25TIHtcXG4gIHdpZHRoOiAxMjBweDtcXG59XFxuI3NlbGVjdGlvblAge1xcbiAgd2lkdGg6IDgwcHg7XFxufVxcblxcbi5zZWxlY3RlZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTU4LCAxNTgsIDI1NSk7XFxufVxcbi5zZWxlY3RlZC1pbnZhbGlkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KSAhaW1wb3J0YW50O1xcbn1cXG5cXG4uZ3JleWVkLW91dCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbn1cXG5cXG4ubXVsdGktYnV0dG9uIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIHBhZGRpbmc6IDEwcHg7XFxuICBmb250LXNpemU6IDE4cHg7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG4gIGNvbG9yOiB3aGl0ZTtcXG59XFxuLm11bHRpLWJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTA4LCAxMDgsIDI1NSk7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5Q0FBeUM7RUFDekMsU0FBUztFQUNULHNCQUFzQjtFQUN0QixVQUFVO0FBQ1o7QUFDQTs7RUFFRSxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsOEJBQThCO0VBQzlCLGFBQWE7RUFDYiw0QkFBNEI7RUFDNUIsOEJBQThCO0VBQzlCOzttQkFFaUI7RUFDakIsTUFBTTtBQUNSOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxhQUFhO0VBQ2IseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixXQUFXO0VBQ1gsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixpQkFBaUI7RUFDakIsYUFBYTtFQUNiLE1BQU07RUFDTix1QkFBdUI7RUFDdkIsY0FBYztBQUNoQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixpQkFBaUI7QUFDbkI7O0FBRUEsZ0RBQWdEO0FBQ2hEO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsaUJBQWlCO0VBQ2pCLFdBQVc7RUFDWCxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixhQUFhO0VBQ2IsU0FBUztBQUNYOztBQUVBO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxZQUFZO0VBQ1osWUFBWTtFQUNaLGVBQWU7RUFDZixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7Ozs7O0VBS0UsWUFBWTtBQUNkOztBQUVBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7RUFDRSxZQUFZO0FBQ2Q7QUFDQTs7RUFFRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQztBQUNBO0VBQ0UseUNBQXlDO0FBQzNDOztBQUVBO0VBQ0UsNEJBQTRCO0FBQzlCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixlQUFlO0VBQ2YsbUJBQW1CO0VBQ25CLDRCQUE0QjtFQUM1QixZQUFZO0FBQ2Q7QUFDQTtFQUNFLDhCQUE4QjtFQUM5QixlQUFlO0FBQ2pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG59XFxuYm9keSxcXG5odG1sIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDE3NSwgMTc1KTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciBhdXRvO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgXFxcImh1bWFuIGNvbXB1dGVyXFxcIlxcbiAgICBcXFwiYm90dG9tIGJvdHRvbVxcXCI7XFxuICBnYXA6IDA7XFxufVxcblxcbi5odW1hbiB7XFxuICBncmlkLWFyZWE6IGh1bWFuO1xcbn1cXG5cXG4uY29tcHV0ZXIge1xcbiAgZ3JpZC1hcmVhOiBjb21wdXRlcjtcXG59XFxuXFxuLnBsYXllci1jb250YWluZXIge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxufVxcblxcbi8qIENIQU5HRSBUSElTIFRPIEhVTUFOIFRPIEhJREUgQ09NUFVURVIgU0hJUFMgKi9cXG4uZ3JpZC1jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNjcsIDE2NywgMTY3KTtcXG59XFxuXFxuLnNoaXAuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiBib3R0b207XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi5zaGlwLXNlbGVjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuI3NlbGVjdGlvbkMsXFxuI3NlbGVjdGlvbkIsXFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMsXFxuI3NlbGVjdGlvblAge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4jc2VsZWN0aW9uQyB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNzZWxlY3Rpb25CIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG4jc2VsZWN0aW9uUCB7XFxuICB3aWR0aDogODBweDtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMjU1KTtcXG59XFxuLnNlbGVjdGVkLWludmFsaWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgMTU4LCAxNTgpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5ncmV5ZWQtb3V0IHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxufVxcblxcbi5tdWx0aS1idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4ubXVsdGktYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxMDgsIDEwOCwgMjU1KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbi8vIGdsb2JhbCB2YXJpYWJsZXNcbmNvbnN0IGdhbWVHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmF0dGxlc2hpcC1ncmlkXCIpO1xuY29uc3QgW2h1bWFuR3JpZCwgY29tcHV0ZXJHcmlkXSA9IGdhbWVHcmlkcztcbmNvbnN0IHNoaXBTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtc2VsZWN0aW9uXCIpO1xuY29uc3QgbXVsdGlCdXR0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tdWx0aS1idXR0b25cIik7XG5cbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG5cbmxldCBodW1hbkdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBjb21wdXRlckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBodW1hbiA9IG5ldyBQbGF5ZXIodHJ1ZSwgaHVtYW5HYW1lYm9hcmQpO1xubGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcihmYWxzZSwgY29tcHV0ZXJHYW1lYm9hcmQpO1xubGV0IHBsYXlpbmcgPSBmYWxzZTtcblxubGV0IHNlbGVjdGlvbiA9IHRydWU7XG5sZXQgaXNTaGlwU2VsZWN0ZWQgPSBmYWxzZTtcbmxldCBzZWxlY3RlZElkO1xubGV0IGRpcmVjdGlvbiA9IFwiY29sXCI7XG5sZXQgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcbmxldCBzaGlwTGVuZ3RocyA9IHtcbiAgQzogNSxcbiAgQjogNCxcbiAgUzogMyxcbiAgRDogMyxcbiAgUDogMixcbn07XG5sZXQgcGxhY2VkU2hpcElkcyA9IFtdO1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNlbGxTaG9vdExpc3RlbmVyKGdyaWQpIHtcbiAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHBsYXlpbmcpIHtcbiAgICAgICAgbGV0IGdyaWROciA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZ3JpZC5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICAgIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhvdmVyU2VsZWN0aW9uKHNoaXBJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwSWRdOyBpKyspIHtcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgLy8gbWFraW5nIHN1cmUgdG8gZmxhZyBwb3NpdGlvbiBhcyBpbnZhbGlkIGlmIGl0IGlzIHRvbyBjbG9zZSB0byBvdGhlciBzaGlwcyB0b29cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGlmICghaHVtYW5HYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKHBvc2l0aW9uKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGdyaWRDZWxsc1tHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBcInNlbGVjdGVkXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuICAgICAgLy8gaGlnaGxpZ2h0IHRoZW0gYWxsIGFzIGludmFsaWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICBncmlkQ2VsbHNbXG4gICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXG4gICAgICAgICAgXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtaW52YWxpZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjZWxsR3JpZExpc3RlbmVycyhncmlkKSB7XG4gIGZvciAobGV0IGdyaWROciA9IDA7IGdyaWROciA8IDEwMDsgZ3JpZE5yKyspIHtcbiAgICBsZXQgZ3JpZENlbGxzID0gZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgICBsZXQgY2VsbCA9IGdyaWRDZWxsc1tncmlkTnJdO1xuICAgIC8vIHdoZW4gaG92ZXJpbmcsIGhpZ2hsaWdodCB0aGUgY29ycmVjdCBjZWxsc1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0aW9uICYmIGlzU2hpcFNlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGlvblZhbGlkID0gdHJ1ZTtcbiAgICAgICAgaG92ZXJTZWxlY3Rpb24oc2VsZWN0ZWRJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBob3ZlcmluZyBvZmYsIGdldCByaWQgb2YgYWxsIHRoZSBjaGFuZ2VzXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGdyaWRDZWxsc1tcbiAgICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZC1pbnZhbGlkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJlbW92aW5nIHBsYWNlZCBzaGlwIHdoZW4gY2xpY2tlZFxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICghaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFNoaXA7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBmb3IgKGxldCBzaGlwIG9mIGh1bWFuR2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICAgICAgaWYgKHNoaXAucG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRTaGlwID0gc2hpcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZFNoaXApIHtcbiAgICAgICAgICBsZXQgc2hpcEVsZW1lbnQgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkU2hpcC5pZCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGZvciAobGV0IHNlbGVjdGVkUG9zIG9mIHNlbGVjdGVkU2hpcC5wb3NpdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBwb3NHcmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihzZWxlY3RlZFBvcywgMTApO1xuICAgICAgICAgICAgZ3JpZENlbGxzW3Bvc0dyaWROcl0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBodW1hbkdhbWVib2FyZC5yZW1vdmVTaGlwKGdyaWQsIHNlbGVjdGVkU2hpcC5pZCk7XG4gICAgICAgICAgcGxhY2VkU2hpcElkcy5zcGxpY2UocGxhY2VkU2hpcElkcy5pbmRleE9mKHNlbGVjdGVkU2hpcC5pZCksIDEpO1xuICAgICAgICAgIHNlbGVjdFNoaXAoXG4gICAgICAgICAgICBzaGlwRWxlbWVudCxcbiAgICAgICAgICAgIHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgICAgIGhvdmVyU2VsZWN0aW9uKHNlbGVjdGVkU2hpcC5pZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyB3aGVuIGNsaWNraW5nIG9uIHRoZSBncmlkIHRvIHBsYWNlXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgaWYgKGlzU2hpcFNlbGVjdGVkICYmIHNlbGVjdGlvbiAmJiBzZWxlY3Rpb25WYWxpZCkge1xuICAgICAgICBsZXQgcG9zaXRpb25zID0gW107XG4gICAgICAgIGxldCBzaGlwRWxlbWVudCA9IHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkSWQsXG4gICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgICBwb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNoaXAgPSBuZXcgU2hpcChwb3NpdGlvbnMsIHNlbGVjdGVkSWQpO1xuICAgICAgICBodW1hbkdhbWVib2FyZC5wbGFjZShncmlkLCBzaGlwKTtcbiAgICAgICAgcGxhY2VkU2hpcElkcy5wdXNoKHNlbGVjdGVkSWQpO1xuICAgICAgICAvLyBncmV5IGl0IG91dFxuICAgICAgICB1bnNlbGVjdFNoaXAoc2hpcEVsZW1lbnQpO1xuICAgICAgICBzaGlwRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiZ3JleWVkLW91dFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5tdWx0aUJ1dHQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKHNlbGVjdGlvbikge1xuICAgIHJvdGF0ZShzaGlwU2VsZWN0aW9uLCBcIi5zZWxlY3Rpb24tc2hpcFwiKTtcbiAgfVxufSk7XG5cbnNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBsZXQgaWQgPSBzaGlwLmlkLnN1YnN0cmluZyhzaGlwLmlkLmxlbmd0aCAtIDEpO1xuICAgIGlmIChzZWxlY3Rpb24gJiYgIXBsYWNlZFNoaXBJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJZCAhPT0gaWQpIHtcbiAgICAgICAgc2VsZWN0U2hpcChzaGlwLCBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcblxuLy8gaW5pdGlhbCBzdHlsaW5nXG5mdW5jdGlvbiBncmlkQ3JlYXRpb24oKSB7XG4gIGdhbWVHcmlkcy5mb3JFYWNoKChnYW1lR3JpZCkgPT4ge1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1yb3dzXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIC8vIGVudGVyaW5nIGFsbCBncmlkIGl0ZW1zXG4gICAgaW5zZXJ0R3JpZENlbGxzKDEwLCAxMCwgZ2FtZUdyaWQsIGdyaWRDZWxsKTtcbiAgfSk7XG4gIC8vIGFkZGluZyBpbml0aWFsIGNlbGwgZXZlbnQgbGlzdGVuZXJzXG4gIC8vIHNpbmNlIHRoZXkgb25seSBleGlzdCBvbmNlIGdyaWQgaXMgY3JlYXRlZFxuICBjZWxsU2hvb3RMaXN0ZW5lcihjb21wdXRlckdyaWQpO1xuICBjZWxsR3JpZExpc3RlbmVycyhodW1hbkdyaWQpO1xufVxuXG4vLyByb3dzLCBjb2xzIDogaW50LFxuLy8gZ3JpZCwgY2VsbCA6IERPTSBlbGVtZW50c1xuZnVuY3Rpb24gaW5zZXJ0R3JpZENlbGxzKHJvd3MsIGNvbHMsIGdyaWQsIGNlbGwpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzICogY29sczsgaSsrKSB7XG4gICAgZ3JpZC5hcHBlbmRDaGlsZChjZWxsLmNsb25lTm9kZSh0cnVlKSk7XG4gIH1cbn1cblxuLy8gKioqIFRISVMgSVMgV0hFUkUgVEhFIFRVUk5TIEhBUFBFTlxuZnVuY3Rpb24gaHVtYW5QbGF5cyhncmlkLCBncmlkTnIpIHtcbiAgR2FtZWJvYXJkLm1hcmtIaXQoZ3JpZCwgZ3JpZE5yKTtcbiAgaHVtYW4uYXR0YWNrKGNvbXB1dGVyLCBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKSk7XG4gIC8vIGNoZWNrIGlmIGh1bWFuIGhhcyB3b25cbiAgaWYgKGNoZWNrV2luKCkpIHtcbiAgICAvLyBsYXRlciByZXNldFxuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29tcHV0ZXJQbGF5cygpO1xufVxuXG4vLyBjb21wdXRlcidzIHR1cm5cbmZ1bmN0aW9uIGNvbXB1dGVyUGxheXMoKSB7XG4gIGxldCBhdHRhY2tQb3NpdGlvbiA9IGNvbXB1dGVyLmF0dGFjayhodW1hbik7XG4gIGxldCByb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBjb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROcigxMCwgcm93VmFsdWUsIGNvbFZhbHVlKTtcbiAgR2FtZWJvYXJkLm1hcmtIaXQoaHVtYW5HcmlkLCBncmlkTnIpO1xuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxufVxuXG5mdW5jdGlvbiBjaGVja1dpbigpIHtcbiAgaWYgKGh1bWFuR2FtZWJvYXJkLmFsbFN1bmsoKSkge1xuICAgIHdpbk1lc3NhZ2UoXCJjb21wdXRlclwiKTtcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoY29tcHV0ZXJHYW1lYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgd2luTWVzc2FnZShcImh1bWFuXCIpO1xuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIHdpbk1lc3NhZ2Uod2lubmVyKSB7XG4gIC8vIGNyZWF0ZSBtb2RhbFxuICBhbGVydCh3aW5uZXIgKyBcIiB3b25cIik7XG59XG5cbi8vICoqKiBGT1IgTEFURVJcbmZ1bmN0aW9uIHJlc2V0KCkge31cblxuLy8gcm90YXRlIGJ1dHRvblxuLy8gVEVNUE9SQVJZIFZFUlNJT05cbmZ1bmN0aW9uIHJvdGF0ZShwYXJlbnQsIHNoaXBTZWxlY3Rvcikge1xuICAvLyBzd2l0Y2hpbmcgdGhlIGRpcmVjdGlvblxuICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgIGNhc2UgXCJjb2xcIjpcbiAgICAgIGRpcmVjdGlvbiA9IFwicm93XCI7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwicm93XCI6XG4gICAgICBkaXJlY3Rpb24gPSBcImNvbFwiO1xuICAgICAgYnJlYWs7XG4gIH1cblxuICAvLyByb3RhdGluZyBhbGwgdGhlIHNoaXBzXG4gIHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKHNoaXBTZWxlY3RvcikuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCB3aWR0aCA9IHNoaXAub2Zmc2V0V2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHNoaXAub2Zmc2V0SGVpZ2h0O1xuICAgIHNoaXAuc3R5bGUud2lkdGggPSBTdHJpbmcoaGVpZ2h0KSArIFwicHhcIjtcbiAgICBzaGlwLnN0eWxlLmhlaWdodCA9IFN0cmluZyh3aWR0aCkgKyBcInB4XCI7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZWxlY3RTaGlwKHNlbGVjdGVkU2hpcEVsZW1lbnQsIHNoaXBFbGVtZW50cykge1xuICAvLyBtYWtlIHN1cmUgdGhlIHJlc3QgYXJlIHVuc2VsZWN0ZWQgZmlyc3RcbiAgc2hpcEVsZW1lbnRzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICB1bnNlbGVjdFNoaXAoc2hpcCk7XG4gIH0pO1xuXG4gIGxldCBzaGlwSWQgPSBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLnN1YnN0cmluZyhcbiAgICBzZWxlY3RlZFNoaXBFbGVtZW50LmlkLmxlbmd0aCAtIDEsXG4gICk7XG5cbiAgaXNTaGlwU2VsZWN0ZWQgPSB0cnVlO1xuICBzZWxlY3RlZElkID0gc2hpcElkO1xuICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gIC8vIGFkZCBib3JkZXIgdG8gc2VsZWN0ZWQgc2hpcFxuICBzZWxlY3RlZFNoaXBFbGVtZW50LnN0eWxlLmJvcmRlciA9IFwiMnB4IHNvbGlkIHJlZFwiO1xufVxuXG5mdW5jdGlvbiB1bnNlbGVjdFNoaXAoc2hpcCkge1xuICBpc1NoaXBTZWxlY3RlZCA9IGZhbHNlO1xuICBzZWxlY3RlZElkID0gXCJcIjtcbiAgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcblxuICAvLyBhZGQgYm9yZGVyIHRvIHNlbGVjdGVkIHNoaXBcbiAgc2hpcC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcbn1cblxuLy8gKioqIERFTEVURSBPTkNFIENVU1RPTSBNRVRIT0RTIENSRUFURURcbmZ1bmN0aW9uIHBsYWNlSW5pdGlhbEJvYXRzKCkge1xuICAvLyBsZXQgcGF0cm9sQm9hdCA9IG5ldyBTaGlwKFtcIjE6MlwiLCBcIjE6M1wiXSwgXCJQXCIpO1xuICAvLyBsZXQgc3VibWFyaW5lID0gbmV3IFNoaXAoW1wiMzoyXCIsIFwiMzozXCIsIFwiMzo0XCJdLCBcIlNcIik7XG4gIC8vIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGh1bWFuR3JpZCwgcGF0cm9sQm9hdCk7XG4gIC8vIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGh1bWFuR3JpZCwgc3VibWFyaW5lKTtcblxuICBsZXQgcGF0cm9sQm9hdEMgPSBuZXcgU2hpcChbXCIxOjJcIiwgXCIxOjNcIl0sIFwiUFwiKTtcbiAgbGV0IHN1Ym1hcmluZUMgPSBuZXcgU2hpcChbXCIzOjJcIiwgXCIzOjNcIiwgXCIzOjRcIl0sIFwiU1wiKTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2UoY29tcHV0ZXJHcmlkLCBwYXRyb2xCb2F0Qyk7XG4gIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlKGNvbXB1dGVyR3JpZCwgc3VibWFyaW5lQyk7XG59XG5cbmdyaWRDcmVhdGlvbigpO1xucGxhY2VJbml0aWFsQm9hdHMoKTtcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJoaXRQb3NpdGlvbnMiLCJzaGlwcyIsInNoaXAiLCJfY2hlY2tWYWxpZFNoaXBQb3NpdGlvbiIsInB1c2giLCJncmlkIiwicGxhY2VMb2dpY2FsbHkiLCJwbGFjZUluR3JpZCIsIm1pbmltdW0iLCJwb3NpdGlvbnMiLCJyZWR1Y2UiLCJzdG9yZWQiLCJwbGFjZWRQb3MiLCJnZXRSb3dWYWx1ZSIsIkluZmluaXR5IiwiZ2V0Q29sVmFsdWUiLCJuZXdTaGlwIiwic29tZSIsIm5ld1BvcyIsImNoZWNrVmFsaWRQb3NpdGlvbiIsInBvcyIsIm5ld1Jvd1ZhbHVlIiwibmV3Q29sVmFsdWUiLCJwbGFjZWRTaGlwIiwibWluUm93VmFsdWUiLCJfbWluUm93VmFsdWUiLCJtYXhSb3dWYWx1ZSIsIl9tYXhSb3dWYWx1ZSIsIm1pbkNvbFZhbHVlIiwiX21pbkNvbFZhbHVlIiwibWF4Q29sVmFsdWUiLCJfbWF4Q29sVmFsdWUiLCJpbmNsdWRlcyIsImkiLCJsZW5ndGgiLCJoaXQiLCJldmVyeSIsImlzU3VuayIsInNoaXBMZW5ndGgiLCJmb3JFYWNoIiwiZ3JpZE5yIiwiZmluZEdyaWROciIsImdyaWROb2RlIiwiY2hpbGRyZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJTdHJpbmciLCJpZCIsInNwbGljZSIsImluZGV4T2YiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY2VsbCIsInN1YnN0cmluZyIsInJlbW92ZSIsInJlbW92ZVNoaXBMb2dpY2FsbHkiLCJyZW1vdmVTaGlwRnJvbUdyaWQiLCJOdW1iZXIiLCJkaXJlY3Rpb24iLCJ2YWwiLCJyb3dWYWx1ZSIsImNvbFZhbHVlIiwiVHlwZUVycm9yIiwibnIiLCJjb2xzIiwiTWF0aCIsImZsb29yIiwicm93IiwiZmluZEdyaWRSb3ciLCJjb2wiLCJmaW5kR3JpZENvbCIsImNvbnRhaW5zIiwiUGxheWVyIiwiaXNIdW1hbiIsImdhbWVib2FyZCIsIm90aGVyUGxheWVyIiwicmVjZWl2ZUF0dGFjayIsIl9yYW5kb21QYWlyIiwicmFuZG9tTnIxIiwicmFuZG9tTnIyIiwicG9zaXRpb24iLCJyYW5kb20iLCJ1bmRlZmluZWQiLCJfaHVtYW5BdHRhY2siLCJfY29tcHV0ZXJBdHRhY2siLCJTaGlwIiwic3VuayIsImdhbWVHcmlkcyIsImRvY3VtZW50IiwiaHVtYW5HcmlkIiwiY29tcHV0ZXJHcmlkIiwic2hpcFNlbGVjdGlvbiIsInF1ZXJ5U2VsZWN0b3IiLCJtdWx0aUJ1dHQiLCJncmlkQ2VsbCIsImNyZWF0ZUVsZW1lbnQiLCJodW1hbkdhbWVib2FyZCIsImNvbXB1dGVyR2FtZWJvYXJkIiwiaHVtYW4iLCJjb21wdXRlciIsInBsYXlpbmciLCJzZWxlY3Rpb24iLCJpc1NoaXBTZWxlY3RlZCIsInNlbGVjdGVkSWQiLCJzZWxlY3Rpb25WYWxpZCIsInNoaXBMZW5ndGhzIiwiQyIsIkIiLCJTIiwiRCIsIlAiLCJwbGFjZWRTaGlwSWRzIiwiY2VsbFNob290TGlzdGVuZXIiLCJub2RlIiwiYWRkRXZlbnRMaXN0ZW5lciIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsImh1bWFuUGxheXMiLCJob3ZlclNlbGVjdGlvbiIsInNoaXBJZCIsImdyaWRDZWxscyIsInN0YXJ0UG9zaXRpb24iLCJmaW5kUG9zaXRpb25Gcm9tR3JpZE5yIiwiYWRkVG9Qb3NpdGlvbiIsImZpbmRHcmlkTnJGcm9tUG9zaXRpb24iLCJjZWxsR3JpZExpc3RlbmVycyIsInNlbGVjdGVkU2hpcCIsInNoaXBFbGVtZW50Iiwic2VsZWN0ZWRQb3MiLCJwb3NHcmlkTnIiLCJyZW1vdmVTaGlwIiwic2VsZWN0U2hpcCIsInBsYWNlIiwidW5zZWxlY3RTaGlwIiwicm90YXRlIiwiZ3JpZENyZWF0aW9uIiwiZ2FtZUdyaWQiLCJzdHlsZSIsImluc2VydEdyaWRDZWxscyIsInJvd3MiLCJhcHBlbmRDaGlsZCIsImNsb25lTm9kZSIsIm1hcmtIaXQiLCJhdHRhY2siLCJjaGVja1dpbiIsImNvbXB1dGVyUGxheXMiLCJhdHRhY2tQb3NpdGlvbiIsImFsbFN1bmsiLCJ3aW5NZXNzYWdlIiwid2lubmVyIiwiYWxlcnQiLCJyZXNldCIsInBhcmVudCIsInNoaXBTZWxlY3RvciIsIndpZHRoIiwib2Zmc2V0V2lkdGgiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJzZWxlY3RlZFNoaXBFbGVtZW50Iiwic2hpcEVsZW1lbnRzIiwiYm9yZGVyIiwicGxhY2VJbml0aWFsQm9hdHMiLCJwYXRyb2xCb2F0QyIsInN1Ym1hcmluZUMiXSwic291cmNlUm9vdCI6IiJ9
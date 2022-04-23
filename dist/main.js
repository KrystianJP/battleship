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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n  display: grid;\n  grid-template-rows: 1fr 300px;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.grid-cell.ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 68, 68);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.selection-ship.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.multi-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.multi-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n\n.ship.hit.sunk {\n  background: rgb(116, 15, 15);\n}\n", "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,SAAS;EACT,sBAAsB;EACtB,UAAU;AACZ;AACA;;EAEE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,8BAA8B;EAC9B,aAAa;EACb,6BAA6B;EAC7B,8BAA8B;EAC9B;;mBAEiB;EACjB,MAAM;AACR;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,SAAS;EACT,aAAa;EACb,yCAAyC;AAC3C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,MAAM;EACN,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA,gDAAgD;AAChD;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,iBAAiB;EACjB,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,aAAa;EACb,SAAS;AACX;;AAEA;EACE,aAAa;EACb,SAAS;EACT,YAAY;EACZ,YAAY;EACZ,eAAe;EACf,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;;;;;EAKE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;AACA;;EAEE,YAAY;AACd;AACA;EACE,WAAW;AACb;;AAEA;EACE,8BAA8B;AAChC;AACA;EACE,yCAAyC;AAC3C;;AAEA;EACE,4BAA4B;AAC9B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,4BAA4B;EAC5B,YAAY;AACd;AACA;EACE,8BAA8B;EAC9B,eAAe;AACjB;;AAEA;EACE,4BAA4B;AAC9B","sourcesContent":["* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\nbody {\n  background: rgb(175, 175, 175);\n  display: grid;\n  grid-template-rows: 1fr 300px;\n  grid-template-columns: 1fr 1fr;\n  grid-template-areas:\n    \"human computer\"\n    \"bottom bottom\";\n  gap: 0;\n}\n\n.human {\n  grid-area: human;\n}\n\n.computer {\n  grid-area: computer;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 20px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  position: relative;\n  background: white;\n}\n\n/* CHANGE THIS TO HUMAN TO HIDE COMPUTER SHIPS */\n.grid-cell.ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit {\n  background: rgb(167, 167, 167);\n}\n\n.ship.hit {\n  background: rgb(255, 68, 68);\n}\n\n.bottom-container {\n  grid-area: bottom;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  padding: 20px;\n  gap: 20px;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  height: 100%;\n  width: 240px;\n  flex-wrap: wrap;\n  justify-content: left;\n}\n\n.selection-ship {\n  background: blue;\n}\n\n#selectionC,\n#selectionB,\n#selectionD,\n#selectionS,\n#selectionP {\n  height: 40px;\n}\n\n#selectionC {\n  width: 200px;\n}\n#selectionB {\n  width: 160px;\n}\n#selectionD,\n#selectionS {\n  width: 120px;\n}\n#selectionP {\n  width: 80px;\n}\n\n.selected {\n  background: rgb(158, 158, 255);\n}\n.selected-invalid {\n  background: rgb(255, 158, 158) !important;\n}\n\n.selection-ship.greyed-out {\n  background: rgb(84, 84, 255);\n}\n\n.multi-button {\n  border: none;\n  padding: 10px;\n  font-size: 18px;\n  border-radius: 40px;\n  background: rgb(84, 84, 255);\n  color: white;\n}\n.multi-button:hover {\n  background: rgb(108, 108, 255);\n  cursor: pointer;\n}\n\n.ship.hit.sunk {\n  background: rgb(116, 15, 15);\n}\n"],"sourceRoot":""}]);
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
  D: 3,
  S: 3,
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
  human.attack(computer, _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10));
  computerGameboard.ships.some(function (ship) {
    if (ship.isSunk()) {
      ship.sink(grid);
      return true;
    }

    return false;
  }); // check if human has won

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
}

function startGame() {
  playing = true;
  selection = false;
  multiButt.textContent = "RESET";
  computerGameboard.generateRandomShips(computer, computerGrid);
} // *** DELETE ONCE CUSTOM METHODS CREATED


function placeInitialBoats() {// let patrolBoat = new Ship(["1:2", "1:3"], "P");
  // let submarine = new Ship(["3:2", "3:3", "3:4"], "S");
  // humanGameboard.place(humanGrid, patrolBoat);
  // humanGameboard.place(humanGrid, submarine);
  // let patrolBoatC = new Ship(["1:2", "1:3"], "P");
  // let submarineC = new Ship(["3:2", "3:3", "3:4"], "S");
  // computerGameboard.place(computerGrid, patrolBoatC);
  // computerGameboard.place(computerGrid, submarineC);
}

gridCreation();
placeInitialBoats();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZUFBbkM7QUFDRDs7QUFFRCxTQUFTL0IsWUFBVCxDQUFzQnpJLElBQXRCLEVBQTRCO0FBQzFCNEcsRUFBQUEsY0FBYyxHQUFHLEtBQWpCO0FBQ0FDLEVBQUFBLFVBQVUsR0FBRyxFQUFiO0FBQ0FDLEVBQUFBLGNBQWMsR0FBRyxLQUFqQixDQUgwQixDQUsxQjs7QUFDQTlHLEVBQUFBLElBQUksQ0FBQ2lKLEtBQUwsQ0FBV3VCLE1BQVgsR0FBb0IsTUFBcEI7QUFDRDs7QUFFRCxTQUFTOUIsU0FBVCxHQUFxQjtBQUNuQmhDLEVBQUFBLE9BQU8sR0FBRyxJQUFWO0FBQ0FDLEVBQUFBLFNBQVMsR0FBRyxLQUFaO0FBQ0FSLEVBQUFBLFNBQVMsQ0FBQ3FDLFdBQVYsR0FBd0IsT0FBeEI7QUFDQWpDLEVBQUFBLGlCQUFpQixDQUFDa0UsbUJBQWxCLENBQXNDaEUsUUFBdEMsRUFBZ0RULFlBQWhEO0FBQ0QsRUFFRDs7O0FBQ0EsU0FBUzBFLGlCQUFULEdBQTZCLENBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRDs7QUFFRDNCLFlBQVk7QUFDWjJCLGlCQUFpQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcz9hMmY1Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAxMHgxMCB4OkEtSiB5OiAxLTEwXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhpdFBvc2l0aW9ucyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIHBsYWNlTG9naWNhbGx5KHNoaXApIHtcbiAgICBpZiAodGhpcy5jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKHNoaXApKSB7XG4gICAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcGxhY2UoZ3JpZCwgc2hpcCkge1xuICAgIGlmICh0aGlzLnBsYWNlTG9naWNhbGx5KHNoaXApKSB7XG4gICAgICB0aGlzLnBsYWNlSW5HcmlkKGdyaWQsIHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRSb3dWYWx1ZShwb3MpIHtcbiAgICByZXR1cm4gTnVtYmVyKHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29sVmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKHBvcy5pbmRleE9mKFwiOlwiKSArIDEpKTtcbiAgfVxuXG4gIF9taW5Sb3dWYWx1ZShzaGlwKSB7XG4gICAgbGV0IG1pbmltdW0gPSBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcykgPCBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCBJbmZpbml0eSk7XG4gICAgcmV0dXJuIG1pbmltdW07XG4gIH1cbiAgX21pbkNvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpIDwgc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICB9XG4gIF9tYXhSb3dWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKSA+IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIC1JbmZpbml0eSk7XG4gIH1cbiAgX21heENvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgLUluZmluaXR5KTtcbiAgfVxuXG4gIC8vIGRpcmVjdGlvbiA9IFwicm93XCIgLyBcImNvbFwiXG4gIC8vIHBvcyA9IFwicm93OmNvbFwiXG4gIHN0YXRpYyBhZGRUb1Bvc2l0aW9uKHBvcywgZGlyZWN0aW9uLCB2YWwpIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAvLyBnZXR0aW5nIGZpcnN0IG51bWJlclxuICAgICAgbGV0IHJvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgICBsZXQgbmV3Um93VmFsdWUgPSByb3dWYWx1ZSArIHZhbDtcbiAgICAgIC8vIG1ha2luZyBzdXJlIGl0IGlzIHdpdGhpbiByYW5nZVxuICAgICAgaWYgKG5ld1Jvd1ZhbHVlID4gMTAgfHwgbmV3Um93VmFsdWUgPCAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbmNhdGVuYXRpbmcgdG8gaXQgdGhlIHJlc3Qgb2YgdGhlIHBvc2l0aW9uXG4gICAgICByZXR1cm4gU3RyaW5nKG5ld1Jvd1ZhbHVlKSArIHBvcy5zdWJzdHJpbmcocG9zLmluZGV4T2YoXCI6XCIpKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgcmV2ZXJzZSBvZiB0aGUgcm93IGJyYW5jaFxuICAgICAgbGV0IGNvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgICBsZXQgbmV3Q29sVmFsdWUgPSBjb2xWYWx1ZSArIHZhbDtcbiAgICAgIGlmIChuZXdDb2xWYWx1ZSA+IDEwIHx8IG5ld0NvbFZhbHVlIDwgMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gcG9zLnN1YnN0cmluZygwLCBwb3MuaW5kZXhPZihcIjpcIikgKyAxKSArIFN0cmluZyhuZXdDb2xWYWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJTlZBTElEIERJUkVDVElPTiBQQVJBTUVURVJcIik7XG4gICAgfVxuICB9XG5cbiAgLy8gY2hlY2tzIGlmIHNoaXAncyBwb3NpdGlvbiBpcyB2YWxpZCBieSBjaGVja2luZyBpdCBpcyBuZWFyIG9yIG92ZXJsYXBwaW5nIGV4aXN0aW5nIHNoaXBcbiAgY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihuZXdTaGlwKSB7XG4gICAgLy8gZ2l2ZXMgdHJ1ZSBpZiBhIHNpbmdsZSB2YWx1ZSBpcyBpbnZhbGlkLCBzbyBtdXN0IGJlIGludmVydGVkXG4gICAgcmV0dXJuICFuZXdTaGlwLnBvc2l0aW9ucy5zb21lKChuZXdQb3MpID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5jaGVja1ZhbGlkUG9zaXRpb24obmV3UG9zKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNoZWNrVmFsaWRQb3NpdGlvbihwb3MpIHtcbiAgICBsZXQgbmV3Um93VmFsdWUgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgbmV3Q29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcblxuICAgIC8vIGdldCBtaW4gKyBtYXggdmFsdWUgb2Ygcm93IGFuZCBjb2wgZm9yIGVhY2ggc2hpcCBhbmQgY2hlY2sgaWYgdGhlIG5ldyBwb3NpdGlvbiB2YWx1ZXMgYXJlIHdpdGhpbiB0aGVtICstMVxuICAgIC8vIGlmIGEgc2luZ2xlIHZhbHVlIGlzIElOVkFMSUQsIHJldHVybiBUUlVFXG4gICAgcmV0dXJuICF0aGlzLnNoaXBzLnNvbWUoKHBsYWNlZFNoaXApID0+IHtcbiAgICAgIGxldCBtaW5Sb3dWYWx1ZSA9IHRoaXMuX21pblJvd1ZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1heFJvd1ZhbHVlID0gdGhpcy5fbWF4Um93VmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWluQ29sVmFsdWUgPSB0aGlzLl9taW5Db2xWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtYXhDb2xWYWx1ZSA9IHRoaXMuX21heENvbFZhbHVlKHBsYWNlZFNoaXApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG5ld1Jvd1ZhbHVlID49IG1pblJvd1ZhbHVlIC0gMSAmJlxuICAgICAgICBuZXdSb3dWYWx1ZSA8PSBtYXhSb3dWYWx1ZSArIDEgJiZcbiAgICAgICAgbmV3Q29sVmFsdWUgPj0gbWluQ29sVmFsdWUgLSAxICYmXG4gICAgICAgIG5ld0NvbFZhbHVlIDw9IG1heENvbFZhbHVlICsgMVxuICAgICAgKSB7XG4gICAgICAgIC8vIElOVkFMSUQgVEhFUkVGT1JFIFRSVUVcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICAvLyB3aWxsIGNoZWNrIGlmIHZhbGlkIHBvc2l0aW9uIGFuZCBzZW5kIHRoZSBoaXQsIHRoZSBzaGlwIHdpbGwgdGhlbiBjaGVjayBpZiBpdCBpcyBoaXRcbiAgcmVjZWl2ZUF0dGFjayhwb3MpIHtcbiAgICBpZiAoIXRoaXMuaGl0UG9zaXRpb25zLmluY2x1ZGVzKHBvcykpIHtcbiAgICAgIHRoaXMuaGl0UG9zaXRpb25zLnB1c2gocG9zKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5oaXQocG9zKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWxsU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWRSb3cobnIsIGNvbHMpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihuciAvIGNvbHMpICsgMTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZENvbChuciwgcm93LCBjb2xzKSB7XG4gICAgcmV0dXJuIG5yIC0gKHJvdyAtIDEpICogY29scyArIDE7XG4gIH1cblxuICBzdGF0aWMgZmluZFBvc2l0aW9uRnJvbUdyaWROcihuciwgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZmluZEdyaWRSb3cobnIsIGNvbHMpO1xuICAgIGxldCBjb2wgPSBHYW1lYm9hcmQuZmluZEdyaWRDb2wobnIsIHJvdywgY29scyk7XG4gICAgcmV0dXJuIFN0cmluZyhyb3cpICsgXCI6XCIgKyBTdHJpbmcoY29sKTtcbiAgfVxuXG4gIC8vIHJvdyBhbmQgY29sIHN0YXJ0aW5nIGZyb20gMVxuICBzdGF0aWMgZmluZEdyaWROcihjb2xzLCByb3csIGNvbCkge1xuICAgIHJldHVybiBjb2xzICogKHJvdyAtIDEpICsgKGNvbCAtIDEpO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zLCBjb2xzKSB7XG4gICAgbGV0IHJvdyA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgIGxldCBjb2wgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcbiAgICByZXR1cm4gR2FtZWJvYXJkLmZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpO1xuICB9XG5cbiAgLy8gRE9NIG1hbmlwdWxhdGlvblxuICAvLyBwbGFjaW5nIHRoZSBzaGlwIHZpc3VhbGx5IG9uIGdpdmVuIGdyaWRcbiAgcGxhY2VJbkdyaWQoZ3JpZCwgc2hpcCkge1xuICAgIGxldCBzaGlwTGVuZ3RoID0gc2hpcC5wb3NpdGlvbnMubGVuZ3RoO1xuICAgIHNoaXAucG9zaXRpb25zLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgbGV0IGdyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yKFxuICAgICAgICAxMCxcbiAgICAgICAgR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyksXG4gICAgICAgIEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpLFxuICAgICAgKTtcbiAgICAgIGxldCBncmlkTm9kZSA9IGdyaWQuY2hpbGRyZW5bZ3JpZE5yXTtcbiAgICAgIGdyaWROb2RlLmNsYXNzTGlzdC5hZGQoXCJzaGlwXCIpO1xuICAgICAgZ3JpZE5vZGUuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJzaGlwXCIgKyBTdHJpbmcoc2hpcC5pZCkpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIG1hcmtIaXQoZ3JpZCwgZ3JpZE5yKSB7XG4gICAgbGV0IGdyaWROb2RlID0gZ3JpZC5jaGlsZHJlbltncmlkTnJdO1xuICAgIGdyaWROb2RlLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XG4gIH1cblxuICBzdGF0aWMgY2hlY2tIaXQoZ3JpZCwgZ3JpZE5yKSB7XG4gICAgaWYgKGdyaWQuY2hpbGRyZW5bZ3JpZE5yXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaGlwXCIpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVNoaXBMb2dpY2FsbHkoaWQpIHtcbiAgICB0aGlzLnNoaXBzLnNvbWUoKHNoaXApID0+IHtcbiAgICAgIGlmIChzaGlwLmlkID09PSBpZCkge1xuICAgICAgICB0aGlzLnNoaXBzLnNwbGljZSh0aGlzLnNoaXBzLmluZGV4T2Yoc2hpcCksIDEpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVNoaXBGcm9tR3JpZChncmlkLCBpZCkge1xuICAgIGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIikuZm9yRWFjaCgoY2VsbCkgPT4ge1xuICAgICAgaWYgKGNlbGwuaWQuc3Vic3RyaW5nKDQpID09PSBpZCkge1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoXCJzaGlwXCIpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZVNoaXAoZ3JpZCwgaWQpIHtcbiAgICB0aGlzLnJlbW92ZVNoaXBMb2dpY2FsbHkoaWQpO1xuICAgIHRoaXMucmVtb3ZlU2hpcEZyb21HcmlkKGdyaWQsIGlkKTtcbiAgfVxuXG4gIGdlbmVyYXRlUmFuZG9tU2hpcHMocGxheWVyLCBncmlkKSB7XG4gICAgZm9yIChsZXQgc2hpcFR5cGUgb2YgW1xuICAgICAgW1wiQ1wiLCA1XSxcbiAgICAgIFtcIkJcIiwgNF0sXG4gICAgICBbXCJEXCIsIDNdLFxuICAgICAgW1wiU1wiLCAzXSxcbiAgICAgIFtcIlBcIiwgMl0sXG4gICAgXSkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgbGV0IHNoaXAgPSBwbGF5ZXIucmFuZG9tU2hpcFBvc2l0aW9uKHNoaXBUeXBlWzFdLCBzaGlwVHlwZVswXSk7IC8vIHNoaXAgb2JqZWN0IC8gZmFsc2VcbiAgICAgICAgaWYgKHNoaXApIHtcbiAgICAgICAgICB0aGlzLnBsYWNlKGdyaWQsIHNoaXApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuXG5jbGFzcyBQbGF5ZXIge1xuICAvLyBpc0h1bWFuID0gdHJ1ZSAvIGZhbHNlXG4gIGNvbnN0cnVjdG9yKGlzSHVtYW4sIGdhbWVib2FyZCkge1xuICAgIHRoaXMuaXNIdW1hbiA9IGlzSHVtYW47XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIH1cblxuICBfaHVtYW5BdHRhY2sob3RoZXJQbGF5ZXIsIHBvcykge1xuICAgIG90aGVyUGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gIH1cblxuICAvLyByZXR1cm5zIGV2ZW50dWFsIGF0dGFja2VkIHBvc2l0aW9uXG4gIF9jb21wdXRlckF0dGFjayhvdGhlclBsYXllcikge1xuICAgIGRvIHtcbiAgICAgIGxldCBbcmFuZG9tTnIxLCByYW5kb21OcjJdID0gdGhpcy5fcmFuZG9tUGFpcigpO1xuICAgICAgdmFyIHBvc2l0aW9uID0gU3RyaW5nKHJhbmRvbU5yMSkgKyBcIjpcIiArIFN0cmluZyhyYW5kb21OcjIpO1xuICAgIH0gd2hpbGUgKCFvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3NpdGlvbikpO1xuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIF9yYW5kb21QYWlyKCkge1xuICAgIGxldCByYW5kb21OcjEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIGxldCByYW5kb21OcjIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIHJldHVybiBbcmFuZG9tTnIxLCByYW5kb21OcjJdO1xuICB9XG5cbiAgLy8gcmV0dXJucyB0aGUgcG9zaXRpb24gdGhhdCB3YXMgYXR0YWNrZWRcbiAgYXR0YWNrKG90aGVyUGxheWVyLCBwb3MgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5pc0h1bWFuKSB7XG4gICAgICB0aGlzLl9odW1hbkF0dGFjayhvdGhlclBsYXllciwgcG9zKTtcbiAgICAgIHJldHVybiBwb3M7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wdXRlckF0dGFjayhvdGhlclBsYXllcik7XG4gICAgfVxuICB9XG5cbiAgLy8gdGhpcyBtZXRob2RzIHJlcXVpcmVzIGJvdGggZ2FtZWJvYXJkIGFuZCBzaGlwIGNsYXNzZXNcbiAgcmFuZG9tU2hpcFBvc2l0aW9uKHNoaXBMZW5ndGgsIHNoaXBJZCkge1xuICAgIGxldCBwb3NpdGlvbnM7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgcG9zaXRpb25zID0gW107XG4gICAgICBsZXQgc3RhcnRQb3MgPVxuICAgICAgICBTdHJpbmcoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSkgKyAxKSArXG4gICAgICAgIFwiOlwiICtcbiAgICAgICAgU3RyaW5nKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpICsgMSk7XG4gICAgICBsZXQgZGlyZWN0aW9uID0gW1wiY29sXCIsIFwicm93XCJdW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBvc2l0aW9ucy5wdXNoKEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zLCBkaXJlY3Rpb24sIGkpKTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NpdGlvbnMuc29tZSgocG9zKSA9PiBwb3MgPT09IGZhbHNlKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKHBvc2l0aW9ucywgc2hpcElkKTtcbiAgICBpZiAodGhpcy5nYW1lYm9hcmQuY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihzaGlwKSkge1xuICAgICAgcmV0dXJuIHNoaXA7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5jbGFzcyBTaGlwIHtcbiAgLy8gcG9zaXRpb25zID0gW1wiMToxXCIsIFwiMToyXCIgLCBcIjE6M1wiXSBcInJvdzpjb2xcIlxuICAvLyBpZCA9IFwiQ1wiIC8gXCJCXCIgLyBcIkRcIiAvIFwiU1wiIC8gXCJQXCJcbiAgY29uc3RydWN0b3IocG9zaXRpb25zLCBpZCkge1xuICAgIHRoaXMuc2hpcExlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gIH1cblxuICAvLyBkdXBsaWNhdGUgdmFsaWRhdGlvbiBvY2N1cnMgaW4gR2FtZWJvYXJkIG9iamVjdHNcbiAgaGl0KHBvc2l0aW9uKSB7XG4gICAgaWYgKHRoaXMucG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgdGhpcy5oaXRQb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdFBvc2l0aW9ucy5sZW5ndGggPT09IHRoaXMuc2hpcExlbmd0aCkge1xuICAgICAgdGhpcy5zdW5rID0gdHJ1ZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzaW5rKGdyaWQpIHtcbiAgICBmb3IgKGxldCBwb3Mgb2YgdGhpcy5wb3NpdGlvbnMpIHtcbiAgICAgIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3MsIDEwKTtcbiAgICAgIGdyaWQucXVlcnlTZWxlY3RvckFsbChcIi5ncmlkLWNlbGxcIilbZ3JpZE5yXS5jbGFzc0xpc3QuYWRkKFwic3Vua1wiKTtcbiAgICB9XG4gIH1cblxuICBmaW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvcywgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgcmV0dXJuIEdhbWVib2FyZC5maW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKTtcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG59XFxuYm9keSxcXG5odG1sIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDE3NSwgMTc1KTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IDFmciAzMDBweDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcXG4gIGdyaWQtdGVtcGxhdGUtYXJlYXM6XFxuICAgIFxcXCJodW1hbiBjb21wdXRlclxcXCJcXG4gICAgXFxcImJvdHRvbSBib3R0b21cXFwiO1xcbiAgZ2FwOiAwO1xcbn1cXG5cXG4uaHVtYW4ge1xcbiAgZ3JpZC1hcmVhOiBodW1hbjtcXG59XFxuXFxuLmNvbXB1dGVyIHtcXG4gIGdyaWQtYXJlYTogY29tcHV0ZXI7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogMjBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbn1cXG5cXG4vKiBDSEFOR0UgVEhJUyBUTyBIVU1BTiBUTyBISURFIENPTVBVVEVSIFNISVBTICovXFxuLmdyaWQtY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGJsdWU7XFxufVxcblxcbi5oaWRkZW4ge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTY3LCAxNjcsIDE2Nyk7XFxufVxcblxcbi5zaGlwLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCA2OCwgNjgpO1xcbn1cXG5cXG4uYm90dG9tLWNvbnRhaW5lciB7XFxuICBncmlkLWFyZWE6IGJvdHRvbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgcGFkZGluZzogMjBweDtcXG4gIGdhcDogMjBweDtcXG59XFxuXFxuLnNoaXAtc2VsZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDEwcHg7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMjQwcHg7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGxlZnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4jc2VsZWN0aW9uQyxcXG4jc2VsZWN0aW9uQixcXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyxcXG4jc2VsZWN0aW9uUCB7XFxuICBoZWlnaHQ6IDQwcHg7XFxufVxcblxcbiNzZWxlY3Rpb25DIHtcXG4gIHdpZHRoOiAyMDBweDtcXG59XFxuI3NlbGVjdGlvbkIge1xcbiAgd2lkdGg6IDE2MHB4O1xcbn1cXG4jc2VsZWN0aW9uRCxcXG4jc2VsZWN0aW9uUyB7XFxuICB3aWR0aDogMTIwcHg7XFxufVxcbiNzZWxlY3Rpb25QIHtcXG4gIHdpZHRoOiA4MHB4O1xcbn1cXG5cXG4uc2VsZWN0ZWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE1OCwgMTU4LCAyNTUpO1xcbn1cXG4uc2VsZWN0ZWQtaW52YWxpZCB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAxNTgsIDE1OCkgIWltcG9ydGFudDtcXG59XFxuXFxuLnNlbGVjdGlvbi1zaGlwLmdyZXllZC1vdXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDg0LCA4NCwgMjU1KTtcXG59XFxuXFxuLm11bHRpLWJ1dHRvbiB7XFxuICBib3JkZXI6IG5vbmU7XFxuICBwYWRkaW5nOiAxMHB4O1xcbiAgZm9udC1zaXplOiAxOHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNDBweDtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcbi5tdWx0aS1idXR0b246aG92ZXIge1xcbiAgYmFja2dyb3VuZDogcmdiKDEwOCwgMTA4LCAyNTUpO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uc2hpcC5oaXQuc3VuayB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTE2LCAxNSwgMTUpO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zdHlsZXMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UseUNBQXlDO0VBQ3pDLFNBQVM7RUFDVCxzQkFBc0I7RUFDdEIsVUFBVTtBQUNaO0FBQ0E7O0VBRUUsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLDhCQUE4QjtFQUM5QixhQUFhO0VBQ2IsNkJBQTZCO0VBQzdCLDhCQUE4QjtFQUM5Qjs7bUJBRWlCO0VBQ2pCLE1BQU07QUFDUjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsYUFBYTtFQUNiLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixNQUFNO0VBQ04sdUJBQXVCO0VBQ3ZCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsaUJBQWlCO0FBQ25COztBQUVBLGdEQUFnRDtBQUNoRDtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLGlCQUFpQjtFQUNqQixXQUFXO0VBQ1gsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGFBQWE7RUFDYixTQUFTO0VBQ1QsWUFBWTtFQUNaLFlBQVk7RUFDWixlQUFlO0VBQ2YscUJBQXFCO0FBQ3ZCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBOzs7OztFQUtFLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsWUFBWTtBQUNkO0FBQ0E7O0VBRUUsWUFBWTtBQUNkO0FBQ0E7RUFDRSxXQUFXO0FBQ2I7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7QUFDQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsZUFBZTtFQUNmLG1CQUFtQjtFQUNuQiw0QkFBNEI7RUFDNUIsWUFBWTtBQUNkO0FBQ0E7RUFDRSw4QkFBOEI7RUFDOUIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLDRCQUE0QjtBQUM5QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xcbiAgbWFyZ2luOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcbmJvZHksXFxuaHRtbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kOiByZ2IoMTc1LCAxNzUsIDE3NSk7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxZnIgMzAwcHg7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxuICBncmlkLXRlbXBsYXRlLWFyZWFzOlxcbiAgICBcXFwiaHVtYW4gY29tcHV0ZXJcXFwiXFxuICAgIFxcXCJib3R0b20gYm90dG9tXFxcIjtcXG4gIGdhcDogMDtcXG59XFxuXFxuLmh1bWFuIHtcXG4gIGdyaWQtYXJlYTogaHVtYW47XFxufVxcblxcbi5jb21wdXRlciB7XFxuICBncmlkLWFyZWE6IGNvbXB1dGVyO1xcbn1cXG5cXG4ucGxheWVyLWNvbnRhaW5lciB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDIwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbiAgYm9yZGVyLWJvdHRvbTogMTBweCBzb2xpZCByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5wbGF5ZXItdGl0bGUge1xcbiAgZm9udC1zaXplOiA0MHB4O1xcbn1cXG5cXG4ubGluZSB7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICB3aWR0aDogMTBweDtcXG4gIGJhY2tncm91bmQ6IHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLmJhdHRsZXNoaXAtZ3JpZCB7XFxuICB3aWR0aDogNDAwcHg7XFxuICBoZWlnaHQ6IDQwMHB4O1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ2FwOiAwO1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBmbGV4LXNocmluazogMDtcXG59XFxuXFxuLmdyaWQtY2VsbCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG59XFxuXFxuLyogQ0hBTkdFIFRISVMgVE8gSFVNQU4gVE8gSElERSBDT01QVVRFUiBTSElQUyAqL1xcbi5ncmlkLWNlbGwuc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDE2NywgMTY3LCAxNjcpO1xcbn1cXG5cXG4uc2hpcC5oaXQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgNjgsIDY4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiBib3R0b207XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi5zaGlwLXNlbGVjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuI3NlbGVjdGlvbkMsXFxuI3NlbGVjdGlvbkIsXFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMsXFxuI3NlbGVjdGlvblAge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4jc2VsZWN0aW9uQyB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNzZWxlY3Rpb25CIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG4jc2VsZWN0aW9uUCB7XFxuICB3aWR0aDogODBweDtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMjU1KTtcXG59XFxuLnNlbGVjdGVkLWludmFsaWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgMTU4LCAxNTgpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcC5ncmV5ZWQtb3V0IHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxufVxcblxcbi5tdWx0aS1idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4ubXVsdGktYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxMDgsIDEwOCwgMjU1KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXFxuLnNoaXAuaGl0LnN1bmsge1xcbiAgYmFja2dyb3VuZDogcmdiKDExNiwgMTUsIDE1KTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbi8vIGdsb2JhbCB2YXJpYWJsZXNcbmNvbnN0IGdhbWVHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmF0dGxlc2hpcC1ncmlkXCIpO1xuY29uc3QgW2h1bWFuR3JpZCwgY29tcHV0ZXJHcmlkXSA9IGdhbWVHcmlkcztcbmNvbnN0IHNoaXBTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtc2VsZWN0aW9uXCIpO1xuY29uc3QgbXVsdGlCdXR0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tdWx0aS1idXR0b25cIik7XG5cbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG5cbmxldCBodW1hbkdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBjb21wdXRlckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBodW1hbiA9IG5ldyBQbGF5ZXIodHJ1ZSwgaHVtYW5HYW1lYm9hcmQpO1xubGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcihmYWxzZSwgY29tcHV0ZXJHYW1lYm9hcmQpO1xubGV0IHBsYXlpbmcgPSBmYWxzZTtcblxubGV0IHNlbGVjdGlvbiA9IHRydWU7XG5sZXQgaXNTaGlwU2VsZWN0ZWQgPSBmYWxzZTtcbmxldCBzZWxlY3RlZElkO1xubGV0IGRpcmVjdGlvbiA9IFwiY29sXCI7XG5sZXQgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcbmxldCBzaGlwTGVuZ3RocyA9IHtcbiAgQzogNSxcbiAgQjogNCxcbiAgRDogMyxcbiAgUzogMyxcbiAgUDogMixcbn07XG5sZXQgcGxhY2VkU2hpcElkcyA9IFtdO1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNlbGxTaG9vdExpc3RlbmVyKGdyaWQpIHtcbiAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHBsYXlpbmcpIHtcbiAgICAgICAgbGV0IGdyaWROciA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZ3JpZC5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICAgIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhvdmVyU2VsZWN0aW9uKHNoaXBJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwSWRdOyBpKyspIHtcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgLy8gbWFraW5nIHN1cmUgdG8gZmxhZyBwb3NpdGlvbiBhcyBpbnZhbGlkIGlmIGl0IGlzIHRvbyBjbG9zZSB0byBvdGhlciBzaGlwcyB0b29cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGlmICghaHVtYW5HYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKHBvc2l0aW9uKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGdyaWRDZWxsc1tHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBcInNlbGVjdGVkXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuICAgICAgLy8gaGlnaGxpZ2h0IHRoZW0gYWxsIGFzIGludmFsaWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICBncmlkQ2VsbHNbXG4gICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXG4gICAgICAgICAgXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtaW52YWxpZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjZWxsR3JpZExpc3RlbmVycyhncmlkKSB7XG4gIGZvciAobGV0IGdyaWROciA9IDA7IGdyaWROciA8IDEwMDsgZ3JpZE5yKyspIHtcbiAgICBsZXQgZ3JpZENlbGxzID0gZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgICBsZXQgY2VsbCA9IGdyaWRDZWxsc1tncmlkTnJdO1xuICAgIC8vIHdoZW4gaG92ZXJpbmcsIGhpZ2hsaWdodCB0aGUgY29ycmVjdCBjZWxsc1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0aW9uICYmIGlzU2hpcFNlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGlvblZhbGlkID0gdHJ1ZTtcbiAgICAgICAgaG92ZXJTZWxlY3Rpb24oc2VsZWN0ZWRJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBob3ZlcmluZyBvZmYsIGdldCByaWQgb2YgYWxsIHRoZSBjaGFuZ2VzXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGdyaWRDZWxsc1tcbiAgICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZC1pbnZhbGlkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJlbW92aW5nIHBsYWNlZCBzaGlwIHdoZW4gY2xpY2tlZFxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICghaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFNoaXA7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBmb3IgKGxldCBzaGlwIG9mIGh1bWFuR2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICAgICAgaWYgKHNoaXAucG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRTaGlwID0gc2hpcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZFNoaXApIHtcbiAgICAgICAgICBsZXQgc2hpcEVsZW1lbnQgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkU2hpcC5pZCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGZvciAobGV0IHNlbGVjdGVkUG9zIG9mIHNlbGVjdGVkU2hpcC5wb3NpdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBwb3NHcmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihzZWxlY3RlZFBvcywgMTApO1xuICAgICAgICAgICAgZ3JpZENlbGxzW3Bvc0dyaWROcl0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBodW1hbkdhbWVib2FyZC5yZW1vdmVTaGlwKGdyaWQsIHNlbGVjdGVkU2hpcC5pZCk7XG4gICAgICAgICAgcGxhY2VkU2hpcElkcy5zcGxpY2UocGxhY2VkU2hpcElkcy5pbmRleE9mKHNlbGVjdGVkU2hpcC5pZCksIDEpO1xuICAgICAgICAgIHNlbGVjdFNoaXAoXG4gICAgICAgICAgICBzaGlwRWxlbWVudCxcbiAgICAgICAgICAgIHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgICAgIGhvdmVyU2VsZWN0aW9uKHNlbGVjdGVkU2hpcC5pZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiUk9UQVRFXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gY2xpY2tpbmcgb24gdGhlIGdyaWQgdG8gcGxhY2VcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uICYmIHNlbGVjdGlvblZhbGlkKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IHNoaXBFbGVtZW50ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRJZCxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKHBvc2l0aW9ucywgc2VsZWN0ZWRJZCk7XG4gICAgICAgIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGdyaWQsIHNoaXApO1xuICAgICAgICBwbGFjZWRTaGlwSWRzLnB1c2goc2VsZWN0ZWRJZCk7XG4gICAgICAgIC8vIGdyZXkgaXQgb3V0XG4gICAgICAgIHVuc2VsZWN0U2hpcChzaGlwRWxlbWVudCk7XG4gICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgICBpZiAocGxhY2VkU2hpcElkcy5sZW5ndGggPj0gNSkge1xuICAgICAgICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiU1RBUlRcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbm11bHRpQnV0dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBpZiAobXVsdGlCdXR0LnRleHRDb250ZW50ID09PSBcIlNUQVJUXCIpIHtcbiAgICBzdGFydEdhbWUoKTtcbiAgfSBlbHNlIGlmIChtdWx0aUJ1dHQudGV4dENvbnRlbnQgPT09IFwiUk9UQVRFXCIpIHtcbiAgICByb3RhdGUoc2hpcFNlbGVjdGlvbiwgXCIuc2VsZWN0aW9uLXNoaXBcIik7XG4gIH0gZWxzZSBpZiAobXVsdGlCdXR0LnRleHRDb250ZW50ID09PSBcIlJFU0VUXCIpIHtcbiAgICByZXNldCgpO1xuICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiUk9UQVRFXCI7XG4gIH1cbn0pO1xuXG5zaGlwU2VsZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGlmIChzZWxlY3Rpb24gJiYgaXNTaGlwU2VsZWN0ZWQpIHtcbiAgICB1bnNlbGVjdFNoaXAoc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRJZCkpO1xuICB9XG59KTtcblxuc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgaWQgPSBzaGlwLmlkLnN1YnN0cmluZyhzaGlwLmlkLmxlbmd0aCAtIDEpO1xuICAgIGlmIChzZWxlY3Rpb24gJiYgIXBsYWNlZFNoaXBJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJZCAhPT0gaWQpIHtcbiAgICAgICAgc2VsZWN0U2hpcChzaGlwLCBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIGluaXRpYWwgc3R5bGluZ1xuZnVuY3Rpb24gZ3JpZENyZWF0aW9uKCkge1xuICBnYW1lR3JpZHMuZm9yRWFjaCgoZ2FtZUdyaWQpID0+IHtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtcm93c1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICAvLyBlbnRlcmluZyBhbGwgZ3JpZCBpdGVtc1xuICAgIGluc2VydEdyaWRDZWxscygxMCwgMTAsIGdhbWVHcmlkLCBncmlkQ2VsbCk7XG4gIH0pO1xuICAvLyBhZGRpbmcgaW5pdGlhbCBjZWxsIGV2ZW50IGxpc3RlbmVyc1xuICAvLyBzaW5jZSB0aGV5IG9ubHkgZXhpc3Qgb25jZSBncmlkIGlzIGNyZWF0ZWRcbiAgY2VsbFNob290TGlzdGVuZXIoY29tcHV0ZXJHcmlkKTtcbiAgY2VsbEdyaWRMaXN0ZW5lcnMoaHVtYW5HcmlkKTtcbn1cblxuLy8gcm93cywgY29scyA6IGludCxcbi8vIGdyaWQsIGNlbGwgOiBET00gZWxlbWVudHNcbmZ1bmN0aW9uIGluc2VydEdyaWRDZWxscyhyb3dzLCBjb2xzLCBncmlkLCBjZWxsKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAqIGNvbHM7IGkrKykge1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG5cbi8vICoqKiBUSElTIElTIFdIRVJFIFRIRSBUVVJOUyBIQVBQRU5cbmZ1bmN0aW9uIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKSB7XG4gIGlmIChcbiAgICBjb21wdXRlckdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKVxuICAgICAgW2dyaWROcl0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuICBHYW1lYm9hcmQubWFya0hpdChncmlkLCBncmlkTnIpO1xuICBodW1hbi5hdHRhY2soY29tcHV0ZXIsIEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApKTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQuc2hpcHMuc29tZSgoc2hpcCkgPT4ge1xuICAgIGlmIChzaGlwLmlzU3VuaygpKSB7XG4gICAgICBzaGlwLnNpbmsoZ3JpZCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbiAgLy8gY2hlY2sgaWYgaHVtYW4gaGFzIHdvblxuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBjb21wdXRlclBsYXlzKCk7XG59XG5cbi8vIGNvbXB1dGVyJ3MgdHVyblxuZnVuY3Rpb24gY29tcHV0ZXJQbGF5cygpIHtcbiAgbGV0IGF0dGFja1Bvc2l0aW9uID0gY29tcHV0ZXIuYXR0YWNrKGh1bWFuKTtcbiAgbGV0IHJvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKGF0dGFja1Bvc2l0aW9uKTtcbiAgbGV0IGNvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKGF0dGFja1Bvc2l0aW9uKTtcbiAgbGV0IGdyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yKDEwLCByb3dWYWx1ZSwgY29sVmFsdWUpO1xuICBHYW1lYm9hcmQubWFya0hpdChodW1hbkdyaWQsIGdyaWROcik7XG4gIGlmIChjaGVja1dpbigpKSB7XG4gICAgLy8gbGF0ZXIgcmVzZXRcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrV2luKCkge1xuICBpZiAoaHVtYW5HYW1lYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgd2luTWVzc2FnZShcImNvbXB1dGVyXCIpO1xuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChjb21wdXRlckdhbWVib2FyZC5hbGxTdW5rKCkpIHtcbiAgICB3aW5NZXNzYWdlKFwiaHVtYW5cIik7XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gd2luTWVzc2FnZSh3aW5uZXIpIHtcbiAgLy8gY3JlYXRlIG1vZGFsXG4gIGFsZXJ0KHdpbm5lciArIFwiIHdvblwiKTtcbn1cblxuLy8gKioqIEZPUiBMQVRFUlxuZnVuY3Rpb24gcmVzZXQoKSB7fVxuXG4vLyByb3RhdGUgYnV0dG9uXG4vLyBURU1QT1JBUlkgVkVSU0lPTlxuZnVuY3Rpb24gcm90YXRlKHBhcmVudCwgc2hpcFNlbGVjdG9yKSB7XG4gIC8vIHN3aXRjaGluZyB0aGUgZGlyZWN0aW9uXG4gIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgY2FzZSBcImNvbFwiOlxuICAgICAgZGlyZWN0aW9uID0gXCJyb3dcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyb3dcIjpcbiAgICAgIGRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIHJvdGF0aW5nIGFsbCB0aGUgc2hpcHNcbiAgcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2hpcFNlbGVjdG9yKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgbGV0IHdpZHRoID0gc2hpcC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gc2hpcC5vZmZzZXRIZWlnaHQ7XG4gICAgc2hpcC5zdHlsZS53aWR0aCA9IFN0cmluZyhoZWlnaHQpICsgXCJweFwiO1xuICAgIHNoaXAuc3R5bGUuaGVpZ2h0ID0gU3RyaW5nKHdpZHRoKSArIFwicHhcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFNoaXAoc2VsZWN0ZWRTaGlwRWxlbWVudCwgc2hpcEVsZW1lbnRzKSB7XG4gIC8vIG1ha2Ugc3VyZSB0aGUgcmVzdCBhcmUgdW5zZWxlY3RlZCBmaXJzdFxuICBzaGlwRWxlbWVudHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHVuc2VsZWN0U2hpcChzaGlwKTtcbiAgfSk7XG5cbiAgbGV0IHNoaXBJZCA9IHNlbGVjdGVkU2hpcEVsZW1lbnQuaWQuc3Vic3RyaW5nKFxuICAgIHNlbGVjdGVkU2hpcEVsZW1lbnQuaWQubGVuZ3RoIC0gMSxcbiAgKTtcblxuICBpc1NoaXBTZWxlY3RlZCA9IHRydWU7XG4gIHNlbGVjdGVkSWQgPSBzaGlwSWQ7XG4gIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5cbiAgLy8gYWRkIGJvcmRlciB0byBzZWxlY3RlZCBzaGlwXG4gIHNlbGVjdGVkU2hpcEVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgcmVkXCI7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0U2hpcChzaGlwKSB7XG4gIGlzU2hpcFNlbGVjdGVkID0gZmFsc2U7XG4gIHNlbGVjdGVkSWQgPSBcIlwiO1xuICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gIC8vIGFkZCBib3JkZXIgdG8gc2VsZWN0ZWQgc2hpcFxuICBzaGlwLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIHBsYXlpbmcgPSB0cnVlO1xuICBzZWxlY3Rpb24gPSBmYWxzZTtcbiAgbXVsdGlCdXR0LnRleHRDb250ZW50ID0gXCJSRVNFVFwiO1xuICBjb21wdXRlckdhbWVib2FyZC5nZW5lcmF0ZVJhbmRvbVNoaXBzKGNvbXB1dGVyLCBjb21wdXRlckdyaWQpO1xufVxuXG4vLyAqKiogREVMRVRFIE9OQ0UgQ1VTVE9NIE1FVEhPRFMgQ1JFQVRFRFxuZnVuY3Rpb24gcGxhY2VJbml0aWFsQm9hdHMoKSB7XG4gIC8vIGxldCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoW1wiMToyXCIsIFwiMTozXCJdLCBcIlBcIik7XG4gIC8vIGxldCBzdWJtYXJpbmUgPSBuZXcgU2hpcChbXCIzOjJcIiwgXCIzOjNcIiwgXCIzOjRcIl0sIFwiU1wiKTtcbiAgLy8gaHVtYW5HYW1lYm9hcmQucGxhY2UoaHVtYW5HcmlkLCBwYXRyb2xCb2F0KTtcbiAgLy8gaHVtYW5HYW1lYm9hcmQucGxhY2UoaHVtYW5HcmlkLCBzdWJtYXJpbmUpO1xuICAvLyBsZXQgcGF0cm9sQm9hdEMgPSBuZXcgU2hpcChbXCIxOjJcIiwgXCIxOjNcIl0sIFwiUFwiKTtcbiAgLy8gbGV0IHN1Ym1hcmluZUMgPSBuZXcgU2hpcChbXCIzOjJcIiwgXCIzOjNcIiwgXCIzOjRcIl0sIFwiU1wiKTtcbiAgLy8gY29tcHV0ZXJHYW1lYm9hcmQucGxhY2UoY29tcHV0ZXJHcmlkLCBwYXRyb2xCb2F0Qyk7XG4gIC8vIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlKGNvbXB1dGVyR3JpZCwgc3VibWFyaW5lQyk7XG59XG5cbmdyaWRDcmVhdGlvbigpO1xucGxhY2VJbml0aWFsQm9hdHMoKTtcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJoaXRQb3NpdGlvbnMiLCJzaGlwcyIsInNoaXAiLCJjaGVja1ZhbGlkU2hpcFBvc2l0aW9uIiwicHVzaCIsImdyaWQiLCJwbGFjZUxvZ2ljYWxseSIsInBsYWNlSW5HcmlkIiwibWluaW11bSIsInBvc2l0aW9ucyIsInJlZHVjZSIsInN0b3JlZCIsInBsYWNlZFBvcyIsImdldFJvd1ZhbHVlIiwiSW5maW5pdHkiLCJnZXRDb2xWYWx1ZSIsIm5ld1NoaXAiLCJzb21lIiwibmV3UG9zIiwiY2hlY2tWYWxpZFBvc2l0aW9uIiwicG9zIiwibmV3Um93VmFsdWUiLCJuZXdDb2xWYWx1ZSIsInBsYWNlZFNoaXAiLCJtaW5Sb3dWYWx1ZSIsIl9taW5Sb3dWYWx1ZSIsIm1heFJvd1ZhbHVlIiwiX21heFJvd1ZhbHVlIiwibWluQ29sVmFsdWUiLCJfbWluQ29sVmFsdWUiLCJtYXhDb2xWYWx1ZSIsIl9tYXhDb2xWYWx1ZSIsImluY2x1ZGVzIiwiaSIsImxlbmd0aCIsImhpdCIsImV2ZXJ5IiwiaXNTdW5rIiwic2hpcExlbmd0aCIsImZvckVhY2giLCJncmlkTnIiLCJmaW5kR3JpZE5yIiwiZ3JpZE5vZGUiLCJjaGlsZHJlbiIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsIlN0cmluZyIsImlkIiwic3BsaWNlIiwiaW5kZXhPZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxsIiwic3Vic3RyaW5nIiwicmVtb3ZlIiwicmVtb3ZlU2hpcExvZ2ljYWxseSIsInJlbW92ZVNoaXBGcm9tR3JpZCIsInBsYXllciIsInNoaXBUeXBlIiwicmFuZG9tU2hpcFBvc2l0aW9uIiwicGxhY2UiLCJOdW1iZXIiLCJkaXJlY3Rpb24iLCJ2YWwiLCJyb3dWYWx1ZSIsImNvbFZhbHVlIiwiVHlwZUVycm9yIiwibnIiLCJjb2xzIiwiTWF0aCIsImZsb29yIiwicm93IiwiZmluZEdyaWRSb3ciLCJjb2wiLCJmaW5kR3JpZENvbCIsImNvbnRhaW5zIiwiU2hpcCIsIlBsYXllciIsImlzSHVtYW4iLCJnYW1lYm9hcmQiLCJvdGhlclBsYXllciIsInJlY2VpdmVBdHRhY2siLCJfcmFuZG9tUGFpciIsInJhbmRvbU5yMSIsInJhbmRvbU5yMiIsInBvc2l0aW9uIiwicmFuZG9tIiwidW5kZWZpbmVkIiwiX2h1bWFuQXR0YWNrIiwiX2NvbXB1dGVyQXR0YWNrIiwic2hpcElkIiwic3RhcnRQb3MiLCJhZGRUb1Bvc2l0aW9uIiwic3VuayIsImZpbmRHcmlkTnJGcm9tUG9zaXRpb24iLCJnYW1lR3JpZHMiLCJkb2N1bWVudCIsImh1bWFuR3JpZCIsImNvbXB1dGVyR3JpZCIsInNoaXBTZWxlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwibXVsdGlCdXR0IiwiZ3JpZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiaHVtYW5HYW1lYm9hcmQiLCJjb21wdXRlckdhbWVib2FyZCIsImh1bWFuIiwiY29tcHV0ZXIiLCJwbGF5aW5nIiwic2VsZWN0aW9uIiwiaXNTaGlwU2VsZWN0ZWQiLCJzZWxlY3RlZElkIiwic2VsZWN0aW9uVmFsaWQiLCJzaGlwTGVuZ3RocyIsIkMiLCJCIiwiRCIsIlMiLCJQIiwicGxhY2VkU2hpcElkcyIsImNlbGxTaG9vdExpc3RlbmVyIiwibm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJodW1hblBsYXlzIiwiaG92ZXJTZWxlY3Rpb24iLCJncmlkQ2VsbHMiLCJzdGFydFBvc2l0aW9uIiwiZmluZFBvc2l0aW9uRnJvbUdyaWROciIsImNlbGxHcmlkTGlzdGVuZXJzIiwic2VsZWN0ZWRTaGlwIiwic2hpcEVsZW1lbnQiLCJzZWxlY3RlZFBvcyIsInBvc0dyaWROciIsInJlbW92ZVNoaXAiLCJzZWxlY3RTaGlwIiwidGV4dENvbnRlbnQiLCJ1bnNlbGVjdFNoaXAiLCJzdGFydEdhbWUiLCJyb3RhdGUiLCJyZXNldCIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJncmlkQ3JlYXRpb24iLCJnYW1lR3JpZCIsInN0eWxlIiwiaW5zZXJ0R3JpZENlbGxzIiwicm93cyIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwibWFya0hpdCIsImF0dGFjayIsInNpbmsiLCJjaGVja1dpbiIsImNvbXB1dGVyUGxheXMiLCJhdHRhY2tQb3NpdGlvbiIsImFsbFN1bmsiLCJ3aW5NZXNzYWdlIiwid2lubmVyIiwiYWxlcnQiLCJwYXJlbnQiLCJzaGlwU2VsZWN0b3IiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2VsZWN0ZWRTaGlwRWxlbWVudCIsInNoaXBFbGVtZW50cyIsImJvcmRlciIsImdlbmVyYXRlUmFuZG9tU2hpcHMiLCJwbGFjZUluaXRpYWxCb2F0cyJdLCJzb3VyY2VSb290IjoiIn0=
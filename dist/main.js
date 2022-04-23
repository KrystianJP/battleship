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

        console.log(positions);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0lBQ01BO0FBQ0osdUJBQWM7QUFBQTs7QUFDWixTQUFLQyxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsU0FBS0MsS0FBTCxHQUFhLEVBQWI7QUFDRDs7OztXQUVELHdCQUFlQyxJQUFmLEVBQXFCO0FBQ25CLFVBQUksS0FBS0Msc0JBQUwsQ0FBNEJELElBQTVCLENBQUosRUFBdUM7QUFDckMsYUFBS0QsS0FBTCxDQUFXRyxJQUFYLENBQWdCRixJQUFoQjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7V0FFRCxlQUFNRyxJQUFOLEVBQVlILElBQVosRUFBa0I7QUFDaEIsVUFBSSxLQUFLSSxjQUFMLENBQW9CSixJQUFwQixDQUFKLEVBQStCO0FBQzdCLGFBQUtLLFdBQUwsQ0FBaUJGLElBQWpCLEVBQXVCSCxJQUF2QjtBQUNBLGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7V0FVRCxzQkFBYUEsSUFBYixFQUFtQjtBQUNqQixVQUFJTSxPQUFPLEdBQUdOLElBQUksQ0FBQ08sU0FBTCxDQUFlQyxNQUFmLENBQXNCLFVBQUNDLE1BQUQsRUFBU0MsU0FBVCxFQUF1QjtBQUN6RCxZQUFJYixTQUFTLENBQUNjLFdBQVYsQ0FBc0JELFNBQXRCLElBQW1DRCxNQUF2QyxFQUErQztBQUM3QyxpQkFBT1osU0FBUyxDQUFDYyxXQUFWLENBQXNCRCxTQUF0QixDQUFQO0FBQ0Q7O0FBQ0QsZUFBT0QsTUFBUDtBQUNELE9BTGEsRUFLWEcsUUFMVyxDQUFkO0FBTUEsYUFBT04sT0FBUDtBQUNEOzs7V0FDRCxzQkFBYU4sSUFBYixFQUFtQjtBQUNqQixhQUFPQSxJQUFJLENBQUNPLFNBQUwsQ0FBZUMsTUFBZixDQUFzQixVQUFDQyxNQUFELEVBQVNDLFNBQVQsRUFBdUI7QUFDbEQsWUFBSWIsU0FBUyxDQUFDZ0IsV0FBVixDQUFzQkgsU0FBdEIsSUFBbUNELE1BQXZDLEVBQStDO0FBQzdDLGlCQUFPWixTQUFTLENBQUNnQixXQUFWLENBQXNCSCxTQUF0QixDQUFQO0FBQ0Q7O0FBQ0QsZUFBT0QsTUFBUDtBQUNELE9BTE0sRUFLSkcsUUFMSSxDQUFQO0FBTUQ7OztXQUNELHNCQUFhWixJQUFiLEVBQW1CO0FBQ2pCLGFBQU9BLElBQUksQ0FBQ08sU0FBTCxDQUFlQyxNQUFmLENBQXNCLFVBQUNDLE1BQUQsRUFBU0MsU0FBVCxFQUF1QjtBQUNsRCxZQUFJYixTQUFTLENBQUNjLFdBQVYsQ0FBc0JELFNBQXRCLElBQW1DRCxNQUF2QyxFQUErQztBQUM3QyxpQkFBT1osU0FBUyxDQUFDYyxXQUFWLENBQXNCRCxTQUF0QixDQUFQO0FBQ0Q7O0FBQ0QsZUFBT0QsTUFBUDtBQUNELE9BTE0sRUFLSixDQUFDRyxRQUxHLENBQVA7QUFNRDs7O1dBQ0Qsc0JBQWFaLElBQWIsRUFBbUI7QUFDakIsYUFBT0EsSUFBSSxDQUFDTyxTQUFMLENBQWVDLE1BQWYsQ0FBc0IsVUFBQ0MsTUFBRCxFQUFTQyxTQUFULEVBQXVCO0FBQ2xELFlBQUliLFNBQVMsQ0FBQ2dCLFdBQVYsQ0FBc0JILFNBQXRCLElBQW1DRCxNQUF2QyxFQUErQztBQUM3QyxpQkFBT1osU0FBUyxDQUFDZ0IsV0FBVixDQUFzQkgsU0FBdEIsQ0FBUDtBQUNEOztBQUNELGVBQU9ELE1BQVA7QUFDRCxPQUxNLEVBS0osQ0FBQ0csUUFMRyxDQUFQO0FBTUQsTUFFRDtBQUNBOzs7O1dBeUJBO0FBQ0Esb0NBQXVCRSxPQUF2QixFQUFnQztBQUFBOztBQUM5QjtBQUNBLGFBQU8sQ0FBQ0EsT0FBTyxDQUFDUCxTQUFSLENBQWtCUSxJQUFsQixDQUF1QixVQUFDQyxNQUFELEVBQVk7QUFDekMsZUFBTyxDQUFDLEtBQUksQ0FBQ0Msa0JBQUwsQ0FBd0JELE1BQXhCLENBQVI7QUFDRCxPQUZPLENBQVI7QUFHRDs7O1dBRUQsNEJBQW1CRSxHQUFuQixFQUF3QjtBQUFBOztBQUN0QixVQUFJQyxXQUFXLEdBQUd0QixTQUFTLENBQUNjLFdBQVYsQ0FBc0JPLEdBQXRCLENBQWxCO0FBQ0EsVUFBSUUsV0FBVyxHQUFHdkIsU0FBUyxDQUFDZ0IsV0FBVixDQUFzQkssR0FBdEIsQ0FBbEIsQ0FGc0IsQ0FJdEI7QUFDQTs7QUFDQSxhQUFPLENBQUMsS0FBS25CLEtBQUwsQ0FBV2dCLElBQVgsQ0FBZ0IsVUFBQ00sVUFBRCxFQUFnQjtBQUN0QyxZQUFJQyxXQUFXLEdBQUcsTUFBSSxDQUFDQyxZQUFMLENBQWtCRixVQUFsQixDQUFsQjs7QUFDQSxZQUFJRyxXQUFXLEdBQUcsTUFBSSxDQUFDQyxZQUFMLENBQWtCSixVQUFsQixDQUFsQjs7QUFDQSxZQUFJSyxXQUFXLEdBQUcsTUFBSSxDQUFDQyxZQUFMLENBQWtCTixVQUFsQixDQUFsQjs7QUFDQSxZQUFJTyxXQUFXLEdBQUcsTUFBSSxDQUFDQyxZQUFMLENBQWtCUixVQUFsQixDQUFsQjs7QUFFQSxZQUNFRixXQUFXLElBQUlHLFdBQVcsR0FBRyxDQUE3QixJQUNBSCxXQUFXLElBQUlLLFdBQVcsR0FBRyxDQUQ3QixJQUVBSixXQUFXLElBQUlNLFdBQVcsR0FBRyxDQUY3QixJQUdBTixXQUFXLElBQUlRLFdBQVcsR0FBRyxDQUovQixFQUtFO0FBQ0E7QUFDQSxpQkFBTyxJQUFQO0FBQ0Q7O0FBQ0QsZUFBTyxLQUFQO0FBQ0QsT0FoQk8sQ0FBUjtBQWlCRCxNQUVEOzs7O1dBQ0EsdUJBQWNWLEdBQWQsRUFBbUI7QUFDakIsVUFBSSxDQUFDLEtBQUtwQixZQUFMLENBQWtCZ0MsUUFBbEIsQ0FBMkJaLEdBQTNCLENBQUwsRUFBc0M7QUFDcEMsYUFBS3BCLFlBQUwsQ0FBa0JJLElBQWxCLENBQXVCZ0IsR0FBdkI7O0FBQ0EsYUFBSyxJQUFJYSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEtBQUtoQyxLQUFMLENBQVdpQyxNQUEvQixFQUF1Q0QsQ0FBQyxFQUF4QyxFQUE0QztBQUMxQyxjQUFJLEtBQUtoQyxLQUFMLENBQVdnQyxDQUFYLEVBQWNFLEdBQWQsQ0FBa0JmLEdBQWxCLENBQUosRUFBNEI7QUFDMUI7QUFDRDtBQUNGOztBQUNELGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7V0FFRCxtQkFBVTtBQUNSLFVBQUksS0FBS25CLEtBQUwsQ0FBV21DLEtBQVgsQ0FBaUIsVUFBQ2xDLElBQUQ7QUFBQSxlQUFVQSxJQUFJLENBQUNtQyxNQUFMLEVBQVY7QUFBQSxPQUFqQixDQUFKLEVBQStDO0FBQzdDLGVBQU8sSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7V0EyQkQ7QUFDQTtBQUNBLHlCQUFZaEMsSUFBWixFQUFrQkgsSUFBbEIsRUFBd0I7QUFDdEIsVUFBSW9DLFVBQVUsR0FBR3BDLElBQUksQ0FBQ08sU0FBTCxDQUFleUIsTUFBaEM7QUFDQWhDLE1BQUFBLElBQUksQ0FBQ08sU0FBTCxDQUFlOEIsT0FBZixDQUF1QixVQUFDbkIsR0FBRCxFQUFTO0FBQzlCLFlBQUlvQixNQUFNLEdBQUd6QyxTQUFTLENBQUMwQyxVQUFWLENBQ1gsRUFEVyxFQUVYMUMsU0FBUyxDQUFDYyxXQUFWLENBQXNCTyxHQUF0QixDQUZXLEVBR1hyQixTQUFTLENBQUNnQixXQUFWLENBQXNCSyxHQUF0QixDQUhXLENBQWI7QUFLQSxZQUFJc0IsUUFBUSxHQUFHckMsSUFBSSxDQUFDc0MsUUFBTCxDQUFjSCxNQUFkLENBQWY7QUFDQUUsUUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CQyxHQUFuQixDQUF1QixNQUF2QjtBQUNBSCxRQUFBQSxRQUFRLENBQUNJLFlBQVQsQ0FBc0IsSUFBdEIsRUFBNEIsU0FBU0MsTUFBTSxDQUFDN0MsSUFBSSxDQUFDOEMsRUFBTixDQUEzQztBQUNELE9BVEQ7QUFVRDs7O1dBZUQsNkJBQW9CQSxFQUFwQixFQUF3QjtBQUFBOztBQUN0QixXQUFLL0MsS0FBTCxDQUFXZ0IsSUFBWCxDQUFnQixVQUFDZixJQUFELEVBQVU7QUFDeEIsWUFBSUEsSUFBSSxDQUFDOEMsRUFBTCxLQUFZQSxFQUFoQixFQUFvQjtBQUNsQixnQkFBSSxDQUFDL0MsS0FBTCxDQUFXZ0QsTUFBWCxDQUFrQixNQUFJLENBQUNoRCxLQUFMLENBQVdpRCxPQUFYLENBQW1CaEQsSUFBbkIsQ0FBbEIsRUFBNEMsQ0FBNUM7O0FBQ0EsaUJBQU8sSUFBUDtBQUNEOztBQUNELGVBQU8sS0FBUDtBQUNELE9BTkQ7QUFPRDs7O1dBRUQsNEJBQW1CRyxJQUFuQixFQUF5QjJDLEVBQXpCLEVBQTZCO0FBQzNCM0MsTUFBQUEsSUFBSSxDQUFDOEMsZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0NaLE9BQXBDLENBQTRDLFVBQUNhLElBQUQsRUFBVTtBQUNwRCxZQUFJQSxJQUFJLENBQUNKLEVBQUwsQ0FBUUssU0FBUixDQUFrQixDQUFsQixNQUF5QkwsRUFBN0IsRUFBaUM7QUFDL0JJLFVBQUFBLElBQUksQ0FBQ1IsU0FBTCxDQUFlVSxNQUFmLENBQXNCLE1BQXRCO0FBQ0EsaUJBQU8sSUFBUDtBQUNEOztBQUNELGVBQU8sS0FBUDtBQUNELE9BTkQ7QUFPRDs7O1dBRUQsb0JBQVdqRCxJQUFYLEVBQWlCMkMsRUFBakIsRUFBcUI7QUFDbkIsV0FBS08sbUJBQUwsQ0FBeUJQLEVBQXpCO0FBQ0EsV0FBS1Esa0JBQUwsQ0FBd0JuRCxJQUF4QixFQUE4QjJDLEVBQTlCO0FBQ0Q7OztXQUVELDZCQUFvQlMsTUFBcEIsRUFBNEJwRCxJQUE1QixFQUFrQztBQUNoQyw4QkFBcUIsQ0FDbkIsQ0FBQyxHQUFELEVBQU0sQ0FBTixDQURtQixFQUVuQixDQUFDLEdBQUQsRUFBTSxDQUFOLENBRm1CLEVBR25CLENBQUMsR0FBRCxFQUFNLENBQU4sQ0FIbUIsRUFJbkIsQ0FBQyxHQUFELEVBQU0sQ0FBTixDQUptQixFQUtuQixDQUFDLEdBQUQsRUFBTSxDQUFOLENBTG1CLENBQXJCLDBCQU1HO0FBTkUsWUFBSXFELFFBQVEsV0FBWjs7QUFPSCxlQUFPLElBQVAsRUFBYTtBQUNYLGNBQUl4RCxJQUFJLEdBQUd1RCxNQUFNLENBQUNFLGtCQUFQLENBQTBCRCxRQUFRLENBQUMsQ0FBRCxDQUFsQyxFQUF1Q0EsUUFBUSxDQUFDLENBQUQsQ0FBL0MsQ0FBWCxDQURXLENBQ3FEOztBQUNoRSxjQUFJeEQsSUFBSixFQUFVO0FBQ1IsaUJBQUswRCxLQUFMLENBQVd2RCxJQUFYLEVBQWlCSCxJQUFqQjtBQUNBO0FBQ0Q7QUFDRjtBQUNGO0FBQ0Y7OztXQXpORCxxQkFBbUJrQixHQUFuQixFQUF3QjtBQUN0QixhQUFPeUMsTUFBTSxDQUFDekMsR0FBRyxDQUFDaUMsU0FBSixDQUFjLENBQWQsRUFBaUJqQyxHQUFHLENBQUM4QixPQUFKLENBQVksR0FBWixDQUFqQixDQUFELENBQWI7QUFDRDs7O1dBRUQscUJBQW1COUIsR0FBbkIsRUFBd0I7QUFDdEIsYUFBT3lDLE1BQU0sQ0FBQ3pDLEdBQUcsQ0FBQ2lDLFNBQUosQ0FBY2pDLEdBQUcsQ0FBQzhCLE9BQUosQ0FBWSxHQUFaLElBQW1CLENBQWpDLENBQUQsQ0FBYjtBQUNEOzs7V0FzQ0QsdUJBQXFCOUIsR0FBckIsRUFBMEIwQyxTQUExQixFQUFxQ0MsR0FBckMsRUFBMEM7QUFDeEMsVUFBSUQsU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQ3ZCO0FBQ0EsWUFBSUUsUUFBUSxHQUFHakUsU0FBUyxDQUFDYyxXQUFWLENBQXNCTyxHQUF0QixDQUFmO0FBQ0EsWUFBSUMsV0FBVyxHQUFHMkMsUUFBUSxHQUFHRCxHQUE3QixDQUh1QixDQUl2Qjs7QUFDQSxZQUFJMUMsV0FBVyxHQUFHLEVBQWQsSUFBb0JBLFdBQVcsR0FBRyxDQUF0QyxFQUF5QztBQUN2QyxpQkFBTyxLQUFQO0FBQ0QsU0FQc0IsQ0FRdkI7OztBQUNBLGVBQU8wQixNQUFNLENBQUMxQixXQUFELENBQU4sR0FBc0JELEdBQUcsQ0FBQ2lDLFNBQUosQ0FBY2pDLEdBQUcsQ0FBQzhCLE9BQUosQ0FBWSxHQUFaLENBQWQsQ0FBN0I7QUFDRCxPQVZELE1BVU8sSUFBSVksU0FBUyxLQUFLLEtBQWxCLEVBQXlCO0FBQzlCO0FBQ0EsWUFBSUcsUUFBUSxHQUFHbEUsU0FBUyxDQUFDZ0IsV0FBVixDQUFzQkssR0FBdEIsQ0FBZjtBQUNBLFlBQUlFLFdBQVcsR0FBRzJDLFFBQVEsR0FBR0YsR0FBN0I7O0FBQ0EsWUFBSXpDLFdBQVcsR0FBRyxFQUFkLElBQW9CQSxXQUFXLEdBQUcsQ0FBdEMsRUFBeUM7QUFDdkMsaUJBQU8sS0FBUDtBQUNEOztBQUNELGVBQU9GLEdBQUcsQ0FBQ2lDLFNBQUosQ0FBYyxDQUFkLEVBQWlCakMsR0FBRyxDQUFDOEIsT0FBSixDQUFZLEdBQVosSUFBbUIsQ0FBcEMsSUFBeUNILE1BQU0sQ0FBQ3pCLFdBQUQsQ0FBdEQ7QUFDRCxPQVJNLE1BUUE7QUFDTCxjQUFNLElBQUk0QyxTQUFKLENBQWMsNkJBQWQsQ0FBTjtBQUNEO0FBQ0Y7OztXQXdERCxxQkFBbUJDLEVBQW5CLEVBQXVCQyxJQUF2QixFQUE2QjtBQUMzQixhQUFPQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsRUFBRSxHQUFHQyxJQUFoQixJQUF3QixDQUEvQjtBQUNEOzs7V0FFRCxxQkFBbUJELEVBQW5CLEVBQXVCSSxHQUF2QixFQUE0QkgsSUFBNUIsRUFBa0M7QUFDaEMsYUFBT0QsRUFBRSxHQUFHLENBQUNJLEdBQUcsR0FBRyxDQUFQLElBQVlILElBQWpCLEdBQXdCLENBQS9CO0FBQ0Q7OztXQUVELGdDQUE4QkQsRUFBOUIsRUFBa0NDLElBQWxDLEVBQXdDO0FBQ3RDLFVBQUlHLEdBQUcsR0FBR3hFLFNBQVMsQ0FBQ3lFLFdBQVYsQ0FBc0JMLEVBQXRCLEVBQTBCQyxJQUExQixDQUFWO0FBQ0EsVUFBSUssR0FBRyxHQUFHMUUsU0FBUyxDQUFDMkUsV0FBVixDQUFzQlAsRUFBdEIsRUFBMEJJLEdBQTFCLEVBQStCSCxJQUEvQixDQUFWO0FBQ0EsYUFBT3JCLE1BQU0sQ0FBQ3dCLEdBQUQsQ0FBTixHQUFjLEdBQWQsR0FBb0J4QixNQUFNLENBQUMwQixHQUFELENBQWpDO0FBQ0QsTUFFRDs7OztXQUNBLG9CQUFrQkwsSUFBbEIsRUFBd0JHLEdBQXhCLEVBQTZCRSxHQUE3QixFQUFrQztBQUNoQyxhQUFPTCxJQUFJLElBQUlHLEdBQUcsR0FBRyxDQUFWLENBQUosSUFBb0JFLEdBQUcsR0FBRyxDQUExQixDQUFQO0FBQ0Q7OztXQUVELGdDQUE4QnJELEdBQTlCLEVBQW1DZ0QsSUFBbkMsRUFBeUM7QUFDdkMsVUFBSUcsR0FBRyxHQUFHeEUsU0FBUyxDQUFDYyxXQUFWLENBQXNCTyxHQUF0QixDQUFWO0FBQ0EsVUFBSXFELEdBQUcsR0FBRzFFLFNBQVMsQ0FBQ2dCLFdBQVYsQ0FBc0JLLEdBQXRCLENBQVY7QUFDQSxhQUFPckIsU0FBUyxDQUFDMEMsVUFBVixDQUFxQjJCLElBQXJCLEVBQTJCRyxHQUEzQixFQUFnQ0UsR0FBaEMsQ0FBUDtBQUNEOzs7V0FrQkQsaUJBQWVwRSxJQUFmLEVBQXFCbUMsTUFBckIsRUFBNkI7QUFDM0IsVUFBSUUsUUFBUSxHQUFHckMsSUFBSSxDQUFDc0MsUUFBTCxDQUFjSCxNQUFkLENBQWY7QUFDQUUsTUFBQUEsUUFBUSxDQUFDRSxTQUFULENBQW1CQyxHQUFuQixDQUF1QixLQUF2QjtBQUNEOzs7V0FFRCxrQkFBZ0J4QyxJQUFoQixFQUFzQm1DLE1BQXRCLEVBQThCO0FBQzVCLFVBQUluQyxJQUFJLENBQUNzQyxRQUFMLENBQWNILE1BQWQsRUFBc0JJLFNBQXRCLENBQWdDK0IsUUFBaEMsQ0FBeUMsTUFBekMsQ0FBSixFQUFzRDtBQUNwRCxlQUFPLElBQVA7QUFDRCxPQUZELE1BRU87QUFDTCxlQUFPLEtBQVA7QUFDRDtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDck1IO0FBQ0E7O0lBRU1FO0FBQ0o7QUFDQSxrQkFBWUMsT0FBWixFQUFxQkMsU0FBckIsRUFBZ0M7QUFBQTs7QUFDOUIsU0FBS0QsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkEsU0FBakI7QUFDRDs7OztXQUVELHNCQUFhQyxXQUFiLEVBQTBCNUQsR0FBMUIsRUFBK0I7QUFDN0I0RCxNQUFBQSxXQUFXLENBQUNELFNBQVosQ0FBc0JFLGFBQXRCLENBQW9DN0QsR0FBcEM7QUFDRCxNQUVEOzs7O1dBQ0EseUJBQWdCNEQsV0FBaEIsRUFBNkI7QUFDM0IsU0FBRztBQUNELGdDQUE2QixLQUFLRSxXQUFMLEVBQTdCO0FBQUE7QUFBQSxZQUFLQyxTQUFMO0FBQUEsWUFBZ0JDLFNBQWhCOztBQUNBLFlBQUlDLFFBQVEsR0FBR3RDLE1BQU0sQ0FBQ29DLFNBQUQsQ0FBTixHQUFvQixHQUFwQixHQUEwQnBDLE1BQU0sQ0FBQ3FDLFNBQUQsQ0FBL0M7QUFDRCxPQUhELFFBR1MsQ0FBQ0osV0FBVyxDQUFDRCxTQUFaLENBQXNCRSxhQUF0QixDQUFvQ0ksUUFBcEMsQ0FIVjs7QUFJQSxhQUFPQSxRQUFQO0FBQ0Q7OztXQUVELHVCQUFjO0FBQ1osVUFBSUYsU0FBUyxHQUFHZCxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDaUIsTUFBTCxLQUFnQixFQUEzQixJQUFpQyxDQUFqRDtBQUNBLFVBQUlGLFNBQVMsR0FBR2YsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ2lCLE1BQUwsS0FBZ0IsRUFBM0IsSUFBaUMsQ0FBakQ7QUFDQSxhQUFPLENBQUNILFNBQUQsRUFBWUMsU0FBWixDQUFQO0FBQ0QsTUFFRDs7OztXQUNBLGdCQUFPSixXQUFQLEVBQXFDO0FBQUEsVUFBakI1RCxHQUFpQix1RUFBWG1FLFNBQVc7O0FBQ25DLFVBQUksS0FBS1QsT0FBVCxFQUFrQjtBQUNoQixhQUFLVSxZQUFMLENBQWtCUixXQUFsQixFQUErQjVELEdBQS9COztBQUNBLGVBQU9BLEdBQVA7QUFDRCxPQUhELE1BR087QUFDTCxlQUFPLEtBQUtxRSxlQUFMLENBQXFCVCxXQUFyQixDQUFQO0FBQ0Q7QUFDRixNQUVEOzs7O1dBQ0EsNEJBQW1CMUMsVUFBbkIsRUFBK0JvRCxNQUEvQixFQUF1QztBQUNyQyxVQUFJakYsU0FBSjs7QUFFQSxhQUFPLElBQVAsRUFBYTtBQUNYQSxRQUFBQSxTQUFTLEdBQUcsRUFBWjtBQUNBLFlBQUlrRixRQUFRLEdBQ1Y1QyxNQUFNLENBQUNzQixJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDaUIsTUFBTCxLQUFnQixDQUEzQixJQUFnQyxDQUFqQyxDQUFOLEdBQ0EsR0FEQSxHQUVBdkMsTUFBTSxDQUFDc0IsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ2lCLE1BQUwsS0FBZ0IsQ0FBM0IsSUFBZ0MsQ0FBakMsQ0FIUjtBQUlBLFlBQUl4QixTQUFTLEdBQUcsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlTyxJQUFJLENBQUNDLEtBQUwsQ0FBV0QsSUFBSSxDQUFDaUIsTUFBTCxLQUFnQixDQUEzQixDQUFmLENBQWhCOztBQUNBLGFBQUssSUFBSXJELENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdLLFVBQXBCLEVBQWdDTCxDQUFDLEVBQWpDLEVBQXFDO0FBQ25DeEIsVUFBQUEsU0FBUyxDQUFDTCxJQUFWLENBQWVMLCtEQUFBLENBQXdCNEYsUUFBeEIsRUFBa0M3QixTQUFsQyxFQUE2QzdCLENBQTdDLENBQWY7QUFDRDs7QUFDRDRELFFBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZckYsU0FBWjs7QUFDQSxZQUFJQSxTQUFTLENBQUNRLElBQVYsQ0FBZSxVQUFDRyxHQUFEO0FBQUEsaUJBQVNBLEdBQUcsS0FBSyxLQUFqQjtBQUFBLFNBQWYsQ0FBSixFQUE0QztBQUMxQztBQUNEOztBQUNEO0FBQ0Q7O0FBQ0QsVUFBSWxCLElBQUksR0FBRyxJQUFJMEUsdUNBQUosQ0FBU25FLFNBQVQsRUFBb0JpRixNQUFwQixDQUFYOztBQUNBLFVBQUksS0FBS1gsU0FBTCxDQUFlNUUsc0JBQWYsQ0FBc0NELElBQXRDLENBQUosRUFBaUQ7QUFDL0MsZUFBT0EsSUFBUDtBQUNEOztBQUNELGFBQU8sS0FBUDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQ2hFRzBFO0FBQ0o7QUFDQTtBQUNBLGdCQUFZbkUsU0FBWixFQUF1QnVDLEVBQXZCLEVBQTJCO0FBQUE7O0FBQ3pCLFNBQUtWLFVBQUwsR0FBa0I3QixTQUFTLENBQUN5QixNQUE1QjtBQUNBLFNBQUt6QixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBLFNBQUtULFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxTQUFLK0YsSUFBTCxHQUFZLEtBQVo7QUFDQSxTQUFLL0MsRUFBTCxHQUFVQSxFQUFWO0FBQ0QsSUFFRDs7Ozs7V0FDQSxhQUFJcUMsUUFBSixFQUFjO0FBQ1osVUFBSSxLQUFLNUUsU0FBTCxDQUFldUIsUUFBZixDQUF3QnFELFFBQXhCLENBQUosRUFBdUM7QUFDckMsYUFBS3JGLFlBQUwsQ0FBa0JJLElBQWxCLENBQXVCaUYsUUFBdkI7QUFDQSxlQUFPLElBQVA7QUFDRDs7QUFDRCxhQUFPLEtBQVA7QUFDRDs7O1dBRUQsa0JBQVM7QUFDUCxVQUFJLEtBQUtyRixZQUFMLENBQWtCa0MsTUFBbEIsS0FBNkIsS0FBS0ksVUFBdEMsRUFBa0Q7QUFDaEQsYUFBS3lELElBQUwsR0FBWSxJQUFaO0FBQ0EsZUFBTyxJQUFQO0FBQ0Q7O0FBQ0QsYUFBTyxLQUFQO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCSDtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsNkNBQTZDLDhDQUE4QyxjQUFjLDJCQUEyQixlQUFlLEdBQUcsZUFBZSxnQkFBZ0IsaUJBQWlCLEdBQUcsVUFBVSxtQ0FBbUMsa0JBQWtCLGtDQUFrQyxtQ0FBbUMsd0VBQXdFLFdBQVcsR0FBRyxZQUFZLHFCQUFxQixHQUFHLGVBQWUsd0JBQXdCLEdBQUcsdUJBQXVCLGlCQUFpQixrQkFBa0Isd0JBQXdCLDJCQUEyQixjQUFjLGtCQUFrQiw4Q0FBOEMsR0FBRyxtQkFBbUIsb0JBQW9CLEdBQUcsV0FBVyxpQkFBaUIsZ0JBQWdCLGdDQUFnQyxHQUFHLHNCQUFzQixpQkFBaUIsa0JBQWtCLHNCQUFzQixrQkFBa0IsV0FBVyw0QkFBNEIsbUJBQW1CLEdBQUcsZ0JBQWdCLHVCQUF1QixzQkFBc0IsR0FBRyx3RUFBd0UscUJBQXFCLEdBQUcsYUFBYSxrQkFBa0IsR0FBRyxVQUFVLG1DQUFtQyxHQUFHLGVBQWUsbUNBQW1DLEdBQUcsdUJBQXVCLHNCQUFzQixnQkFBZ0Isa0JBQWtCLHdCQUF3QiwyQkFBMkIsa0JBQWtCLGNBQWMsR0FBRyxxQkFBcUIsa0JBQWtCLGNBQWMsaUJBQWlCLGlCQUFpQixvQkFBb0IsMEJBQTBCLEdBQUcscUJBQXFCLHFCQUFxQixHQUFHLHlFQUF5RSxpQkFBaUIsR0FBRyxpQkFBaUIsaUJBQWlCLEdBQUcsZUFBZSxpQkFBaUIsR0FBRyw2QkFBNkIsaUJBQWlCLEdBQUcsZUFBZSxnQkFBZ0IsR0FBRyxlQUFlLG1DQUFtQyxHQUFHLHFCQUFxQiw4Q0FBOEMsR0FBRyxnQ0FBZ0MsaUNBQWlDLEdBQUcsbUJBQW1CLGlCQUFpQixrQkFBa0Isb0JBQW9CLHdCQUF3QixpQ0FBaUMsaUJBQWlCLEdBQUcsdUJBQXVCLG1DQUFtQyxvQkFBb0IsR0FBRyxTQUFTLG1GQUFtRixZQUFZLFdBQVcsWUFBWSxXQUFXLEtBQUssTUFBTSxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxPQUFPLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxXQUFXLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxZQUFZLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxTQUFTLFVBQVUsTUFBTSxLQUFLLFVBQVUsS0FBSyxLQUFLLFVBQVUsS0FBSyxNQUFNLFVBQVUsS0FBSyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLEtBQUssS0FBSyxZQUFZLFdBQVcsNkJBQTZCLDhDQUE4QyxjQUFjLDJCQUEyQixlQUFlLEdBQUcsZUFBZSxnQkFBZ0IsaUJBQWlCLEdBQUcsVUFBVSxtQ0FBbUMsa0JBQWtCLGtDQUFrQyxtQ0FBbUMsd0VBQXdFLFdBQVcsR0FBRyxZQUFZLHFCQUFxQixHQUFHLGVBQWUsd0JBQXdCLEdBQUcsdUJBQXVCLGlCQUFpQixrQkFBa0Isd0JBQXdCLDJCQUEyQixjQUFjLGtCQUFrQiw4Q0FBOEMsR0FBRyxtQkFBbUIsb0JBQW9CLEdBQUcsV0FBVyxpQkFBaUIsZ0JBQWdCLGdDQUFnQyxHQUFHLHNCQUFzQixpQkFBaUIsa0JBQWtCLHNCQUFzQixrQkFBa0IsV0FBVyw0QkFBNEIsbUJBQW1CLEdBQUcsZ0JBQWdCLHVCQUF1QixzQkFBc0IsR0FBRyx3RUFBd0UscUJBQXFCLEdBQUcsYUFBYSxrQkFBa0IsR0FBRyxVQUFVLG1DQUFtQyxHQUFHLGVBQWUsbUNBQW1DLEdBQUcsdUJBQXVCLHNCQUFzQixnQkFBZ0Isa0JBQWtCLHdCQUF3QiwyQkFBMkIsa0JBQWtCLGNBQWMsR0FBRyxxQkFBcUIsa0JBQWtCLGNBQWMsaUJBQWlCLGlCQUFpQixvQkFBb0IsMEJBQTBCLEdBQUcscUJBQXFCLHFCQUFxQixHQUFHLHlFQUF5RSxpQkFBaUIsR0FBRyxpQkFBaUIsaUJBQWlCLEdBQUcsZUFBZSxpQkFBaUIsR0FBRyw2QkFBNkIsaUJBQWlCLEdBQUcsZUFBZSxnQkFBZ0IsR0FBRyxlQUFlLG1DQUFtQyxHQUFHLHFCQUFxQiw4Q0FBOEMsR0FBRyxnQ0FBZ0MsaUNBQWlDLEdBQUcsbUJBQW1CLGlCQUFpQixrQkFBa0Isb0JBQW9CLHdCQUF3QixpQ0FBaUMsaUJBQWlCLEdBQUcsdUJBQXVCLG1DQUFtQyxvQkFBb0IsR0FBRyxxQkFBcUI7QUFDN2xMO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscURBQXFEO0FBQ3JEOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hEOztBQUVBO0FBQ0EscUZBQXFGO0FBQ3JGOztBQUVBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0EsS0FBSztBQUNMLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixxQkFBcUI7QUFDMUM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDckdhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksNkZBQWMsR0FBRyw2RkFBYyxZQUFZLEVBQUM7Ozs7Ozs7Ozs7O0FDMUJoRTs7QUFFYjs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDdkdhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05BO0FBQ0E7QUFDQTtDQUdBOztBQUNBLElBQU1DLFNBQVMsR0FBR0MsUUFBUSxDQUFDOUMsZ0JBQVQsQ0FBMEIsa0JBQTFCLENBQWxCOztBQUNBLGdDQUFrQzZDLFNBQWxDO0FBQUEsSUFBT0UsU0FBUDtBQUFBLElBQWtCQyxZQUFsQjs7QUFDQSxJQUFNQyxhQUFhLEdBQUdILFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixpQkFBdkIsQ0FBdEI7QUFDQSxJQUFNQyxTQUFTLEdBQUdMLFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixlQUF2QixDQUFsQjtBQUVBLElBQU1FLFFBQVEsR0FBR04sUUFBUSxDQUFDTyxhQUFULENBQXVCLEtBQXZCLENBQWpCO0FBQ0FELFFBQVEsQ0FBQzNELFNBQVQsQ0FBbUJDLEdBQW5CLENBQXVCLFdBQXZCO0FBRUEsSUFBSTRELGNBQWMsR0FBRyxJQUFJMUcsaURBQUosRUFBckI7QUFDQSxJQUFJMkcsaUJBQWlCLEdBQUcsSUFBSTNHLGlEQUFKLEVBQXhCO0FBQ0EsSUFBSTRHLEtBQUssR0FBRyxJQUFJOUIsMkNBQUosQ0FBVyxJQUFYLEVBQWlCNEIsY0FBakIsQ0FBWjtBQUNBLElBQUlHLFFBQVEsR0FBRyxJQUFJL0IsMkNBQUosQ0FBVyxLQUFYLEVBQWtCNkIsaUJBQWxCLENBQWY7QUFDQSxJQUFJRyxPQUFPLEdBQUcsS0FBZDtBQUVBLElBQUlDLFNBQVMsR0FBRyxJQUFoQjtBQUNBLElBQUlDLGNBQWMsR0FBRyxLQUFyQjtBQUNBLElBQUlDLFVBQUo7QUFDQSxJQUFJbEQsU0FBUyxHQUFHLEtBQWhCO0FBQ0EsSUFBSW1ELGNBQWMsR0FBRyxLQUFyQjtBQUNBLElBQUlDLFdBQVcsR0FBRztBQUNoQkMsRUFBQUEsQ0FBQyxFQUFFLENBRGE7QUFFaEJDLEVBQUFBLENBQUMsRUFBRSxDQUZhO0FBR2hCQyxFQUFBQSxDQUFDLEVBQUUsQ0FIYTtBQUloQkMsRUFBQUEsQ0FBQyxFQUFFLENBSmE7QUFLaEJDLEVBQUFBLENBQUMsRUFBRTtBQUxhLENBQWxCO0FBT0EsSUFBSUMsYUFBYSxHQUFHLEVBQXBCLEVBRUE7O0FBQ0EsU0FBU0MsaUJBQVQsQ0FBMkJwSCxJQUEzQixFQUFpQztBQUMvQkEsRUFBQUEsSUFBSSxDQUFDOEMsZ0JBQUwsQ0FBc0IsWUFBdEIsRUFBb0NaLE9BQXBDLENBQTRDLFVBQUNtRixJQUFELEVBQVU7QUFDcERBLElBQUFBLElBQUksQ0FBQ0MsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsWUFBWTtBQUN6QyxVQUFJZCxPQUFKLEVBQWE7QUFDWCxZQUFJckUsTUFBTSxHQUFHb0YsS0FBSyxDQUFDQyxTQUFOLENBQWdCM0UsT0FBaEIsQ0FBd0I0RSxJQUF4QixDQUE2QnpILElBQUksQ0FBQ3NDLFFBQWxDLEVBQTRDK0UsSUFBNUMsQ0FBYjtBQUNBSyxRQUFBQSxVQUFVLENBQUMxSCxJQUFELEVBQU9tQyxNQUFQLENBQVY7QUFDRDtBQUNGLEtBTEQ7QUFNRCxHQVBEO0FBUUQ7O0FBRUQsU0FBU3dGLGNBQVQsQ0FBd0J0QyxNQUF4QixFQUFnQ2xELE1BQWhDLEVBQXdDeUYsU0FBeEMsRUFBbUQ7QUFDakQsT0FBSyxJQUFJaEcsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lGLFdBQVcsQ0FBQ3hCLE1BQUQsQ0FBL0IsRUFBeUN6RCxDQUFDLEVBQTFDLEVBQThDO0FBQzVDLFFBQUlpRyxhQUFhLEdBQUduSSx3RUFBQSxDQUFpQ3lDLE1BQWpDLEVBQXlDLEVBQXpDLENBQXBCO0FBQ0EsUUFBSTZDLFFBQVEsR0FBR3RGLCtEQUFBLENBQXdCbUksYUFBeEIsRUFBdUNwRSxTQUF2QyxFQUFrRDdCLENBQWxELENBQWYsQ0FGNEMsQ0FHNUM7O0FBQ0EsUUFBSW9ELFFBQUosRUFBYztBQUNaLFVBQUksQ0FBQ29CLGNBQWMsQ0FBQ3RGLGtCQUFmLENBQWtDa0UsUUFBbEMsQ0FBTCxFQUFrRDtBQUNoREEsUUFBQUEsUUFBUSxHQUFHLEtBQVg7QUFDRDtBQUNGOztBQUNELFFBQUlBLFFBQUosRUFBYztBQUNaNEMsTUFBQUEsU0FBUyxDQUFDbEksd0VBQUEsQ0FBaUNzRixRQUFqQyxFQUEyQyxFQUEzQyxDQUFELENBQVQsQ0FBMER6QyxTQUExRCxDQUFvRUMsR0FBcEUsQ0FDRSxVQURGO0FBR0QsS0FKRCxNQUlPO0FBQ0xvRSxNQUFBQSxjQUFjLEdBQUcsS0FBakIsQ0FESyxDQUVMOztBQUNBLFdBQUssSUFBSWhGLEdBQUMsR0FBRyxDQUFiLEVBQWdCQSxHQUFDLEdBQUdpRixXQUFXLENBQUNGLFVBQUQsQ0FBL0IsRUFBNkMvRSxHQUFDLEVBQTlDLEVBQWtEO0FBQ2hELFlBQUlpRyxjQUFhLEdBQUduSSx3RUFBQSxDQUFpQ3lDLE1BQWpDLEVBQXlDLEVBQXpDLENBQXBCOztBQUNBLFlBQUk2QyxTQUFRLEdBQUd0RiwrREFBQSxDQUF3Qm1JLGNBQXhCLEVBQXVDcEUsU0FBdkMsRUFBa0Q3QixHQUFsRCxDQUFmOztBQUNBLFlBQUlvRCxTQUFKLEVBQWM7QUFDWjRDLFVBQUFBLFNBQVMsQ0FDUGxJLHdFQUFBLENBQWlDc0YsU0FBakMsRUFBMkMsRUFBM0MsQ0FETyxDQUFULENBRUV6QyxTQUZGLENBRVlDLEdBRlosQ0FFZ0Isa0JBRmhCO0FBR0Q7QUFDRjtBQUNGO0FBQ0Y7QUFDRjs7QUFFRCxTQUFTd0YsaUJBQVQsQ0FBMkJoSSxJQUEzQixFQUFpQztBQUFBLDZCQUN0Qm1DLE1BRHNCO0FBRTdCLFFBQUl5RixTQUFTLEdBQUc1SCxJQUFJLENBQUM4QyxnQkFBTCxDQUFzQixZQUF0QixDQUFoQjtBQUNBLFFBQUlDLElBQUksR0FBRzZFLFNBQVMsQ0FBQ3pGLE1BQUQsQ0FBcEIsQ0FINkIsQ0FJN0I7O0FBQ0FZLElBQUFBLElBQUksQ0FBQ3VFLGdCQUFMLENBQXNCLFdBQXRCLEVBQW1DLFlBQU07QUFDdkMsVUFBSWIsU0FBUyxJQUFJQyxjQUFqQixFQUFpQztBQUMvQkUsUUFBQUEsY0FBYyxHQUFHLElBQWpCO0FBQ0FlLFFBQUFBLGNBQWMsQ0FBQ2hCLFVBQUQsRUFBYXhFLE1BQWIsRUFBcUJ5RixTQUFyQixDQUFkO0FBQ0Q7QUFDRixLQUxELEVBTDZCLENBWTdCOztBQUNBN0UsSUFBQUEsSUFBSSxDQUFDdUUsZ0JBQUwsQ0FBc0IsVUFBdEIsRUFBa0MsWUFBTTtBQUN0QyxVQUFJYixTQUFTLElBQUlDLGNBQWpCLEVBQWlDO0FBQy9CRSxRQUFBQSxjQUFjLEdBQUcsS0FBakI7O0FBRUEsYUFBSyxJQUFJaEYsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lGLFdBQVcsQ0FBQ0YsVUFBRCxDQUEvQixFQUE2Qy9FLENBQUMsRUFBOUMsRUFBa0Q7QUFDaEQsY0FBSWlHLGFBQWEsR0FBR25JLHdFQUFBLENBQWlDeUMsTUFBakMsRUFBeUMsRUFBekMsQ0FBcEI7QUFDQSxjQUFJNkMsUUFBUSxHQUFHdEYsK0RBQUEsQ0FBd0JtSSxhQUF4QixFQUF1Q3BFLFNBQXZDLEVBQWtEN0IsQ0FBbEQsQ0FBZjs7QUFDQSxjQUFJb0QsUUFBSixFQUFjO0FBQ1o0QyxZQUFBQSxTQUFTLENBQ1BsSSx3RUFBQSxDQUFpQ3NGLFFBQWpDLEVBQTJDLEVBQTNDLENBRE8sQ0FBVCxDQUVFekMsU0FGRixDQUVZVSxNQUZaLENBRW1CLFVBRm5CLEVBRStCLGtCQUYvQjtBQUdEO0FBQ0Y7QUFDRjtBQUNGLEtBZEQsRUFiNkIsQ0E0QjdCOztBQUNBRixJQUFBQSxJQUFJLENBQUN1RSxnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFNO0FBQ25DLFVBQUksQ0FBQ1osY0FBRCxJQUFtQkQsU0FBdkIsRUFBa0M7QUFDaEMsWUFBSXdCLFlBQUo7QUFDQSxZQUFJakQsUUFBUSxHQUFHdEYsd0VBQUEsQ0FBaUN5QyxNQUFqQyxFQUF5QyxFQUF6QyxDQUFmOztBQUZnQyxtREFHZmlFLGNBQWMsQ0FBQ3hHLEtBSEE7QUFBQTs7QUFBQTtBQUdoQyw4REFBdUM7QUFBQSxnQkFBOUJDLElBQThCOztBQUNyQyxnQkFBSUEsSUFBSSxDQUFDTyxTQUFMLENBQWV1QixRQUFmLENBQXdCcUQsUUFBeEIsQ0FBSixFQUF1QztBQUNyQ2lELGNBQUFBLFlBQVksR0FBR3BJLElBQWY7QUFDQTtBQUNEO0FBQ0Y7QUFSK0I7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFVaEMsWUFBSW9JLFlBQUosRUFBa0I7QUFDaEIsY0FBSUMsV0FBVyxHQUFHbkMsYUFBYSxDQUFDQyxhQUFkLENBQ2hCLGVBQWVpQyxZQUFZLENBQUN0RixFQURaLENBQWxCOztBQURnQixzREFJUXNGLFlBQVksQ0FBQzdILFNBSnJCO0FBQUE7O0FBQUE7QUFJaEIsbUVBQWdEO0FBQUEsa0JBQXZDK0gsV0FBdUM7QUFDOUMsa0JBQUlDLFNBQVMsR0FBRzFJLHdFQUFBLENBQWlDeUksV0FBakMsRUFBOEMsRUFBOUMsQ0FBaEI7QUFDQVAsY0FBQUEsU0FBUyxDQUFDUSxTQUFELENBQVQsQ0FBcUI3RixTQUFyQixDQUErQlUsTUFBL0IsQ0FBc0MsVUFBdEM7QUFDRDtBQVBlO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBUWhCbUQsVUFBQUEsY0FBYyxDQUFDaUMsVUFBZixDQUEwQnJJLElBQTFCLEVBQWdDaUksWUFBWSxDQUFDdEYsRUFBN0M7QUFDQXdFLFVBQUFBLGFBQWEsQ0FBQ3ZFLE1BQWQsQ0FBcUJ1RSxhQUFhLENBQUN0RSxPQUFkLENBQXNCb0YsWUFBWSxDQUFDdEYsRUFBbkMsQ0FBckIsRUFBNkQsQ0FBN0Q7QUFDQTJGLFVBQUFBLFVBQVUsQ0FDUkosV0FEUSxFQUVSbkMsYUFBYSxDQUFDakQsZ0JBQWQsQ0FBK0IsaUJBQS9CLENBRlEsQ0FBVjtBQUlBb0YsVUFBQUEsV0FBVyxDQUFDM0YsU0FBWixDQUFzQlUsTUFBdEIsQ0FBNkIsWUFBN0I7QUFDQTBFLFVBQUFBLGNBQWMsQ0FBQ00sWUFBWSxDQUFDdEYsRUFBZCxFQUFrQlIsTUFBbEIsRUFBMEJ5RixTQUExQixDQUFkO0FBQ0EzQixVQUFBQSxTQUFTLENBQUNzQyxXQUFWLEdBQXdCLFFBQXhCO0FBQ0Q7QUFDRjtBQUNGLEtBOUJELEVBN0I2QixDQTZEN0I7O0FBQ0F4RixJQUFBQSxJQUFJLENBQUN1RSxnQkFBTCxDQUFzQixPQUF0QixFQUErQixZQUFNO0FBQ25DLFVBQUlaLGNBQWMsSUFBSUQsU0FBbEIsSUFBK0JHLGNBQW5DLEVBQW1EO0FBQ2pELFlBQUl4RyxTQUFTLEdBQUcsRUFBaEI7QUFDQSxZQUFJOEgsV0FBVyxHQUFHbkMsYUFBYSxDQUFDQyxhQUFkLENBQ2hCLGVBQWVXLFVBREMsQ0FBbEI7O0FBR0EsYUFBSyxJQUFJL0UsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2lGLFdBQVcsQ0FBQ0YsVUFBRCxDQUEvQixFQUE2Qy9FLENBQUMsRUFBOUMsRUFBa0Q7QUFDaEQsY0FBSWlHLGFBQWEsR0FBR25JLHdFQUFBLENBQWlDeUMsTUFBakMsRUFBeUMsRUFBekMsQ0FBcEI7QUFDQSxjQUFJNkMsUUFBUSxHQUFHdEYsK0RBQUEsQ0FBd0JtSSxhQUF4QixFQUF1Q3BFLFNBQXZDLEVBQWtEN0IsQ0FBbEQsQ0FBZjtBQUNBeEIsVUFBQUEsU0FBUyxDQUFDTCxJQUFWLENBQWVpRixRQUFmO0FBQ0Q7O0FBQ0QsWUFBSW5GLElBQUksR0FBRyxJQUFJMEUsdUNBQUosQ0FBU25FLFNBQVQsRUFBb0J1RyxVQUFwQixDQUFYO0FBQ0FQLFFBQUFBLGNBQWMsQ0FBQzdDLEtBQWYsQ0FBcUJ2RCxJQUFyQixFQUEyQkgsSUFBM0I7QUFDQXNILFFBQUFBLGFBQWEsQ0FBQ3BILElBQWQsQ0FBbUI0RyxVQUFuQixFQVppRCxDQWFqRDs7QUFDQTZCLFFBQUFBLFlBQVksQ0FBQ04sV0FBRCxDQUFaO0FBQ0FBLFFBQUFBLFdBQVcsQ0FBQzNGLFNBQVosQ0FBc0JDLEdBQXRCLENBQTBCLFlBQTFCOztBQUNBLFlBQUkyRSxhQUFhLENBQUN0RixNQUFkLElBQXdCLENBQTVCLEVBQStCO0FBQzdCb0UsVUFBQUEsU0FBUyxDQUFDc0MsV0FBVixHQUF3QixPQUF4QjtBQUNEO0FBQ0Y7QUFDRixLQXJCRDtBQTlENkI7O0FBQy9CLE9BQUssSUFBSXBHLE1BQU0sR0FBRyxDQUFsQixFQUFxQkEsTUFBTSxHQUFHLEdBQTlCLEVBQW1DQSxNQUFNLEVBQXpDLEVBQTZDO0FBQUEsVUFBcENBLE1BQW9DO0FBbUY1QztBQUNGOztBQUVEOEQsU0FBUyxDQUFDcUIsZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0MsWUFBWTtBQUM5QyxNQUFJckIsU0FBUyxDQUFDc0MsV0FBVixLQUEwQixPQUE5QixFQUF1QztBQUNyQ0UsSUFBQUEsU0FBUztBQUNWLEdBRkQsTUFFTyxJQUFJeEMsU0FBUyxDQUFDc0MsV0FBVixLQUEwQixRQUE5QixFQUF3QztBQUM3Q0csSUFBQUEsTUFBTSxDQUFDM0MsYUFBRCxFQUFnQixpQkFBaEIsQ0FBTjtBQUNELEdBRk0sTUFFQSxJQUFJRSxTQUFTLENBQUNzQyxXQUFWLEtBQTBCLE9BQTlCLEVBQXVDO0FBQzVDSSxJQUFBQSxLQUFLO0FBQ0wxQyxJQUFBQSxTQUFTLENBQUNzQyxXQUFWLEdBQXdCLFFBQXhCO0FBQ0Q7QUFDRixDQVREO0FBV0F4QyxhQUFhLENBQUN1QixnQkFBZCxDQUErQixPQUEvQixFQUF3QyxZQUFZO0FBQ2xELE1BQUliLFNBQVMsSUFBSUMsY0FBakIsRUFBaUM7QUFDL0I4QixJQUFBQSxZQUFZLENBQUN6QyxhQUFhLENBQUNDLGFBQWQsQ0FBNEIsZUFBZVcsVUFBM0MsQ0FBRCxDQUFaO0FBQ0Q7QUFDRixDQUpEO0FBTUFaLGFBQWEsQ0FBQ2pELGdCQUFkLENBQStCLGlCQUEvQixFQUFrRFosT0FBbEQsQ0FBMEQsVUFBQ3JDLElBQUQsRUFBVTtBQUNsRUEsRUFBQUEsSUFBSSxDQUFDeUgsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBQ3NCLENBQUQsRUFBTztBQUNwQyxRQUFJakcsRUFBRSxHQUFHOUMsSUFBSSxDQUFDOEMsRUFBTCxDQUFRSyxTQUFSLENBQWtCbkQsSUFBSSxDQUFDOEMsRUFBTCxDQUFRZCxNQUFSLEdBQWlCLENBQW5DLENBQVQ7O0FBQ0EsUUFBSTRFLFNBQVMsSUFBSSxDQUFDVSxhQUFhLENBQUN4RixRQUFkLENBQXVCZ0IsRUFBdkIsQ0FBbEIsRUFBOEM7QUFDNUMsVUFBSWdFLFVBQVUsS0FBS2hFLEVBQW5CLEVBQXVCO0FBQ3JCMkYsUUFBQUEsVUFBVSxDQUFDekksSUFBRCxFQUFPa0csYUFBYSxDQUFDakQsZ0JBQWQsQ0FBK0IsaUJBQS9CLENBQVAsQ0FBVjtBQUNELE9BRkQsTUFFTztBQUNMMEYsUUFBQUEsWUFBWSxDQUFDM0ksSUFBRCxDQUFaO0FBQ0Q7O0FBQ0QrSSxNQUFBQSxDQUFDLENBQUNDLGVBQUY7QUFDRDtBQUNGLEdBVkQ7QUFXRCxDQVpELEdBY0E7O0FBQ0EsU0FBU0MsWUFBVCxHQUF3QjtBQUN0Qm5ELEVBQUFBLFNBQVMsQ0FBQ3pELE9BQVYsQ0FBa0IsVUFBQzZHLFFBQUQsRUFBYztBQUM5QkEsSUFBQUEsUUFBUSxDQUFDQyxLQUFULENBQWUsb0JBQWY7QUFDQUQsSUFBQUEsUUFBUSxDQUFDQyxLQUFULENBQWUsdUJBQWYsdUJBRjhCLENBRzlCOztBQUNBQyxJQUFBQSxlQUFlLENBQUMsRUFBRCxFQUFLLEVBQUwsRUFBU0YsUUFBVCxFQUFtQjdDLFFBQW5CLENBQWY7QUFDRCxHQUxELEVBRHNCLENBT3RCO0FBQ0E7O0FBQ0FrQixFQUFBQSxpQkFBaUIsQ0FBQ3RCLFlBQUQsQ0FBakI7QUFDQWtDLEVBQUFBLGlCQUFpQixDQUFDbkMsU0FBRCxDQUFqQjtBQUNELEVBRUQ7QUFDQTs7O0FBQ0EsU0FBU29ELGVBQVQsQ0FBeUJDLElBQXpCLEVBQStCbkYsSUFBL0IsRUFBcUMvRCxJQUFyQyxFQUEyQytDLElBQTNDLEVBQWlEO0FBQy9DLE9BQUssSUFBSW5CLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdzSCxJQUFJLEdBQUduRixJQUEzQixFQUFpQ25DLENBQUMsRUFBbEMsRUFBc0M7QUFDcEM1QixJQUFBQSxJQUFJLENBQUNtSixXQUFMLENBQWlCcEcsSUFBSSxDQUFDcUcsU0FBTCxDQUFlLElBQWYsQ0FBakI7QUFDRDtBQUNGLEVBRUQ7OztBQUNBLFNBQVMxQixVQUFULENBQW9CMUgsSUFBcEIsRUFBMEJtQyxNQUExQixFQUFrQztBQUNoQyxNQUNFMkQsWUFBWSxDQUNUaEQsZ0JBREgsQ0FDb0IsWUFEcEIsRUFFR1gsTUFGSCxFQUVXSSxTQUZYLENBRXFCK0IsUUFGckIsQ0FFOEIsS0FGOUIsQ0FERixFQUlFO0FBQ0E7QUFDRDs7QUFDRDVFLEVBQUFBLHlEQUFBLENBQWtCTSxJQUFsQixFQUF3Qm1DLE1BQXhCO0FBQ0FtRSxFQUFBQSxLQUFLLENBQUNnRCxNQUFOLENBQWEvQyxRQUFiLEVBQXVCN0csd0VBQUEsQ0FBaUN5QyxNQUFqQyxFQUF5QyxFQUF6QyxDQUF2QixFQVRnQyxDQVVoQzs7QUFDQSxNQUFJb0gsUUFBUSxFQUFaLEVBQWdCO0FBQ2Q7QUFDQS9DLElBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0E7QUFDRDs7QUFDRGdELEVBQUFBLGFBQWE7QUFDZCxFQUVEOzs7QUFDQSxTQUFTQSxhQUFULEdBQXlCO0FBQ3ZCLE1BQUlDLGNBQWMsR0FBR2xELFFBQVEsQ0FBQytDLE1BQVQsQ0FBZ0JoRCxLQUFoQixDQUFyQjtBQUNBLE1BQUkzQyxRQUFRLEdBQUdqRSw2REFBQSxDQUFzQitKLGNBQXRCLENBQWY7QUFDQSxNQUFJN0YsUUFBUSxHQUFHbEUsNkRBQUEsQ0FBc0IrSixjQUF0QixDQUFmO0FBQ0EsTUFBSXRILE1BQU0sR0FBR3pDLDREQUFBLENBQXFCLEVBQXJCLEVBQXlCaUUsUUFBekIsRUFBbUNDLFFBQW5DLENBQWI7QUFDQWxFLEVBQUFBLHlEQUFBLENBQWtCbUcsU0FBbEIsRUFBNkIxRCxNQUE3Qjs7QUFDQSxNQUFJb0gsUUFBUSxFQUFaLEVBQWdCO0FBQ2Q7QUFDQS9DLElBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0E7QUFDRDtBQUNGOztBQUVELFNBQVMrQyxRQUFULEdBQW9CO0FBQ2xCLE1BQUluRCxjQUFjLENBQUNzRCxPQUFmLEVBQUosRUFBOEI7QUFDNUJDLElBQUFBLFVBQVUsQ0FBQyxVQUFELENBQVY7QUFDQW5ELElBQUFBLE9BQU8sR0FBRyxLQUFWO0FBQ0EsV0FBTyxJQUFQO0FBQ0QsR0FKRCxNQUlPLElBQUlILGlCQUFpQixDQUFDcUQsT0FBbEIsRUFBSixFQUFpQztBQUN0Q0MsSUFBQUEsVUFBVSxDQUFDLE9BQUQsQ0FBVjtBQUNBbkQsSUFBQUEsT0FBTyxHQUFHLEtBQVY7QUFDQSxXQUFPLElBQVA7QUFDRDs7QUFDRCxTQUFPLEtBQVA7QUFDRDs7QUFFRCxTQUFTbUQsVUFBVCxDQUFvQkMsTUFBcEIsRUFBNEI7QUFDMUI7QUFDQUMsRUFBQUEsS0FBSyxDQUFDRCxNQUFNLEdBQUcsTUFBVixDQUFMO0FBQ0QsRUFFRDs7O0FBQ0EsU0FBU2pCLEtBQVQsR0FBaUIsQ0FBRSxFQUVuQjtBQUNBOzs7QUFDQSxTQUFTRCxNQUFULENBQWdCb0IsTUFBaEIsRUFBd0JDLFlBQXhCLEVBQXNDO0FBQ3BDO0FBQ0EsVUFBUXRHLFNBQVI7QUFDRSxTQUFLLEtBQUw7QUFDRUEsTUFBQUEsU0FBUyxHQUFHLEtBQVo7QUFDQTs7QUFDRixTQUFLLEtBQUw7QUFDRUEsTUFBQUEsU0FBUyxHQUFHLEtBQVo7QUFDQTtBQU5KLEdBRm9DLENBV3BDOzs7QUFDQXFHLEVBQUFBLE1BQU0sQ0FBQ2hILGdCQUFQLENBQXdCaUgsWUFBeEIsRUFBc0M3SCxPQUF0QyxDQUE4QyxVQUFDckMsSUFBRCxFQUFVO0FBQ3RELFFBQUltSyxLQUFLLEdBQUduSyxJQUFJLENBQUNvSyxXQUFqQjtBQUNBLFFBQUlDLE1BQU0sR0FBR3JLLElBQUksQ0FBQ3NLLFlBQWxCO0FBQ0F0SyxJQUFBQSxJQUFJLENBQUNtSixLQUFMLENBQVdnQixLQUFYLEdBQW1CdEgsTUFBTSxDQUFDd0gsTUFBRCxDQUFOLEdBQWlCLElBQXBDO0FBQ0FySyxJQUFBQSxJQUFJLENBQUNtSixLQUFMLENBQVdrQixNQUFYLEdBQW9CeEgsTUFBTSxDQUFDc0gsS0FBRCxDQUFOLEdBQWdCLElBQXBDO0FBQ0QsR0FMRDtBQU1EOztBQUVELFNBQVMxQixVQUFULENBQW9COEIsbUJBQXBCLEVBQXlDQyxZQUF6QyxFQUF1RDtBQUNyRDtBQUNBQSxFQUFBQSxZQUFZLENBQUNuSSxPQUFiLENBQXFCLFVBQUNyQyxJQUFELEVBQVU7QUFDN0IySSxJQUFBQSxZQUFZLENBQUMzSSxJQUFELENBQVo7QUFDRCxHQUZEO0FBSUEsTUFBSXdGLE1BQU0sR0FBRytFLG1CQUFtQixDQUFDekgsRUFBcEIsQ0FBdUJLLFNBQXZCLENBQ1hvSCxtQkFBbUIsQ0FBQ3pILEVBQXBCLENBQXVCZCxNQUF2QixHQUFnQyxDQURyQixDQUFiO0FBSUE2RSxFQUFBQSxjQUFjLEdBQUcsSUFBakI7QUFDQUMsRUFBQUEsVUFBVSxHQUFHdEIsTUFBYjtBQUNBdUIsRUFBQUEsY0FBYyxHQUFHLEtBQWpCLENBWnFELENBY3JEOztBQUNBd0QsRUFBQUEsbUJBQW1CLENBQUNwQixLQUFwQixDQUEwQnNCLE1BQTFCLEdBQW1DLGVBQW5DO0FBQ0Q7O0FBRUQsU0FBUzlCLFlBQVQsQ0FBc0IzSSxJQUF0QixFQUE0QjtBQUMxQjZHLEVBQUFBLGNBQWMsR0FBRyxLQUFqQjtBQUNBQyxFQUFBQSxVQUFVLEdBQUcsRUFBYjtBQUNBQyxFQUFBQSxjQUFjLEdBQUcsS0FBakIsQ0FIMEIsQ0FLMUI7O0FBQ0EvRyxFQUFBQSxJQUFJLENBQUNtSixLQUFMLENBQVdzQixNQUFYLEdBQW9CLE1BQXBCO0FBQ0Q7O0FBRUQsU0FBUzdCLFNBQVQsR0FBcUI7QUFDbkJqQyxFQUFBQSxPQUFPLEdBQUcsSUFBVjtBQUNBQyxFQUFBQSxTQUFTLEdBQUcsS0FBWjtBQUNBUixFQUFBQSxTQUFTLENBQUNzQyxXQUFWLEdBQXdCLE9BQXhCO0FBQ0FsQyxFQUFBQSxpQkFBaUIsQ0FBQ2tFLG1CQUFsQixDQUFzQ2hFLFFBQXRDLEVBQWdEVCxZQUFoRDtBQUNELEVBRUQ7OztBQUNBLFNBQVMwRSxpQkFBVCxHQUE2QixDQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Q7O0FBRUQxQixZQUFZO0FBQ1owQixpQkFBaUIsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3N0eWxlcy9zdHlsZS5jc3M/YTJmNSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMTB4MTAgeDpBLUogeTogMS0xMFxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBwbGFjZUxvZ2ljYWxseShzaGlwKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihzaGlwKSkge1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHBsYWNlKGdyaWQsIHNoaXApIHtcbiAgICBpZiAodGhpcy5wbGFjZUxvZ2ljYWxseShzaGlwKSkge1xuICAgICAgdGhpcy5wbGFjZUluR3JpZChncmlkLCBzaGlwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgZ2V0Um93VmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKDAsIHBvcy5pbmRleE9mKFwiOlwiKSkpO1xuICB9XG5cbiAgc3RhdGljIGdldENvbFZhbHVlKHBvcykge1xuICAgIHJldHVybiBOdW1iZXIocG9zLnN1YnN0cmluZyhwb3MuaW5kZXhPZihcIjpcIikgKyAxKSk7XG4gIH1cblxuICBfbWluUm93VmFsdWUoc2hpcCkge1xuICAgIGxldCBtaW5pbXVtID0gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpIDwgc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICAgIHJldHVybiBtaW5pbXVtO1xuICB9XG4gIF9taW5Db2xWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKSA8IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIEluZmluaXR5KTtcbiAgfVxuICBfbWF4Um93VmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcykgPiBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCAtSW5maW5pdHkpO1xuICB9XG4gIF9tYXhDb2xWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKSA+IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIC1JbmZpbml0eSk7XG4gIH1cblxuICAvLyBkaXJlY3Rpb24gPSBcInJvd1wiIC8gXCJjb2xcIlxuICAvLyBwb3MgPSBcInJvdzpjb2xcIlxuICBzdGF0aWMgYWRkVG9Qb3NpdGlvbihwb3MsIGRpcmVjdGlvbiwgdmFsKSB7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gXCJyb3dcIikge1xuICAgICAgLy8gZ2V0dGluZyBmaXJzdCBudW1iZXJcbiAgICAgIGxldCByb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpO1xuICAgICAgbGV0IG5ld1Jvd1ZhbHVlID0gcm93VmFsdWUgKyB2YWw7XG4gICAgICAvLyBtYWtpbmcgc3VyZSBpdCBpcyB3aXRoaW4gcmFuZ2VcbiAgICAgIGlmIChuZXdSb3dWYWx1ZSA+IDEwIHx8IG5ld1Jvd1ZhbHVlIDwgMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBjb25jYXRlbmF0aW5nIHRvIGl0IHRoZSByZXN0IG9mIHRoZSBwb3NpdGlvblxuICAgICAgcmV0dXJuIFN0cmluZyhuZXdSb3dWYWx1ZSkgKyBwb3Muc3Vic3RyaW5nKHBvcy5pbmRleE9mKFwiOlwiKSk7XG4gICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IFwiY29sXCIpIHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHJldmVyc2Ugb2YgdGhlIHJvdyBicmFuY2hcbiAgICAgIGxldCBjb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwb3MpO1xuICAgICAgbGV0IG5ld0NvbFZhbHVlID0gY29sVmFsdWUgKyB2YWw7XG4gICAgICBpZiAobmV3Q29sVmFsdWUgPiAxMCB8fCBuZXdDb2xWYWx1ZSA8IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpICsgMSkgKyBTdHJpbmcobmV3Q29sVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSU5WQUxJRCBESVJFQ1RJT04gUEFSQU1FVEVSXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiBzaGlwJ3MgcG9zaXRpb24gaXMgdmFsaWQgYnkgY2hlY2tpbmcgaXQgaXMgbmVhciBvciBvdmVybGFwcGluZyBleGlzdGluZyBzaGlwXG4gIGNoZWNrVmFsaWRTaGlwUG9zaXRpb24obmV3U2hpcCkge1xuICAgIC8vIGdpdmVzIHRydWUgaWYgYSBzaW5nbGUgdmFsdWUgaXMgaW52YWxpZCwgc28gbXVzdCBiZSBpbnZlcnRlZFxuICAgIHJldHVybiAhbmV3U2hpcC5wb3NpdGlvbnMuc29tZSgobmV3UG9zKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuY2hlY2tWYWxpZFBvc2l0aW9uKG5ld1Bvcyk7XG4gICAgfSk7XG4gIH1cblxuICBjaGVja1ZhbGlkUG9zaXRpb24ocG9zKSB7XG4gICAgbGV0IG5ld1Jvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgbGV0IG5ld0NvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG5cbiAgICAvLyBnZXQgbWluICsgbWF4IHZhbHVlIG9mIHJvdyBhbmQgY29sIGZvciBlYWNoIHNoaXAgYW5kIGNoZWNrIGlmIHRoZSBuZXcgcG9zaXRpb24gdmFsdWVzIGFyZSB3aXRoaW4gdGhlbSArLTFcbiAgICAvLyBpZiBhIHNpbmdsZSB2YWx1ZSBpcyBJTlZBTElELCByZXR1cm4gVFJVRVxuICAgIHJldHVybiAhdGhpcy5zaGlwcy5zb21lKChwbGFjZWRTaGlwKSA9PiB7XG4gICAgICBsZXQgbWluUm93VmFsdWUgPSB0aGlzLl9taW5Sb3dWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgIGxldCBtYXhSb3dWYWx1ZSA9IHRoaXMuX21heFJvd1ZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgbGV0IG1pbkNvbFZhbHVlID0gdGhpcy5fbWluQ29sVmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICBsZXQgbWF4Q29sVmFsdWUgPSB0aGlzLl9tYXhDb2xWYWx1ZShwbGFjZWRTaGlwKTtcblxuICAgICAgaWYgKFxuICAgICAgICBuZXdSb3dWYWx1ZSA+PSBtaW5Sb3dWYWx1ZSAtIDEgJiZcbiAgICAgICAgbmV3Um93VmFsdWUgPD0gbWF4Um93VmFsdWUgKyAxICYmXG4gICAgICAgIG5ld0NvbFZhbHVlID49IG1pbkNvbFZhbHVlIC0gMSAmJlxuICAgICAgICBuZXdDb2xWYWx1ZSA8PSBtYXhDb2xWYWx1ZSArIDFcbiAgICAgICkge1xuICAgICAgICAvLyBJTlZBTElEIFRIRVJFRk9SRSBUUlVFXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gd2lsbCBjaGVjayBpZiB2YWxpZCBwb3NpdGlvbiBhbmQgc2VuZCB0aGUgaGl0LCB0aGUgc2hpcCB3aWxsIHRoZW4gY2hlY2sgaWYgaXQgaXMgaGl0XG4gIHJlY2VpdmVBdHRhY2socG9zKSB7XG4gICAgaWYgKCF0aGlzLmhpdFBvc2l0aW9ucy5pbmNsdWRlcyhwb3MpKSB7XG4gICAgICB0aGlzLmhpdFBvc2l0aW9ucy5wdXNoKHBvcyk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuc2hpcHNbaV0uaGl0KHBvcykpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFsbFN1bmsoKSB7XG4gICAgaWYgKHRoaXMuc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkUm93KG5yLCBjb2xzKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IobnIgLyBjb2xzKSArIDE7XG4gIH1cblxuICBzdGF0aWMgZmluZEdyaWRDb2wobnIsIHJvdywgY29scykge1xuICAgIHJldHVybiBuciAtIChyb3cgLSAxKSAqIGNvbHMgKyAxO1xuICB9XG5cbiAgc3RhdGljIGZpbmRQb3NpdGlvbkZyb21HcmlkTnIobnIsIGNvbHMpIHtcbiAgICBsZXQgcm93ID0gR2FtZWJvYXJkLmZpbmRHcmlkUm93KG5yLCBjb2xzKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmZpbmRHcmlkQ29sKG5yLCByb3csIGNvbHMpO1xuICAgIHJldHVybiBTdHJpbmcocm93KSArIFwiOlwiICsgU3RyaW5nKGNvbCk7XG4gIH1cblxuICAvLyByb3cgYW5kIGNvbCBzdGFydGluZyBmcm9tIDFcbiAgc3RhdGljIGZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpIHtcbiAgICByZXR1cm4gY29scyAqIChyb3cgLSAxKSArIChjb2wgLSAxKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZE5yRnJvbVBvc2l0aW9uKHBvcywgY29scykge1xuICAgIGxldCByb3cgPSBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKTtcbiAgICBsZXQgY29sID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyk7XG4gICAgcmV0dXJuIEdhbWVib2FyZC5maW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKTtcbiAgfVxuXG4gIC8vIERPTSBtYW5pcHVsYXRpb25cbiAgLy8gcGxhY2luZyB0aGUgc2hpcCB2aXN1YWxseSBvbiBnaXZlbiBncmlkXG4gIHBsYWNlSW5HcmlkKGdyaWQsIHNoaXApIHtcbiAgICBsZXQgc2hpcExlbmd0aCA9IHNoaXAucG9zaXRpb25zLmxlbmd0aDtcbiAgICBzaGlwLnBvc2l0aW9ucy5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROcihcbiAgICAgICAgMTAsXG4gICAgICAgIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwb3MpLFxuICAgICAgICBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKSxcbiAgICAgICk7XG4gICAgICBsZXQgZ3JpZE5vZGUgPSBncmlkLmNoaWxkcmVuW2dyaWROcl07XG4gICAgICBncmlkTm9kZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgIGdyaWROb2RlLnNldEF0dHJpYnV0ZShcImlkXCIsIFwic2hpcFwiICsgU3RyaW5nKHNoaXAuaWQpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBtYXJrSGl0KGdyaWQsIGdyaWROcikge1xuICAgIGxldCBncmlkTm9kZSA9IGdyaWQuY2hpbGRyZW5bZ3JpZE5yXTtcbiAgICBncmlkTm9kZS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICB9XG5cbiAgc3RhdGljIGNoZWNrSGl0KGdyaWQsIGdyaWROcikge1xuICAgIGlmIChncmlkLmNoaWxkcmVuW2dyaWROcl0uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hpcFwiKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVTaGlwTG9naWNhbGx5KGlkKSB7XG4gICAgdGhpcy5zaGlwcy5zb21lKChzaGlwKSA9PiB7XG4gICAgICBpZiAoc2hpcC5pZCA9PT0gaWQpIHtcbiAgICAgICAgdGhpcy5zaGlwcy5zcGxpY2UodGhpcy5zaGlwcy5pbmRleE9mKHNoaXApLCAxKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVTaGlwRnJvbUdyaWQoZ3JpZCwgaWQpIHtcbiAgICBncmlkLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuZ3JpZC1jZWxsXCIpLmZvckVhY2goKGNlbGwpID0+IHtcbiAgICAgIGlmIChjZWxsLmlkLnN1YnN0cmluZyg0KSA9PT0gaWQpIHtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFwic2hpcFwiKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVTaGlwKGdyaWQsIGlkKSB7XG4gICAgdGhpcy5yZW1vdmVTaGlwTG9naWNhbGx5KGlkKTtcbiAgICB0aGlzLnJlbW92ZVNoaXBGcm9tR3JpZChncmlkLCBpZCk7XG4gIH1cblxuICBnZW5lcmF0ZVJhbmRvbVNoaXBzKHBsYXllciwgZ3JpZCkge1xuICAgIGZvciAobGV0IHNoaXBUeXBlIG9mIFtcbiAgICAgIFtcIkNcIiwgNV0sXG4gICAgICBbXCJCXCIsIDRdLFxuICAgICAgW1wiRFwiLCAzXSxcbiAgICAgIFtcIlNcIiwgM10sXG4gICAgICBbXCJQXCIsIDJdLFxuICAgIF0pIHtcbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGxldCBzaGlwID0gcGxheWVyLnJhbmRvbVNoaXBQb3NpdGlvbihzaGlwVHlwZVsxXSwgc2hpcFR5cGVbMF0pOyAvLyBzaGlwIG9iamVjdCAvIGZhbHNlXG4gICAgICAgIGlmIChzaGlwKSB7XG4gICAgICAgICAgdGhpcy5wbGFjZShncmlkLCBzaGlwKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY2xhc3MgUGxheWVyIHtcbiAgLy8gaXNIdW1hbiA9IHRydWUgLyBmYWxzZVxuICBjb25zdHJ1Y3Rvcihpc0h1bWFuLCBnYW1lYm9hcmQpIHtcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuICB9XG5cbiAgX2h1bWFuQXR0YWNrKG90aGVyUGxheWVyLCBwb3MpIHtcbiAgICBvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICB9XG5cbiAgLy8gcmV0dXJucyBldmVudHVhbCBhdHRhY2tlZCBwb3NpdGlvblxuICBfY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpIHtcbiAgICBkbyB7XG4gICAgICBsZXQgW3JhbmRvbU5yMSwgcmFuZG9tTnIyXSA9IHRoaXMuX3JhbmRvbVBhaXIoKTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IFN0cmluZyhyYW5kb21OcjEpICsgXCI6XCIgKyBTdHJpbmcocmFuZG9tTnIyKTtcbiAgICB9IHdoaWxlICghb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zaXRpb24pKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBfcmFuZG9tUGFpcigpIHtcbiAgICBsZXQgcmFuZG9tTnIxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICBsZXQgcmFuZG9tTnIyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICByZXR1cm4gW3JhbmRvbU5yMSwgcmFuZG9tTnIyXTtcbiAgfVxuXG4gIC8vIHJldHVybnMgdGhlIHBvc2l0aW9uIHRoYXQgd2FzIGF0dGFja2VkXG4gIGF0dGFjayhvdGhlclBsYXllciwgcG9zID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuaXNIdW1hbikge1xuICAgICAgdGhpcy5faHVtYW5BdHRhY2sob3RoZXJQbGF5ZXIsIHBvcyk7XG4gICAgICByZXR1cm4gcG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRoaXMgbWV0aG9kcyByZXF1aXJlcyBib3RoIGdhbWVib2FyZCBhbmQgc2hpcCBjbGFzc2VzXG4gIHJhbmRvbVNoaXBQb3NpdGlvbihzaGlwTGVuZ3RoLCBzaGlwSWQpIHtcbiAgICBsZXQgcG9zaXRpb25zO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHBvc2l0aW9ucyA9IFtdO1xuICAgICAgbGV0IHN0YXJ0UG9zID1cbiAgICAgICAgU3RyaW5nKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpICsgMSkgK1xuICAgICAgICBcIjpcIiArXG4gICAgICAgIFN0cmluZyhNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KSArIDEpO1xuICAgICAgbGV0IGRpcmVjdGlvbiA9IFtcImNvbFwiLCBcInJvd1wiXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICBwb3NpdGlvbnMucHVzaChHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvcywgZGlyZWN0aW9uLCBpKSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZyhwb3NpdGlvbnMpO1xuICAgICAgaWYgKHBvc2l0aW9ucy5zb21lKChwb3MpID0+IHBvcyA9PT0gZmFsc2UpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGxldCBzaGlwID0gbmV3IFNoaXAocG9zaXRpb25zLCBzaGlwSWQpO1xuICAgIGlmICh0aGlzLmdhbWVib2FyZC5jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKHNoaXApKSB7XG4gICAgICByZXR1cm4gc2hpcDtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCB7IFBsYXllciB9O1xuIiwiY2xhc3MgU2hpcCB7XG4gIC8vIHBvc2l0aW9ucyA9IFtcIjE6MVwiLCBcIjE6MlwiICwgXCIxOjNcIl0gXCJyb3c6Y29sXCJcbiAgLy8gaWQgPSBcIkNcIiAvIFwiQlwiIC8gXCJEXCIgLyBcIlNcIiAvIFwiUFwiXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9ucywgaWQpIHtcbiAgICB0aGlzLnNoaXBMZW5ndGggPSBwb3NpdGlvbnMubGVuZ3RoO1xuICAgIHRoaXMucG9zaXRpb25zID0gcG9zaXRpb25zO1xuICAgIHRoaXMuaGl0UG9zaXRpb25zID0gW107XG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XG4gICAgdGhpcy5pZCA9IGlkO1xuICB9XG5cbiAgLy8gZHVwbGljYXRlIHZhbGlkYXRpb24gb2NjdXJzIGluIEdhbWVib2FyZCBvYmplY3RzXG4gIGhpdChwb3NpdGlvbikge1xuICAgIGlmICh0aGlzLnBvc2l0aW9ucy5pbmNsdWRlcyhwb3NpdGlvbikpIHtcbiAgICAgIHRoaXMuaGl0UG9zaXRpb25zLnB1c2gocG9zaXRpb24pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzU3VuaygpIHtcbiAgICBpZiAodGhpcy5oaXRQb3NpdGlvbnMubGVuZ3RoID09PSB0aGlzLnNoaXBMZW5ndGgpIHtcbiAgICAgIHRoaXMuc3VuayA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCB7IFNoaXAgfTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5ib2R5LFxcbmh0bWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTc1LCAxNzUpO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDMwMHB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgXFxcImh1bWFuIGNvbXB1dGVyXFxcIlxcbiAgICBcXFwiYm90dG9tIGJvdHRvbVxcXCI7XFxuICBnYXA6IDA7XFxufVxcblxcbi5odW1hbiB7XFxuICBncmlkLWFyZWE6IGh1bWFuO1xcbn1cXG5cXG4uY29tcHV0ZXIge1xcbiAgZ3JpZC1hcmVhOiBjb21wdXRlcjtcXG59XFxuXFxuLnBsYXllci1jb250YWluZXIge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxufVxcblxcbi8qIENIQU5HRSBUSElTIFRPIEhVTUFOIFRPIEhJREUgQ09NUFVURVIgU0hJUFMgKi9cXG4uZ3JpZC1jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNjcsIDE2NywgMTY3KTtcXG59XFxuXFxuLnNoaXAuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiBib3R0b207XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi5zaGlwLXNlbGVjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuI3NlbGVjdGlvbkMsXFxuI3NlbGVjdGlvbkIsXFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMsXFxuI3NlbGVjdGlvblAge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4jc2VsZWN0aW9uQyB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNzZWxlY3Rpb25CIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG4jc2VsZWN0aW9uUCB7XFxuICB3aWR0aDogODBweDtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMjU1KTtcXG59XFxuLnNlbGVjdGVkLWludmFsaWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgMTU4LCAxNTgpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcC5ncmV5ZWQtb3V0IHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxufVxcblxcbi5tdWx0aS1idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4ubXVsdGktYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxMDgsIDEwOCwgMjU1KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGVzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlDQUF5QztFQUN6QyxTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLFVBQVU7QUFDWjtBQUNBOztFQUVFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsYUFBYTtFQUNiLDZCQUE2QjtFQUM3Qiw4QkFBOEI7RUFDOUI7O21CQUVpQjtFQUNqQixNQUFNO0FBQ1I7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLG1CQUFtQjtFQUNuQixzQkFBc0I7RUFDdEIsU0FBUztFQUNULGFBQWE7RUFDYix5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsTUFBTTtFQUNOLHVCQUF1QjtFQUN2QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLGlCQUFpQjtBQUNuQjs7QUFFQSxnREFBZ0Q7QUFDaEQ7RUFDRSxnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSw4QkFBOEI7QUFDaEM7O0FBRUE7RUFDRSxpQkFBaUI7RUFDakIsV0FBVztFQUNYLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLGFBQWE7RUFDYixTQUFTO0FBQ1g7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsU0FBUztFQUNULFlBQVk7RUFDWixZQUFZO0VBQ1osZUFBZTtFQUNmLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTs7Ozs7RUFLRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7QUFDQTtFQUNFLFlBQVk7QUFDZDtBQUNBOztFQUVFLFlBQVk7QUFDZDtBQUNBO0VBQ0UsV0FBVztBQUNiOztBQUVBO0VBQ0UsOEJBQThCO0FBQ2hDO0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSw0QkFBNEI7QUFDOUI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsNEJBQTRCO0VBQzVCLFlBQVk7QUFDZDtBQUNBO0VBQ0UsOEJBQThCO0VBQzlCLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5ib2R5LFxcbmh0bWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTc1LCAxNzUpO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogMWZyIDMwMHB4O1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcbiAgZ3JpZC10ZW1wbGF0ZS1hcmVhczpcXG4gICAgXFxcImh1bWFuIGNvbXB1dGVyXFxcIlxcbiAgICBcXFwiYm90dG9tIGJvdHRvbVxcXCI7XFxuICBnYXA6IDA7XFxufVxcblxcbi5odW1hbiB7XFxuICBncmlkLWFyZWE6IGh1bWFuO1xcbn1cXG5cXG4uY29tcHV0ZXIge1xcbiAgZ3JpZC1hcmVhOiBjb21wdXRlcjtcXG59XFxuXFxuLnBsYXllci1jb250YWluZXIge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiAyMHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgYmFja2dyb3VuZDogd2hpdGU7XFxufVxcblxcbi8qIENIQU5HRSBUSElTIFRPIEhVTUFOIFRPIEhJREUgQ09NUFVURVIgU0hJUFMgKi9cXG4uZ3JpZC1jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNjcsIDE2NywgMTY3KTtcXG59XFxuXFxuLnNoaXAuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHJnYigyNTUsIDE1OCwgMTU4KTtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgZ3JpZC1hcmVhOiBib3R0b207XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHBhZGRpbmc6IDIwcHg7XFxuICBnYXA6IDIwcHg7XFxufVxcblxcbi5zaGlwLXNlbGVjdGlvbiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAxMHB4O1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDI0MHB4O1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBsZWZ0O1xcbn1cXG5cXG4uc2VsZWN0aW9uLXNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuI3NlbGVjdGlvbkMsXFxuI3NlbGVjdGlvbkIsXFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMsXFxuI3NlbGVjdGlvblAge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbn1cXG5cXG4jc2VsZWN0aW9uQyB7XFxuICB3aWR0aDogMjAwcHg7XFxufVxcbiNzZWxlY3Rpb25CIHtcXG4gIHdpZHRoOiAxNjBweDtcXG59XFxuI3NlbGVjdGlvbkQsXFxuI3NlbGVjdGlvblMge1xcbiAgd2lkdGg6IDEyMHB4O1xcbn1cXG4jc2VsZWN0aW9uUCB7XFxuICB3aWR0aDogODBweDtcXG59XFxuXFxuLnNlbGVjdGVkIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxNTgsIDE1OCwgMjU1KTtcXG59XFxuLnNlbGVjdGVkLWludmFsaWQge1xcbiAgYmFja2dyb3VuZDogcmdiKDI1NSwgMTU4LCAxNTgpICFpbXBvcnRhbnQ7XFxufVxcblxcbi5zZWxlY3Rpb24tc2hpcC5ncmV5ZWQtb3V0IHtcXG4gIGJhY2tncm91bmQ6IHJnYig4NCwgODQsIDI1NSk7XFxufVxcblxcbi5tdWx0aS1idXR0b24ge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGZvbnQtc2l6ZTogMThweDtcXG4gIGJvcmRlci1yYWRpdXM6IDQwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoODQsIDg0LCAyNTUpO1xcbiAgY29sb3I6IHdoaXRlO1xcbn1cXG4ubXVsdGktYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQ6IHJnYigxMDgsIDEwOCwgMjU1KTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbi8vIGdsb2JhbCB2YXJpYWJsZXNcbmNvbnN0IGdhbWVHcmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYmF0dGxlc2hpcC1ncmlkXCIpO1xuY29uc3QgW2h1bWFuR3JpZCwgY29tcHV0ZXJHcmlkXSA9IGdhbWVHcmlkcztcbmNvbnN0IHNoaXBTZWxlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNoaXAtc2VsZWN0aW9uXCIpO1xuY29uc3QgbXVsdGlCdXR0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tdWx0aS1idXR0b25cIik7XG5cbmNvbnN0IGdyaWRDZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbmdyaWRDZWxsLmNsYXNzTGlzdC5hZGQoXCJncmlkLWNlbGxcIik7XG5cbmxldCBodW1hbkdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBjb21wdXRlckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmxldCBodW1hbiA9IG5ldyBQbGF5ZXIodHJ1ZSwgaHVtYW5HYW1lYm9hcmQpO1xubGV0IGNvbXB1dGVyID0gbmV3IFBsYXllcihmYWxzZSwgY29tcHV0ZXJHYW1lYm9hcmQpO1xubGV0IHBsYXlpbmcgPSBmYWxzZTtcblxubGV0IHNlbGVjdGlvbiA9IHRydWU7XG5sZXQgaXNTaGlwU2VsZWN0ZWQgPSBmYWxzZTtcbmxldCBzZWxlY3RlZElkO1xubGV0IGRpcmVjdGlvbiA9IFwiY29sXCI7XG5sZXQgc2VsZWN0aW9uVmFsaWQgPSBmYWxzZTtcbmxldCBzaGlwTGVuZ3RocyA9IHtcbiAgQzogNSxcbiAgQjogNCxcbiAgRDogMyxcbiAgUzogMyxcbiAgUDogMixcbn07XG5sZXQgcGxhY2VkU2hpcElkcyA9IFtdO1xuXG4vLyBldmVudCBsaXN0ZW5lcnNcbmZ1bmN0aW9uIGNlbGxTaG9vdExpc3RlbmVyKGdyaWQpIHtcbiAgZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHBsYXlpbmcpIHtcbiAgICAgICAgbGV0IGdyaWROciA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZ3JpZC5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICAgIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhvdmVyU2VsZWN0aW9uKHNoaXBJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwSWRdOyBpKyspIHtcbiAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5hZGRUb1Bvc2l0aW9uKHN0YXJ0UG9zaXRpb24sIGRpcmVjdGlvbiwgaSk7XG4gICAgLy8gbWFraW5nIHN1cmUgdG8gZmxhZyBwb3NpdGlvbiBhcyBpbnZhbGlkIGlmIGl0IGlzIHRvbyBjbG9zZSB0byBvdGhlciBzaGlwcyB0b29cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGlmICghaHVtYW5HYW1lYm9hcmQuY2hlY2tWYWxpZFBvc2l0aW9uKHBvc2l0aW9uKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgIGdyaWRDZWxsc1tHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXS5jbGFzc0xpc3QuYWRkKFxuICAgICAgICBcInNlbGVjdGVkXCIsXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuICAgICAgLy8gaGlnaGxpZ2h0IHRoZW0gYWxsIGFzIGludmFsaWRcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICBsZXQgc3RhcnRQb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICBncmlkQ2VsbHNbXG4gICAgICAgICAgICBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihwb3NpdGlvbiwgMTApXG4gICAgICAgICAgXS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtaW52YWxpZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBjZWxsR3JpZExpc3RlbmVycyhncmlkKSB7XG4gIGZvciAobGV0IGdyaWROciA9IDA7IGdyaWROciA8IDEwMDsgZ3JpZE5yKyspIHtcbiAgICBsZXQgZ3JpZENlbGxzID0gZ3JpZC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcbiAgICBsZXQgY2VsbCA9IGdyaWRDZWxsc1tncmlkTnJdO1xuICAgIC8vIHdoZW4gaG92ZXJpbmcsIGhpZ2hsaWdodCB0aGUgY29ycmVjdCBjZWxsc1xuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiB7XG4gICAgICBpZiAoc2VsZWN0aW9uICYmIGlzU2hpcFNlbGVjdGVkKSB7XG4gICAgICAgIHNlbGVjdGlvblZhbGlkID0gdHJ1ZTtcbiAgICAgICAgaG92ZXJTZWxlY3Rpb24oc2VsZWN0ZWRJZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gd2hlbiBob3ZlcmluZyBvZmYsIGdldCByaWQgb2YgYWxsIHRoZSBjaGFuZ2VzXG4gICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4ge1xuICAgICAgaWYgKHNlbGVjdGlvbiAmJiBpc1NoaXBTZWxlY3RlZCkge1xuICAgICAgICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2VsZWN0ZWRJZF07IGkrKykge1xuICAgICAgICAgIGxldCBzdGFydFBvc2l0aW9uID0gR2FtZWJvYXJkLmZpbmRQb3NpdGlvbkZyb21HcmlkTnIoZ3JpZE5yLCAxMCk7XG4gICAgICAgICAgbGV0IHBvc2l0aW9uID0gR2FtZWJvYXJkLmFkZFRvUG9zaXRpb24oc3RhcnRQb3NpdGlvbiwgZGlyZWN0aW9uLCBpKTtcbiAgICAgICAgICBpZiAocG9zaXRpb24pIHtcbiAgICAgICAgICAgIGdyaWRDZWxsc1tcbiAgICAgICAgICAgICAgR2FtZWJvYXJkLmZpbmRHcmlkTnJGcm9tUG9zaXRpb24ocG9zaXRpb24sIDEwKVxuICAgICAgICAgICAgXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWRcIiwgXCJzZWxlY3RlZC1pbnZhbGlkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIHJlbW92aW5nIHBsYWNlZCBzaGlwIHdoZW4gY2xpY2tlZFxuICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIGlmICghaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uKSB7XG4gICAgICAgIGxldCBzZWxlY3RlZFNoaXA7XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApO1xuICAgICAgICBmb3IgKGxldCBzaGlwIG9mIGh1bWFuR2FtZWJvYXJkLnNoaXBzKSB7XG4gICAgICAgICAgaWYgKHNoaXAucG9zaXRpb25zLmluY2x1ZGVzKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgc2VsZWN0ZWRTaGlwID0gc2hpcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWxlY3RlZFNoaXApIHtcbiAgICAgICAgICBsZXQgc2hpcEVsZW1lbnQgPSBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBcIiNzZWxlY3Rpb25cIiArIHNlbGVjdGVkU2hpcC5pZCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGZvciAobGV0IHNlbGVjdGVkUG9zIG9mIHNlbGVjdGVkU2hpcC5wb3NpdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBwb3NHcmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROckZyb21Qb3NpdGlvbihzZWxlY3RlZFBvcywgMTApO1xuICAgICAgICAgICAgZ3JpZENlbGxzW3Bvc0dyaWROcl0uY2xhc3NMaXN0LnJlbW92ZShcInNlbGVjdGVkXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBodW1hbkdhbWVib2FyZC5yZW1vdmVTaGlwKGdyaWQsIHNlbGVjdGVkU2hpcC5pZCk7XG4gICAgICAgICAgcGxhY2VkU2hpcElkcy5zcGxpY2UocGxhY2VkU2hpcElkcy5pbmRleE9mKHNlbGVjdGVkU2hpcC5pZCksIDEpO1xuICAgICAgICAgIHNlbGVjdFNoaXAoXG4gICAgICAgICAgICBzaGlwRWxlbWVudCxcbiAgICAgICAgICAgIHNoaXBTZWxlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWxlY3Rpb24tc2hpcFwiKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgICAgIGhvdmVyU2VsZWN0aW9uKHNlbGVjdGVkU2hpcC5pZCwgZ3JpZE5yLCBncmlkQ2VsbHMpO1xuICAgICAgICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiUk9UQVRFXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHdoZW4gY2xpY2tpbmcgb24gdGhlIGdyaWQgdG8gcGxhY2VcbiAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBpZiAoaXNTaGlwU2VsZWN0ZWQgJiYgc2VsZWN0aW9uICYmIHNlbGVjdGlvblZhbGlkKSB7XG4gICAgICAgIGxldCBwb3NpdGlvbnMgPSBbXTtcbiAgICAgICAgbGV0IHNoaXBFbGVtZW50ID0gc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRJZCxcbiAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzZWxlY3RlZElkXTsgaSsrKSB7XG4gICAgICAgICAgbGV0IHN0YXJ0UG9zaXRpb24gPSBHYW1lYm9hcmQuZmluZFBvc2l0aW9uRnJvbUdyaWROcihncmlkTnIsIDEwKTtcbiAgICAgICAgICBsZXQgcG9zaXRpb24gPSBHYW1lYm9hcmQuYWRkVG9Qb3NpdGlvbihzdGFydFBvc2l0aW9uLCBkaXJlY3Rpb24sIGkpO1xuICAgICAgICAgIHBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgc2hpcCA9IG5ldyBTaGlwKHBvc2l0aW9ucywgc2VsZWN0ZWRJZCk7XG4gICAgICAgIGh1bWFuR2FtZWJvYXJkLnBsYWNlKGdyaWQsIHNoaXApO1xuICAgICAgICBwbGFjZWRTaGlwSWRzLnB1c2goc2VsZWN0ZWRJZCk7XG4gICAgICAgIC8vIGdyZXkgaXQgb3V0XG4gICAgICAgIHVuc2VsZWN0U2hpcChzaGlwRWxlbWVudCk7XG4gICAgICAgIHNoaXBFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJncmV5ZWQtb3V0XCIpO1xuICAgICAgICBpZiAocGxhY2VkU2hpcElkcy5sZW5ndGggPj0gNSkge1xuICAgICAgICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiU1RBUlRcIjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbm11bHRpQnV0dC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBpZiAobXVsdGlCdXR0LnRleHRDb250ZW50ID09PSBcIlNUQVJUXCIpIHtcbiAgICBzdGFydEdhbWUoKTtcbiAgfSBlbHNlIGlmIChtdWx0aUJ1dHQudGV4dENvbnRlbnQgPT09IFwiUk9UQVRFXCIpIHtcbiAgICByb3RhdGUoc2hpcFNlbGVjdGlvbiwgXCIuc2VsZWN0aW9uLXNoaXBcIik7XG4gIH0gZWxzZSBpZiAobXVsdGlCdXR0LnRleHRDb250ZW50ID09PSBcIlJFU0VUXCIpIHtcbiAgICByZXNldCgpO1xuICAgIG11bHRpQnV0dC50ZXh0Q29udGVudCA9IFwiUk9UQVRFXCI7XG4gIH1cbn0pO1xuXG5zaGlwU2VsZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGlmIChzZWxlY3Rpb24gJiYgaXNTaGlwU2VsZWN0ZWQpIHtcbiAgICB1bnNlbGVjdFNoaXAoc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yKFwiI3NlbGVjdGlvblwiICsgc2VsZWN0ZWRJZCkpO1xuICB9XG59KTtcblxuc2hpcFNlbGVjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlbGVjdGlvbi1zaGlwXCIpLmZvckVhY2goKHNoaXApID0+IHtcbiAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICBsZXQgaWQgPSBzaGlwLmlkLnN1YnN0cmluZyhzaGlwLmlkLmxlbmd0aCAtIDEpO1xuICAgIGlmIChzZWxlY3Rpb24gJiYgIXBsYWNlZFNoaXBJZHMuaW5jbHVkZXMoaWQpKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRJZCAhPT0gaWQpIHtcbiAgICAgICAgc2VsZWN0U2hpcChzaGlwLCBzaGlwU2VsZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VsZWN0aW9uLXNoaXBcIikpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zZWxlY3RTaGlwKHNoaXApO1xuICAgICAgfVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH0pO1xufSk7XG5cbi8vIGluaXRpYWwgc3R5bGluZ1xuZnVuY3Rpb24gZ3JpZENyZWF0aW9uKCkge1xuICBnYW1lR3JpZHMuZm9yRWFjaCgoZ2FtZUdyaWQpID0+IHtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtcm93c1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICAvLyBlbnRlcmluZyBhbGwgZ3JpZCBpdGVtc1xuICAgIGluc2VydEdyaWRDZWxscygxMCwgMTAsIGdhbWVHcmlkLCBncmlkQ2VsbCk7XG4gIH0pO1xuICAvLyBhZGRpbmcgaW5pdGlhbCBjZWxsIGV2ZW50IGxpc3RlbmVyc1xuICAvLyBzaW5jZSB0aGV5IG9ubHkgZXhpc3Qgb25jZSBncmlkIGlzIGNyZWF0ZWRcbiAgY2VsbFNob290TGlzdGVuZXIoY29tcHV0ZXJHcmlkKTtcbiAgY2VsbEdyaWRMaXN0ZW5lcnMoaHVtYW5HcmlkKTtcbn1cblxuLy8gcm93cywgY29scyA6IGludCxcbi8vIGdyaWQsIGNlbGwgOiBET00gZWxlbWVudHNcbmZ1bmN0aW9uIGluc2VydEdyaWRDZWxscyhyb3dzLCBjb2xzLCBncmlkLCBjZWxsKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAqIGNvbHM7IGkrKykge1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG5cbi8vICoqKiBUSElTIElTIFdIRVJFIFRIRSBUVVJOUyBIQVBQRU5cbmZ1bmN0aW9uIGh1bWFuUGxheXMoZ3JpZCwgZ3JpZE5yKSB7XG4gIGlmIChcbiAgICBjb21wdXRlckdyaWRcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKVxuICAgICAgW2dyaWROcl0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGl0XCIpXG4gICkge1xuICAgIHJldHVybjtcbiAgfVxuICBHYW1lYm9hcmQubWFya0hpdChncmlkLCBncmlkTnIpO1xuICBodW1hbi5hdHRhY2soY29tcHV0ZXIsIEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApKTtcbiAgLy8gY2hlY2sgaWYgaHVtYW4gaGFzIHdvblxuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBjb21wdXRlclBsYXlzKCk7XG59XG5cbi8vIGNvbXB1dGVyJ3MgdHVyblxuZnVuY3Rpb24gY29tcHV0ZXJQbGF5cygpIHtcbiAgbGV0IGF0dGFja1Bvc2l0aW9uID0gY29tcHV0ZXIuYXR0YWNrKGh1bWFuKTtcbiAgbGV0IHJvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKGF0dGFja1Bvc2l0aW9uKTtcbiAgbGV0IGNvbFZhbHVlID0gR2FtZWJvYXJkLmdldENvbFZhbHVlKGF0dGFja1Bvc2l0aW9uKTtcbiAgbGV0IGdyaWROciA9IEdhbWVib2FyZC5maW5kR3JpZE5yKDEwLCByb3dWYWx1ZSwgY29sVmFsdWUpO1xuICBHYW1lYm9hcmQubWFya0hpdChodW1hbkdyaWQsIGdyaWROcik7XG4gIGlmIChjaGVja1dpbigpKSB7XG4gICAgLy8gbGF0ZXIgcmVzZXRcbiAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrV2luKCkge1xuICBpZiAoaHVtYW5HYW1lYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgd2luTWVzc2FnZShcImNvbXB1dGVyXCIpO1xuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChjb21wdXRlckdhbWVib2FyZC5hbGxTdW5rKCkpIHtcbiAgICB3aW5NZXNzYWdlKFwiaHVtYW5cIik7XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gd2luTWVzc2FnZSh3aW5uZXIpIHtcbiAgLy8gY3JlYXRlIG1vZGFsXG4gIGFsZXJ0KHdpbm5lciArIFwiIHdvblwiKTtcbn1cblxuLy8gKioqIEZPUiBMQVRFUlxuZnVuY3Rpb24gcmVzZXQoKSB7fVxuXG4vLyByb3RhdGUgYnV0dG9uXG4vLyBURU1QT1JBUlkgVkVSU0lPTlxuZnVuY3Rpb24gcm90YXRlKHBhcmVudCwgc2hpcFNlbGVjdG9yKSB7XG4gIC8vIHN3aXRjaGluZyB0aGUgZGlyZWN0aW9uXG4gIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgY2FzZSBcImNvbFwiOlxuICAgICAgZGlyZWN0aW9uID0gXCJyb3dcIjtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJyb3dcIjpcbiAgICAgIGRpcmVjdGlvbiA9IFwiY29sXCI7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIC8vIHJvdGF0aW5nIGFsbCB0aGUgc2hpcHNcbiAgcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2hpcFNlbGVjdG9yKS5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgbGV0IHdpZHRoID0gc2hpcC5vZmZzZXRXaWR0aDtcbiAgICBsZXQgaGVpZ2h0ID0gc2hpcC5vZmZzZXRIZWlnaHQ7XG4gICAgc2hpcC5zdHlsZS53aWR0aCA9IFN0cmluZyhoZWlnaHQpICsgXCJweFwiO1xuICAgIHNoaXAuc3R5bGUuaGVpZ2h0ID0gU3RyaW5nKHdpZHRoKSArIFwicHhcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdFNoaXAoc2VsZWN0ZWRTaGlwRWxlbWVudCwgc2hpcEVsZW1lbnRzKSB7XG4gIC8vIG1ha2Ugc3VyZSB0aGUgcmVzdCBhcmUgdW5zZWxlY3RlZCBmaXJzdFxuICBzaGlwRWxlbWVudHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIHVuc2VsZWN0U2hpcChzaGlwKTtcbiAgfSk7XG5cbiAgbGV0IHNoaXBJZCA9IHNlbGVjdGVkU2hpcEVsZW1lbnQuaWQuc3Vic3RyaW5nKFxuICAgIHNlbGVjdGVkU2hpcEVsZW1lbnQuaWQubGVuZ3RoIC0gMSxcbiAgKTtcblxuICBpc1NoaXBTZWxlY3RlZCA9IHRydWU7XG4gIHNlbGVjdGVkSWQgPSBzaGlwSWQ7XG4gIHNlbGVjdGlvblZhbGlkID0gZmFsc2U7XG5cbiAgLy8gYWRkIGJvcmRlciB0byBzZWxlY3RlZCBzaGlwXG4gIHNlbGVjdGVkU2hpcEVsZW1lbnQuc3R5bGUuYm9yZGVyID0gXCIycHggc29saWQgcmVkXCI7XG59XG5cbmZ1bmN0aW9uIHVuc2VsZWN0U2hpcChzaGlwKSB7XG4gIGlzU2hpcFNlbGVjdGVkID0gZmFsc2U7XG4gIHNlbGVjdGVkSWQgPSBcIlwiO1xuICBzZWxlY3Rpb25WYWxpZCA9IGZhbHNlO1xuXG4gIC8vIGFkZCBib3JkZXIgdG8gc2VsZWN0ZWQgc2hpcFxuICBzaGlwLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xufVxuXG5mdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gIHBsYXlpbmcgPSB0cnVlO1xuICBzZWxlY3Rpb24gPSBmYWxzZTtcbiAgbXVsdGlCdXR0LnRleHRDb250ZW50ID0gXCJSRVNFVFwiO1xuICBjb21wdXRlckdhbWVib2FyZC5nZW5lcmF0ZVJhbmRvbVNoaXBzKGNvbXB1dGVyLCBjb21wdXRlckdyaWQpO1xufVxuXG4vLyAqKiogREVMRVRFIE9OQ0UgQ1VTVE9NIE1FVEhPRFMgQ1JFQVRFRFxuZnVuY3Rpb24gcGxhY2VJbml0aWFsQm9hdHMoKSB7XG4gIC8vIGxldCBwYXRyb2xCb2F0ID0gbmV3IFNoaXAoW1wiMToyXCIsIFwiMTozXCJdLCBcIlBcIik7XG4gIC8vIGxldCBzdWJtYXJpbmUgPSBuZXcgU2hpcChbXCIzOjJcIiwgXCIzOjNcIiwgXCIzOjRcIl0sIFwiU1wiKTtcbiAgLy8gaHVtYW5HYW1lYm9hcmQucGxhY2UoaHVtYW5HcmlkLCBwYXRyb2xCb2F0KTtcbiAgLy8gaHVtYW5HYW1lYm9hcmQucGxhY2UoaHVtYW5HcmlkLCBzdWJtYXJpbmUpO1xuICAvLyBsZXQgcGF0cm9sQm9hdEMgPSBuZXcgU2hpcChbXCIxOjJcIiwgXCIxOjNcIl0sIFwiUFwiKTtcbiAgLy8gbGV0IHN1Ym1hcmluZUMgPSBuZXcgU2hpcChbXCIzOjJcIiwgXCIzOjNcIiwgXCIzOjRcIl0sIFwiU1wiKTtcbiAgLy8gY29tcHV0ZXJHYW1lYm9hcmQucGxhY2UoY29tcHV0ZXJHcmlkLCBwYXRyb2xCb2F0Qyk7XG4gIC8vIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlKGNvbXB1dGVyR3JpZCwgc3VibWFyaW5lQyk7XG59XG5cbmdyaWRDcmVhdGlvbigpO1xucGxhY2VJbml0aWFsQm9hdHMoKTtcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJoaXRQb3NpdGlvbnMiLCJzaGlwcyIsInNoaXAiLCJjaGVja1ZhbGlkU2hpcFBvc2l0aW9uIiwicHVzaCIsImdyaWQiLCJwbGFjZUxvZ2ljYWxseSIsInBsYWNlSW5HcmlkIiwibWluaW11bSIsInBvc2l0aW9ucyIsInJlZHVjZSIsInN0b3JlZCIsInBsYWNlZFBvcyIsImdldFJvd1ZhbHVlIiwiSW5maW5pdHkiLCJnZXRDb2xWYWx1ZSIsIm5ld1NoaXAiLCJzb21lIiwibmV3UG9zIiwiY2hlY2tWYWxpZFBvc2l0aW9uIiwicG9zIiwibmV3Um93VmFsdWUiLCJuZXdDb2xWYWx1ZSIsInBsYWNlZFNoaXAiLCJtaW5Sb3dWYWx1ZSIsIl9taW5Sb3dWYWx1ZSIsIm1heFJvd1ZhbHVlIiwiX21heFJvd1ZhbHVlIiwibWluQ29sVmFsdWUiLCJfbWluQ29sVmFsdWUiLCJtYXhDb2xWYWx1ZSIsIl9tYXhDb2xWYWx1ZSIsImluY2x1ZGVzIiwiaSIsImxlbmd0aCIsImhpdCIsImV2ZXJ5IiwiaXNTdW5rIiwic2hpcExlbmd0aCIsImZvckVhY2giLCJncmlkTnIiLCJmaW5kR3JpZE5yIiwiZ3JpZE5vZGUiLCJjaGlsZHJlbiIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsIlN0cmluZyIsImlkIiwic3BsaWNlIiwiaW5kZXhPZiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxsIiwic3Vic3RyaW5nIiwicmVtb3ZlIiwicmVtb3ZlU2hpcExvZ2ljYWxseSIsInJlbW92ZVNoaXBGcm9tR3JpZCIsInBsYXllciIsInNoaXBUeXBlIiwicmFuZG9tU2hpcFBvc2l0aW9uIiwicGxhY2UiLCJOdW1iZXIiLCJkaXJlY3Rpb24iLCJ2YWwiLCJyb3dWYWx1ZSIsImNvbFZhbHVlIiwiVHlwZUVycm9yIiwibnIiLCJjb2xzIiwiTWF0aCIsImZsb29yIiwicm93IiwiZmluZEdyaWRSb3ciLCJjb2wiLCJmaW5kR3JpZENvbCIsImNvbnRhaW5zIiwiU2hpcCIsIlBsYXllciIsImlzSHVtYW4iLCJnYW1lYm9hcmQiLCJvdGhlclBsYXllciIsInJlY2VpdmVBdHRhY2siLCJfcmFuZG9tUGFpciIsInJhbmRvbU5yMSIsInJhbmRvbU5yMiIsInBvc2l0aW9uIiwicmFuZG9tIiwidW5kZWZpbmVkIiwiX2h1bWFuQXR0YWNrIiwiX2NvbXB1dGVyQXR0YWNrIiwic2hpcElkIiwic3RhcnRQb3MiLCJhZGRUb1Bvc2l0aW9uIiwiY29uc29sZSIsImxvZyIsInN1bmsiLCJnYW1lR3JpZHMiLCJkb2N1bWVudCIsImh1bWFuR3JpZCIsImNvbXB1dGVyR3JpZCIsInNoaXBTZWxlY3Rpb24iLCJxdWVyeVNlbGVjdG9yIiwibXVsdGlCdXR0IiwiZ3JpZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiaHVtYW5HYW1lYm9hcmQiLCJjb21wdXRlckdhbWVib2FyZCIsImh1bWFuIiwiY29tcHV0ZXIiLCJwbGF5aW5nIiwic2VsZWN0aW9uIiwiaXNTaGlwU2VsZWN0ZWQiLCJzZWxlY3RlZElkIiwic2VsZWN0aW9uVmFsaWQiLCJzaGlwTGVuZ3RocyIsIkMiLCJCIiwiRCIsIlMiLCJQIiwicGxhY2VkU2hpcElkcyIsImNlbGxTaG9vdExpc3RlbmVyIiwibm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJodW1hblBsYXlzIiwiaG92ZXJTZWxlY3Rpb24iLCJncmlkQ2VsbHMiLCJzdGFydFBvc2l0aW9uIiwiZmluZFBvc2l0aW9uRnJvbUdyaWROciIsImZpbmRHcmlkTnJGcm9tUG9zaXRpb24iLCJjZWxsR3JpZExpc3RlbmVycyIsInNlbGVjdGVkU2hpcCIsInNoaXBFbGVtZW50Iiwic2VsZWN0ZWRQb3MiLCJwb3NHcmlkTnIiLCJyZW1vdmVTaGlwIiwic2VsZWN0U2hpcCIsInRleHRDb250ZW50IiwidW5zZWxlY3RTaGlwIiwic3RhcnRHYW1lIiwicm90YXRlIiwicmVzZXQiLCJlIiwic3RvcFByb3BhZ2F0aW9uIiwiZ3JpZENyZWF0aW9uIiwiZ2FtZUdyaWQiLCJzdHlsZSIsImluc2VydEdyaWRDZWxscyIsInJvd3MiLCJhcHBlbmRDaGlsZCIsImNsb25lTm9kZSIsIm1hcmtIaXQiLCJhdHRhY2siLCJjaGVja1dpbiIsImNvbXB1dGVyUGxheXMiLCJhdHRhY2tQb3NpdGlvbiIsImFsbFN1bmsiLCJ3aW5NZXNzYWdlIiwid2lubmVyIiwiYWxlcnQiLCJwYXJlbnQiLCJzaGlwU2VsZWN0b3IiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwic2VsZWN0ZWRTaGlwRWxlbWVudCIsInNoaXBFbGVtZW50cyIsImJvcmRlciIsImdlbmVyYXRlUmFuZG9tU2hpcHMiLCJwbGFjZUluaXRpYWxCb2F0cyJdLCJzb3VyY2VSb290IjoiIn0=
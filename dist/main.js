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
    key: "place",
    value: function place(ship) {
      if (this._checkValidShipPosition(ship)) {
        this.ships.push(ship);
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
    key: "_addToPosition",
    value: function _addToPosition(pos, direction, val) {
      if (direction === "row") {
        // getting first number
        var rowValue = Gameboard.getRowValue(pos);
        var newRowValue = rowValue + val; // making sure it is within range

        if (newRowValue > 10 || newRowValue < 1) {
          throw new Error("Outside Of Range Error: POSITION VALUE(S) OUTSIDE OF ALLOWED RANGE");
        } // concatenating to it the rest of the position


        return String(newRowValue) + pos.substring(pos.indexOf(":"));
      } else if (direction === "col") {
        // this is the reverse of the row branch
        var colValue = Gameboard.getColValue(pos);
        var newColValue = colValue + val;

        if (newColValue > 10 || newColValue < 1) {
          throw new Error("Outside Of Range Error: POSITION VALUE(S) OUTSIDE OF ALLOWED RANGE");
        }

        return pos.substring(0, pos.indexOf(":") + 1) + String(newColValue);
      } else {
        throw new TypeError("INVALID DIRECTION PARAMETER");
      }
    } // checks if ship's position is valid by checking it is near or overlapping existing ship

  }, {
    key: "_checkValidShipPosition",
    value: function _checkValidShipPosition(newShip) {
      var _this = this;

      // gives true if a single value is invalid, so must be inverted
      return !newShip.positions.some(function (newPos) {
        var newRowValue = Gameboard.getRowValue(newPos);
        var newColValue = Gameboard.getColValue(newPos); // get min + max value of row and col for each ship and check if the new position values are within them +-1
        // if a single value is INVALID, return TRUE

        return _this.ships.some(function (placedShip) {
          var minRowValue = _this._minRowValue(placedShip);

          var maxRowValue = _this._maxRowValue(placedShip);

          var minColValue = _this._minColValue(placedShip);

          var maxColValue = _this._maxColValue(placedShip);

          if (newRowValue >= minRowValue - 1 && newRowValue <= maxRowValue + 1 && newColValue >= minColValue - 1 && newColValue <= maxColValue + 1) {
            // INVALID THEREFORE TRUE
            return true;
          }

          return false;
        });
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
        gridNode.setAttribute("id", "ship" + String(shipLength));
      });
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
  function Ship(positions) {
    _classCallCheck(this, Ship);

    this.shipLength = positions.length;
    this.positions = positions;
    this.hitPositions = [];
    this.sunk = false;
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\n.grids {\n  display: flex;\n  background: rgb(175, 175, 175);\n  height: 600px;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 40px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  border: 1px solid black;\n  position: relative;\n}\n\n.human .ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit::after {\n  content: \"X\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.ship.hit::after {\n  color: red;\n}\n\n.bottom-container {\n  display: flex;\n  justify-content: center;\n}\n", "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,SAAS;EACT,sBAAsB;EACtB,UAAU;AACZ;AACA;;EAEE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,SAAS;EACT,aAAa;EACb,yCAAyC;AAC3C;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,iBAAiB;EACjB,aAAa;EACb,MAAM;EACN,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,YAAY;EACZ,kBAAkB;EAClB,SAAS;EACT,QAAQ;EACR,gCAAgC;AAClC;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB","sourcesContent":["* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n  box-sizing: border-box;\n  padding: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\n\n.grids {\n  display: flex;\n  background: rgb(175, 175, 175);\n  height: 600px;\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 40px;\n  padding: 30px;\n  border-bottom: 10px solid rgb(51, 51, 51);\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 400px;\n  height: 400px;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  border: 1px solid black;\n  position: relative;\n}\n\n.human .ship {\n  background: blue;\n}\n\n.hidden {\n  display: none;\n}\n\n.hit::after {\n  content: \"X\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.ship.hit::after {\n  color: red;\n}\n\n.bottom-container {\n  display: flex;\n  justify-content: center;\n}\n"],"sourceRoot":""}]);
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
var playing = true; // initial styling

function gridCreation() {
  gameGrids.forEach(function (gameGrid) {
    gameGrid.style["grid-template-rows"] = "repeat(10, auto)";
    gameGrid.style["grid-template-columns"] = "repeat(10, auto)"; // entering all grid items

    insertGridCells(10, 10, gameGrid, gridCell);
  });
  cellEventListeners(computerGrid);
} // rows, cols : int,
// grid, cell : DOM elements


function insertGridCells(rows, cols, grid, cell) {
  for (var i = 0; i < rows * cols; i++) {
    grid.appendChild(cell.cloneNode(true));
  }
}

function cellEventListeners(grid) {
  grid.childNodes.forEach(function (node) {
    node.addEventListener("click", function () {
      var gridNr = Array.prototype.indexOf.call(grid.children, node);
      humanPlays(grid, gridNr);
    });
  });
} // *** THIS IS WHERE THE TURNS HAPPEN


function humanPlays(grid, gridNr) {
  _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.markHit(grid, gridNr);
  human.attack(computer, _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard.findPositionFromGridNr(gridNr, 10)); // check if human has won

  if (checkWin()) {
    // later reset
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
  alert(winner + " won");
} // *** FOR LATER


function reset() {} // *** DELETE ONCE CUSTOM METHODS CREATED


function placeInitialBoats() {
  var destroyer = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(["2:2", "3:2"]);
  var cruiser = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(["5:2", "5:3", "5:4"]);
  humanGameboard.place(destroyer);
  humanGameboard.placeInGrid(humanGrid, destroyer);
  humanGameboard.place(cruiser);
  humanGameboard.placeInGrid(humanGrid, cruiser);
  var destroyer2 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(["2:2", "3:2"]);
  var cruiser2 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(["5:2", "5:3", "5:4"]);
  computerGameboard.place(destroyer2);
  computerGameboard.placeInGrid(computerGrid, destroyer2);
  computerGameboard.place(cruiser);
  computerGameboard.placeInGrid(computerGrid, cruiser2);
}

gridCreation();
placeInitialBoats();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQ21DLFdBQWYsQ0FBMkIxQyxTQUEzQixFQUFzQ3VDLFNBQXRDO0FBQ0FoQyxFQUFBQSxjQUFjLENBQUNrQyxLQUFmLENBQXFCRCxPQUFyQjtBQUNBakMsRUFBQUEsY0FBYyxDQUFDbUMsV0FBZixDQUEyQjFDLFNBQTNCLEVBQXNDd0MsT0FBdEM7QUFFQSxNQUFJRyxVQUFVLEdBQUcsSUFBSWhELHVDQUFKLENBQVMsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUFULENBQWpCO0FBQ0EsTUFBSWlELFFBQVEsR0FBRyxJQUFJakQsdUNBQUosQ0FBUyxDQUFDLEtBQUQsRUFBUSxLQUFSLEVBQWUsS0FBZixDQUFULENBQWY7QUFDQWEsRUFBQUEsaUJBQWlCLENBQUNpQyxLQUFsQixDQUF3QkUsVUFBeEI7QUFDQW5DLEVBQUFBLGlCQUFpQixDQUFDa0MsV0FBbEIsQ0FBOEJ6QyxZQUE5QixFQUE0QzBDLFVBQTVDO0FBQ0FuQyxFQUFBQSxpQkFBaUIsQ0FBQ2lDLEtBQWxCLENBQXdCRCxPQUF4QjtBQUNBaEMsRUFBQUEsaUJBQWlCLENBQUNrQyxXQUFsQixDQUE4QnpDLFlBQTlCLEVBQTRDMkMsUUFBNUM7QUFDRDs7QUFFRGhDLFlBQVk7QUFDWjBCLGlCQUFpQixHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcz9hMmY1Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyAxMHgxMCB4OkEtSiB5OiAxLTEwXG5jbGFzcyBHYW1lYm9hcmQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmhpdFBvc2l0aW9ucyA9IFtdO1xuICAgIHRoaXMuc2hpcHMgPSBbXTtcbiAgfVxuXG4gIHBsYWNlKHNoaXApIHtcbiAgICBpZiAodGhpcy5fY2hlY2tWYWxpZFNoaXBQb3NpdGlvbihzaGlwKSkge1xuICAgICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRSb3dWYWx1ZShwb3MpIHtcbiAgICByZXR1cm4gTnVtYmVyKHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpKSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29sVmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKHBvcy5pbmRleE9mKFwiOlwiKSArIDEpKTtcbiAgfVxuXG4gIF9taW5Sb3dWYWx1ZShzaGlwKSB7XG4gICAgbGV0IG1pbmltdW0gPSBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAoR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcykgPCBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIEdhbWVib2FyZC5nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCBJbmZpbml0eSk7XG4gICAgcmV0dXJuIG1pbmltdW07XG4gIH1cbiAgX21pbkNvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpIDwgc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICB9XG4gIF9tYXhSb3dWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmIChHYW1lYm9hcmQuZ2V0Um93VmFsdWUocGxhY2VkUG9zKSA+IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIC1JbmZpbml0eSk7XG4gIH1cbiAgX21heENvbFZhbHVlKHNoaXApIHtcbiAgICByZXR1cm4gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKEdhbWVib2FyZC5nZXRDb2xWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgLUluZmluaXR5KTtcbiAgfVxuXG4gIC8vIGRpcmVjdGlvbiA9IFwicm93XCIgLyBcImNvbFwiXG4gIC8vIHBvcyA9IFwicm93OmNvbFwiXG4gIF9hZGRUb1Bvc2l0aW9uKHBvcywgZGlyZWN0aW9uLCB2YWwpIHtcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcInJvd1wiKSB7XG4gICAgICAvLyBnZXR0aW5nIGZpcnN0IG51bWJlclxuICAgICAgbGV0IHJvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKHBvcyk7XG4gICAgICBsZXQgbmV3Um93VmFsdWUgPSByb3dWYWx1ZSArIHZhbDtcbiAgICAgIC8vIG1ha2luZyBzdXJlIGl0IGlzIHdpdGhpbiByYW5nZVxuICAgICAgaWYgKG5ld1Jvd1ZhbHVlID4gMTAgfHwgbmV3Um93VmFsdWUgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBcIk91dHNpZGUgT2YgUmFuZ2UgRXJyb3I6IFBPU0lUSU9OIFZBTFVFKFMpIE9VVFNJREUgT0YgQUxMT1dFRCBSQU5HRVwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgLy8gY29uY2F0ZW5hdGluZyB0byBpdCB0aGUgcmVzdCBvZiB0aGUgcG9zaXRpb25cbiAgICAgIHJldHVybiBTdHJpbmcobmV3Um93VmFsdWUpICsgcG9zLnN1YnN0cmluZyhwb3MuaW5kZXhPZihcIjpcIikpO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSBcImNvbFwiKSB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSByZXZlcnNlIG9mIHRoZSByb3cgYnJhbmNoXG4gICAgICBsZXQgY29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUocG9zKTtcbiAgICAgIGxldCBuZXdDb2xWYWx1ZSA9IGNvbFZhbHVlICsgdmFsO1xuICAgICAgaWYgKG5ld0NvbFZhbHVlID4gMTAgfHwgbmV3Q29sVmFsdWUgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBcIk91dHNpZGUgT2YgUmFuZ2UgRXJyb3I6IFBPU0lUSU9OIFZBTFVFKFMpIE9VVFNJREUgT0YgQUxMT1dFRCBSQU5HRVwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpICsgMSkgKyBTdHJpbmcobmV3Q29sVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSU5WQUxJRCBESVJFQ1RJT04gUEFSQU1FVEVSXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiBzaGlwJ3MgcG9zaXRpb24gaXMgdmFsaWQgYnkgY2hlY2tpbmcgaXQgaXMgbmVhciBvciBvdmVybGFwcGluZyBleGlzdGluZyBzaGlwXG4gIF9jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKG5ld1NoaXApIHtcbiAgICAvLyBnaXZlcyB0cnVlIGlmIGEgc2luZ2xlIHZhbHVlIGlzIGludmFsaWQsIHNvIG11c3QgYmUgaW52ZXJ0ZWRcbiAgICByZXR1cm4gIW5ld1NoaXAucG9zaXRpb25zLnNvbWUoKG5ld1BvcykgPT4ge1xuICAgICAgbGV0IG5ld1Jvd1ZhbHVlID0gR2FtZWJvYXJkLmdldFJvd1ZhbHVlKG5ld1Bvcyk7XG4gICAgICBsZXQgbmV3Q29sVmFsdWUgPSBHYW1lYm9hcmQuZ2V0Q29sVmFsdWUobmV3UG9zKTtcblxuICAgICAgLy8gZ2V0IG1pbiArIG1heCB2YWx1ZSBvZiByb3cgYW5kIGNvbCBmb3IgZWFjaCBzaGlwIGFuZCBjaGVjayBpZiB0aGUgbmV3IHBvc2l0aW9uIHZhbHVlcyBhcmUgd2l0aGluIHRoZW0gKy0xXG4gICAgICAvLyBpZiBhIHNpbmdsZSB2YWx1ZSBpcyBJTlZBTElELCByZXR1cm4gVFJVRVxuICAgICAgcmV0dXJuIHRoaXMuc2hpcHMuc29tZSgocGxhY2VkU2hpcCkgPT4ge1xuICAgICAgICBsZXQgbWluUm93VmFsdWUgPSB0aGlzLl9taW5Sb3dWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgICAgbGV0IG1heFJvd1ZhbHVlID0gdGhpcy5fbWF4Um93VmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICAgIGxldCBtaW5Db2xWYWx1ZSA9IHRoaXMuX21pbkNvbFZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgICBsZXQgbWF4Q29sVmFsdWUgPSB0aGlzLl9tYXhDb2xWYWx1ZShwbGFjZWRTaGlwKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgbmV3Um93VmFsdWUgPj0gbWluUm93VmFsdWUgLSAxICYmXG4gICAgICAgICAgbmV3Um93VmFsdWUgPD0gbWF4Um93VmFsdWUgKyAxICYmXG4gICAgICAgICAgbmV3Q29sVmFsdWUgPj0gbWluQ29sVmFsdWUgLSAxICYmXG4gICAgICAgICAgbmV3Q29sVmFsdWUgPD0gbWF4Q29sVmFsdWUgKyAxXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIElOVkFMSUQgVEhFUkVGT1JFIFRSVUVcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHdpbGwgY2hlY2sgaWYgdmFsaWQgcG9zaXRpb24gYW5kIHNlbmQgdGhlIGhpdCwgdGhlIHNoaXAgd2lsbCB0aGVuIGNoZWNrIGlmIGl0IGlzIGhpdFxuICByZWNlaXZlQXR0YWNrKHBvcykge1xuICAgIGlmICghdGhpcy5oaXRQb3NpdGlvbnMuaW5jbHVkZXMocG9zKSkge1xuICAgICAgdGhpcy5oaXRQb3NpdGlvbnMucHVzaChwb3MpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBzW2ldLmhpdChwb3MpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhbGxTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kR3JpZFJvdyhuciwgY29scykge1xuICAgIHJldHVybiBNYXRoLmZsb29yKG5yIC8gY29scykgKyAxO1xuICB9XG5cbiAgc3RhdGljIGZpbmRHcmlkQ29sKG5yLCByb3csIGNvbHMpIHtcbiAgICByZXR1cm4gbnIgLSAocm93IC0gMSkgKiBjb2xzICsgMTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kUG9zaXRpb25Gcm9tR3JpZE5yKG5yLCBjb2xzKSB7XG4gICAgbGV0IHJvdyA9IEdhbWVib2FyZC5maW5kR3JpZFJvdyhuciwgY29scyk7XG4gICAgbGV0IGNvbCA9IEdhbWVib2FyZC5maW5kR3JpZENvbChuciwgcm93LCBjb2xzKTtcbiAgICByZXR1cm4gU3RyaW5nKHJvdykgKyBcIjpcIiArIFN0cmluZyhjb2wpO1xuICB9XG5cbiAgLy8gcm93IGFuZCBjb2wgc3RhcnRpbmcgZnJvbSAxXG4gIHN0YXRpYyBmaW5kR3JpZE5yKGNvbHMsIHJvdywgY29sKSB7XG4gICAgcmV0dXJuIGNvbHMgKiAocm93IC0gMSkgKyAoY29sIC0gMSk7XG4gIH1cblxuICAvLyBET00gbWFuaXB1bGF0aW9uXG4gIC8vIHBsYWNpbmcgdGhlIHNoaXAgdmlzdWFsbHkgb24gZ2l2ZW4gZ3JpZFxuICBwbGFjZUluR3JpZChncmlkLCBzaGlwKSB7XG4gICAgbGV0IHNoaXBMZW5ndGggPSBzaGlwLnBvc2l0aW9ucy5sZW5ndGg7XG4gICAgc2hpcC5wb3NpdGlvbnMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICBsZXQgZ3JpZE5yID0gR2FtZWJvYXJkLmZpbmRHcmlkTnIoXG4gICAgICAgIDEwLFxuICAgICAgICBHYW1lYm9hcmQuZ2V0Um93VmFsdWUocG9zKSxcbiAgICAgICAgR2FtZWJvYXJkLmdldENvbFZhbHVlKHBvcyksXG4gICAgICApO1xuICAgICAgbGV0IGdyaWROb2RlID0gZ3JpZC5jaGlsZHJlbltncmlkTnJdO1xuICAgICAgZ3JpZE5vZGUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICBncmlkTm9kZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNoaXBcIiArIFN0cmluZyhzaGlwTGVuZ3RoKSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgbWFya0hpdChncmlkLCBncmlkTnIpIHtcbiAgICBsZXQgZ3JpZE5vZGUgPSBncmlkLmNoaWxkcmVuW2dyaWROcl07XG4gICAgZ3JpZE5vZGUuY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcbiAgfVxuXG4gIHN0YXRpYyBjaGVja0hpdChncmlkLCBncmlkTnIpIHtcbiAgICBpZiAoZ3JpZC5jaGlsZHJlbltncmlkTnJdLmNsYXNzTGlzdC5jb250YWlucyhcInNoaXBcIikpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuIiwiY2xhc3MgUGxheWVyIHtcbiAgLy8gaXNIdW1hbiA9IHRydWUgLyBmYWxzZVxuICBjb25zdHJ1Y3Rvcihpc0h1bWFuLCBnYW1lYm9hcmQpIHtcbiAgICB0aGlzLmlzSHVtYW4gPSBpc0h1bWFuO1xuICAgIHRoaXMuZ2FtZWJvYXJkID0gZ2FtZWJvYXJkO1xuICB9XG5cbiAgX2h1bWFuQXR0YWNrKG90aGVyUGxheWVyLCBwb3MpIHtcbiAgICBvdGhlclBsYXllci5nYW1lYm9hcmQucmVjZWl2ZUF0dGFjayhwb3MpO1xuICB9XG5cbiAgLy8gcmV0dXJucyBldmVudHVhbCBhdHRhY2tlZCBwb3NpdGlvblxuICBfY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpIHtcbiAgICBkbyB7XG4gICAgICBsZXQgW3JhbmRvbU5yMSwgcmFuZG9tTnIyXSA9IHRoaXMuX3JhbmRvbVBhaXIoKTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IFN0cmluZyhyYW5kb21OcjEpICsgXCI6XCIgKyBTdHJpbmcocmFuZG9tTnIyKTtcbiAgICB9IHdoaWxlICghb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zaXRpb24pKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBfcmFuZG9tUGFpcigpIHtcbiAgICBsZXQgcmFuZG9tTnIxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICBsZXQgcmFuZG9tTnIyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApICsgMTtcbiAgICByZXR1cm4gW3JhbmRvbU5yMSwgcmFuZG9tTnIyXTtcbiAgfVxuXG4gIC8vIHJldHVybnMgdGhlIHBvc2l0aW9uIHRoYXQgd2FzIGF0dGFja2VkXG4gIGF0dGFjayhvdGhlclBsYXllciwgcG9zID0gdW5kZWZpbmVkKSB7XG4gICAgaWYgKHRoaXMuaXNIdW1hbikge1xuICAgICAgdGhpcy5faHVtYW5BdHRhY2sob3RoZXJQbGF5ZXIsIHBvcyk7XG4gICAgICByZXR1cm4gcG9zO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNsYXNzIFNoaXAge1xuICAvLyBwb3NpdGlvbnMgPSBbXCIxOjFcIiwgXCIxOjJcIiAsIFwiMTozXCJdIFwicm93OmNvbFwiXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9ucykge1xuICAgIHRoaXMuc2hpcExlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGR1cGxpY2F0ZSB2YWxpZGF0aW9uIG9jY3VycyBpbiBHYW1lYm9hcmQgb2JqZWN0c1xuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmhpdFBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0UG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5zaGlwTGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgcGFkZGluZzogMDtcXG59XFxuYm9keSxcXG5odG1sIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG4uZ3JpZHMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGJhY2tncm91bmQ6IHJnYigxNzUsIDE3NSwgMTc1KTtcXG4gIGhlaWdodDogNjAwcHg7XFxufVxcblxcbi5wbGF5ZXItY29udGFpbmVyIHtcXG4gIGZsZXgtZ3JvdzogMTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGdhcDogNDBweDtcXG4gIHBhZGRpbmc6IDMwcHg7XFxuICBib3JkZXItYm90dG9tOiAxMHB4IHNvbGlkIHJnYig1MSwgNTEsIDUxKTtcXG59XFxuXFxuLnBsYXllci10aXRsZSB7XFxuICBmb250LXNpemU6IDQwcHg7XFxufVxcblxcbi5saW5lIHtcXG4gIGhlaWdodDogMTAwJTtcXG4gIHdpZHRoOiAxMHB4O1xcbiAgYmFja2dyb3VuZDogcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4uYmF0dGxlc2hpcC1ncmlkIHtcXG4gIHdpZHRoOiA0MDBweDtcXG4gIGhlaWdodDogNDAwcHg7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcbn1cXG5cXG4uaHVtYW4gLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXFxuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uaGl0OjphZnRlciB7XFxuICBjb250ZW50OiBcXFwiWFxcXCI7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1MCU7XFxuICB0b3A6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xcbn1cXG5cXG4uc2hpcC5oaXQ6OmFmdGVyIHtcXG4gIGNvbG9yOiByZWQ7XFxufVxcblxcbi5ib3R0b20tY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGVzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlDQUF5QztFQUN6QyxTQUFTO0VBQ1Qsc0JBQXNCO0VBQ3RCLFVBQVU7QUFDWjtBQUNBOztFQUVFLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLGFBQWE7QUFDZjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLHNCQUFzQjtFQUN0QixTQUFTO0VBQ1QsYUFBYTtFQUNiLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osV0FBVztFQUNYLDJCQUEyQjtBQUM3Qjs7QUFFQTtFQUNFLFlBQVk7RUFDWixhQUFhO0VBQ2IsaUJBQWlCO0VBQ2pCLGFBQWE7RUFDYixNQUFNO0VBQ04sdUJBQXVCO0VBQ3ZCLGNBQWM7QUFDaEI7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixTQUFTO0VBQ1QsUUFBUTtFQUNSLGdDQUFnQztBQUNsQzs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGFBQWE7RUFDYix1QkFBdUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcXG4gIG1hcmdpbjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBwYWRkaW5nOiAwO1xcbn1cXG5ib2R5LFxcbmh0bWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbi5ncmlkcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTc1LCAxNzUpO1xcbiAgaGVpZ2h0OiA2MDBweDtcXG59XFxuXFxuLnBsYXllci1jb250YWluZXIge1xcbiAgZmxleC1ncm93OiAxO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgZ2FwOiA0MHB4O1xcbiAgcGFkZGluZzogMzBweDtcXG4gIGJvcmRlci1ib3R0b206IDEwcHggc29saWQgcmdiKDUxLCA1MSwgNTEpO1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDQwMHB4O1xcbiAgaGVpZ2h0OiA0MDBweDtcXG4gIGJhY2tncm91bmQ6IHdoaXRlO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdhcDogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgZmxleC1zaHJpbms6IDA7XFxufVxcblxcbi5ncmlkLWNlbGwge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcblxcbi5odW1hbiAuc2hpcCB7XFxuICBiYWNrZ3JvdW5kOiBibHVlO1xcbn1cXG5cXG4uaGlkZGVuIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5oaXQ6OmFmdGVyIHtcXG4gIGNvbnRlbnQ6IFxcXCJYXFxcIjtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRvcDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxufVxcblxcbi5zaGlwLmhpdDo6YWZ0ZXIge1xcbiAgY29sb3I6IHJlZDtcXG59XFxuXFxuLmJvdHRvbS1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcbmltcG9ydCBcIi4uL3N0eWxlcy9zdHlsZS5jc3NcIjtcblxuLy8gZ2xvYmFsIHZhcmlhYmxlc1xuY29uc3QgZ2FtZUdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYXR0bGVzaGlwLWdyaWRcIik7XG5jb25zdCBbaHVtYW5HcmlkLCBjb21wdXRlckdyaWRdID0gZ2FtZUdyaWRzO1xuY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcbmNvbnN0IGhpdE1hcmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuaGl0TWFyay50ZXh0Q29udGVudCA9IFwiWFwiO1xuaGl0TWFyay5jbGFzc0xpc3QuYWRkKFwiaGl0bWFya1wiLCBcImhpZGRlblwiKTtcbmdyaWRDZWxsLmFwcGVuZENoaWxkKGhpdE1hcmspO1xubGV0IGh1bWFuR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xubGV0IGNvbXB1dGVyR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xubGV0IGh1bWFuID0gbmV3IFBsYXllcih0cnVlLCBodW1hbkdhbWVib2FyZCk7XG5sZXQgY29tcHV0ZXIgPSBuZXcgUGxheWVyKGZhbHNlLCBjb21wdXRlckdhbWVib2FyZCk7XG5sZXQgcGxheWluZyA9IHRydWU7XG5cbi8vIGluaXRpYWwgc3R5bGluZ1xuZnVuY3Rpb24gZ3JpZENyZWF0aW9uKCkge1xuICBnYW1lR3JpZHMuZm9yRWFjaCgoZ2FtZUdyaWQpID0+IHtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtcm93c1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICBnYW1lR3JpZC5zdHlsZVtcImdyaWQtdGVtcGxhdGUtY29sdW1uc1wiXSA9IGByZXBlYXQoMTAsIGF1dG8pYDtcbiAgICAvLyBlbnRlcmluZyBhbGwgZ3JpZCBpdGVtc1xuICAgIGluc2VydEdyaWRDZWxscygxMCwgMTAsIGdhbWVHcmlkLCBncmlkQ2VsbCk7XG4gIH0pO1xuICBjZWxsRXZlbnRMaXN0ZW5lcnMoY29tcHV0ZXJHcmlkKTtcbn1cblxuLy8gcm93cywgY29scyA6IGludCxcbi8vIGdyaWQsIGNlbGwgOiBET00gZWxlbWVudHNcbmZ1bmN0aW9uIGluc2VydEdyaWRDZWxscyhyb3dzLCBjb2xzLCBncmlkLCBjZWxsKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcm93cyAqIGNvbHM7IGkrKykge1xuICAgIGdyaWQuYXBwZW5kQ2hpbGQoY2VsbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNlbGxFdmVudExpc3RlbmVycyhncmlkKSB7XG4gIGdyaWQuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGdyaWROciA9IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoZ3JpZC5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICBodW1hblBsYXlzKGdyaWQsIGdyaWROcik7XG4gICAgfSk7XG4gIH0pO1xufVxuXG4vLyAqKiogVEhJUyBJUyBXSEVSRSBUSEUgVFVSTlMgSEFQUEVOXG5mdW5jdGlvbiBodW1hblBsYXlzKGdyaWQsIGdyaWROcikge1xuICBHYW1lYm9hcmQubWFya0hpdChncmlkLCBncmlkTnIpO1xuICBodW1hbi5hdHRhY2soY29tcHV0ZXIsIEdhbWVib2FyZC5maW5kUG9zaXRpb25Gcm9tR3JpZE5yKGdyaWROciwgMTApKTtcbiAgLy8gY2hlY2sgaWYgaHVtYW4gaGFzIHdvblxuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG5cbiAgICByZXR1cm47XG4gIH1cbiAgY29tcHV0ZXJQbGF5cygpO1xufVxuXG4vLyBjb21wdXRlcidzIHR1cm5cbmZ1bmN0aW9uIGNvbXB1dGVyUGxheXMoKSB7XG4gIGxldCBhdHRhY2tQb3NpdGlvbiA9IGNvbXB1dGVyLmF0dGFjayhodW1hbik7XG4gIGxldCByb3dWYWx1ZSA9IEdhbWVib2FyZC5nZXRSb3dWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBjb2xWYWx1ZSA9IEdhbWVib2FyZC5nZXRDb2xWYWx1ZShhdHRhY2tQb3NpdGlvbik7XG4gIGxldCBncmlkTnIgPSBHYW1lYm9hcmQuZmluZEdyaWROcigxMCwgcm93VmFsdWUsIGNvbFZhbHVlKTtcbiAgR2FtZWJvYXJkLm1hcmtIaXQoaHVtYW5HcmlkLCBncmlkTnIpO1xuICBpZiAoY2hlY2tXaW4oKSkge1xuICAgIC8vIGxhdGVyIHJlc2V0XG4gICAgcmV0dXJuO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNoZWNrV2luKCkge1xuICBpZiAoaHVtYW5HYW1lYm9hcmQuYWxsU3VuaygpKSB7XG4gICAgd2luTWVzc2FnZShcImNvbXB1dGVyXCIpO1xuICAgIHBsYXlpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmIChjb21wdXRlckdhbWVib2FyZC5hbGxTdW5rKCkpIHtcbiAgICB3aW5NZXNzYWdlKFwiaHVtYW5cIik7XG4gICAgcGxheWluZyA9IGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gd2luTWVzc2FnZSh3aW5uZXIpIHtcbiAgYWxlcnQod2lubmVyICsgXCIgd29uXCIpO1xufVxuXG4vLyAqKiogRk9SIExBVEVSXG5mdW5jdGlvbiByZXNldCgpIHt9XG5cbi8vICoqKiBERUxFVEUgT05DRSBDVVNUT00gTUVUSE9EUyBDUkVBVEVEXG5mdW5jdGlvbiBwbGFjZUluaXRpYWxCb2F0cygpIHtcbiAgbGV0IGRlc3Ryb3llciA9IG5ldyBTaGlwKFtcIjI6MlwiLCBcIjM6MlwiXSk7XG4gIGxldCBjcnVpc2VyID0gbmV3IFNoaXAoW1wiNToyXCIsIFwiNTozXCIsIFwiNTo0XCJdKTtcbiAgaHVtYW5HYW1lYm9hcmQucGxhY2UoZGVzdHJveWVyKTtcbiAgaHVtYW5HYW1lYm9hcmQucGxhY2VJbkdyaWQoaHVtYW5HcmlkLCBkZXN0cm95ZXIpO1xuICBodW1hbkdhbWVib2FyZC5wbGFjZShjcnVpc2VyKTtcbiAgaHVtYW5HYW1lYm9hcmQucGxhY2VJbkdyaWQoaHVtYW5HcmlkLCBjcnVpc2VyKTtcblxuICBsZXQgZGVzdHJveWVyMiA9IG5ldyBTaGlwKFtcIjI6MlwiLCBcIjM6MlwiXSk7XG4gIGxldCBjcnVpc2VyMiA9IG5ldyBTaGlwKFtcIjU6MlwiLCBcIjU6M1wiLCBcIjU6NFwiXSk7XG4gIGNvbXB1dGVyR2FtZWJvYXJkLnBsYWNlKGRlc3Ryb3llcjIpO1xuICBjb21wdXRlckdhbWVib2FyZC5wbGFjZUluR3JpZChjb21wdXRlckdyaWQsIGRlc3Ryb3llcjIpO1xuICBjb21wdXRlckdhbWVib2FyZC5wbGFjZShjcnVpc2VyKTtcbiAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VJbkdyaWQoY29tcHV0ZXJHcmlkLCBjcnVpc2VyMik7XG59XG5cbmdyaWRDcmVhdGlvbigpO1xucGxhY2VJbml0aWFsQm9hdHMoKTtcbiJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJoaXRQb3NpdGlvbnMiLCJzaGlwcyIsInNoaXAiLCJfY2hlY2tWYWxpZFNoaXBQb3NpdGlvbiIsInB1c2giLCJtaW5pbXVtIiwicG9zaXRpb25zIiwicmVkdWNlIiwic3RvcmVkIiwicGxhY2VkUG9zIiwiZ2V0Um93VmFsdWUiLCJJbmZpbml0eSIsImdldENvbFZhbHVlIiwicG9zIiwiZGlyZWN0aW9uIiwidmFsIiwicm93VmFsdWUiLCJuZXdSb3dWYWx1ZSIsIkVycm9yIiwiU3RyaW5nIiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImNvbFZhbHVlIiwibmV3Q29sVmFsdWUiLCJUeXBlRXJyb3IiLCJuZXdTaGlwIiwic29tZSIsIm5ld1BvcyIsInBsYWNlZFNoaXAiLCJtaW5Sb3dWYWx1ZSIsIl9taW5Sb3dWYWx1ZSIsIm1heFJvd1ZhbHVlIiwiX21heFJvd1ZhbHVlIiwibWluQ29sVmFsdWUiLCJfbWluQ29sVmFsdWUiLCJtYXhDb2xWYWx1ZSIsIl9tYXhDb2xWYWx1ZSIsImluY2x1ZGVzIiwiaSIsImxlbmd0aCIsImhpdCIsImV2ZXJ5IiwiaXNTdW5rIiwiZ3JpZCIsInNoaXBMZW5ndGgiLCJmb3JFYWNoIiwiZ3JpZE5yIiwiZmluZEdyaWROciIsImdyaWROb2RlIiwiY2hpbGRyZW4iLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRBdHRyaWJ1dGUiLCJOdW1iZXIiLCJuciIsImNvbHMiLCJNYXRoIiwiZmxvb3IiLCJyb3ciLCJmaW5kR3JpZFJvdyIsImNvbCIsImZpbmRHcmlkQ29sIiwiY29udGFpbnMiLCJQbGF5ZXIiLCJpc0h1bWFuIiwiZ2FtZWJvYXJkIiwib3RoZXJQbGF5ZXIiLCJyZWNlaXZlQXR0YWNrIiwiX3JhbmRvbVBhaXIiLCJyYW5kb21OcjEiLCJyYW5kb21OcjIiLCJwb3NpdGlvbiIsInJhbmRvbSIsInVuZGVmaW5lZCIsIl9odW1hbkF0dGFjayIsIl9jb21wdXRlckF0dGFjayIsIlNoaXAiLCJzdW5rIiwiZ2FtZUdyaWRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaHVtYW5HcmlkIiwiY29tcHV0ZXJHcmlkIiwiZ3JpZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiaGl0TWFyayIsInRleHRDb250ZW50IiwiYXBwZW5kQ2hpbGQiLCJodW1hbkdhbWVib2FyZCIsImNvbXB1dGVyR2FtZWJvYXJkIiwiaHVtYW4iLCJjb21wdXRlciIsInBsYXlpbmciLCJncmlkQ3JlYXRpb24iLCJnYW1lR3JpZCIsInN0eWxlIiwiaW5zZXJ0R3JpZENlbGxzIiwiY2VsbEV2ZW50TGlzdGVuZXJzIiwicm93cyIsImNlbGwiLCJjbG9uZU5vZGUiLCJjaGlsZE5vZGVzIiwibm9kZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJBcnJheSIsInByb3RvdHlwZSIsImNhbGwiLCJodW1hblBsYXlzIiwibWFya0hpdCIsImF0dGFjayIsImZpbmRQb3NpdGlvbkZyb21HcmlkTnIiLCJjaGVja1dpbiIsImNvbXB1dGVyUGxheXMiLCJhdHRhY2tQb3NpdGlvbiIsImFsbFN1bmsiLCJ3aW5NZXNzYWdlIiwid2lubmVyIiwiYWxlcnQiLCJyZXNldCIsInBsYWNlSW5pdGlhbEJvYXRzIiwiZGVzdHJveWVyIiwiY3J1aXNlciIsInBsYWNlIiwicGxhY2VJbkdyaWQiLCJkZXN0cm95ZXIyIiwiY3J1aXNlcjIiXSwic291cmNlUm9vdCI6IiJ9
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
    key: "_getRowValue",
    value: function _getRowValue(pos) {
      return Number(pos.substring(0, pos.indexOf(":")));
    }
  }, {
    key: "_getColValue",
    value: function _getColValue(pos) {
      return Number(pos.substring(pos.indexOf(":") + 1));
    }
  }, {
    key: "_minRowValue",
    value: function _minRowValue(ship) {
      var _this = this;

      var minimum = ship.positions.reduce(function (stored, placedPos) {
        if (_this._getRowValue(placedPos) < stored) {
          return _this._getRowValue(placedPos);
        }

        return stored;
      }, Infinity);
      return minimum;
    }
  }, {
    key: "_minColValue",
    value: function _minColValue(ship) {
      var _this2 = this;

      return ship.positions.reduce(function (stored, placedPos) {
        if (_this2._getColValue(placedPos) < stored) {
          return _this2._getColValue(placedPos);
        }

        return stored;
      }, Infinity);
    }
  }, {
    key: "_maxRowValue",
    value: function _maxRowValue(ship) {
      var _this3 = this;

      return ship.positions.reduce(function (stored, placedPos) {
        if (_this3._getRowValue(placedPos) > stored) {
          return _this3._getRowValue(placedPos);
        }

        return stored;
      }, -Infinity);
    }
  }, {
    key: "_maxColValue",
    value: function _maxColValue(ship) {
      var _this4 = this;

      return ship.positions.reduce(function (stored, placedPos) {
        if (_this4._getColValue(placedPos) > stored) {
          return _this4._getColValue(placedPos);
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
        var rowValue = this._getRowValue(pos);

        var newRowValue = rowValue + val; // making sure it is within range

        if (newRowValue > 10 || newRowValue < 1) {
          throw new Error("Outside Of Range Error: POSITION VALUE(S) OUTSIDE OF ALLOWED RANGE");
        } // concatenating to it the rest of the position


        return String(newRowValue) + pos.substring(pos.indexOf(":"));
      } else if (direction === "col") {
        // this is the reverse of the row branch
        var colValue = this._getColValue(pos);

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
      var _this5 = this;

      // gives true if a single value is invalid, so must be inverted
      return !newShip.positions.some(function (newPos) {
        var newRowValue = _this5._getRowValue(newPos);

        var newColValue = _this5._getColValue(newPos); // get min + max value of row and col for each ship and check if the new position values are within them +-1
        // if a single value is INVALID, return TRUE


        return _this5.ships.some(function (placedShip) {
          var minRowValue = _this5._minRowValue(placedShip);

          var maxRowValue = _this5._maxRowValue(placedShip);

          var minColValue = _this5._minColValue(placedShip);

          var maxColValue = _this5._maxColValue(placedShip);

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
    key: "_findGridRow",
    value: function _findGridRow(nr, cols) {
      return Math.floor(nr / cols) + 1;
    }
  }, {
    key: "_findGridCol",
    value: function _findGridCol(nr, row, cols) {
      return nr - (row - 1) * cols + 1;
    } // row and col starting from 1

  }, {
    key: "_findGridNr",
    value: function _findGridNr(cols, row, col) {
      return cols * (row - 1) + (col - 1);
    } // DOM manipulation
    // placing the ship visually on given grid

  }, {
    key: "placeInGrid",
    value: function placeInGrid(grid, positions) {
      var _this6 = this;

      var shipLength = positions.length;
      positions.forEach(function (pos) {
        var gridNr = _this6._findGridNr(10, _this6._getRowValue(pos), _this6._getColValue(pos));

        var gridNode = grid.children[gridNr];
        gridNode.classList.add("ship");
        gridNode.setAttribute("id", "ship" + String(shipLength));
      });
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
    }
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
    }
  }, {
    key: "_randomPair",
    value: function _randomPair() {
      var randomNr1 = Math.floor(Math.random() * 10) + 1;
      var randomNr2 = Math.floor(Math.random() * 10) + 1;
      return [randomNr1, randomNr2];
    }
  }, {
    key: "attack",
    value: function attack(otherPlayer) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

      if (this.isHuman) {
        this._humanAttack(otherPlayer, pos);
      } else {
        this._computerAttack(otherPlayer);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\nbody {\n  display: flex;\n  background: rgb(175, 175, 175);\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 40px;\n  padding: 30px;\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 30vw;\n  height: 30vw;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  border: 1px solid black;\n}\n\n.human .ship {\n  background: blue;\n}\n", "",{"version":3,"sources":["webpack://./styles/style.css"],"names":[],"mappings":"AAAA;EACE,yCAAyC;EACzC,SAAS;AACX;AACA;;EAEE,WAAW;EACX,YAAY;AACd;AACA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,SAAS;EACT,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,YAAY;EACZ,WAAW;EACX,2BAA2B;AAC7B;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,iBAAiB;EACjB,aAAa;EACb,MAAM;EACN,uBAAuB;EACvB,cAAc;AAChB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":["* {\n  font-family: Arial, Helvetica, sans-serif;\n  margin: 0;\n}\nbody,\nhtml {\n  width: 100%;\n  height: 100%;\n}\nbody {\n  display: flex;\n  background: rgb(175, 175, 175);\n}\n\n.player-container {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  flex-direction: column;\n  gap: 40px;\n  padding: 30px;\n}\n\n.player-title {\n  font-size: 40px;\n}\n\n.line {\n  height: 100%;\n  width: 10px;\n  background: rgb(51, 51, 51);\n}\n\n.battleship-grid {\n  width: 30vw;\n  height: 30vw;\n  background: white;\n  display: grid;\n  gap: 0;\n  border: 1px solid black;\n  flex-shrink: 0;\n}\n\n.grid-cell {\n  border: 1px solid black;\n}\n\n.human .ship {\n  background: blue;\n}\n"],"sourceRoot":""}]);
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




 // DOM elements

var gameGrids = document.querySelectorAll(".battleship-grid");

var _gameGrids = _slicedToArray(gameGrids, 2),
    humanGrid = _gameGrids[0],
    computerGrid = _gameGrids[1];

var gridCell = document.createElement("div");
gridCell.classList.add("grid-cell"); // initial styling

function gridCreation() {
  gameGrids.forEach(function (gameGrid) {
    gameGrid.style["grid-template-rows"] = "repeat(10, auto)";
    gameGrid.style["grid-template-columns"] = "repeat(10, auto)"; // entering all grid items

    insertGridCells(10, 10, gameGrid, gridCell);
    indexEventListeners(gameGrid);
  });
} // rows, cols : int,
// grid, cell : DOM elements


function insertGridCells(rows, cols, grid, cell) {
  for (var i = 0; i < rows * cols; i++) {
    grid.appendChild(cell.cloneNode(true));
  }
}

function indexEventListeners(grid) {
  grid.childNodes.forEach(function (node) {
    node.addEventListener("click", function () {
      console.log(Array.prototype.indexOf.call(grid.children, node));
    });
  });
}

gridCreation();
var gameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard();
var ship1 = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(["2:1", "2:2", "2:3", "2:4"]);
gameboard.placeInGrid(humanGrid, ship1.positions);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEtBQXRCLENBQWxCLENBQVo7QUFFQWIsU0FBUyxDQUFDeUMsV0FBVixDQUFzQnRCLFNBQXRCLEVBQWlDcUIsS0FBSyxDQUFDNUYsU0FBdkMsRSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3R5bGVzL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3N0eWxlcy9zdHlsZS5jc3M/YTJmNSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gMTB4MTAgeDpBLUogeTogMS0xMFxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnNoaXBzID0gW107XG4gIH1cblxuICBwbGFjZShzaGlwKSB7XG4gICAgaWYgKHRoaXMuX2NoZWNrVmFsaWRTaGlwUG9zaXRpb24oc2hpcCkpIHtcbiAgICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfZ2V0Um93VmFsdWUocG9zKSB7XG4gICAgcmV0dXJuIE51bWJlcihwb3Muc3Vic3RyaW5nKDAsIHBvcy5pbmRleE9mKFwiOlwiKSkpO1xuICB9XG5cbiAgX2dldENvbFZhbHVlKHBvcykge1xuICAgIHJldHVybiBOdW1iZXIocG9zLnN1YnN0cmluZyhwb3MuaW5kZXhPZihcIjpcIikgKyAxKSk7XG4gIH1cblxuICBfbWluUm93VmFsdWUoc2hpcCkge1xuICAgIGxldCBtaW5pbXVtID0gc2hpcC5wb3NpdGlvbnMucmVkdWNlKChzdG9yZWQsIHBsYWNlZFBvcykgPT4ge1xuICAgICAgaWYgKHRoaXMuX2dldFJvd1ZhbHVlKHBsYWNlZFBvcykgPCBzdG9yZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFJvd1ZhbHVlKHBsYWNlZFBvcyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RvcmVkO1xuICAgIH0sIEluZmluaXR5KTtcbiAgICByZXR1cm4gbWluaW11bTtcbiAgfVxuICBfbWluQ29sVmFsdWUoc2hpcCkge1xuICAgIHJldHVybiBzaGlwLnBvc2l0aW9ucy5yZWR1Y2UoKHN0b3JlZCwgcGxhY2VkUG9zKSA9PiB7XG4gICAgICBpZiAodGhpcy5fZ2V0Q29sVmFsdWUocGxhY2VkUG9zKSA8IHN0b3JlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0Q29sVmFsdWUocGxhY2VkUG9zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdG9yZWQ7XG4gICAgfSwgSW5maW5pdHkpO1xuICB9XG4gIF9tYXhSb3dWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmICh0aGlzLl9nZXRSb3dWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRSb3dWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCAtSW5maW5pdHkpO1xuICB9XG4gIF9tYXhDb2xWYWx1ZShzaGlwKSB7XG4gICAgcmV0dXJuIHNoaXAucG9zaXRpb25zLnJlZHVjZSgoc3RvcmVkLCBwbGFjZWRQb3MpID0+IHtcbiAgICAgIGlmICh0aGlzLl9nZXRDb2xWYWx1ZShwbGFjZWRQb3MpID4gc3RvcmVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRDb2xWYWx1ZShwbGFjZWRQb3MpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0b3JlZDtcbiAgICB9LCAtSW5maW5pdHkpO1xuICB9XG5cbiAgLy8gZGlyZWN0aW9uID0gXCJyb3dcIiAvIFwiY29sXCJcbiAgLy8gcG9zID0gXCJyb3c6Y29sXCJcbiAgX2FkZFRvUG9zaXRpb24ocG9zLCBkaXJlY3Rpb24sIHZhbCkge1xuICAgIGlmIChkaXJlY3Rpb24gPT09IFwicm93XCIpIHtcbiAgICAgIC8vIGdldHRpbmcgZmlyc3QgbnVtYmVyXG4gICAgICBsZXQgcm93VmFsdWUgPSB0aGlzLl9nZXRSb3dWYWx1ZShwb3MpO1xuICAgICAgbGV0IG5ld1Jvd1ZhbHVlID0gcm93VmFsdWUgKyB2YWw7XG4gICAgICAvLyBtYWtpbmcgc3VyZSBpdCBpcyB3aXRoaW4gcmFuZ2VcbiAgICAgIGlmIChuZXdSb3dWYWx1ZSA+IDEwIHx8IG5ld1Jvd1ZhbHVlIDwgMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgXCJPdXRzaWRlIE9mIFJhbmdlIEVycm9yOiBQT1NJVElPTiBWQUxVRShTKSBPVVRTSURFIE9GIEFMTE9XRUQgUkFOR0VcIixcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIC8vIGNvbmNhdGVuYXRpbmcgdG8gaXQgdGhlIHJlc3Qgb2YgdGhlIHBvc2l0aW9uXG4gICAgICByZXR1cm4gU3RyaW5nKG5ld1Jvd1ZhbHVlKSArIHBvcy5zdWJzdHJpbmcocG9zLmluZGV4T2YoXCI6XCIpKTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdGlvbiA9PT0gXCJjb2xcIikge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgcmV2ZXJzZSBvZiB0aGUgcm93IGJyYW5jaFxuICAgICAgbGV0IGNvbFZhbHVlID0gdGhpcy5fZ2V0Q29sVmFsdWUocG9zKTtcbiAgICAgIGxldCBuZXdDb2xWYWx1ZSA9IGNvbFZhbHVlICsgdmFsO1xuICAgICAgaWYgKG5ld0NvbFZhbHVlID4gMTAgfHwgbmV3Q29sVmFsdWUgPCAxKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBcIk91dHNpZGUgT2YgUmFuZ2UgRXJyb3I6IFBPU0lUSU9OIFZBTFVFKFMpIE9VVFNJREUgT0YgQUxMT1dFRCBSQU5HRVwiLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHBvcy5zdWJzdHJpbmcoMCwgcG9zLmluZGV4T2YoXCI6XCIpICsgMSkgKyBTdHJpbmcobmV3Q29sVmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSU5WQUxJRCBESVJFQ1RJT04gUEFSQU1FVEVSXCIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIGNoZWNrcyBpZiBzaGlwJ3MgcG9zaXRpb24gaXMgdmFsaWQgYnkgY2hlY2tpbmcgaXQgaXMgbmVhciBvciBvdmVybGFwcGluZyBleGlzdGluZyBzaGlwXG4gIF9jaGVja1ZhbGlkU2hpcFBvc2l0aW9uKG5ld1NoaXApIHtcbiAgICAvLyBnaXZlcyB0cnVlIGlmIGEgc2luZ2xlIHZhbHVlIGlzIGludmFsaWQsIHNvIG11c3QgYmUgaW52ZXJ0ZWRcbiAgICByZXR1cm4gIW5ld1NoaXAucG9zaXRpb25zLnNvbWUoKG5ld1BvcykgPT4ge1xuICAgICAgbGV0IG5ld1Jvd1ZhbHVlID0gdGhpcy5fZ2V0Um93VmFsdWUobmV3UG9zKTtcbiAgICAgIGxldCBuZXdDb2xWYWx1ZSA9IHRoaXMuX2dldENvbFZhbHVlKG5ld1Bvcyk7XG5cbiAgICAgIC8vIGdldCBtaW4gKyBtYXggdmFsdWUgb2Ygcm93IGFuZCBjb2wgZm9yIGVhY2ggc2hpcCBhbmQgY2hlY2sgaWYgdGhlIG5ldyBwb3NpdGlvbiB2YWx1ZXMgYXJlIHdpdGhpbiB0aGVtICstMVxuICAgICAgLy8gaWYgYSBzaW5nbGUgdmFsdWUgaXMgSU5WQUxJRCwgcmV0dXJuIFRSVUVcbiAgICAgIHJldHVybiB0aGlzLnNoaXBzLnNvbWUoKHBsYWNlZFNoaXApID0+IHtcbiAgICAgICAgbGV0IG1pblJvd1ZhbHVlID0gdGhpcy5fbWluUm93VmFsdWUocGxhY2VkU2hpcCk7XG4gICAgICAgIGxldCBtYXhSb3dWYWx1ZSA9IHRoaXMuX21heFJvd1ZhbHVlKHBsYWNlZFNoaXApO1xuICAgICAgICBsZXQgbWluQ29sVmFsdWUgPSB0aGlzLl9taW5Db2xWYWx1ZShwbGFjZWRTaGlwKTtcbiAgICAgICAgbGV0IG1heENvbFZhbHVlID0gdGhpcy5fbWF4Q29sVmFsdWUocGxhY2VkU2hpcCk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIG5ld1Jvd1ZhbHVlID49IG1pblJvd1ZhbHVlIC0gMSAmJlxuICAgICAgICAgIG5ld1Jvd1ZhbHVlIDw9IG1heFJvd1ZhbHVlICsgMSAmJlxuICAgICAgICAgIG5ld0NvbFZhbHVlID49IG1pbkNvbFZhbHVlIC0gMSAmJlxuICAgICAgICAgIG5ld0NvbFZhbHVlIDw9IG1heENvbFZhbHVlICsgMVxuICAgICAgICApIHtcbiAgICAgICAgICAvLyBJTlZBTElEIFRIRVJFRk9SRSBUUlVFXG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyB3aWxsIGNoZWNrIGlmIHZhbGlkIHBvc2l0aW9uIGFuZCBzZW5kIHRoZSBoaXQsIHRoZSBzaGlwIHdpbGwgdGhlbiBjaGVjayBpZiBpdCBpcyBoaXRcbiAgcmVjZWl2ZUF0dGFjayhwb3MpIHtcbiAgICBpZiAoIXRoaXMuaGl0UG9zaXRpb25zLmluY2x1ZGVzKHBvcykpIHtcbiAgICAgIHRoaXMuaGl0UG9zaXRpb25zLnB1c2gocG9zKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5zaGlwc1tpXS5oaXQocG9zKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgYWxsU3VuaygpIHtcbiAgICBpZiAodGhpcy5zaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBfZmluZEdyaWRSb3cobnIsIGNvbHMpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcihuciAvIGNvbHMpICsgMTtcbiAgfVxuXG4gIF9maW5kR3JpZENvbChuciwgcm93LCBjb2xzKSB7XG4gICAgcmV0dXJuIG5yIC0gKHJvdyAtIDEpICogY29scyArIDE7XG4gIH1cblxuICAvLyByb3cgYW5kIGNvbCBzdGFydGluZyBmcm9tIDFcbiAgX2ZpbmRHcmlkTnIoY29scywgcm93LCBjb2wpIHtcbiAgICByZXR1cm4gY29scyAqIChyb3cgLSAxKSArIChjb2wgLSAxKTtcbiAgfVxuXG4gIC8vIERPTSBtYW5pcHVsYXRpb25cbiAgLy8gcGxhY2luZyB0aGUgc2hpcCB2aXN1YWxseSBvbiBnaXZlbiBncmlkXG4gIHBsYWNlSW5HcmlkKGdyaWQsIHBvc2l0aW9ucykge1xuICAgIGxldCBzaGlwTGVuZ3RoID0gcG9zaXRpb25zLmxlbmd0aDtcbiAgICBwb3NpdGlvbnMuZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICBsZXQgZ3JpZE5yID0gdGhpcy5fZmluZEdyaWROcihcbiAgICAgICAgMTAsXG4gICAgICAgIHRoaXMuX2dldFJvd1ZhbHVlKHBvcyksXG4gICAgICAgIHRoaXMuX2dldENvbFZhbHVlKHBvcyksXG4gICAgICApO1xuICAgICAgbGV0IGdyaWROb2RlID0gZ3JpZC5jaGlsZHJlbltncmlkTnJdO1xuICAgICAgZ3JpZE5vZGUuY2xhc3NMaXN0LmFkZChcInNoaXBcIik7XG4gICAgICBncmlkTm9kZS5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInNoaXBcIiArIFN0cmluZyhzaGlwTGVuZ3RoKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJjbGFzcyBQbGF5ZXIge1xuICAvLyBpc0h1bWFuID0gdHJ1ZSAvIGZhbHNlXG4gIGNvbnN0cnVjdG9yKGlzSHVtYW4sIGdhbWVib2FyZCkge1xuICAgIHRoaXMuaXNIdW1hbiA9IGlzSHVtYW47XG4gICAgdGhpcy5nYW1lYm9hcmQgPSBnYW1lYm9hcmQ7XG4gIH1cblxuICBfaHVtYW5BdHRhY2sob3RoZXJQbGF5ZXIsIHBvcykge1xuICAgIG90aGVyUGxheWVyLmdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvcyk7XG4gIH1cblxuICBfY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpIHtcbiAgICBkbyB7XG4gICAgICBsZXQgW3JhbmRvbU5yMSwgcmFuZG9tTnIyXSA9IHRoaXMuX3JhbmRvbVBhaXIoKTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IFN0cmluZyhyYW5kb21OcjEpICsgXCI6XCIgKyBTdHJpbmcocmFuZG9tTnIyKTtcbiAgICB9IHdoaWxlICghb3RoZXJQbGF5ZXIuZ2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zaXRpb24pKTtcbiAgfVxuXG4gIF9yYW5kb21QYWlyKCkge1xuICAgIGxldCByYW5kb21OcjEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIGxldCByYW5kb21OcjIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkgKyAxO1xuICAgIHJldHVybiBbcmFuZG9tTnIxLCByYW5kb21OcjJdO1xuICB9XG5cbiAgYXR0YWNrKG90aGVyUGxheWVyLCBwb3MgPSB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5pc0h1bWFuKSB7XG4gICAgICB0aGlzLl9odW1hbkF0dGFjayhvdGhlclBsYXllciwgcG9zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fY29tcHV0ZXJBdHRhY2sob3RoZXJQbGF5ZXIpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgeyBQbGF5ZXIgfTtcbiIsImNsYXNzIFNoaXAge1xuICAvLyBwb3NpdGlvbnMgPSBbXCIxOjFcIiwgXCIxOjJcIiAsIFwiMTozXCJdIFwicm93OmNvbFwiXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9ucykge1xuICAgIHRoaXMuc2hpcExlbmd0aCA9IHBvc2l0aW9ucy5sZW5ndGg7XG4gICAgdGhpcy5wb3NpdGlvbnMgPSBwb3NpdGlvbnM7XG4gICAgdGhpcy5oaXRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIGR1cGxpY2F0ZSB2YWxpZGF0aW9uIG9jY3VycyBpbiBHYW1lYm9hcmQgb2JqZWN0c1xuICBoaXQocG9zaXRpb24pIHtcbiAgICBpZiAodGhpcy5wb3NpdGlvbnMuaW5jbHVkZXMocG9zaXRpb24pKSB7XG4gICAgICB0aGlzLmhpdFBvc2l0aW9ucy5wdXNoKHBvc2l0aW9uKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0UG9zaXRpb25zLmxlbmd0aCA9PT0gdGhpcy5zaGlwTGVuZ3RoKSB7XG4gICAgICB0aGlzLnN1bmsgPSB0cnVlO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgeyBTaGlwIH07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxufVxcbmJvZHksXFxuaHRtbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTc1LCAxNzUpO1xcbn1cXG5cXG4ucGxheWVyLWNvbnRhaW5lciB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDQwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDMwdnc7XFxuICBoZWlnaHQ6IDMwdnc7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uaHVtYW4gLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGVzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlDQUF5QztFQUN6QyxTQUFTO0FBQ1g7QUFDQTs7RUFFRSxXQUFXO0VBQ1gsWUFBWTtBQUNkO0FBQ0E7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0FBQ2hDOztBQUVBO0VBQ0UsWUFBWTtFQUNaLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsc0JBQXNCO0VBQ3RCLFNBQVM7RUFDVCxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxlQUFlO0FBQ2pCOztBQUVBO0VBQ0UsWUFBWTtFQUNaLFdBQVc7RUFDWCwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsWUFBWTtFQUNaLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2IsTUFBTTtFQUNOLHVCQUF1QjtFQUN2QixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsdUJBQXVCO0FBQ3pCOztBQUVBO0VBQ0UsZ0JBQWdCO0FBQ2xCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxuICBtYXJnaW46IDA7XFxufVxcbmJvZHksXFxuaHRtbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG59XFxuYm9keSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYmFja2dyb3VuZDogcmdiKDE3NSwgMTc1LCAxNzUpO1xcbn1cXG5cXG4ucGxheWVyLWNvbnRhaW5lciB7XFxuICBmbGV4LWdyb3c6IDE7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDQwcHg7XFxuICBwYWRkaW5nOiAzMHB4O1xcbn1cXG5cXG4ucGxheWVyLXRpdGxlIHtcXG4gIGZvbnQtc2l6ZTogNDBweDtcXG59XFxuXFxuLmxpbmUge1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgd2lkdGg6IDEwcHg7XFxuICBiYWNrZ3JvdW5kOiByZ2IoNTEsIDUxLCA1MSk7XFxufVxcblxcbi5iYXR0bGVzaGlwLWdyaWQge1xcbiAgd2lkdGg6IDMwdnc7XFxuICBoZWlnaHQ6IDMwdnc7XFxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBnYXA6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGZsZXgtc2hyaW5rOiAwO1xcbn1cXG5cXG4uZ3JpZC1jZWxsIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbn1cXG5cXG4uaHVtYW4gLnNoaXAge1xcbiAgYmFja2dyb3VuZDogYmx1ZTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICogYXMgc2hpcEZpbGUgZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0ICogYXMgZ2FtZWJvYXJkRmlsZSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcbmltcG9ydCAqIGFzIHBsYXllckZpbGUgZnJvbSBcIi4vcGxheWVyXCI7XG5pbXBvcnQgXCIuLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG5cbi8vIERPTSBlbGVtZW50c1xuY29uc3QgZ2FtZUdyaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5iYXR0bGVzaGlwLWdyaWRcIik7XG5jb25zdCBbaHVtYW5HcmlkLCBjb21wdXRlckdyaWRdID0gZ2FtZUdyaWRzO1xuY29uc3QgZ3JpZENlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuZ3JpZENlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcblxuLy8gaW5pdGlhbCBzdHlsaW5nXG5mdW5jdGlvbiBncmlkQ3JlYXRpb24oKSB7XG4gIGdhbWVHcmlkcy5mb3JFYWNoKChnYW1lR3JpZCkgPT4ge1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1yb3dzXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIGdhbWVHcmlkLnN0eWxlW1wiZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zXCJdID0gYHJlcGVhdCgxMCwgYXV0bylgO1xuICAgIC8vIGVudGVyaW5nIGFsbCBncmlkIGl0ZW1zXG4gICAgaW5zZXJ0R3JpZENlbGxzKDEwLCAxMCwgZ2FtZUdyaWQsIGdyaWRDZWxsKTtcbiAgICBpbmRleEV2ZW50TGlzdGVuZXJzKGdhbWVHcmlkKTtcbiAgfSk7XG59XG5cbi8vIHJvd3MsIGNvbHMgOiBpbnQsXG4vLyBncmlkLCBjZWxsIDogRE9NIGVsZW1lbnRzXG5mdW5jdGlvbiBpbnNlcnRHcmlkQ2VsbHMocm93cywgY29scywgZ3JpZCwgY2VsbCkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJvd3MgKiBjb2xzOyBpKyspIHtcbiAgICBncmlkLmFwcGVuZENoaWxkKGNlbGwuY2xvbmVOb2RlKHRydWUpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmRleEV2ZW50TGlzdGVuZXJzKGdyaWQpIHtcbiAgZ3JpZC5jaGlsZE5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZyhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGdyaWQuY2hpbGRyZW4sIG5vZGUpKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmdyaWRDcmVhdGlvbigpO1xuXG5sZXQgZ2FtZWJvYXJkID0gbmV3IGdhbWVib2FyZEZpbGUuR2FtZWJvYXJkKCk7XG5sZXQgc2hpcDEgPSBuZXcgc2hpcEZpbGUuU2hpcChbXCIyOjFcIiwgXCIyOjJcIiwgXCIyOjNcIiwgXCIyOjRcIl0pO1xuXG5nYW1lYm9hcmQucGxhY2VJbkdyaWQoaHVtYW5HcmlkLCBzaGlwMS5wb3NpdGlvbnMpO1xuIl0sIm5hbWVzIjpbIkdhbWVib2FyZCIsImhpdFBvc2l0aW9ucyIsInNoaXBzIiwic2hpcCIsIl9jaGVja1ZhbGlkU2hpcFBvc2l0aW9uIiwicHVzaCIsInBvcyIsIk51bWJlciIsInN1YnN0cmluZyIsImluZGV4T2YiLCJtaW5pbXVtIiwicG9zaXRpb25zIiwicmVkdWNlIiwic3RvcmVkIiwicGxhY2VkUG9zIiwiX2dldFJvd1ZhbHVlIiwiSW5maW5pdHkiLCJfZ2V0Q29sVmFsdWUiLCJkaXJlY3Rpb24iLCJ2YWwiLCJyb3dWYWx1ZSIsIm5ld1Jvd1ZhbHVlIiwiRXJyb3IiLCJTdHJpbmciLCJjb2xWYWx1ZSIsIm5ld0NvbFZhbHVlIiwiVHlwZUVycm9yIiwibmV3U2hpcCIsInNvbWUiLCJuZXdQb3MiLCJwbGFjZWRTaGlwIiwibWluUm93VmFsdWUiLCJfbWluUm93VmFsdWUiLCJtYXhSb3dWYWx1ZSIsIl9tYXhSb3dWYWx1ZSIsIm1pbkNvbFZhbHVlIiwiX21pbkNvbFZhbHVlIiwibWF4Q29sVmFsdWUiLCJfbWF4Q29sVmFsdWUiLCJpbmNsdWRlcyIsImkiLCJsZW5ndGgiLCJoaXQiLCJldmVyeSIsImlzU3VuayIsIm5yIiwiY29scyIsIk1hdGgiLCJmbG9vciIsInJvdyIsImNvbCIsImdyaWQiLCJzaGlwTGVuZ3RoIiwiZm9yRWFjaCIsImdyaWROciIsIl9maW5kR3JpZE5yIiwiZ3JpZE5vZGUiLCJjaGlsZHJlbiIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsIlBsYXllciIsImlzSHVtYW4iLCJnYW1lYm9hcmQiLCJvdGhlclBsYXllciIsInJlY2VpdmVBdHRhY2siLCJfcmFuZG9tUGFpciIsInJhbmRvbU5yMSIsInJhbmRvbU5yMiIsInBvc2l0aW9uIiwicmFuZG9tIiwidW5kZWZpbmVkIiwiX2h1bWFuQXR0YWNrIiwiX2NvbXB1dGVyQXR0YWNrIiwiU2hpcCIsInN1bmsiLCJzaGlwRmlsZSIsImdhbWVib2FyZEZpbGUiLCJwbGF5ZXJGaWxlIiwiZ2FtZUdyaWRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaHVtYW5HcmlkIiwiY29tcHV0ZXJHcmlkIiwiZ3JpZENlbGwiLCJjcmVhdGVFbGVtZW50IiwiZ3JpZENyZWF0aW9uIiwiZ2FtZUdyaWQiLCJzdHlsZSIsImluc2VydEdyaWRDZWxscyIsImluZGV4RXZlbnRMaXN0ZW5lcnMiLCJyb3dzIiwiY2VsbCIsImFwcGVuZENoaWxkIiwiY2xvbmVOb2RlIiwiY2hpbGROb2RlcyIsIm5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiY29uc29sZSIsImxvZyIsIkFycmF5IiwicHJvdG90eXBlIiwiY2FsbCIsInNoaXAxIiwicGxhY2VJbkdyaWQiXSwic291cmNlUm9vdCI6IiJ9
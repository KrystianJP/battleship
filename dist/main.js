(()=>{"use strict";function e(e,i){for(var t=0;t<i.length;t++){var n=i[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var i;function t(e,i){for(var t=0;t<i.length;t++){var n=i[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function n(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}"ids"in(i=function(){function i(e){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,i),this.shipLength=e.length,this.positions=e,this.hitPositions=[],this.sunk=!1,this.id=i.ids,i.ids++}var t,n;return t=i,(n=[{key:"hit",value:function(e){return!!this.positions.includes(e)&&(this.hitPositions.push(e),!0)}},{key:"isSunk",value:function(){return this.hitPositions.length===this.shipLength&&(this.sunk=!0,!0)}}])&&e(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),i}())?Object.defineProperty(i,"ids",{value:0,enumerable:!0,configurable:!0,writable:!0}):i.ids=0;var r=function(){function e(){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e),this.shipPositions=[],this.hitPositions=[],this.ships=[]}var i,n;return i=e,(n=[{key:"place",value:function(e){var i=this;return!!this._checkValidShipPosition(e)&&(e.positions.forEach((function(e){return i.shipPositions.push(e)})),this.ships.push(e),!0)}},{key:"_getRowValue",value:function(e){return Number(e.substring(0,e.indexOf(":")))}},{key:"_getColValue",value:function(e){return Number(e.substring(e.indexOf(":")+1))}},{key:"_minRowValue",value:function(e){var i=this;return e.positions.reduce((function(e,t){return i._getRowValue(t)<e?i._getRowValue(t):e}),1/0)}},{key:"_minColValue",value:function(e){var i=this;return e.positions.reduce((function(e,t){return i._getColValue(t)<e?i._getColValue(t):e}),1/0)}},{key:"_maxRowValue",value:function(e){var i=this;return e.positions.reduce((function(e,t){return i._getRowValue(t)>e?i._getRowValue(t):e}),-1/0)}},{key:"_maxColValue",value:function(e){var i=this;return e.positions.reduce((function(e,t){return i._getColValue(t)>e?i._getColValue(t):e}),-1/0)}},{key:"_addToPosition",value:function(i,t,n){if("row"===t){var r=this._getRowValue(i)+n;if(r>e.rowSize||r<1)throw new Error("Outside Of Range Error: POSITION VALUE(S) OUTSIDE OF ALLOWED RANGE");return String(r)+i.substring(i.indexOf(":"))}if("col"===t){var o=this._getColValue(i)+n;if(o>e.colSize||o<1)throw new Error("Outside Of Range Error: POSITION VALUE(S) OUTSIDE OF ALLOWED RANGE");return i.substring(0,i.indexOf(":")+1)+String(o)}throw new TypeError("INVALID DIRECTION PARAMETER")}},{key:"_checkValidShipPosition",value:function(e){var i=this;return!e.positions.some((function(e){var t=i._getRowValue(e),n=i._getColValue(e);return i.ships.some((function(e){var r=i._minRowValue(e),o=i._maxRowValue(e),u=i._minColValue(e),s=i._maxColValue(e);return t>=r-1&&t<=o+1&&n>=u-1&&n<=s+1}))}))}},{key:"receiveAttack",value:function(e){if(!this.hitPositions.includes(e)){this.hitPositions.push(e);for(var i=0;i<this.ships.length&&!this.ships[i].hit(e);i++);return!0}return!1}},{key:"allSunk",value:function(){return!!this.ships.every((function(e){return e.isSunk()}))}}])&&t(i.prototype,n),Object.defineProperty(i,"prototype",{writable:!1}),e}();n(r,"rowSize",10),n(r,"colSize",10)})();
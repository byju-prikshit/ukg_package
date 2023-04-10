"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;
function isEmpty(val) {
  return val === undefined || val === null || val.length == 0;
}
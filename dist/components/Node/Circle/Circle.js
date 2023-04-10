"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Circle;
var _react = _interopRequireDefault(require("react"));
require("./Style.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Circle(_ref) {
  let {
    text,
    radius = "50%",
    background = "background-color1"
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "node-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "node-circle default-node-color ".concat(background),
    style: {
      borderRadius: radius
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "node-text",
    title: text
  }, text)));
}
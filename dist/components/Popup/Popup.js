"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Popup;
var _react = _interopRequireDefault(require("react"));
require("./Styles.css");
var _antd = require("antd");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function Popup(props) {
  return props.trigger ? /*#__PURE__*/_react.default.createElement("div", {
    className: "popup"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "popup-inner ",
    style: {
      width: '100%',
      padding: '1rem'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'end'
    }
  }, " ", /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: () => props.setTrigger(false)
  }, "Close")), props.children)) : "";
}
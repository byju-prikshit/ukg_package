"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SlideDrawer;
var _react = _interopRequireDefault(require("react"));
var _antd = require("antd");
require("./Styles.css");
var _icons = require("@ant-design/icons");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function SlideDrawer(_ref) {
  let {
    trigger,
    setTrigger,
    children,
    flexBasis = "20em"
  } = _ref;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: trigger ? {
      flexBasis: flexBasis
    } : {
      display: "none"
    },
    className: "slider-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "end",
      margin: "0.5rem"
    }
  }, " ", /*#__PURE__*/_react.default.createElement(_antd.Button, {
    type: "primary",
    onClick: () => setTrigger()
  }, "Close")), children);
}
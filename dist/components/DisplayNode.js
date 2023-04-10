"use strict";

require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DisplayNode;
var _react = _interopRequireWildcard(require("react"));
var _Circle = _interopRequireDefault(require("./Node/Circle/Circle"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function DisplayNode(_ref) {
  let {
    event,
    handleNodeClick,
    preSelectedNodeId = null,
    graphRef = null,
    setFitCanavasOnLoad = null
  } = _ref;
  //simulating click on load of this component
  const mouseClickEvents = ["mousedown", "click", "mouseup"];
  function simulateMouseClick(element) {
    mouseClickEvents.forEach(mouseEventType => element.dispatchEvent(new MouseEvent(mouseEventType, {
      view: window,
      bubbles: true,
      cancelable: true,
      buttons: 1
    })));
  }

  // on loading of component simulate click on default node
  (0, _react.useEffect)(() => {
    if (event.node.id === preSelectedNodeId) {
      let x = document.getElementById(event.node.id);
      simulateMouseClick(x);
    }

    //fit canvas
    if (graphRef !== null && setFitCanavasOnLoad !== null) {
      graphRef.current.fitCanvas();
      setFitCanavasOnLoad(true);
    }
  }, []);
  return /*#__PURE__*/_react.default.createElement("foreignObject", {
    height: 100,
    width: 100,
    onClick: () => handleNodeClick(event),
    id: event.node.id,
    className: event.node.defaultHide && 'hidden'
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "100px",
      width: "100px"
    }
  }, event.node.isRawConcept ? /*#__PURE__*/_react.default.createElement(_Circle.default, {
    text: event.node.concept_name,
    radius: "30%",
    background: "background-color2"
  }) : /*#__PURE__*/_react.default.createElement(_Circle.default, {
    text: event.node.concept_name
  })));
}
"use strict";

require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = UniversalKnowledgeGraph;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Helper = require("./Helper");
var _Graph = _interopRequireDefault(require("./Graph"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function UniversalKnowledgeGraph(_ref) {
  let {
    apiData,
    nodeName = "concept_name",
    nodeDesc = "concept_description",
    rawNodeGraph = false,
    preSelectedNodeId = null
  } = _ref;
  const [graphData, setGraphData] = (0, _react.useState)([]);
  (0, _react.useEffect)(() => {
    // setGraphData(nested_to_graph(apiData));
    if (apiData === undefined || apiData === null || apiData.length === 0) console.log("NO DATA");else setGraphData((0, _Helper.nested_to_graph)(apiData, nodeName, nodeDesc, rawNodeGraph));
  }, [apiData]);
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_Graph.default, {
    data: graphData,
    preSelectedNodeId: preSelectedNodeId,
    rawNodeGraph: rawNodeGraph
  }));
}
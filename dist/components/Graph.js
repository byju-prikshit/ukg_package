"use strict";

require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Graph;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
var _antd = require("antd");
var _react = _interopRequireWildcard(require("react"));
var _SlideDrawer = _interopRequireDefault(require("./SlideDrawer/SlideDrawer"));
var _Circle = _interopRequireDefault(require("./Node/Circle/Circle"));
var _background = _interopRequireDefault(require("./Asset/background.png"));
require("./Style.css");
var _reaflow = require("reaflow");
var _icons = require("@ant-design/icons");
var _Popup = _interopRequireDefault(require("./Popup/Popup"));
var _DisplayNode = _interopRequireDefault(require("./DisplayNode"));
var _functions = require("../utils/functions");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function Graph(_ref) {
  let {
    data = null,
    preSelectedNodeId = null,
    rawNodeGraph
  } = _ref;
  const [edges, setEdges] = (0, _react.useState)([]);
  const [nodes, setNodes] = (0, _react.useState)([]);
  const [fitCanavasOnLoad, setFitCanavasOnLoad] = (0, _react.useState)(false);
  const [editable, setEditable] = (0, _react.useState)(false);
  const [openEditPopup, setOpenEditpopup] = (0, _react.useState)(false);
  const [openNodeInfoSidebar, setOpenNodeInfoSidebar] = (0, _react.useState)(false);
  const [zoom, setZoom] = (0, _react.useState)(0.7);
  const [selections, setSelections] = (0, _react.useState)([]);
  const [editHistoryApi, setEditHistoryApi] = (0, _react.useState)([]);
  const [selectedNode, setSelectedNode] = (0, _react.useState)([]);
  const [selectedNodeId, setSelectedNodeId] = (0, _react.useState)(null);
  const [selectedNodeRawNodeData, setSelectedNodeRawNodeData] = (0, _react.useState)(null);
  const [hiddenRawNodeEdge, setHiddenRawNodeEdge] = (0, _react.useState)(null);
  const ref = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    setEdges(data.edges);
    setNodes(data.nodes);
  }, [data]);

  // useEffect(() => {
  //   console.log(editHistoryApi);
  // }, [editHistoryApi]);

  const {
    undo,
    redo,
    canUndo,
    canRedo,
    history,
    clear,
    count
  } = (0, _reaflow.useUndo)({
    nodes,
    edges,
    onUndoRedo: state => {
      // console.log("Undo / Redo", state);
      if (state.type !== "clear") {
        setEdges(state.edges);
        setNodes(state.nodes);
      }
    }
  });
  const addNode = () => {
    setOpenEditpopup(true);
  };
  const setNewNode = e => {
    e.preventDefault();
    let timestamp = Date.now();
    setNodes([...nodes, {
      id: "".concat(timestamp),
      concept_id: timestamp,
      text: "".concat(e.target.text.value),
      desc: "".concat(e.target.desc.value)
    }]);
    setEditHistoryApi(val => {
      return [...val, {
        create_node: {
          //get it from
          concept_id: timestamp,
          text: "".concat(e.target.text.value),
          desc: "".concat(e.target.desc.value)
        }
      }];
    });
    setOpenEditpopup(false);
  };
  const handleNodeClick = event => {
    let data = event.node;
    let nodeData = [["Concept Id", data.concept_id], ["Concept Name", data.concept_name], ["Concept Description", data.concept_desc]];

    //set raw node selected
    setSelectedNodeRawNodeData(data.raw_concept_node);
    if (!(0, _functions.isEmpty)(data.myRawNodeEdge)) {
      setHiddenRawNodeEdge(prev => {
        let curr = data.myRawNodeEdge;
        if (!(0, _functions.isEmpty)(prev)) {
          document.getElementById(prev[0]).classList.replace('visible', 'hidden');
          document.getElementsByClassName(prev[1])[0].classList.replace('visible', 'hidden');
        }
        document.getElementById(curr[0]).classList.replace('hidden', 'visible');
        document.getElementsByClassName(curr[1])[0].classList.replace('hidden', 'visible');
        return curr;
      });
    }
    setSelectedNodeId(prev => {
      let curr = data.id;
      if (prev !== null) document.getElementById(prev).getElementsByClassName("node-circle")[0].classList.remove("selected-node-color");
      document.getElementById(curr).getElementsByClassName("node-circle")[0].classList.add("selected-node-color");
      return curr;
    });
    setSelectedNode(nodeData);
    setOpenNodeInfoSidebar(true);
  };
  const closeNodeInfoSlider = () => {
    setOpenNodeInfoSidebar(false);
    setSelectedNode(null);
    setSelectedNodeId(prev => {
      let curr = null;
      if (prev !== null) document.getElementById(prev).getElementsByClassName("node-circle")[0].classList.remove("selected-node-color");
      return curr;
    });
    setHiddenRawNodeEdge(prev => {
      if (!(0, _functions.isEmpty)(prev)) {
        document.getElementById(prev[0]).classList.replace('visible', 'hidden');
        document.getElementsByClassName(prev[1])[0].classList.replace('visible', 'hidden');
      }
      return null;
    });
  };
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "flex flex-col justify-between p-4 pb-0"
  }, /*#__PURE__*/_react.default.createElement(_Popup.default, {
    trigger: openEditPopup,
    setTrigger: setOpenEditpopup
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "m-8"
  }, /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: setNewNode
  }, /*#__PURE__*/_react.default.createElement(_antd.Input, {
    type: "text",
    placeholder: "name",
    name: "text"
  }), /*#__PURE__*/_react.default.createElement(_antd.Input, {
    type: "text",
    placeholder: "desc",
    name: "desc"
  }), /*#__PURE__*/_react.default.createElement("button", {
    style: {
      marginTop: "1rem"
    },
    type: "submit"
  }, "Create")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "m-4 flex invisible"
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => {
      setSelections([]);
      setEditable(val => {
        return !val;
      });
    }
  }, /*#__PURE__*/_react.default.createElement(_icons.EditOutlined, null)), /*#__PURE__*/_react.default.createElement("div", {
    style: editable ? {
      display: "block"
    } : {
      display: "none"
    }
  }, /*#__PURE__*/_react.default.createElement(_antd.Button, {
    disabled: !editable,
    onClick: addNode
  }, "Add Nodes"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: undo,
    disabled: !canUndo
  }, "Undo"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: redo,
    disabled: !canRedo
  }, "Redo"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => console.log(history())
  }, "Print history"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => console.log(count()),
    disabled: !count()
  }, "Print count"), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    onClick: () => clear(nodes, edges)
  }, "Clear history"), " ")), /*#__PURE__*/_react.default.createElement("div", {
    className: "flex"
  }, !rawNodeGraph ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "50px",
      width: "50px"
    }
  }, /*#__PURE__*/_react.default.createElement(_Circle.default, {
    text: "concept"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "concept-concept lable-edge"
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: "mr-8"
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: "50px",
      width: "50px"
    }
  }, " ", /*#__PURE__*/_react.default.createElement(_Circle.default, {
    text: "raw",
    radius: "30%",
    background: "background-color2"
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "raw-concept lable-edge"
  })))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), /*#__PURE__*/_react.default.createElement("pre", {
    style: {
      zIndex: 9,
      background: "rgba(0, 0, 0, .5)",
      fontSize: "1.05rem"
    },
    className: "p-3 text-white mb-2"
  }, "Zoom: ", Math.round(zoom * 100) / 100, /*#__PURE__*/_react.default.createElement("br", null), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "m-1",
    onClick: () => ref.current.zoomIn()
  }, /*#__PURE__*/_react.default.createElement(_icons.ZoomInOutlined, null)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "m-1",
    onClick: () => ref.current.zoomOut()
  }, /*#__PURE__*/_react.default.createElement(_icons.ZoomOutOutlined, null)), /*#__PURE__*/_react.default.createElement(_antd.Button, {
    className: "m-1 fit-UKG-button",
    onClick: () => ref.current.fitCanvas()
  }, "Fit")))), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", {
    className: "graph-border-text mb-0 p-4 py-2 text-center font-bold"
  }, editable ? "Edit Mode" : "View Mode"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "box-shadow flex flex-row-reverse  my-0 mx-4"
  }, /*#__PURE__*/_react.default.createElement(_SlideDrawer.default, {
    trigger: openNodeInfoSidebar,
    setTrigger: closeNodeInfoSlider,
    flexBasis: "20%"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "m-4 overflow-y-auto h-full"
  }, selectedNode != null ? /*#__PURE__*/_react.default.createElement(_antd.List, {
    className: "mb-4",
    header: /*#__PURE__*/_react.default.createElement("h3", null, "Node Information"),
    bordered: true,
    dataSource: selectedNode,
    renderItem: item => /*#__PURE__*/_react.default.createElement(_antd.List.Item, null, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "#1677ff"
      }
    }, item[0]), " :", item[1])
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null), !(0, _functions.isEmpty)(selectedNodeRawNodeData) ? /*#__PURE__*/_react.default.createElement(_antd.List, {
    header: /*#__PURE__*/_react.default.createElement("h3", null, "Raw Node Information"),
    bordered: true,
    dataSource: selectedNodeRawNodeData,
    renderItem: item => /*#__PURE__*/_react.default.createElement(_antd.List.Item, null, /*#__PURE__*/_react.default.createElement("span", {
      style: {
        color: "#1677ff"
      }
    }, item[0]), " :", item[1])
  }) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null))), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      backgroundImage: "url(".concat(_background.default, ")"),
      height: "78vh",
      flexBasis: openNodeInfoSidebar && "80%"
    },
    className: "mt-0 overflow-hidden"
  }, /*#__PURE__*/_react.default.createElement(_reaflow.Canvas, {
    className: "canvas-UKG",
    ref: ref,
    fit: true,
    maxWidth: "8000",
    maxHeight: "5000",
    maxZoom: 1.2,
    minZoom: -0.9,
    selections: selections,
    onZoomChange: z => {
      // console.log("zooming", z);
      setZoom(z);
    },
    nodes: nodes,
    edges: edges,
    onNodeLink: (_event, from, to) => {
      if (editable) {
        const id = "".concat(from.id, "-").concat(to.id);
        setEdges([...edges, {
          id,
          from: from.id,
          to: to.id
        }]);
        setEditHistoryApi(val => {
          return [...val, {
            create_edge: {
              from: from.concept_id,
              to: to.concept_id
            }
          }];
        });
      }
    },
    onLayoutChange: layout => {
      // console.log("Layout", layout);
    },
    edge: _edge => /*#__PURE__*/_react.default.createElement(_reaflow.Edge, _extends({}, _edge, {
      style: {
        stroke: _edge.properties.isRoot ? "#023020" : _edge.properties.isRawConcept ? "#b1b1b7" : "#87CEEB"
      },
      className: _edge.properties.isRawConcept ? "raw_concept_edge graph_edge ".concat(_edge.properties.defaultHide ? "hidden ".concat(_edge.properties.id) : null) : "graph_edge",
      onClick: (event, node) => {
        if (editable) setSelections([node.id]);
      },
      onRemove: (event, edge) => {
        // console.log("Removing Edge", event, edge);
        setEdges(edges.filter(e => e.id !== edge.id));
        setSelections([]);
        setEditHistoryApi(val => {
          return [...val, {
            delete_edge: {
              from: edge.from,
              to: edge.to
            }
          }];
        });
      }
    })),
    node: _node => /*#__PURE__*/_react.default.createElement(_reaflow.Node, {
      rx: 50,
      ry: 50,
      onClick: (event, node) => {
        // console.log(event, node);
      },
      style: {
        visibility: "hidden"
      } //hiding graph nodes
      //  {...node}
      // onClick={(event, node) => {
      //   console.log("Selecting Node", event, node);

      //   if (editable) setSelections([node.id]);
      // }}
      // onRemove={(event, node) => {
      //   console.log("Removing Node", event, node);
      //   const result = removeAndUpsertNodes(nodes, edges, node);
      //   setEdges(result.edges);
      //   setNodes(result.nodes);
      //   setSelections([]);
      //   setEditHistoryApi((val)=>{return [...val,{'delete_node':{'concept_id':node.concept_id}}]})
      // }}
    }, event => fitCanavasOnLoad ? /*#__PURE__*/_react.default.createElement(_DisplayNode.default, {
      event: event,
      handleNodeClick: handleNodeClick,
      preSelectedNodeId: preSelectedNodeId
    }) : /*#__PURE__*/_react.default.createElement(_DisplayNode.default, {
      event: event,
      handleNodeClick: handleNodeClick,
      preSelectedNodeId: preSelectedNodeId,
      graphRef: ref,
      setFitCanavasOnLoad: setFitCanavasOnLoad
    }))
  }))));
}
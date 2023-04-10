"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nested_to_graph = nested_to_graph;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.symbol.description.js");
function nested_to_graph(data, nodeName, nodeDesc) {
  let rawNodeGraph = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  const data_name = nodeName;
  const data_desc = nodeDesc;
  console.log(data);
  //dfs helper
  function dfs_helper(data) {
    let graphData = {
      nodes: [],
      edges: []
    };
    const edges = new Set(),
      nodes = new Set();

    //handle array or object
    //array
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        dfs(data[i], edges, nodes, false);
      }
    }
    //obj
    else {
      dfs(data, edges, nodes, false);
    }
    graphData["nodes"] = [...nodes].map(val => JSON.parse(val));
    graphData["edges"] = [...edges].map(val => JSON.parse(val));
    return graphData;
  }

  //dfs fn
  function dfs(curr, edges, nodes, isRoot) {
    //nulls and has that key or not
    if (!curr.hasOwnProperty(data_name) && curr[data_name] === null) curr[data_name] = "null";
    if (!curr.hasOwnProperty(data_desc) && curr[data_desc] === null) curr[data_desc] = "null";

    //node bnao
    nodes.add(JSON.stringify({
      id: curr.concept_id,
      concept_id: curr.concept_id,
      concept_name: curr[data_name],
      concept_desc: curr[data_desc],
      height: 100,
      width: 100,
      raw_concept_node: curr.hasOwnProperty("raw_concept") && curr.raw_concept !== null ? [["Raw Concept Id", curr.raw_concept.concept_id], ["Raw Concept Name", curr.raw_concept.name], ["Raw Concept Desc", curr.raw_concept.description]] : null,
      isRawConcept: rawNodeGraph,
      myRawNodeEdge: !rawNodeGraph ? ["raw_concept" + curr.raw_concept.concept_id, "".concat(curr.raw_concept.concept_id, "-raw-concept-").concat(curr.concept_id)] : undefined
    }));
    if (curr.hasOwnProperty("predecessors") && curr.predecessors !== null) {
      //predesessor
      for (let i = 0; i < curr.predecessors.length; i++) {
        //edge bnao
        let child = curr.predecessors[i];
        edges.add(JSON.stringify({
          id: "".concat(child.concept_id, "-").concat(curr.concept_id),
          from: child.concept_id,
          to: curr.concept_id,
          isRawConcept: rawNodeGraph
        }));
        dfs(child, edges, nodes, false);
      }
    }
    if (curr.hasOwnProperty("successors") && curr.successors !== null) {
      //successor
      for (let i = 0; i < curr.successors.length; i++) {
        //edge bnao
        let child = curr.successors[i];
        edges.add(JSON.stringify({
          id: "".concat(curr.concept_id, "-").concat(child.concept_id),
          from: curr.concept_id,
          to: child.concept_id,
          isRawConcept: rawNodeGraph
        }));
        dfs(child, edges, nodes, false);
      }
    }
    if (curr.hasOwnProperty("root") && curr.root !== null) {
      //roots
      for (let i = 0; i < curr.root.length; i++) {
        //edge bnao
        let child = curr.root[i];
        edges.add(JSON.stringify({
          id: "".concat(child.concept_id, "-root-").concat(curr.concept_id),
          from: child.concept_id,
          to: curr.concept_id,
          isRoot: true
        }));
        dfs(child, edges, nodes, true);
      }
    }
    //raw concepts
    if (curr.hasOwnProperty("raw_concept") && curr.raw_concept !== null) {
      //raw concept node
      let raw_concept = curr.raw_concept;
      //nulls and has that key or not
      let data_name = "name",
        data_desc = "description";
      if (!raw_concept.hasOwnProperty(data_name) && raw_concept[data_name] === null) raw_concept[data_name] = "null";
      if (!raw_concept.hasOwnProperty(data_desc) && raw_concept[data_desc] === null) raw_concept[data_desc] = "null";

      //node bnao
      const raw_node_id = "raw_concept" + raw_concept.concept_id;
      nodes.add(JSON.stringify({
        id: raw_node_id,
        concept_id: raw_concept.concept_id,
        concept_name: raw_concept[data_name],
        concept_desc: raw_concept[data_desc],
        isRawConcept: true,
        defaultHide: true,
        height: 90,
        width: 90
      }));
      //edge bnao
      edges.add(JSON.stringify({
        id: "".concat(raw_concept.concept_id, "-raw-concept-").concat(curr.concept_id),
        from: raw_node_id,
        to: curr.concept_id,
        defaultHide: true,
        isRawConcept: true
      }));
    }
  }

  //calling fns
  const graphData = dfs_helper(data);
  console.log(graphData);
  return graphData;
}
import React, { useEffect, useState } from "react";
import { nested_to_graph } from "./Helper";
import Graph from "./Graph";
import { isEmpty } from "../utils/functions";

export default function UniversalKnowledgeGraph({
  apiData,
  nodeName = "concept_name",
  nodeDesc = "concept_description",
  rawNodeGraph=false,
  preSelectedNodeId=null
}) {
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    // setGraphData(nested_to_graph(apiData));
    if (isEmpty(apiData))
      console.log("NO DATA");
    else setGraphData(nested_to_graph(apiData, nodeName, nodeDesc,rawNodeGraph));
  }, [apiData]);

  if(isEmpty(graphData)) return <></>
  else
  return (
    <div>
      {/* <h3><b>Response</b></h3> */}
      <Graph data={graphData}  preSelectedNodeId={preSelectedNodeId} rawNodeGraph={rawNodeGraph}/>
    </div>
  );
}

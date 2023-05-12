import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "./lib/components/UniversalKnowledgeGraph";
import { isEmpty } from "./lib/utils/functions";

function App() {
  const [apiData, setApiData] = useState([]);

  // graph1 code

  // useEffect(() => {
  //   axios
  //     .get("/db/data.json")
  //     .then((res) => {
  //       if (isEmpty(res.data["concepts"])) alert("API had no nodes or edges");
  //       else setApiData(res.data["concepts"]);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  // graph 2
  useEffect(() => {
    axios
      .get("/db/data1.json")
      .then((res) => {
        console.log(res.data)
        if (isEmpty(res.data["raw_concept"])) alert("API had no nodes or edges");
        else setApiData(res.data["raw_concept"]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* graph 1  code*/}
      {/* <Container apiData={apiData} /> */}

      {/* graph 2  code*/}
      <Container
        apiData={apiData}
        nodeName="name"
        nodeDesc="description"
        rawNodeGraph={true}
        preSelectedNodeId={apiData["concept_id"]}
      />
    </div>
  );
}

export default App;

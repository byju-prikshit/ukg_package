import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "./lib/components/UniversalKnowledgeGraph";

function App() {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    axios
      .get("/db/data.json")
      .then((res) => setApiData(res.data["concepts"]))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Container apiData={apiData} />
    </div>
  );
}

export default App;

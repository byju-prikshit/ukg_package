import { Button, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { Divider, List, Typography } from "antd";
import SlideDrawer from "./SlideDrawer/SlideDrawer";
import Circle from "./Node/Circle/Circle";
import background from "./Asset/background.png";
import "./Style.css";
import {
  Canvas,
  Node,
  Port,
  Edge,
  removeAndUpsertNodes,
  useUndo,
  CanvasPosition,
} from "reaflow";
import {
  EditOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from "@ant-design/icons";
import Popup from "./Popup/Popup";
import DisplayNode from "./DisplayNode";

export default function Graph({
  data = null,
  preSelectedNodeId = null,
  rawNodeGraph,
}) {
  const [edges, setEdges] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [fitCanavasOnLoad, setFitCanavasOnLoad] = useState(false);
  const [editable, setEditable] = useState(false);
  const [openEditPopup, setOpenEditpopup] = useState(false);
  const [openNodeInfoSidebar, setOpenNodeInfoSidebar] = useState(false);
  const [zoom, setZoom] = useState(0.7);
  const [selections, setSelections] = useState([]);
  const [editHistoryApi, setEditHistoryApi] = useState([]);
  const [selectedNode, setSelectedNode] = useState([]);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedNodeRawNodeData, setSelectedNodeRawNodeData] = useState(null);
  const [hiddenRawNodeEdge,setHiddenRawNodeEdge]=useState(null)
  const ref = useRef(null);

  useEffect(() => {
    setEdges(data.edges);
    setNodes(data.nodes);
  }, [data]);

  useEffect(() => {
    console.log(editHistoryApi);
  }, [editHistoryApi]);

  const { undo, redo, canUndo, canRedo, history, clear, count } = useUndo({
    nodes,
    edges,
    onUndoRedo: (state) => {
      console.log("Undo / Redo", state);
      if (state.type !== "clear") {
        setEdges(state.edges);
        setNodes(state.nodes);
      }
    },
  });
  const addNode = () => {
    setOpenEditpopup(true);
  };

  const setNewNode = (e) => {
    e.preventDefault();
    let timestamp = Date.now();
    setNodes([
      ...nodes,
      {
        id: `${timestamp}`,
        concept_id: timestamp,
        text: `${e.target.text.value}`,
        desc: `${e.target.desc.value}`,
      },
    ]);
    setEditHistoryApi((val) => {
      return [
        ...val,
        {
          create_node: {
            //get it from
            concept_id: timestamp,
            text: `${e.target.text.value}`,
            desc: `${e.target.desc.value}`,
          },
        },
      ];
    });
    setOpenEditpopup(false);
  };
  const alert = () => {
    console.log("loaded");
  };
  const handleNodeClick = (event) => {
    let data = event.node;
    let nodeData = [
      ["Concept Id", data.concept_id],
      ["Concept Name", data.concept_name],
      ["Concept Description", data.concept_desc],
    ];

    //set raw node selected
    setSelectedNodeRawNodeData(data.raw_concept_node);
    if(data.myRawNodeEdge!==undefined && data.myRawNodeEdge!==null && data.myRawNodeEdge.length!==0)
    {
      setHiddenRawNodeEdge((prev)=>{
          let curr=data.myRawNodeEdge

          if(prev!==undefined && prev!==null )
          {
            document.getElementById(prev[0]).classList.replace('visible','hidden')
            document.getElementsByClassName(prev[1])[0].classList.replace('visible','hidden')
          }
          document.getElementById(curr[0]).classList.replace('hidden','visible')
          document.getElementsByClassName(curr[1])[0].classList.replace('hidden','visible')
          return curr
      })
    }
    setSelectedNodeId((prev) => {
      let curr = data.id;
      if (prev !== null)
        document
          .getElementById(prev)
          .getElementsByClassName("node-circle")[0]
          .classList.remove("selected-node-color");

      document
        .getElementById(curr)
        .getElementsByClassName("node-circle")[0]
        .classList.add("selected-node-color");
      return curr;
    });
    setSelectedNode(nodeData);
    setOpenNodeInfoSidebar(true);
  };

  const closeNodeInfoSlider = () => {
    setOpenNodeInfoSidebar(false);
    setSelectedNode(null);
    setSelectedNodeId((prev) => {
      let curr = null;
      if (prev !== null)
        document
          .getElementById(prev)
          .getElementsByClassName("node-circle")[0]
          .classList.remove("selected-node-color");
      return curr;
    });
    setHiddenRawNodeEdge((prev)=>{
      if(prev!==undefined && prev!==null )
      {
        document.getElementById(prev[0]).classList.replace('visible','hidden')
        document.getElementsByClassName(prev[1])[0].classList.replace('visible','hidden')
      }
      return null
  })
  };

  return (
    <div>
      <div
        style={{
          padding: "1rem",
          paddingBottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* pop ups */}
        <Popup trigger={openEditPopup} setTrigger={setOpenEditpopup}>
          <div style={{ margin: "2rem" }}>
            <form onSubmit={setNewNode}>
              <Input type="text" placeholder="name" name="text" />
              <Input type="text" placeholder="desc" name="desc" />
              <button style={{ marginTop: "1rem" }} type="submit">
                Create
              </button>
            </form>
          </div>
        </Popup>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              marin: "1rem",
              display: "flex",
              visibility: "hidden", //hiding edit button
            }}
          >
            <Button
              onClick={() =>
                setEditable((val) => {
                  setSelections([]);
                  return !val;
                })
              }
            >
              <EditOutlined />
            </Button>

            <div style={editable ? { display: "block" } : { display: "none" }}>
              <Button disabled={!editable} onClick={addNode}>
                Add Nodes
              </Button>
              <Button onClick={undo} disabled={!canUndo}>
                Undo
              </Button>
              <Button onClick={redo} disabled={!canRedo}>
                Redo
              </Button>
              <Button onClick={() => console.log(history())}>
                Print history
              </Button>
              <Button onClick={() => console.log(count())} disabled={!count()}>
                Print count
              </Button>
              <Button onClick={() => clear(nodes, edges)}>Clear history</Button>{" "}
            </div>
          </div>
          <div style={{ display: "flex" }}>
            {/* dont show labels on raw node graph  */}
            {!rawNodeGraph ? (
              <>
                <div style={{ marginRight: "1rem" }}>
                  <div style={{ height: "50px", width: "50px" }}>
                    <Circle text={"concept"} />
                  </div>
                  <div className="concept-concept lable-edge"></div>
                </div>
                <div style={{ marginRight: "2rem" }}>
                  <div style={{ height: "50px", width: "50px" }}>
                    {" "}
                    <Circle
                      text={"raw"}
                      radius="30%"
                      background="background-color2"
                    />
                    <div className="raw-concept lable-edge"></div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            <pre
              style={{
                zIndex: 9,
                background: "rgba(0, 0, 0, .5)",
                padding: 10,
                color: "white",
                fontSize: "1.05rem",
                marginBottom: "0.5rem",
              }}
            >
              Zoom: {Math.round(zoom * 100) / 100}
              <br />
              <Button
                style={{ margin: "0.3rem" }}
                onClick={() => ref.current.zoomIn()}
              >
                <ZoomInOutlined />
              </Button>
              <Button
                style={{ margin: "0.3rem" }}
                onClick={() => ref.current.zoomOut()}
              >
                <ZoomOutOutlined />
              </Button>
              <Button
                style={{ margin: "0.3rem" }}
                onClick={() => ref.current.fitCanvas()}
                className="fit-UKG-button"
              >
                Fit
              </Button>
            </pre>
          </div>
        </div>

        <div>
          <h3
            style={{
              textAlign: "center",
              fontWeight: 700,
              padding: "0.5rem 1rem",
              marginBottom: "0",
            }}
            className="graph-border-text"
          >
            {editable ? `Edit Mode` : `View Mode`}
          </h3>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          margin: "0 1rem",
        }}
        className="box-shadow"
      >
        <SlideDrawer
          trigger={openNodeInfoSidebar}
          setTrigger={closeNodeInfoSlider}
          flexBasis={"20%"}
        >
          <div style={{ margin: "1rem", overflowY: "auto", height: "100%" }}>
            {selectedNode != null ? (
              <List
                style={{ marginBottom: "1rem" }}
                header={<h3>Node Information</h3>}
                bordered
                dataSource={selectedNode}
                renderItem={(item) => (
                  <List.Item>
                    <span style={{ color: "#1677ff" }}>{item[0]}</span> :
                    {item[1]}
                  </List.Item>
                )}
              />
            ) : (
              <></>
            )}
            {selectedNodeRawNodeData !== null &&
            selectedNodeRawNodeData != undefined ? (
              <List
                header={<h3>Raw Node Information</h3>}
                bordered
                dataSource={selectedNodeRawNodeData}
                renderItem={(item) => (
                  <List.Item>
                    <span style={{ color: "#1677ff" }}>{item[0]}</span> :
                    {item[1]}
                  </List.Item>
                )}
              />
            ) : (
              <></>
            )}
          </div>
        </SlideDrawer>

        <div
          style={{
            backgroundImage: `url(${background})`,
            marginTop: 0,
            height: "78vh",
            overflow: "hidden",
            flexBasis: openNodeInfoSidebar && "80%",
          }}
        >
          <Canvas
            className="canvas-UKG"
            ref={ref}
            fit={true}
            maxWidth={"8000"}
            maxHeight={"5000"}
            maxZoom={1.2}
            minZoom={-0.9}
            selections={selections}
            onZoomChange={(z) => {
              console.log("zooming", z);
              setZoom(z);
            }}
            nodes={nodes}
            edges={edges}
            onNodeLink={(_event, from, to) => {
              if (editable) {
                const id = `${from.id}-${to.id}`;
                setEdges([
                  ...edges,
                  {
                    id,
                    from: from.id,
                    to: to.id,
                  },
                ]);
                setEditHistoryApi((val) => {
                  return [
                    ...val,
                    {
                      create_edge: {
                        from: from.concept_id,
                        to: to.concept_id,
                      },
                    },
                  ];
                });
              }
            }}
            onLayoutChange={(layout) => {
              console.log("Layout", layout);
            }}
            edge={(edge) => (
              <Edge
                {...edge}
                style={{
                  stroke: edge.properties.isRoot
                    ? "#023020"
                    : edge.properties.isRawConcept
                    ? "#b1b1b7"
                    : "#87CEEB",
                }}
                className={
                  edge.properties.isRawConcept
                    ? `raw_concept_edge graph_edge ${edge.properties.defaultHide?`hidden ${edge.properties.id}`:null}`
                    : "graph_edge"
                }
                onClick={(event, node) => {
                  if (editable) setSelections([node.id]);
                }}
                onRemove={(event, edge) => {
                  console.log("Removing Edge", event, edge);
                  setEdges(edges.filter((e) => e.id !== edge.id));
                  setSelections([]);
                  setEditHistoryApi((val) => {
                    return [
                      ...val,
                      { delete_edge: { from: edge.from, to: edge.to } },
                    ];
                  });
                }}
              />
            )}
            node={(node) => (
              <Node
                rx={50}
                ry={50}
                onClick={(event, node) => {
                  // console.log(event, node);
                }}
                style={{ visibility: "hidden" }} //hiding graph nodes
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
              >
                {(event) =>
                  fitCanavasOnLoad ? (
                    <DisplayNode
                      event={event}
                      handleNodeClick={handleNodeClick}
                      preSelectedNodeId={preSelectedNodeId}
                    />
                  ) : (
                    <DisplayNode
                      event={event}
                      handleNodeClick={handleNodeClick}
                      preSelectedNodeId={preSelectedNodeId}
                      graphRef={ref}
                      setFitCanavasOnLoad={setFitCanavasOnLoad}
                    />
                  )
                }
              </Node>
            )}
          />
        </div>
      </div>
    </div>
  );
}

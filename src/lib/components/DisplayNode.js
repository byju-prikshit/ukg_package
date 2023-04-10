import React, { useEffect } from "react";
import Circle from "./Node/Circle/Circle";

export default function DisplayNode({ event, handleNodeClick,preSelectedNodeId=null,graphRef=null,setFitCanavasOnLoad=null}) {

//simulating click on load of this component
  const mouseClickEvents = ["mousedown", "click", "mouseup"];
  function simulateMouseClick(element) {
    mouseClickEvents.forEach((mouseEventType) =>
      element.dispatchEvent(
        new MouseEvent(mouseEventType, {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1,
        })
      )
    );
  }

// on loading of component simulate click on default node
  useEffect(() => {
    if (event.node.id === preSelectedNodeId) {
      let x = document.getElementById(event.node.id);
      simulateMouseClick(x);
    }

    //fit canvas
    if(graphRef!==null && setFitCanavasOnLoad!==null)
    {
      graphRef.current.fitCanvas();
      setFitCanavasOnLoad(true)
    }
  }, []);

  return (
    <foreignObject
      height={100}
      width={100}
      onClick={() => handleNodeClick(event)}
      id={event.node.id}
      className={event.node.defaultHide && 'hidden'}
    >
      <div style={{ height: "100px", width: "100px" }}>
        {event.node.isRawConcept ? (
          <Circle
            text={event.node.concept_name}
            radius="30%"
            background="background-color2"
          />
        ) : (
          <Circle text={event.node.concept_name} />
        )}
      </div>
    </foreignObject>
  );
}

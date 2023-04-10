import React from "react";
import { Button } from "antd";
import "./Styles.css";
import { RightOutlined } from "@ant-design/icons";

export default function SlideDrawer({
  trigger,
  setTrigger,
  children,
  flexBasis = "20em",
}) {
  return (
    <div
      style={trigger ? { flexBasis: flexBasis } : { display: "none" }}
      className="slider-container"
    >
      <div style={{ display: "flex", justifyContent: "end", margin: "0.5rem" }}>
        {" "}
        <Button type="primary" onClick={() => setTrigger()}>
          Close
        </Button>
      </div>
      {children}
    </div>
  );
}

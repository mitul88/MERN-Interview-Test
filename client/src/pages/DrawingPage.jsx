import React, { useState } from "react";
import ToolBar from "../components/ToolBar";
import DrawingBoard from "../components/DrawingBoard";

const DrawingPage = () => {
  const [tool, setTool] = useState("line");
  return (
    <div className=" bg-body-secondary min-vh-100">
      <div className="container">
        <div className="row my-3">
          <ToolBar tool={tool} setTool={setTool} />
        </div>
        <div className="row">
          <DrawingBoard />
        </div>
      </div>
      ;
    </div>
  );
};

export default DrawingPage;

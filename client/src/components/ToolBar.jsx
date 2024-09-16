import React from "react";

const ToolBar = ({ tool, setTool }) => {
  return (
    <div className="p-3 bg-light">
      <div className="d-flex flex-row align-items-center gap-4">
        <div>
          <input
            class="form-check-input me-2"
            type="radio"
            id="line"
            checked={tool === "line"}
            onChange={() => setTool("line")}
          />
          <label class="form-check-label" htmlFor="line">
            Line
          </label>
        </div>
        <div>
          <input
            class="form-check-input me-2"
            type="radio"
            id="selection"
            checked={tool === "selection"}
            onChange={() => setTool("selection")}
          />
          <label class="form-check-label" htmlFor="selection">
            Selection
          </label>
        </div>
        <div>
          <input
            class="form-check-input me-2"
            type="radio"
            id="rectangle"
            checked={tool === "rectangle"}
            onChange={() => setTool("rectangle")}
          />
          <label class="form-check-label" htmlFor="rectangle">
            Rectangle
          </label>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;

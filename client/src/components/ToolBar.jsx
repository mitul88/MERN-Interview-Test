import React from "react";

const ToolBar = ({ tool, setTool, saveProgress }) => {
  return (
    <div className="p-3 bg-light">
      <div className="d-flex flex-row align-items-center gap-4">
        <div>
          <input
            className="form-check-input me-2"
            type="radio"
            id="line"
            checked={tool === "line"}
            onChange={() => setTool("line")}
          />
          <label className="form-check-label" htmlFor="line">
            Line
          </label>
        </div>
        <div>
          <input
            className="form-check-input me-2"
            type="radio"
            id="selection"
            checked={tool === "selection"}
            onChange={() => setTool("selection")}
          />
          <label className="form-check-label" htmlFor="selection">
            Selection
          </label>
        </div>
        <div>
          <input
            className="form-check-input me-2"
            type="radio"
            id="rectangle"
            checked={tool === "rectangle"}
            onChange={() => setTool("rectangle")}
          />
          <label className="form-check-label" htmlFor="rectangle">
            Rectangle
          </label>
        </div>
        <div>
          <btton
            className="btn btn-primary btn-sm"
            onClick={(event) => saveProgress(event)}
          >
            Save Progress
          </btton>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;

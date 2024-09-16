import React from "react";

const ToolBar = ({
  tool,
  setTool,
  saveProgress,
  title,
  setTitle,
  clearProgress,
}) => {
  return (
    <div className="p-3 bg-light">
      <div className="d-flex flex-row align-items-center gap-2">
        <div className="col-1">
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
        <div className="col-1">
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
        <div className="col-1">
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
        <div className="col-2">
          <div className="input-group">
            <span className="input-group-text">Title</span>
            <input
              type="text"
              className="form-control"
              placeholder="Type in title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="col-2">
          <h3 className="mx-5">{title}</h3>
        </div>
        <div className="col-2">
          <button
            className="btn btn-success"
            onClick={(event) => saveProgress(event)}
          >
            Save Progress
          </button>
        </div>
        <div className="col-2">
          <button className="btn btn-danger" onClick={() => clearProgress()}>
            Clear whiteboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolBar;

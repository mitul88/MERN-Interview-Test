import React from "react";

const DrawingBoard = () => {
  return (
    <div className="bg-light p-1 px-auto">
      <canvas id="canvas" className="border"></canvas>
    </div>
  );
};

export default DrawingBoard;

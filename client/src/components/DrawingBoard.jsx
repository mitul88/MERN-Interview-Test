import React, { useLayoutEffect } from "react";
import rough from "roughjs/bundled/rough.esm";

const DrawingBoard = ({
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  elements,
}) => {
  // useLayoutEffect(() => {
  //   const canvas = document.getElementById("canvas");
  //   const context = canvas.getContext("2d");

  //   // removing old action after rerender
  //   context.clearRect(0, 0, canvas.width, canvas.height);

  //   const roughCanvas = rough.canvas(canvas);

  //   elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  // }, [elements]);

  return (
    <div className="bg-light p-1 px-auto">
      <canvas
        id="canvas1"
        className="border"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={(event) => handleMouseDown(event)}
        onMouseMove={(event) => handleMouseMove(event)}
        onMouseUp={(event) => handleMouseUp(event)}
      ></canvas>
    </div>
  );
};

export default DrawingBoard;

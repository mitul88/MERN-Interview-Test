import React, { useState, useLayoutEffect } from "react";
import rough from "roughjs/bundled/rough.esm";

import ToolBar from "../components/ToolBar";
import { saveDrawings } from "../utils/http";

const generator = rough.generator();

const createElement = (id, x1, y1, x2, y2, type) => {
  const roughElement =
    type === "line"
      ? generator.line(x1, y1, x2, y2, { roughness: 0 })
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1, { roughness: 0 });
  return { id, x1, y1, x2, y2, type, roughElement };
};

const distance = (a, b) =>
  Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

const nearPoint = (x, y, x1, y1, name) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? name : null;
};
const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2 } = element;

  if (type === "rectangle") {
    const topLeft = nearPoint(x, y, x1, y1, "tl");
    const topRight = nearPoint(x, y, x2, y1, "tr");
    const bottomLeft = nearPoint(x, y, x1, y2, "bl");
    const bottomRight = nearPoint(x, y, x2, y2, "br");
    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else {
    const a = { x: x1, y: y1 };
    const b = { x: x2, y: y2 };
    const c = { x, y };
    const offset = distance(a, b) - (distance(a, c) + distance(b, c));
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");
    const inside = Math.abs(offset) < 1 ? "inside" : null;
    return start || end || inside;
  }
};

const getElementByPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};

const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      //  swapping the cordinates if drawing starting points starts from below of the canvas
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

const cursorForPosition = (position) => {
  switch (position) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "nesw-resize";
    default:
      return "move";
  }
};

const resizedCoordinates = (clientX, clientY, position, coordinates) => {
  const { x1, y1, x2, y2 } = coordinates;
  switch (position) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return null;
  }
};

const DrawingPage = () => {
  const [elements, setElements] = useState([]);
  const [action, setAction] = useState("none");
  const [tool, setTool] = useState("line");
  const [selectedElement, setSelectedElement] = useState(null);
  const [title, setTitle] = useState("");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    // removing old action after rerender
    context.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const updateElement = (id, x1, y1, x2, y2, type) => {
    // coordinates gets updated as the mouse moves
    const updatedElement = createElement(id, x1, y1, x2, y2, type);

    // updating states including the previous one
    const elementsCopy = [...elements];
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy);
  };

  // mouse traking
  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;
    if (tool === "selection") {
      // check the position of the element to be selected is existed
      const element = getElementByPosition(clientX, clientY, elements);
      if (element) {
        const offsetX = clientX - element.x1;
        const offsetY = clientY - element.y1;
        setSelectedElement({ ...element, offsetX, offsetY });
        if (element.position === "inside") {
          setAction("moving");
        } else {
          setAction("resizing");
        }
      }
    } else {
      // creating id using index for the next element
      const id = elements.length;
      const element = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        tool
      );
      setElements((prevState) => [...prevState, element]);
      setSelectedElement(element);
      setAction("drawing");
    }
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    if (tool === "selection") {
      const element = getElementByPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? cursorForPosition(element.position)
        : "default";
    }

    if (action === "drawing") {
      // getting the initial coordinates from elements state
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      // coordinates gets updated as the mouse moves
      updateElement(index, x1, y1, clientX, clientY, tool);
    } else if (action === "moving") {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;
      updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type);
    } else if (action === "resizing") {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );
      updateElement(id, x1, y1, x2, y2, type);
    }
  };

  const handleMouseUp = (event) => {
    if (!selectedElement) {
      if (tool !== "selection") {
        alert("Please draw with in the canvas");
        return;
      } else {
        alert("Please select an element");
        return;
      }
    }
    const index = selectedElement?.id;

    const { id, type } = elements[index];
    if (action === "drawing" || action === "resizing") {
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, type);
    }
    setAction("none");
    setSelectedElement(null);
  };

  const saveProgress = (event) => {
    event.preventDefault();
    if (elements.length === 0) {
      alert("nothing to save");
      return;
    }
    if (title === "") {
      alert("Please create a title");
      return;
    }
    let shapes = [];
    elements.forEach((element) =>
      shapes.push({
        type: element.type,
        x1: element.x1,
        y1: element.y1,
        x2: element.x2,
        y2: element.y2,
      })
    );
    let data = {
      title,
      shapes,
    };
    const response = saveDrawings(data);
    if (response.status === 201) {
      alert("progress saved");
    } else {
      alert("something went wrong");
    }
  };

  const clearProgress = () => {
    setElements([]);
    setSelectedElement(null);
  };
  return (
    <div className=" bg-body-secondary min-vh-100">
      <div className="container-fluid">
        <div className="row my-3">
          <ToolBar
            tool={tool}
            setTool={setTool}
            saveProgress={saveProgress}
            title={title}
            setTitle={setTitle}
            clearProgress={clearProgress}
          />
        </div>
        <div className="row">
          <div className="bg-light p-1 px-auto">
            <canvas
              id="canvas"
              width={window.innerWidth - 35}
              height={window.innerHeight - 125}
              className="border border-5"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingPage;

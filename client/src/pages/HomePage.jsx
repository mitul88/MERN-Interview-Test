import React from "react";
import DrawingList from "../components/DrawingList";

const HomePage = () => {
  return (
    <div className="bg-light">
      <div className="container-fluid bg-dark text-white text-center p-5">
        <h2>Welcome to Whiteboard</h2>
        <h5>Draw shapes and lines</h5>
        <a href="/whiteboard" className="btn btn-primary ">
          Draw
        </a>
      </div>
      <div className="container text-center">
        <h3 className="my-5">View All drawings</h3>
        <DrawingList />
      </div>
    </div>
  );
};

export default HomePage;

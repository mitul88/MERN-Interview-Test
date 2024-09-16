import React from "react";

const HomePage = () => {
  return (
    <div>
      <div className="container-fluid text-center p-5">
        <h2>Welcome to Whiteboard</h2>
        <h5>Draw shapes and lines</h5>
        <a href="/whiteboard" className="btn btn-primary ">
          Draw
        </a>
      </div>
      <div className="container">
        <div className="row"></div>
      </div>
    </div>
  );
};

export default HomePage;

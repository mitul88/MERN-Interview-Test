import React from "react";
import DrawingItem from "./DrawingItem";

const DrawingList = () => {
  return (
    <div className="row text-center ">
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
        <DrawingItem />
      </div>
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
        <DrawingItem />
      </div>
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
        <DrawingItem />
      </div>
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
        <DrawingItem />
      </div>
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
        <DrawingItem />
      </div>
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
        <DrawingItem />
      </div>
      <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-5">
        <DrawingItem />
      </div>
    </div>
  );
};

export default DrawingList;

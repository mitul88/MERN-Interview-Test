const drawingRouter = require("../modules/drawing/drawing.route");

module.exports = (app) => {
  app.use("/api/home", drawingRouter);
};

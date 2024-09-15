const { createDrawing } = require("./drawing.controller");

const router = require("express").Router();

router.route("/create").post(createDrawing);

module.exports = router;

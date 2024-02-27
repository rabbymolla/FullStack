const express = require("express");
const route = express.Router();
const regController = require("../../controllors/regController");
const sequer = require("../../middleware/sequerWere");

route.get("/reg", sequer, regController);

module.exports = route;
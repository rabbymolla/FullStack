const express = require("express");
const route = express.Router();
const regController = require("../../controllors/regController");
const sequer = require("../../middleware/sequerWere");
const otpController = require("../../controllors/otpController");

route.post("/reg", sequer, regController);
route.post("/otpverfic", otpController);

module.exports = route;

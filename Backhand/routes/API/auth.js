const express = require("express");
const route = express.Router();
const regController = require("../../controllors/regController");
const sequer = require("../../middleware/sequerWere");
const otpController = require("../../controllors/otpController");
const loginController = require("../../controllors/loginController");
const linkController = require("../../controllors/linkController");

route.post("/reg", sequer, regController);
route.post("/login", sequer, loginController);
route.post("/otpverfic", otpController);
route.post("/emailLink", linkController);

module.exports = route;

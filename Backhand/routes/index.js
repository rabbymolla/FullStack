const express = require("express");
const route = express.Router();
const userAuth = require("./API");

route.use(process.env.API_URL, userAuth);

module.exports = route;

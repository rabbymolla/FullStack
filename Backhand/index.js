require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes");
const mongoConfig = require("./config/mongoConfig");
const cors = require("cors");

mongoConfig();
app.use(express.json());
app.use(cors());
app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("port");
});

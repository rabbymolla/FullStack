const mongoose = require("mongoose");
const mongoConfig = () => {
  mongoose
    .connect(
      "mongodb+srv://test:isBxZN3krcfnkidI@cluster0.fz8eple.mongodb.net/newtest?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => console.log("Connected!"));
};

module.exports = mongoConfig;

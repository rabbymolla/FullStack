const middleWere = (req, res, next) => {
  console.log("ami", req.headers);
  if (req.headers.authorization == "RaBBy544") {
    next();
  } else {
    res.send({ error: "inviled" });
  }
};

module.exports = middleWere;

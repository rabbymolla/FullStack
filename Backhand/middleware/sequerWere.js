const middleWere = (req, res, next) => {
  // console.log("ami", req.headers.authorization == "RaBBy544");
  if (req.headers.authorization == "RaBBy544") {
    next();
  } else {
    res.status(401);
    res.send({ error: "inviled" });
  }
};

module.exports = middleWere;

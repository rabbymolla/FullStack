const regController = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.send({ error: "Plese fill up the from" });
  }
  if (password && password.length < 6) {
    return res.send({ error: "possoword too small" });
  }

  console.log("databasee datta");

  // res.send(data);
};
module.exports = regController;

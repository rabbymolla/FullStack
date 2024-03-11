const User = require("../modle/userModle");

const otpController = async (req, res) => {
  const { email, otp } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser.emailVerified && findUser.otp == otp) {
    await User.findOneAndUpdate({ email }, { otp: "", emailVerified: true });
    res.send("OTP Is Massing");
  } else {
    res.send("OTP not mascing");
  }
};

module.exports = otpController;

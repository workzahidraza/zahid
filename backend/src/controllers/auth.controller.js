const userModel = require("../models/auth.model");

async function Register(req, res) {
  const userPresent = await userModel.findOne();
  if (!userPresent) {
    return;
  }
}

module.exports = {
  Register,
};

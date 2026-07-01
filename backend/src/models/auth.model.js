const mongoose = require("mongoose");

const userSchema = new mongoose.Schema();

const userModel = mongoose.model("Authentication", userSchema);

module.exports = userModel;

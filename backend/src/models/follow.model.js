const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  follower: {
    type: String,
    required: [true],
  },
  followee: {
    type: String,
    required: [true],
  },
});

followSchema.index({follower:1,followee:1},{unique:true})
const followModel = new mongoose.model("follow", followSchema);

module.exports = followModel;

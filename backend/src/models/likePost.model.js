const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userPost",
    required: [true, "enter post id"],
  },
  userName: {
    type: String,
    required: [true, "enter userName"],
  },
});

likeSchema.indexes({ postId: 1 }, { userName: 1 }, { unique: true });
const likePostModel = new mongoose.model("like", likeSchema);

module.exports = likePostModel;

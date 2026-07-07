const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userPost",
      required: [true, "enter post id"],
    },
    userName: {
      type: String,
      required: [true, "enter userName"],
    },
  },
  { timestamps: true },
);

savedSchema.index({ postId: 1, userName: 1 }, { unique: true });

const savedPostModel = mongoose.model("saved", savedSchema);

module.exports = savedPostModel;

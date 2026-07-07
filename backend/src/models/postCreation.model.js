const mongoose = require("mongoose");
const postCreationSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
    },
    photo_url: {
      type: String,
      required: [true, "enter the photo url"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const userPostModel = mongoose.model("userPost", postCreationSchema);
module.exports = userPostModel;

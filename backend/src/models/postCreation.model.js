const mongoose = require("mongoose");
const postCreationSchema = mongoose.Schema({
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
});

const userPostModel = mongoose.model("userPost", postCreationSchema);
module.exports = userPostModel;

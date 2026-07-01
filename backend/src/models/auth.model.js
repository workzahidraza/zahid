const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "enter the username"],
      unique: true,
    },
    userEmail: {
      type: String,
      required: [true, "enter the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "enter the password "],
    },
    bio: String,
    profile_pic: {
      type: String,
      default:
        "https://ik.imagekit.io/0eiec88vi/instaClone%20project%20profile%20pic.webp?updatedAt=1779449227976",
    },
  },
  {
    timestamps: true,
  },
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;

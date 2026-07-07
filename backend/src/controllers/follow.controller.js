const followModel = require("../models/follow.model");
const userModel = require("../models/auth.model");

async function followUser(req, res) {
  try {
    const { userName } = req.params;

    if (userName === req.user.userName) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself",
      });
    }

    const targetUser = await userModel.findOne({ userName });
    if (!targetUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const existing = await followModel.findOne({
      follower: req.user.userName,
      followee: userName,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Already following this user",
      });
    }

    await followModel.create({
      follower: req.user.userName,
      followee: userName,
    });

    res.status(201).json({
      success: true,
      message: `You are now following ${userName}`,
      isFollowing: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function unfollowUser(req, res) {
  try {
    const { userName } = req.params;

    const deleted = await followModel.findOneAndDelete({
      follower: req.user.userName,
      followee: userName,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Follow relationship not found",
      });
    }

    res.status(200).json({
      success: true,
      message: `Unfollowed ${userName}`,
      isFollowing: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  followUser,
  unfollowUser,
};

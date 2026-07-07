const likePostModel = require("../models/likePost.model");
const postModel = require("../models/postCreation.model");

async function likePost(req, res) {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const existing = await likePostModel.findOne({
      postId,
      userName: req.user.userName,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Post already liked",
      });
    }

    await likePostModel.create({
      postId,
      userName: req.user.userName,
    });

    const likeCount = await likePostModel.countDocuments({ postId });

    res.status(201).json({
      success: true,
      message: "Post liked",
      likeCount,
      isLiked: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function unlikePost(req, res) {
  try {
    const { postId } = req.params;
    const deleted = await likePostModel.findOneAndDelete({
      postId,
      userName: req.user.userName,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Like not found",
      });
    }

    const likeCount = await likePostModel.countDocuments({ postId });

    res.status(200).json({
      success: true,
      message: "Post unliked",
      likeCount,
      isLiked: false,
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
  likePost,
  unlikePost,
};

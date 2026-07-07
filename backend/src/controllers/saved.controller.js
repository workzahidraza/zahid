const savedPostModel = require("../models/savedPost.model");
const postModel = require("../models/postCreation.model");
const likePostModel = require("../models/likePost.model");
const userModel = require("../models/auth.model");

async function savePost(req, res) {
  try {
    const { postId } = req.params;
    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    const existing = await savedPostModel.findOne({
      postId,
      userName: req.user.userName,
    });

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Post already saved",
      });
    }

    await savedPostModel.create({
      postId,
      userName: req.user.userName,
    });

    res.status(201).json({
      success: true,
      message: "Post saved",
      isSaved: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function unsavePost(req, res) {
  try {
    const { postId } = req.params;

    const deleted = await savedPostModel.findOneAndDelete({
      postId,
      userName: req.user.userName,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Saved post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post removed from saved",
      isSaved: false,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getSavedPosts(req, res) {
  try {
    const saved = await savedPostModel
      .find({ userName: req.user.userName })
      .sort({ createdAt: -1 });

    const posts = await Promise.all(
      saved.map(async (item) => {
        const post = await postModel
          .findById(item.postId)
          .populate("userId", "userName profile_pic");

        if (!post) return null;

        const likeCount = await likePostModel.countDocuments({
          postId: post._id,
        });
        const isLiked = await likePostModel.findOne({
          postId: post._id,
          userName: req.user.userName,
        });

        return {
          id: post.id,
          caption: post.caption,
          photo_url: post.photo_url,
          createdAt: post.createdAt,
          author: {
            userName: post.userId?.userName,
            profile_pic: post.userId?.profile_pic,
          },
          likeCount,
          isLiked: !!isLiked,
          isSaved: true,
          isOwner: post.userId?._id?.toString() === req.user.id,
        };
      }),
    );

    res.status(200).json({
      success: true,
      posts: posts.filter(Boolean),
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
  savePost,
  unsavePost,
  getSavedPosts,
};

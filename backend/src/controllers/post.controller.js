const postModel = require("../models/postCreation.model");
const likePostModel = require("../models/likePost.model");
const savedPostModel = require("../models/savedPost.model");
const userModel = require("../models/auth.model");

async function createPost(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Photo is required",
      });
    }

    const photo_url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const { caption } = req.body;

    const post = await postModel.create({
      caption: caption || "",
      photo_url,
      userId: req.user.id,
    });

    const author = await userModel
      .findById(req.user.id)
      .select("userName profile_pic");

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: {
        id: post.id,
        caption: post.caption,
        photo_url: post.photo_url,
        createdAt: post.createdAt,
        author: {
          userName: author.userName,
          profile_pic: author.profile_pic,
        },
        likeCount: 0,
        isLiked: false,
        isSaved: false,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getFeed(req, res) {
  try {
    const posts = await postModel
      .find()
      .sort({ createdAt: -1 })
      .populate("userId", "userName profile_pic");

    const feed = await Promise.all(
      posts.map(async (post) => {
        const [likeCount, isLiked, isSaved] = await Promise.all([
          likePostModel.countDocuments({ postId: post._id }),
          likePostModel.findOne({
            postId: post._id,
            userName: req.user.userName,
          }),
          savedPostModel.findOne({
            postId: post._id,
            userName: req.user.userName,
          }),
        ]);

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
          isSaved: !!isSaved,
          isOwner: post.userId?._id?.toString() === req.user.id,
        };
      }),
    );

    res.status(200).json({ success: true, posts: feed });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function getUserPosts(req, res) {
  try {
    const { userName } = req.params;
    const user = await userModel.findOne({ userName });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const posts = await postModel
      .find({ userId: user._id })
      .sort({ createdAt: -1 });

    const userPosts = await Promise.all(
      posts.map(async (post) => {
        const [likeCount, isLiked, isSaved] = await Promise.all([
          likePostModel.countDocuments({ postId: post._id }),
          likePostModel.findOne({
            postId: post._id,
            userName: req.user.userName,
          }),
          savedPostModel.findOne({
            postId: post._id,
            userName: req.user.userName,
          }),
        ]);

        return {
          id: post.id,
          caption: post.caption,
          photo_url: post.photo_url,
          createdAt: post.createdAt,
          likeCount,
          isLiked: !!isLiked,
          isSaved: !!isSaved,
          isOwner: user.id === req.user.id,
        };
      }),
    );

    res.status(200).json({ success: true, posts: userPosts });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function deletePost(req, res) {
  try {
    const post = await postModel.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You can only delete your own posts",
      });
    }

    await Promise.all([
      likePostModel.deleteMany({ postId: post._id }),
      savedPostModel.deleteMany({ postId: post._id }),
      postModel.findByIdAndDelete(post._id),
    ]);

    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = {
  createPost,
  getFeed,
  getUserPosts,
  deletePost,
};

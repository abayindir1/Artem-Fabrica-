const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/profile");

// @route Post api/posts
// @desc Create a post
// @access Private

router.post("/", auth, async (req, res) => {
  try {
    const user = await (await User.findById(req.user.id)).isSelected(
      "-password"
    );

    const newPost = new Post({
      name: user.name,
      text: req.body.text,
      drawing: req.body.drawing,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route Get api/posts
// @desc Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route Get api/posts/:id
// @desc Get post by id
// @access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send("Post not found");
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send("Post not found");
    }
    res.status(500).send("Server Error");
  }
});

// @route Get api/posts/:id
// @desc Delete a post
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).send("Post not found");
    }

    if (post.user.toString() !== req.user.id) {
      res.status(404).send("You are not authorized");
    } else {
      await post.remove();
    }

    res.json({ msg: "Post removed" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).send("Post not found");
    }
    res.status(500).send("Server Error");
  }
});

// @route Put api/posts/upvote/:id
// @desc Upvote a post
// @access Private
router.put("/upVote/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if user already liked it
    if (
      post.upVote.filter((upVote) => upVote.user.toString() === req.user.id)
        .length > 0
    ) {
      res.status(400).json({ msg: "You already liked it" });
    } else if (
      post.downVote.filter(
        (downVote) => downVote.user.toString() === req.user.id
      ).length > 0
    ) {
      // console.log(post.downVote.filter(downVote => downVote.user.toString() === req.user.id)[0])
      const removeIndex = post.downVote
        .map((downVote) => downVote.user.toString())
        .indexOf(req.user.id);
        
        post.downVote.splice(removeIndex, 1);
        post.upVote.unshift({ user: req.user.id });
        await post.save();
    } 
    res.json(post.upvote);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route Put api/posts/downvote/:id
// @desc downvote a post
// @access Private
router.put("/downVote/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if user already liked it
    if (
      post.downVote.filter(
        (downVote) => downVote.user.toString() === req.user.id
      ).length > 0
    ) {
      res.status(400).json({
        msg: "You already disliked it",
      });
    } else if (
      post.upVote.filter((upVote) => upVote.user.toString() === req.user.id)
        .length > 0
    ) {
      // console.log(req.user.id)
      // console.log(
      //   post.upVote.filter(upVote => upVote.user.toString() === req.user.id).length > 0
      // )
      const removeIndex = post.upVote
        .map((upVote) => upVote.user.toString())
        .indexOf(req.user.id);

      post.upVote.splice(removeIndex, 1);

      post.downVote.unshift({ user: req.user.id });
      await post.save();
    }
    res.json(post.downVote);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

module.exports = router;

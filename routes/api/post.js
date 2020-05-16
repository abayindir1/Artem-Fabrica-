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
      const user = await (await User.findById(req.user.id)).isSelected("-password")

      const newPost = new Post({
          name: user.name,
          text: req.body.text,
          drawing: req.body.drawing,
          user: req.user.id
      })
      const post = await newPost.save();
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator")
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route Post api/posts
// @desc Create a post
// @access Private

router.post("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")
      console.log(user)
    const newPost = new Post({
      name: user.name,
      url: req.body.url,
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
router.get("/", async (req, res) => {
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

// @route put api/posts/like/:id
// @desc Create a like
// @access Private
router.put("/like/:id", auth, async(req, res)=>{
  try {
    const post = await Post.findById(req.params.id)
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      return res.status(400).json({msg: 'Post Already liked'})
    }

    post.likes.unshift({user: req.user.id})

    await post.save()

    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})

// @route put api/posts/unlike/:id
// @desc unlike
// @access Private
router.put("/unlike/:id", auth, async(req, res)=>{
  try {
    const post = await Post.findById(req.params.id)
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
      return res.status(400).json({msg: 'Post has not been liked'})
    }

    const removeI = post.likes.map(like=> like.user.toString()).indexOf(req.user.id)

    post.likes.splice(removeI, 1)

    await post.save()

    res.json(post.likes)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Server Error")
  }
})


// @route Post api/posts/comment/:id
// @desc Create a comment
// @access Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Enter a text")
        .not()
        .isEmpty()
    ]
  ], async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password")
      const post = await Post.findById(req.params.id)

      const newComment = {
        user: req.user.id,
        text: req.body.text,
        name: user.name
      };

      // console.log(user.name)
      post.comment.unshift(newComment);
      await post.save();
      res.json(post.comment);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
})


// @route Delete api/posts/comment/:id/:comment_id
// @desc Delete a comment
// @access Private
router.delete("/comment/:id/:comment_id", auth, async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id)

    const comment = post.comment.find(comment => comment.id === req.params.comment_id)

    if(!comment){
      res.status(404).json({msg: "Comment not found"})
    }

    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({msg:"User not authorized"})
    }

    // remove comment
    const removeComment = post.comment.map(comment =>{
      comment.user.toString().indexOf(req.user.id)
    })
    post.comment.splice(removeComment, 1)

    await post.save()

    res.json(post.comment)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
})

module.exports = router;

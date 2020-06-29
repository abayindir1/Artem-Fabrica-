const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  drawing: {
    lines: [
      {
        points: [
          {
            x: {
              type: String,
              required: true,
            },
            y: {
              type: String,
              required: true,
            },
          },
        ],
        brushColor: {
          type: String,
        },
        brushRadius: {
          type: String,
        },
      },
    ],
  },
  upVote: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  downVote: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comment: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);

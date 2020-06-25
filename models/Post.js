const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
  },
  drawing: {
    lines: [
      {
        brushColor: {
          type: String,
          required: true,
        },
        brushRadius: {
          type: Number,
          required: true,
        },
        points: [
          {
            x: {
              type: Number,
              required: true,
            },
            y: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],
    height: {
      type: Number,
    },
    width: {
      type: Number,
    },
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

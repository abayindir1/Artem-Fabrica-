const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }
})
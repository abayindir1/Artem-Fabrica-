const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref: "user"
    },
    drawing: {
        lines:[
            {
                brushColor:{
                    type: String,
                    required:true
                },
                brushRadius:{
                    type:Number,
                    required: true
                },
                points:[
                    {
                        x:{
                            type: Number,
                            required: true
                        },
                        y:{
                            type: Number,
                            required: true
                        }
                    }
                ]
            }
        ],
        height:{
            type: Number,
            required: true
        },
        width:{
            type: Number,
            required: true
        }
    },
    upVote:{
        type: Number,
    },
    downVote:{
        type: Number
    }
})

module.exports = Post = mongoose.model("post", PostSchema)
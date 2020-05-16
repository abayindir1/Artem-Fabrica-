const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/api/auth")
const postRouter = require("./routes/api/post")
const profileRouter = require("./routes/api/profile")
const usersRouter = require("./routes/api/users")

app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/profile", profileRouter)
app.use("/api/posts", postRouter)


var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/draward";
mongoose.connect(MONGODB_URI)


mongoose.connection.on("open", ()=> {
    console.log("Connection Made")
}).on("error", (error)=>{
    console.log("Connection Error: " + error)
})

app.listen(PORT, ()=>{
    console.log("Server listening on " + PORT)
})
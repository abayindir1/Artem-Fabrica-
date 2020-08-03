const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/api/auth")
const postRouter = require("./routes/api/post")
const usersRouter = require("./routes/api/users")

const config = require("config")
const path = require('path');


const db = config.get("mongoURI")
mongoose.connect(db)

app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/auth", authRouter)
app.use("/api/users", usersRouter)
app.use("/api/posts", postRouter)

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  }

mongoose.connection.on("open", ()=> {
    console.log("Connection Made")
}).on("error", (error)=>{
    console.log("Connection Error: " + error)
})

app.listen(PORT, ()=>{
    console.log("Server listening on " + PORT)
})
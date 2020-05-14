const express = require("express");
const mongoose = require("mongoose");

app = express();
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({extended: true}))
app.use(express.json())


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
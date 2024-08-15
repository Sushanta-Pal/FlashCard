const express = require('express');
const port = process.env.PORT || 1001
const connectDB =require('./connection/connectDB')
const auth = require('./Route/auth')
const addTask = require('./Route/addTask')
const cors = require('cors')
require('dotenv').config()

const app= express();
app.use(express.json())
app.use(cors())


const path = require("path");
app.get("/", (req, res) => {
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


app.use('/api/v1',auth)
app.use('/api/v2',addTask)
const start= async()=>{
    try {
        await connectDB(process.env.URI);
        app.listen(port,(req,res)=>{
            console.log(`Server is running on port ${port}`);
        })
    } catch (error) {
        console("Server is not Running ")
    }
}
start()
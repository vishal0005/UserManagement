const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const app = express();

app.use(express.json());
app.use("/users",router);

mongoose
.connect(
    "mongodb+srv://vishalbhimporwala:vishalbhimporwala@vishal.uhwh9wg.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(()=>app.listen(4546,()=>
    console.log("connectd and listening port 4546")))
    .catch((err)=>console.log("connection error ",err))
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const app = express();

app.use(express.json());
app.use("/users",router);
const PORT = process.env.PORT

mongoose
.connect(
    "mongodb+srv://vishalbhimporwala:vishalbhimporwala@vishal.uhwh9wg.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(()=>app.listen(PORT,()=>
    console.log("connectd and listening port ",PORT)))
    .catch((err)=>console.log("connection error ",err));
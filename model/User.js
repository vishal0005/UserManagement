const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
     password:{
        type : String,
        required : true,
        minLength : 6
    }
});

const user =  mongoose.model('User',userSchema);
module.exports = user;
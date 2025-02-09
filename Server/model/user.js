const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim:true,
        index: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    password:{
        type:String,
        required: [true, 'Password is required']},
    refreshToken:{
        type:String, }

},
{
    timestamps: true
}

)

module.exports = mongoose.model("User", userSchema);
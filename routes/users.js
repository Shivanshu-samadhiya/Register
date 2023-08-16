const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/facebook");
const userSchema = mongoose.Schema({
    username:String,
    email:String,
    age:Number,
    image:String,
    // profileLikes:{
    // type:Number,
    //  default:0
    // },
    Likes:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }],
    contact:String,
})
module.exports = mongoose.model("user",userSchema);
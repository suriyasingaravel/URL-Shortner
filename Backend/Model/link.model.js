const mongoose=require("mongoose");

const LinkSchema=mongoose.Schema({
createdAt:String,
RedirectedUrl:String,
ShortenedUrl:String,
user_id:String,
VisitedCount:{type:Number,default:0}
},{versionKey:false})

const LinkModel=mongoose.model("link",LinkSchema)

module.exports={LinkModel}
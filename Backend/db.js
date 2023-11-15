const mongoose=require("mongoose");
require('dotenv').config()
const connection=mongoose.connect("mongodb+srv://suriyasingaravel:vasanthi@cluster0.yh4twcd.mongodb.net/url-shortener?retryWrites=true&w=majority")

module.exports={connection}
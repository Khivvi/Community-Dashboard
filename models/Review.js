const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewschema = new Schema({
    experience:{
        type:String,
        required:true
    }
   
},{timestamps:true});

const Review = mongoose.model('Review', reviewschema);
module.exports=Review;
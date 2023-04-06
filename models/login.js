const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const loginschema = new Schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    }
   
},{timestamps:true});

const Login = mongoose.model('Login', loginschema);
module.exports=Login;
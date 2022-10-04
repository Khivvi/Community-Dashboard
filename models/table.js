const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tableSchema = new Schema({
    name: {
        type:String,
        required: true
    },
    regnum:{
        type:String,
        required:true
    },
    timetable:{
        type:String,
        required:true
    }
},{timestamps:true});

const Table = mongoose.model('Table', tableSchema);
module.exports=Table;
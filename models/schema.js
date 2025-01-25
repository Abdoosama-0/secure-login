const mongoose=require('mongoose')

//==============================================================

const signinSchema=  new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        maxlength:50,
       
    },
    email:{
        type: String,
        required:true,
        trim:true,
        maxlength:50,
        
    },
    password:{
        type: String,
        required:true,
        trim:true,
       
    },
})
//==============================================================

exports.signinSchema = mongoose.model('signin',signinSchema) 
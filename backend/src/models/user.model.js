import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required : true,
        unique : true,
        minlength : [4,"Atleast 3 characters are required"]
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcryptjs.hash(this.password,10);
    next();
})

userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password);
}


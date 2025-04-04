import mongoose, {Schema, model} from "mongoose";

const profileSchema = new Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    department : {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : Number,
        required: true
    },
    section : {
        type : String,
        required: true
    },
    collegeName : {
        type : String,
        required : true
    },
    semester : {
        type : Number,
        required  : true
    }
},{timestamps:true})

export const Profile = mongoose.model("Profile" , profileSchema);
import { MongoTopologyClosedError } from "mongodb";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username : {
        type: mongoose.Schema.Types.String,
        required : true,
        lowercase : true,
        unique : true
    },
    password : {
        type : mongoose.Schema.Types.Mixed,
        required : true,
        maxLength : [25, "Your password cannot exceed 25 characters"],
        minLength : [6, "Your password should be contain minimum 6 characters"],
    },
    role : {
        type : mongoose.Schema.Types.String,
        required : true
    },
})

const user = mongoose.model("User",userSchema)
export default user;
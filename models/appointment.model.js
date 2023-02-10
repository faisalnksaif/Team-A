import mongoose, { Schema, Types } from "mongoose";


export const appointmentSchema = new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.String,
        required:true,

    },
    age:{
        type:Schema.Types.Number,
        required:true,
    },
    gender:{
        type:Schema.Types.String,
        required:true,
        enum:['male','female','other']

    },
    place:{
        type:Schema.Types.String,
        required:true,

    },
    maritalStatus:{
        type:Schema.Types.String,
        required:true,
        enum:['married','unmarried']


    }
})

const appointmentModel = mongoose.model("patient",appointmentSchema)
export default appointmentModel
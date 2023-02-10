import mongoose, { Schema, Types } from "mongoose";
import { isValidMobileNumber } from "../utils/util.js";


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


    },
    contactNo: {
        type: mongoose.Schema.Types.String,
        required: true,
        // match:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        validate: {
          validator: (v) => isValidMobileNumber(v),
          message: "Invalid mobile number",
        },
      },
      appointmentFor:{
        type: mongoose.Schema.Types.String,
        required: true,
        enum:['Doctor Check','Result Analysis','Check up']
      }
})

const appointmentModel = mongoose.model("patient",appointmentSchema)
export default appointmentModel
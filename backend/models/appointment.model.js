import mongoose, { Schema, Types } from "mongoose";
import { isValidMobileNumber } from "../utils/util.js";
import moment from "moment";

export const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    // required:true,
    ref: "User",
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    // required:true,
    ref: "Doctor",
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    // required:true,
    ref: "User",
  },
  // departmentId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   // required:true,
  //   ref: "department",
  // },

  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  age: {
    type: Schema.Types.Number,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    required: true,
    enum: ["male", "female", "other"],
  },
  place: {
    type: Schema.Types.String,
    required: true,
  },
  maritalStatus: {
    type: Schema.Types.String,
    required: true,
    enum: ["married", "unmarried"],
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
  appointmentFor: {
    type: mongoose.Schema.Types.String,
    required: true,
    enum: ["DoctorCheck", "ResultAnalysis", "Checkup"],
  },
  date: {
    type: mongoose.Schema.Types.Date,
    required: true,
    get:function(v){
      return moment(v).format('YYYY-MM-DD')
    },
    validate: {
      validator: function(v) {
        moment(v,'YYYY-MM-DD',true).isValid()
      },
      message: "Invalid date format. Date must be a ISOString",
    },
    
  },
  time: {
    type: String,
    required: true,
    get: function(v) {
      return moment(v).format('HH:mm');
    },
    validate: {
      validator: function(v) {
        return moment(v, 'HH:mm', true).isValid();
      },
      message: "Invalid time format. Time must be in HH:mm formate"
    }
  }
});

const appointmentModel = mongoose.model("appointment", appointmentSchema);
export default appointmentModel;

import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  hospitalId:{
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref:"hospital"

  },
  isAccepted:{
    type: mongoose.Schema.Types.Boolean,
    default:false
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required : true,
    ref:"department"
  },
  timeStart: {
    type: mongoose.Schema.Types.String,
    required : true
  },
  timeEnd: {
    type: mongoose.Schema.Types.String,
    required : true
  },
  qualification:{
    type:mongoose.Schema.Types.String,
    required : true
  },
  yearofExperience:{
    type:mongoose.Schema.Types.String
  }
  // hospitalId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:"hospital"
  
});
const doctor = mongoose.model("Doctor", doctorSchema);
export default doctor;

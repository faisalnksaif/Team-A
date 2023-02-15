import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  hospital:{
    type: mongoose.Schema.Types.String,
    required : true

  },
  isAccepted:{
    type: mongoose.Schema.Types.Boolean,
    default:false
  },
  department: {
    type: mongoose.Schema.Types.String,
    required : true
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

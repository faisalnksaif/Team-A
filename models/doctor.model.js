import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  department: {
    type: mongoose.Schema.Types.String,
  },
  timeStart: {
    type: mongoose.Schema.Types.String,
  },
  timeEnd: {
    type: mongoose.Schema.Types.String,
  },
  // hospitalId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref:"hospital"
  
});
const doctor = mongoose.model("Doctor", doctorSchema);
export default doctor;

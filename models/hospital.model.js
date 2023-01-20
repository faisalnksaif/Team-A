import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
  hospitalName: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  place: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  // logitude:{
  //     type : mongoose.Schema.Types.String,
  //     required : true
  // },
  // latitude:{
  //     type : mongoose.Schema.Types.String,
  //     required : true
  // },
  // location:{
  //     type:{
  //     type:mongoose.Schema.Types.String,
  //     enum:['point'],
  //     required:true
  //     }

  // },
  mobileNo: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});
hospitalSchema.index({ location: "2dsphere" });

const hospital = mongoose.model("hospital", hospitalSchema);
export default hospital;

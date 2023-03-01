import mongoose from "mongoose";
import { isValidMobileNumber } from "../utils/util.js";

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
  
  mobileNo: {
    type: mongoose.Schema.Types.String,
    required: true,
    // match:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    validate: {
      validator: (v) => isValidMobileNumber(v),
      message: "Invalid mobile number",
    },
  },
});

const hospital = mongoose.model("hospital", hospitalSchema);
export default hospital;

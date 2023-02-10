// import { MongoTopologyClosedError } from "mongodb";
import mongoose from "mongoose";
import { isValidMobileNumber } from "../utils/util.js";

export const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    // select:false,
    maxLength: [15, "Your password cannot exceed 15 characters"],
    minLength: [6, "Your password should be contain minimum 6 characters"],
  },
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  address: {
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
  email: {
    type: mongoose.Schema.Types.String,
    unique: true,
    required: true,
   
  },
  role: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  token: {
    type: mongoose.Schema.Types.String,
  },
});

const userModel = mongoose.model("User", userSchema);
export default userModel;

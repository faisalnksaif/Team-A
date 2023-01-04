import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";


// const password = 'sharmilamuhzin'
// const saltRounds = 10

export async function save(
  username,
  password,
  name,
  address,
  mobileNo,
  email,
  role
) {
  const userData = new userModel({
    username,
    password,
    name,
    address,
    mobileNo,
    email,
    role,
  });
//   bcrypt.hash(password, saltRounds, function (err, hash) {
//     // Store hash in your password DB.
//   });
  await userData.save();
  return { userData };
}

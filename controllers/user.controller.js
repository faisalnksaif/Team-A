import { save } from "../services/user.service.js";
import bcrypt, { hash } from "bcrypt";

export async function userDetails(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let address = req.body.address;
  let mobileNo = req.body.mobileNo;
  let email = req.body.email;
  let role = req.body.role;

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  try {
    const data = await save(
      username,
      password,
      name,
      address,
      mobileNo,
      email,
      role
    );
    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
  // Store hash in your password DB.

  // try {
  //     const data = await save(username,password,name,address,mobileNo,email,role)
  //     res.send(data)
  // } catch (err) {
  //     console.log(err);
  //     next(err)

  // }
}

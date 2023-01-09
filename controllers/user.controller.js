import { save } from "../services/user.service.js";
import bcrypt, { hash } from "bcrypt";
import userModel from "../models/user.model.js";

export async function userDetails(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let address = req.body.address;
  let mobileNo = req.body.mobileNo;
  let email = req.body.email;
  let role = req.body.role;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const data = await save({
      username,
      password: hashedPassword,
      name,
      address,
      mobileNo,
      email,
      role,
    });


    // const user = await userModel.findOne({username:req.body.username})
    // if(user){
    //   res.status(500).send('user already exist');
    // }else{
    // const userData = new userModel(data);
    //   // console.log();

    //   return { userData };

    // }

    res.send(data);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function userLogin(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;

  try {
    let user = await userModel.findOne({ username: username });
    console.log("user: ", user);

    if (!user) {
      res.status(500).send("Username is invalid!");
    } else {
      const validpassword = await bcrypt.compare(password, user.password);
      console.log("validpassword :", validpassword);

      if (!validpassword) {
        res.status(500).send("invalid password");
      } else res.send("Logged In Successfully");
    }
  } catch (error) {
    next(error);
  }
}

import userModel from "../models/user.model.js";


export async function save(data) {
  const user = await userModel.findOne({username: data.username})
    // console.log('user: ',user);
    
    if(user) {
       res.status(500).send('User already exists!');
    } else {
      const userData = new userModel(data);
      console.log('userData',userData);
      await userData.save();
      return { userData };
    }
}


// export async function save(data){
//   const user = new userModel({data})
//   // console.log();
//   //  await user.save()
//   return{user}
// }

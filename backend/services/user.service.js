import userModel from '../models/user.model.js'

export async function save(username,password,name,address,mobileNo,email,role){
    const userData = new userModel({
        username,
        password,
        name,
        address,
        mobileNo,
        email,
        role,
    })
    await userData.save()
    return{userData}
}
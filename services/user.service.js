import userModel from '../models/user.model.js'

export async function save(username,password,role){
    const userData = new userModel({
        username,
        password,
        role,
    })
    await userData.save()
    return{userData}
}
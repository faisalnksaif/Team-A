import { save } from "../services/user.service.js";



export async function userDetails(req,res,next){
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    try {
        const data = await save(username,password,role)
        res.send(data)
    } catch (err) {
        next(err)
        
    }
}
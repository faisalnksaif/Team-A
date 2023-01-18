import { getProfile } from "../services/user.service.js";


export async function userProfile(req,res,next){
    try{
        const profile =await getProfile(req.params.id);
        res.send(profile)
    }catch(error){
        next(error)

    }
   
}
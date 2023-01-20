import { getProfile, update } from "../services/user.service.js";


export async function userProfile(req,res,next){
    try{
        const profile =await getProfile(req.params.id);
        res.send(profile)
    }catch(error){
        next(error)

    }
   
}

export async function updateUser(req,res,next){
    try {
        const updatedProfile = await update(req.params.id)
        res.send(updatedProfile)
    } catch (error) {
        next(error)
    }
}
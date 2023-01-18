import { doctorProfile } from "../services/doctor.service.js";


export async function profile(req,res,next){
    try{
        const profileView = await doctorProfile(req.params.id)
        res.send(profileView)
    }catch(error){
        next(error)
    }
}




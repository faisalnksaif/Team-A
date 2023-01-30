import { deleteUser, getProfile} from "../services/user.service.js";


export async function userProfile(req,res,next){
    try{
        const profile =await getProfile(req.params.id);
        return res.send(profile)
    }catch(error){
        next(error)

    }
   
}

// export async function deleteUserProfile(req,res,next){
//     try {
//         const deletedProfile = await deleteUser(req.params.id)
//         res.send(deletedProfile)
//     } catch (error) {
//         next(error)
//     }
// }
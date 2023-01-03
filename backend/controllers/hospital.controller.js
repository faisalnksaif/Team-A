// import { ObjectID } from "bson";
// import hospital from '../models/hospital.model.js'
import {deleteData, getAll, save} from '../services/hospital.service.js'
import { update } from '../services/hospital.service.js'; 


export async function hospitalData(req,res,next){
   let hospitalName = req.body.hospitalName;
   let address = req.body.address;
   let place = req.body.place;
   let mobileNo = req.body.mobileNo;

try {
    
    const result = await save(hospitalName,address,place,mobileNo)
    res.send(result)

} catch (err) {
     next(err)


//    res.send({error:"insertion failed"})
}
}


//------------------------------------get hsptl----------------------------------------//


export  async function getHospitals(req,res){
  const {result} = await getAll()
res.send(result)
 }

//---------------------------------------update hospital----------------------------------------//

export async function updateData(req,res,next){
    // const {updatedHospital} = await update()
    // res.send(updatedHospital)

    try {
             const updatedData = await up
             
             
             
             date(req,res)
            //  const {updatedHospital} = await update()
             res.send(updatedData)
            //  console.log(updatedData);
         } catch (error) {
            //  res.send({error:"failed"})
            next(error)
            
         }
        
}


//------------------------------delete  hospital--------------------------------------//


export async  function deleteHospital(req,res,next){
  try {
    console.log('delete')
    const dltHsptl = await deleteData(req.params.id)
    // throw new Error('errorrr')
    res.send(dltHsptl)

  } catch (error) {
    console.log(error)
    next(error)
    // next({error:"cannot delete data"})
    // res.send({err:"cannot delete data"})
  }
}























// try {
//     const updatedData = await update(req,res)
//     res.send(updatedData)
// } catch (error) {
//     res.send({error:"failed"})
    
// }


















    
//    const hospitals = await hospital.findByIdAndUpdate (req.params.id,{
//         hospitalName :req.body.hospitalName,
//         address :req.body.address,
//         place :req.body.place,
//         mobileNo :req.body.mobileNo,
//     },{new:true})   
//  if(!hospitals){
//     res.send("hospital not found")
//  }
//  res.send(hospitals)
 
//}
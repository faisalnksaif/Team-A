// import hospital from "../models/hospital.model.js"
import HospitalModel from "../models/hospital.model.js"


//-------------post hospital data----------------------------------------//

export async function save(hospitalName,address,place,mobileNo,){
    const result = new HospitalModel({
        hospitalName,
        address,
        place,
        mobileNo,
        
        

    })
    await result.save()
    
    return{result}

}


 //----------------------get hospital----------------------------------------//

 export async function getAll(){
    const result = await HospitalModel.find({})
    
    return{result}

}

//-------------------------update-----------------------------------------------//


export async function update(req,res){
    
    const updatedHospital = await HospitalModel.findByIdAndUpdate(req.params.id,{
         hospitalName :req.body.hospitalName,
         address :req.body.address,
         place :req.body.place,
         mobileNo :req.body.mobileNo,
     },{new:true})   
//   if(!updatedHospital){
//      res.send("hospital not found")
//   }0
// //   res.send(updatedHospital)
return{updatedHospital}
  
 }

 //-------------------------Delete Hospital-----------------------------------------------//


 export async function deleteData(id){
    const deletedHospitalData = await HospitalModel.findByIdAndDelete(id)
    // await deletedHospitalData.save()
    return {deletedHospitalData}
 }





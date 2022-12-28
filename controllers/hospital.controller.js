import { values } from "../services/hospital.service.js"



export async function hospital(req,res){
   let hospital_name = req.body.hospital_name;
   let address = req.body.address;
   let place = req.body.place;
   let contact_no = req.body.contact_no;

try {
    const result = await values(hospital_name,address,place,contact_no)
    res.send(result)
} catch (error) {
    res.send({error:"insertion failed"})
}
}
 
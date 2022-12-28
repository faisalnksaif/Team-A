import { isValidMobileNumber } from "../utils/util.js";

    export function hospitalMiddleware(req,res,next){

        
        let hospital_name=req.body.hospital_name;
        let address=req.body.address;
        let place=req.body.place;
        let contact_no=req.body.contact_no;

       if (!hospital_name) {
        res.send("Hospital Name is required")    
       }

       if (!address) {
        res.send("address Name is required")    
       }
       if (!place) {
        res.send("place Name is required")    
       }
       if (!contact_no) {
        res.send("contact_no Name is required")    
       }console.log("contact_no",contact_no.length);
       if (!isValidMobileNumber(contact_no)) {
        res.send("your mobile number not match required format")
       }

       next()
    }
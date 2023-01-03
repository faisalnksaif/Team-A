import express ,{Router} from 'express'
import { deleteHospital, getHospitals, hospitalData, updateData } from '../controllers/hospital.controller.js'
import  {hospitalMiddleware} from "../middlewares/hospital.middleware.js"
// import { makeValidateBody } from 'express-class-validator'



const router = express.Router()

// class User {
//     @IsString()
//     address : string
    

// }

router.post("/",hospitalMiddleware,hospitalData);
router.get("/",getHospitals);

router.patch("/:id",updateData)
router.delete("/:id",deleteHospital)


export default router;

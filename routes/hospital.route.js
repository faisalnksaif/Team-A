import express ,{Router} from 'express'
import { makeValidateBody } from 'express-class-validator';
import { verify } from 'jsonwebtoken';
import { deleteHospital, getHospital, getHospitals, hospitalData, updateData } from '../controllers/hospital.controller.js'
import { hospital } from '../dto/hospital.dto.js';
import  {hospitalMiddleware} from "../middlewares/hospital.middleware.js"
// import { makeValidateBody } from 'express-class-validator'
// import { verifyToken } from '../middlewares/auth.middleware.js';



const router = express.Router()

// class User {
//     @IsString()
//     address : string
    

// }

router.post("/create",makeValidateBody(hospital),hospitalMiddleware,hospitalData);

router.get("/",getHospitals);
router.get("/singleview/:id",getHospital)
router.patch("/update/:id",updateData)
router.delete("/delete/:id",deleteHospital)


export default router;

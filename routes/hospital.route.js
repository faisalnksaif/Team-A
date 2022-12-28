import express ,{Router} from 'express'
import { hospital } from '../controllers/hospital.controller.js'
import  {hospitalMiddleware} from "../middlewares/hospital.middleware.js"



const router = express.Router()

router.post("/",hospitalMiddleware,hospital);

export default router;

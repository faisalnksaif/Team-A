import express ,{Router} from 'express'
import { profile } from '../controllers/doctor.controller.js'


const router = express.Router()


router.get("/profile/:id",profile)

export default router;
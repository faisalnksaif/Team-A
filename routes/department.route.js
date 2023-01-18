import { createDepartmentList } from "../controllers/department.controller.js"
import express,{Router} from 'express'


const router = express.Router()

router.post("/list",createDepartmentList)

export default router
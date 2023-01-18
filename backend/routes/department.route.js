import { deleteDepartment, DepartmentList, getDepartmentList, updateDepartment } from "../controllers/department.controller.js"
import express,{Router} from 'express'


const router = express.Router()

router.post("/list",DepartmentList)
router.get("/alldepartment",getDepartmentList)
router.put("/updatedepartment/:id",updateDepartment)
router.delete("/deletedepartment/:id",deleteDepartment)




export default router
import { deleteDepartment, DepartmentList, getDepartmentList, updateDepartment } from "../controllers/department.controller.js"
import express,{Router} from 'express'
import { verifyUser } from "../middlewares/auth.middleware.js"


const router = express.Router()

router.post("/list",verifyUser,DepartmentList)
router.get("/alldepartment",verifyUser,getDepartmentList)
router.put("/updatedepartment/:id",verifyUser,updateDepartment)
router.delete("/deletedepartment/:id",verifyUser,deleteDepartment)




export default router
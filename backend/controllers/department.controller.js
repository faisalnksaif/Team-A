import {department} from '../services/department.sevice.js'

export async function createDepartmentList(req,res,next){
    let departmentName = req.body.departmentName
    try {
        const departmentList = await department({departmentName})
        res.send(departmentList)
    } catch (error) {
        next(error)
    }
}
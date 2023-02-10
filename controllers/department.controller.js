import {deleteData, department, getAll, update} from '../services/department.sevice.js'

export async function DepartmentList(req,res,next){
    let departmentName = req.body.departmentName
    try {
        const departmentList = await department({departmentName})
        res.send({departmentList})
    } catch (error) {
        next({error})
    }
}


export async function getDepartmentList(req,res){
    const { result } = await getAll()
    res.send(result)
}

export async function updateDepartment(req,res,next){
    try{
        const updatedDepartment = await update(req,res)
        res.send({updatedDepartment})
    
    }catch(error){
        next({error})
    }
   
}

export async function deleteDepartment(req,res){
    try {
        const deleteDprtmnt = await deleteData(req.params.id)
        res.send({deleteDprtmnt})
    } catch (error) {
        next({error})
    }
}
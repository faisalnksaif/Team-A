import departmentModel from "../models/department.model.js"

export async function department(departmentName){
    const department = new departmentModel(departmentName)
    await department.save()
    return { department }
}
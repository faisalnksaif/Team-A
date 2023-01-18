import departmentModel from "../models/department.model.js";

export async function department(departmentName) {
  const department = new departmentModel(departmentName);
  await department.save();
  return { department };
}

export async function getAll() {
  const result = await departmentModel.find({});
  return { result };
}

export async function update(req,res) {
  const updateData = await departmentModel.findByIdAndUpdate(
    req.params.id,
    { departmentName: req.body.departmentName },
    { new: true }
  );
  return { updateData };
}


export async function deleteData(id){
    const deletedData = await departmentModel.findByIdAndDelete(id)
    return{deletedData}
}
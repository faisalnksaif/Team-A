export async function updateUserMiddlewar(req, res, next) {
  if (req.body.user) {
    let { username, name, address, mobileNo, email } = req.body.user;

    if (!username) {
      res.send("username required");
    }
    if (!name) {
      res.send("username required");
    }
    if (!address) {
      res.send("address required");
    }
    if (!mobileNo) {
      res.send("mobileNo required");
    }
    if (!email) {
      res.send("email required");
    }
  }
  if (req.body.doctor) {
    let { department, timeStart, timeEnd, qualification, yearofExperience } =
      req.body.doctor;

    if (!department) {
      res.send("department required");
    }
    if (!timeStart) {
      res.send("timeStart required");
    }
    if (!timeEnd) {
      res.send("timeEnd required");
    }
    if (!qualification) {
      res.send("qualification required");
    }
    if (!yearofExperience) {
      res.send("yearofExperience required");
    }
  }
  next();
}

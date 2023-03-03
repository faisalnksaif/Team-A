import moment from "moment";

export function appointmentMiddleware(req, res, next) {
  let {
    doctorId,
    name,
    age,
    gender,
    place,
    maritalStatus,
    contactNo,
    appointmentFor,
    date,
    time,
  } = req.body;
  if (!doctorId) {
    res.send({ message: "doctorId is reqiured" });
  }
  // if (!departmentId) {
  //   res.send({ message: "departmentId is reqiured" });
  // }

  if (!name) {
    res.send({ message: "name is reqiured" });
  }
  if (!age) {
    res.send({ message: "age is reqiured" });
  }
  if (!gender) {
    res.send({ message: "gender is reqiured" });
  }
  if (!place) {
    place.send({ message: "place is reqiured" });
  }
  if (!maritalStatus) {
    res.send({ message: "maritalStatus is reqiured" });
  }
  if (!contactNo) {
    res.send({ message: "contactNo is reqiured" });
  }
  if (!appointmentFor) {
    res.send({ message: "appointmentFor is reqiured" });
  }
  if (!date) {
    res.send({ message: "date is required" });
  } else if (!moment(date, "YYYY-MM-DD", true).isValid()) {
    res.send({ message: "date must be in YYYY:MM:DD format" });
  }
  if (!time) {
    res.send({ message: "time is required" });
  } else if (!moment(time, "HH:mm", true).isValid()) {
    res.send({ message: "time must be in HH:mm format" });
  }

  next();
}

const formidable = require("formidable");
const fs = require("fs");
let Student = require("../model/students.model");

exports.create = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image upload failed",
      });
    }

    const {
      student_name,
      father_name,
      dob,
      gender,
      course,
      mobile_number,
      email,
      address,
    } = fields;

    let student = new Student();
    student.student_name = student_name;
    student.father_name = father_name;
    student.dob = dob;
    student.gender = gender;
    student.course = course;
    student.mobile_number = mobile_number;
    student.email = email;
    student.address = address;

    if (files.photo) {
      student.photo.data = fs.readFileSync(files.photo.path);
      student.photo.contentType = files.photo.type;
    }

    Student.findOne({ email })
      .then((response) => {
        if (response === null) {
          student
            .save()
            .then(() => res.json("Student added!"))
            .catch((err) => res.status(400).send("Error: " + err));
        } else {
          return res
            .status(400)
            .send({ error: { message: "Email ID Already Present" } });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
};


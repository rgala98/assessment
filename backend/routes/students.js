

const router = require("express").Router();

let Student = require("../model/students.model");
const formidable = require("formidable");

const fs = require("fs");

const { create } = require("../controllers/students.js");

router.get("/students", (req, res) => {
  Student.find()
    .then((students) => res.json(students))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/resetIDS", (_, res) => {
  Student.dropIndexes();
  Student.counterReset("s_id", function (err) {
    // Now the counter is 0
    console.log("COUNTER 0");
  });
});

router.post("/student", create);

// const student_name = req.body.student_name;
// const father_name = req.body.father_name;
// const dob = req.body.dob;
// const gender = req.body.gender;
// const course = req.body.course;
// const mobile_number = req.body.mobile_number;
// const email = req.body.email;
// const address = req.body.address;

// var data = await Student.findOne({ email });

// if (data) {
//   return res.status(400).send({"error":{ message: "Email ID Already Present" }});
// } else {
//   const newStudent = new Student({
//     student_name: student_name,
//     father_name: father_name,
//     dob: dob,
//     gender: gender,
//     course: course,
//     mobile_number: mobile_number,
//     address: address,
//     email: email,
//   });

//   newStudent
//     .save()
//     .then(() => res.json("Student added!"))
//     .catch((err) => res.status(400).send("Error: " + err));
// }

router.patch("/student", (req, res) => {
  // const s_id = req.body.s_id;
  // const student_name = req.body.student_name;
  // const father_name = req.body.father_name;
  // const dob = req.body.dob;
  // const gender = req.body.gender;
  // const course = req.body.course;
  // const mobile_number = req.body.mobile_number;
  // const email = req.body.email;
  // const address = req.body.address;

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image upload failed",
      });
    }
    let s_id = 0;
    s_id = Number(fields.s_id);

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

    if (s_id === null) {
      return res.status(400).json("Error: No Student ID to update data");
    }

    Student.findOneAndUpdate(
      { s_id },
      {
        student_name: student_name,
        father_name: father_name,
        dob: dob,
        gender: gender,
        course: course,
        mobile_number: mobile_number,
        address: address,
        email: email,
      },
      {
        new: true,
      }
    )
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

router.delete("/student", (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image upload failed",
      });
    }
    let s_id = 0;
    s_id = Number(fields.s_id);
    if (s_id === null) {
      return res.status(400).json("Error: No Student ID to delete data");
    }
    Student.findOneAndDelete({s_id})
      .then(() => res.json("Delete Success"))
      .catch((err) => res.status(400).json("Error: " + err));
  });
});

module.exports = router;

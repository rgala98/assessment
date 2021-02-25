const mongoose = require("mongoose");

const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    student_name: {
      type: String,
      trim: true,
      required: true,
    },
    father_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
      required: true,
    },
    dob: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      trim: true,
      required: true,
    },
    course: {
      type: String,
      trim: true,
      required: true,
    },
    mobile_number: {
      type: String,
      trim: true,
      min: 10,
      max: 11,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);


studentSchema.plugin(AutoIncrement, { inc_field: "s_id" });

module.exports = mongoose.model("Student", studentSchema);

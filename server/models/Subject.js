import { model, Schema } from "mongoose";

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  teachers: {
    type: [Schema.Types.ObjectId],
    ref: "Teacher",
  },
  staffs: {
    type: [Schema.Types.ObjectId],
    ref: "Staff",
  },
});

const Subject = model("Subject", subjectSchema);

export default Subject;

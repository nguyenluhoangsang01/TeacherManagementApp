import { model, Schema } from "mongoose";

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  teacherId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subjects: {
    type: [Schema.Types.ObjectId],
    ref: "Subject",
  },
});

const Teacher = model("Teacher", teacherSchema);

export default Teacher;

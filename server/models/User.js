import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "boardOfDirectors", "headOfSubject", "teacher"],
      default: "teacher",
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;

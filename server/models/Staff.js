import { model, Schema } from "mongoose";
import { STAFF_TYPES } from "../constants/staffs";

const staffSchema = new Schema(
  {
    staff_type: {
      type: String,
      enum: Object.values(STAFF_TYPES),
      required: true,
      default: STAFF_TYPES.ADMIN,
    },
    subjects: {
      type: [Schema.Types.ObjectId],
      ref: "Subject",
    },
    staffId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Staff = model("Staff", staffSchema);

export default Staff;

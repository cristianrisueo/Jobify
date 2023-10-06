import mongoose from "mongoose"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js"

const JobSchema = new mongoose.Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values.JOB_STATUS,
    },
    type: {
      type: String,
      enum: Object.values.JOB_TYPE,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model("Jobs", JobSchema)

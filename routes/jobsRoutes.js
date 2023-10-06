import express from "express"
import { checkForTestUser } from "../middlewares/authMiddleware.js"
import {
  validateJobInputs,
  validateJob,
} from "../middlewares/requestsValidation.js"
import {
  getJobs,
  createJob,
  getJobById,
  editJob,
  deleteJob,
  showStats,
} from "../controllers/jobsControllers.js"

export const router = express.Router()

router
  .route("/")
  .get(getJobs)
  .post(checkForTestUser, validateJobInputs, createJob)

router.route("/stats").get(showStats)

router
  .route("/:id")
  .get(validateJob, getJobById)
  .patch(checkForTestUser, validateJobInputs, validateJob, editJob)
  .delete(checkForTestUser, validateJob, deleteJob)

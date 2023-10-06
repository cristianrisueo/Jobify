import { body, param, validationResult } from "express-validator"
import mongoose from "mongoose"
import Jobs from "../models/jobsModel.js"
import Users from "../models/usersModel.js"
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../helpers/customErrors.js"
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js"

// Main logic of the middleware. Returns the errors
const returnErrors = (values) => {
  return [
    values,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg)

        if (errorMessages[0].startsWith("Job with")) {
          throw new NotFoundError(errorMessages)
        } else if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError(errorMessages)
        } else {
          throw new BadRequestError(errorMessages)
        }
      }

      next()
    },
  ]
}

// Middleware used to check the inputs when trying to create a job
export const validateJobInputs = returnErrors([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("location").notEmpty().withMessage("Location is required"),
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid status value"),
  body("type")
    .notEmpty()
    .withMessage("Type is required")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid type value"),
])

// Middleware used when trying to access a job by Id (gatekeeper)
export const validateJob = returnErrors([
  param("id").custom(async (id, { req }) => {
    // Checks if the Id of the job is valid
    const validId = mongoose.Types.ObjectId.isValid(id)
    if (!validId) throw new BadRequestError("Invalid ID")

    // Checks if the job exists
    const foundJob = await Jobs.findById(id)
    if (!foundJob) throw new NotFoundError(`Job with id ${id} not found`)

    // Checks if the user has access to the job
    const isAdmin = req.user.userRole === "admin"
    const isCreator = req.user.userId === foundJob.createdBy.toString()
    if (!isAdmin && !isCreator)
      throw new UnauthorizedError("Not authorized to access this job")
  }),
])

// Middleware used to check the inputs when trying to create a new user
export const validateRegisterInputs = returnErrors([
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("What shit of name do u have?"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name also is required")
    .isLength({ min: 3 })
    .withMessage("What shit of name did ur parents give you?"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("That's not a correct email")
    .custom(async (email) => {
      const user = await Users.findOne({ email })
      if (user) throw new BadRequestError("The email used already exists")
    }),

  body("password")
    .notEmpty()
    .withMessage("The password is required")
    .isLength({ min: 5 })
    .withMessage("The password is too short... Dumbass"),

  body("location").notEmpty().withMessage("Send me location!!"),
])

// Middleware used to check the inputs when trying to login a user
export const validateLoginInputs = returnErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("That's not a correct email"),

  body("password").notEmpty().withMessage("The password is required"),
])

// Middleware used to check the inputs when trying to update a user
export const validateUpdateUserInputs = returnErrors([
  body("name")
    .notEmpty()
    .withMessage("Name can't be empty")
    .isLength({ min: 3 })
    .withMessage("What shit of name is that?"),

  body("lastName")
    .notEmpty()
    .withMessage("Last name can't be empty")
    .isLength({ min: 3 })
    .withMessage("What shit of last name is that?"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("That's not a correct email")
    .custom(async (email, { req }) => {
      const user = await Users.findOne({ email })
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("The email is in use")
    }),

  body("location").notEmpty().withMessage("Send me location!!"),
])

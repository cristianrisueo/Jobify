import { StatusCodes } from "http-status-codes"
import cloudinary from "cloudinary"
import fs from "fs/promises"
import Users from "../models/usersModel.js"
import Jobs from "../models/jobsModel.js"
import { hashPassword, comparePassword } from "../helpers/passwordHelper.js"
import { NotFoundError, UnauthenticatedError } from "../helpers/customErrors.js"
import { createJwt } from "../helpers/jwtHelper.js"

// Controller that registers a new user
export const register = async (req, res) => {
  const isFirstUser = (await Users.countDocuments()) === 0
  req.body.role = isFirstUser ? "admin" : "user"
  req.body.password = await hashPassword(req.body.password)

  await Users.create(req.body)
  res.status(StatusCodes.CREATED).json({ msg: "User created" })
}

// Controller that logs in a user
export const login = async (req, res) => {
  const user = await Users.findOne({ email: req.body.email })
  if (!user) throw new NotFoundError("Email not found")

  const isValidPassword = await comparePassword(
    req.body.password,
    user.password
  )
  if (!isValidPassword) throw new UnauthenticatedError("Invalid credentials")

  const jwt = createJwt({ userId: user._id, userRole: user.role })
  res.cookie("jwt", jwt, {
    HttpOnly: true, // Only can be transmited through http
    expires: new Date(Date.now() + 86400000), // 1 day
  })

  return res.status(StatusCodes.OK).json({ msg: "User logged in" })
}

// Controller that logs out a user
export const logout = (req, res) => {
  res.cookie("jwt", "", {
    HttpOnly: true,
    expires: new Date(Date.now()),
  })

  res.status(StatusCodes.OK).json({ msg: "User logged out" })
}

// Controller that returns the current user
export const getCurrentUser = async (req, res) => {
  const user = await Users.findById(req.user.userId)
  res.status(StatusCodes.OK).json(user.toJSON())
}

// Controller that updates a user
export const updateUser = async (req, res) => {
  const newUser = { ...req.body }
  delete newUser.password

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path)
    await fs.unlink(req.file.path)

    newUser.avatar = response.secure_url
    newUser.avatarPublicId = response.public_id
  }

  const updatedUser = await Users.findByIdAndUpdate(req.user.userId, newUser)

  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId)
  }

  res.status(StatusCodes.OK).json({ msg: "update user" })
}

// Controller that returns the stats of the app (only for admins)
export const getApplicationStats = async (req, res) => {
  const users = await Users.countDocuments()
  const jobs = await Jobs.countDocuments()

  res.status(StatusCodes.OK).json({ users, jobs })
}

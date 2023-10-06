import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../helpers/customErrors.js"
import { verifyJwt } from "../helpers/jwtHelper.js"

export const authenticateUser = async (req, res, next) => {
  if (!req.cookies.jwt) throw new UnauthenticatedError("Token not found")

  try {
    const { userId, userRole } = verifyJwt(req.cookies.jwt)
    const isTestUser = userId === "651979a4de94a3134738b3e1"
    req.user = { userId, userRole, isTestUser }

    next()
  } catch (error) {
    throw new UnauthenticatedError(`Authentication error: ${error.message}`)
  }
}

export const isAdmin = async (req, res, next) => {
  if (!req.cookies.jwt) throw new UnauthenticatedError("Token not found")
  if (req.user.userRole !== "admin")
    throw new UnauthorizedError("Must be admin to access the stats")

  next()
}

export const checkForTestUser = (req, res, next) => {
  if (req.user.isTestUser) throw new BadRequestError("Test user not allowed")
  next()
}

import jwt from "jsonwebtoken"

export const createJwt = (data) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  })

export const verifyJwt = (token) => jwt.verify(token, process.env.JWT_SECRET)

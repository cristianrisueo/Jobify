import { StatusCodes } from "http-status-codes"

export const requestNotFound = (req, res) =>
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Request not found" })

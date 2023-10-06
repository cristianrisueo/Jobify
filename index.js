import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import "express-async-errors"
import dotenv from "dotenv"
import cloudinary from "cloudinary"
import path, { dirname } from "path"
import { fileURLToPath } from "url"
import { errorHandler } from "./middlewares/errorHandler.js"
import { requestNotFound } from "./middlewares/requestNotFound.js"
import { authenticateUser } from "./middlewares/authMiddleware.js"
import { connectMongoDb } from "./helpers/connectMongoDb.js"
import { router as JobsRouter } from "./routes/jobsRoutes.js"
import { router as UsersRouter } from "./routes/usersRoutes.js"

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

cloudinary.config({
  cloud_name: "test213",
  api_key: "675275858853158",
  api_secret: "mCnEFxCjl9py70gr5DSBWeIZjrs",
}) // Cloudinary API configuration

app.use(express.static(path.resolve(__dirname, "./public"))) // Specify the dirname of the public folder
app.use(express.json()) // To accept json objects in the requests
app.use(morgan("dev")) // To get info in the console about the request
app.use(cookieParser()) // To be able to read the cookies from the request
dotenv.config() // To be able to use environment variables
connectMongoDb() // Handler that does the connection to MongoDB

app.use("/api/v1/jobs", authenticateUser, JobsRouter) // Routes for Jobs requests
app.use("/api/v1/users", UsersRouter) // Routes for Users requests
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "./public", "index.html"))
) // After built the frontend and translated from dist to public, every get request points to the frontend

app.use("*", requestNotFound) // Middleware for requests not found (404)
app.use(errorHandler) // Middleware for error on controllers

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server running on port ${process.env.SERVER_PORT}`)
)

import express from "express"
import {
  register,
  login,
  logout,
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/usersControllers.js"
import {
  validateRegisterInputs,
  validateLoginInputs,
  validateUpdateUserInputs,
} from "../middlewares/requestsValidation.js"
import {
  authenticateUser,
  isAdmin,
  checkForTestUser,
} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multerMiddleware.js"

export const router = express.Router()

router.route("/register").post(validateRegisterInputs, register)
router.route("/login").post(validateLoginInputs, login)
router.route("/logout").get(logout)
router.route("/current-user").get(authenticateUser, getCurrentUser)
router
  .route("/update-user")
  .patch(
    authenticateUser,
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUserInputs,
    updateUser
  )
router
  .route("/admin/app-stats")
  .get(authenticateUser, isAdmin, getApplicationStats)

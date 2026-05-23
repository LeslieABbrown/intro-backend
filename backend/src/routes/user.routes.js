import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controllers.js";

const router = Router();

//create the /register route
router.route('/register').post(registerUser);
//create the /login route
router.route('/login').post(loginUser);

//Logout Route
router.route('/logout').post(logoutUser);

export default router;
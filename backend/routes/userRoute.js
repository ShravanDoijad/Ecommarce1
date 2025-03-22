import express from "express"

import { loginUser, registerUser, adminLogin } from "../controllers/userController.js"
import { body } from "express-validator";
import { admin } from "../middleware/adminAuth.js";
const userRouter = express.Router();

userRouter.post("/register",[
    body("name").notEmpty({min:2}).withMessage("atleast 2 character long"),
    body("email").isEmail().withMessage("enter valid email address"),
    body("password").isLength({min:6}).withMessage("atleast 6 character long")
] ,registerUser)


userRouter.post("/login",
    [
    body("email").isEmail().withMessage("enter valid email address"),
    body("password").isLength({min:6}).withMessage("atleast 6 character long")
    ],
    loginUser)

    
userRouter.post("/adminLogin" , adminLogin)

userRouter.post("/logout",)



export default userRouter;

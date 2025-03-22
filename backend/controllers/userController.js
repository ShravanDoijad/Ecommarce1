import userModel from "../models/userModel.js"
import { validationResult } from "express-validator";
import dotenv from "dotenv"
dotenv.config()
import jwt from "jsonwebtoken"
const loginUser= async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(401).json({errors : errors.array()})
        }
        const {email, password} = req.body;
        if(!email || !password ){
            return res.status(400).json({msg: "All feilds are required"})
        }
        const logUser = await userModel.findOne({email}).select("+password");
        const isMatch  = await logUser.comparePassword(password);
        if (!logUser || !isMatch) {
            return res.status(400).json({msg: "Invalid email or password"})
        }
        const token = await logUser.generateAuthToken();
        res.cookie("token", token);
        res.status(200).json({msg: "user logged in successfully",logUser})

    } catch (error) {
        console.log("error from the userLogin", error);
        
    }
}

const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
           return res.status(401).json({errors : errors.array()})
        }
        const {name, email, password} = req.body;
        if(!email || !password || !name){
           return res.status(400).json({msg: "All feilds are required"})
        }
        else{
        let userExists = await userModel.findOne({email})

        if (userExists) {
            console.log("user is already registered");
            return res.status(400).json("user already exists")
        }

        const hashedPassword = await userModel.hashPassword(password)
        
        const user = await userModel.create({
             name,
             email,
             password: hashedPassword
        })
        let token  = await user.generateAuthToken();
        res.cookie("token", token)
        
        res.status(200).json({msg: "user registered successfully", user})

    }
    } catch (error) {

        console.log("error from the userController", error);
        
    }
}

const adminLogin = async (req , res) => {
    try {
        
    
   const {email, password} = req.body;
   if(!email || !password){return res.status(400).json({msg: "All feilds are required"})}
    if (email!==process.env.ADMIN_EMAIL || password!==process.env.ADMIN_PASSWORD) {
        console.log(email, password);
        
        return res.status(400).json({msg: "Invalid email or password"})
        
    }
    
    const token =  jwt.sign({email:process.env.ADMIN_EMAIL, password:process.env.ADMIN_PASSWORD}, process.env.JWT_SECRET, {expiresIn : "1d"} ) 
    await res.cookie("adminToken",token, {
        httpOnly: true, 
        secure: false,
        sameSite: "Lax"
    });
    res.status(200).json({msg: "admin logged in successfully",token})

} catch (error) {
        res.status(400).json({msg: error})
}
}



export {loginUser, registerUser, adminLogin}
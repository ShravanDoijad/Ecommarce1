import express, { Router } from "express"
const cartRouter = express.Router()
import {cartAuth} from "../middleware/cartAuth.js"
import { addCart, updateCart, getCart } from "../controllers/cartController.js"
cartRouter.post("/addCart", cartAuth, addCart)
cartRouter.post("/updateCart", cartAuth, updateCart)

cartRouter.get("/getCart", cartAuth, getCart)


export default cartRouter

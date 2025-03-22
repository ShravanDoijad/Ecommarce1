import express from "express"

const orderRouter = express.Router()
import { admin } from "../middleware/adminAuth.js"
import { allOrders, placeOrder, razorpayPayment, stripePayment, userOrders, verifyRazorpay, verifyStripe} from "../controllers/orderController.js"

orderRouter.post("/getOrder",placeOrder)
orderRouter.get("/allOrders", admin ,allOrders)
orderRouter.get("/userOrders",userOrders)
orderRouter.post("/stripePayment",stripePayment)
orderRouter.post("/verify", verifyStripe)
orderRouter.post("/razorpay", razorpayPayment)
orderRouter.post("/verifyRazorpay", verifyRazorpay)
export default orderRouter
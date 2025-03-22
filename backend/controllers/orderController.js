import Order from "../models/orderModel.js"
import User from "../models/userModel.js"
import jwt from "jsonwebtoken"
import Stripe from "stripe"
import Razorpay from "razorpay"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpayIstance = new Razorpay(
    {
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    }
)
const currency = "inr"
const deliveryCharge = 40

const placeOrder = async (req, res) => {
    const{ items, address, amount } = req.body;

    if (!address || !items || !amount ) {
        return res.status(400).json({"error": "Please enter all the fields"})
    }
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({error: "Unauthorized"})
    }
    
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    
    if (!decoded) {
        return res.status(401).json({error: "Unauthorized   "})
        
    }
    const user_id  = decoded._id


    try {
        const newOrder = await Order.create({
            userId: user_id,
                address,
                paymentMethod: "COD",
                payment: false,
                items,
                amount,
                status: "order placed",
                date: Date.now()



        })
        res.status(200).json({msg: "order placed", newOrder})

    } catch (error) {
        console.log(error);
        return res.status(400).json({error: error})
        
    }

}
const stripePayment = async (req, res) => { 
    try {
        const{ items, address, amount } = req.body;
        const {origin} = req.headers
        const token = req.cookies.token
    if (!token) {
        return res.status(401).json({error: "Unauthorized"})
    }
    
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    
    if (!decoded) {
        return res.status(401).json({error: "Unauthorized   "})
        
    }
    const user_id  = decoded._id


    
        const newOrder = await Order.create({
            userId: user_id,
                address,
                paymentMethod: "Stripe",
                payment: false,
                items,
                amount,
                status: "order placed",
                date: Date.now()
        })
        const line_items = items.map(item => {
            return{
                price_data:{
                    currency,
                    product_data:{
                        name: item.name
                    },
                    unit_amount:item.prices * 100
                },
                quantity: item.quantity
                }
            }
        )

        line_items.push({
            price_data:{
                currency,
                product_data:{
                    name: "Delivery Charge"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })
        
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            mode: "payment",
            line_items,
        })
        res.status(200).json({session_url:session.url})
        
    } catch (error) {
        console.log("stripe error", error);
        res.status(400).json({error: error})
    }

}

const verifyStripe = async (req, res) => {
    try {
        const {success, orderId, userId } = req.body;
        console.log("success", success);
        console.log("orderId", orderId);
        
        if (success) {
            await Order.findByIdAndUpdate(orderId,{ payment: true })
            await User.findByIdAndUpdate(userId,{cartData:{}})
        }
        else{
            await Order.findByIdAndDelete(orderId)
        }
       
    } catch (error) {
        console.log("verification asuccessfull", error);
        res.status(500).json({error: error})
        
    }
}

const razorpayPayment = async (req, res) => {
    try {
        const{ items, address, amount } = req.body;
        
        const token = req.cookies.token
    if (!token) {
        return res.status(401).json({error: "Unauthorized"})
    }
    
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    
    if (!decoded) {
        return res.status(401).json({error: "Unauthorized   "})
        
    }
    const user_id  = decoded._id


    
        const newOrder = await Order.create({
            userId: user_id,
                address,
                paymentMethod: "razorpay",
                payment: false,
                items,
                amount,
                status: "order placed",
                date: Date.now()
        })

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),

        }

        await razorpayIstance.orders.create(options, (error, order) => {
            if (error) {
                return res.status(400).json({error: error})
            }
            res.status(200).json({order})
        })
        
    } catch (error) {
        console.log("razorpay error", error);   
        return res.status(400).json({error: error})
        
    }
}

const verifyRazorpay = async (req, res) => {  
    try {
        const {razorpay_order_id, order, userId } = req.body
        const payment = await razorpayIstance.orders.fetch(razorpay_order_id)
        if (payment.status === "paid") {
            await Order.findByIdAndUpdate(order.receipt, {payment: true})
            await User.findByIdAndUpdate(userId, {cartData: {}})
            res.status(200).json({msg: "payment successfull"})
            
        }
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({error: error})
        
    }
}


const allOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json({orders})
        
    } catch (error) {
        console.log("error", error);
        
    }

}

const userOrders = async (req, res) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({error: "Unauthorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded) {
            return res.status(401).json({error: "Unauthorized"})
        }
        const user_id = decoded._id
        const orders = await Order.find({userId: user_id})
        res.status(200).json({orders})
       
    } catch (error) {
        console.log("error", error);
        
    }
}   




export {stripePayment, verifyRazorpay,razorpayPayment, verifyStripe ,placeOrder, allOrders, userOrders}


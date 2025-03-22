import express from "express"
import dotenv from "dotenv"
const app  = express()
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config();


import connectDb from "./config/db.js"
import connectCloudinary from "./config/cloudinary.js";
import userRouter  from "./routes/userRoute.js";
import productRouter from "./routes/productsRoute.js"
import multer from "multer"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"


const port  = process.env.PORT || 4000
app.use(cors({
    origin: ["https://ecommarce1-admin.vercel.app", "https://ecommarce1-frontend-shravans-projects-00476bc1.vercel.app"], 
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

connectDb()


app.use("/api", userRouter)
app.use("/product", productRouter)
app.use("/cart", cartRouter)
app.use("/orders", orderRouter)

app.get("/", (req, res) => {res.send('Hello World!')});

app.listen(port,()=> console.log(`app is listening on http://localhost:${port}`))


 

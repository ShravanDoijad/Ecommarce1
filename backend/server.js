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
    origin: ["http://localhost:5174", "http://localhost:5173"], 
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


 
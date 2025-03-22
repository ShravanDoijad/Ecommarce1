import express, { Router } from "express"
const productRouter = Router()
import upload from "../middleware/multer.js"
import {addProduct, listProduct, removeProduct, singleProduct } from "../controllers/productController.js"
import { admin } from "../middleware/adminAuth.js"

productRouter.post("/add",  upload.fields([{ name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }, 
    { name: "image4", maxCount: 1 }, ]), admin, addProduct)
productRouter.get("/list", listProduct)
productRouter.post("/remove", admin,removeProduct )
productRouter.get("/single", admin,singleProduct )

export default productRouter

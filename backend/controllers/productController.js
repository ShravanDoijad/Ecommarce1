import productModel from '../models/productsModel.js'
import  cloudinary from "../config/cloudinary.js"

const addProduct = async(req, res) => {
    try {
        
    
    const {name, description, category, subCategory, prices, sizes, bestSeller} = req.body;

    const image1 = req.files?.image1?.[0]
    const image2 = req.files?.image2?.[0]
    const image3 = req.files?.image3?.[0]
    const image4 = req.files?.image4?.[0]

    let images = [image1, image2, image3, image4].filter((item)=>item);
    console.log({name, description, category, subCategory, prices, sizes, bestSeller});
    let imageUrl= (images.length>0)?
     await Promise.all(    
        images.map(async (item)=>{
            let result = await cloudinary.uploader.upload(item.path, {resource_type: "image"})
            return result.secure_url
        })
    ):[];

    const productData = { 
        name, description, category, subCategory, prices : Number(prices),  sizes: sizes ? JSON.parse(sizes) : [], bestSeller: bestSeller==="true" , image:imageUrl,
        date: Date.now()
    }
    
    await productModel.create(productData);


    console.log(productData);

    
    return res.json({msg:" product added successfully"});
} catch (error) {
    console.log("error", error);
    
        return res.json({msg: "error", error})
}
  
}
const listProduct = async(req, res) => {
    try {
        const product = await productModel.find({});
        return res.json({msg: "product listed successfully", product})

        
    } catch (error) {
       return res.status(400).json({msg: "error", error})
    }
  
}
const removeProduct = async(req, res) => {
    try {
        const removedProduct= await productModel.findByIdAndDelete(req.body.id);
        console.log(removedProduct);
        
        return res.json(removedProduct);
    } catch (error) {
        return res.status(400).json({msg: "error", error})
    }
  
}
const singleProduct = async(req, res) => {
  try {
    const singleProduct = await productModel.findById(req.body._id)
    if (!singleProduct) {
        return res.json({msg: "no product found"})
    }
    return res.json({msg: "product listed successfully", singleProduct})


  } catch (error) {
    return res.json({msg:"error from controller", error})
  }
}

export  { addProduct, listProduct, removeProduct, singleProduct }
import userModel from "../models/userModel.js"

const addCart= async (req, res)=>{
    try {
        const {userId, itemId, size} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            if((cartData)[itemId][size]){
                cartData[itemId][size]= cartData[itemId][size]+1
            }
            else{
                cartData[itemId][size] =1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        
        await userModel.findByIdAndUpdate(userId, {$set: {cartData}})
        res.status(200).json({msg: "cartData added successfully", cartData})
        
    } catch (error) {
        res.status(401).json({msg: error.message})
    }
}

const updateCart= async (req, res)=>{
    try {
        const {userId, itemId, size, quantity} = req.body;
        const userData = await userModel.findById(userId);
        let cartData = await userData.cartData;
        if (cartData[itemId]) {
            cartData[itemId][size] = quantity;
        } else {
            cartData[itemId] = { [size]: quantity };
        }


        await userModel.findByIdAndUpdate(userId, {$set: {cartData}})
        res.status(200).json({msg: "cartData added successfully hi",cartData})
        
    } catch (error) {
        res.status(401).json({msg: error.message})
    }

}

const getCart= async (req, res)=>{
    try {
        const {userId} = req.body;
        const userData = await userModel.findById(userId);
        let cartData =  userData.cartData || {}
        res.status(200).json({cartData})

    } catch (error) {
        res.status(401).json({msg: error.message})
    }

}

 export {addCart,updateCart,getCart} 
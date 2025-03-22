import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
export const admin = (req, res, next) => {
    try {
    const {adminToken} = req.cookies;

    if(!adminToken){
        return res.status(401).json({message: 'Not Authorized'})
    }
    let decoaded = jwt.verify(adminToken, process.env.JWT_SECRET);

    if (decoaded.password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({message: 'Not Authorized login again'})
    }
    
    next();

} catch (error) {
  res.status(500).json({ message: error })
      
}
}
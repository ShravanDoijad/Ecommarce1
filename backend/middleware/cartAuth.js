import jwt from "jsonwebtoken"

export const cartAuth = async(req, res, next) => {
  const {token} = req.cookies;
  if (!token) {
    return res.status(401).json({msg: "Not authorized"})

  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = decoded._id;
    next()
    
  } catch (error) {
    return res.status(401).json({msg: error.message})
  }
}


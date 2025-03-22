import mongoose from 'mongoose'

const connectDb = async() => {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI,
       
    )
    console.log("connected to Mongodb");
    

  } catch (error) {
    console.log(error);
    
    console.log("Error connecting to MongoDB");
    
  }
}

export default connectDb
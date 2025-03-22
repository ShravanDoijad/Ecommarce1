import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email: ({ type: String, required: true, unique: true,
        minlength: [5, "email must br atleast 5 characters long"]
     }),
    password: ({ type: String, required: true }),
    cartData: ({type: Object, default: {}}),


},{ minimize: false})

userSchema.methods.generateAuthToken = function () {
    const token  = jwt.sign(
        {
            _id:this._id,
        },
            process.env.SECRET_KEY,
            {expiresIn: "24h"}
    )
        return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);

}

const userModel =mongoose.models.user || mongoose.model("User",userSchema);

export default userModel;
 import User from "../models/User.model.js"
 import jwt from "jsonwebtoken";
 
export const deleteUser =async (req,res)=>{
    const user = await User.findById(req.params.id);

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).send("you are not authenticated");
    jwt.verify(token,process.env.JWT_KEY, async (err,payload)=>{
if(payload.id !== user._id.toString()){
   return res.status(403).send("you can delete only your account!");
}
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted")
    })


    
}


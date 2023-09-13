 import User from "../models/User.model.js"
 import bcrypt from "bcryptjs"; 
 import jwt  from "jsonwebtoken";

 export const register=async(req,res,next)=>{

    try{
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newUser = new User({
            ...req.body,
            password:hash,
        });
        await newUser.save();
        res.status(201).send("User has been created");
    }
    catch(err){
        next(err)
    }
 }
 
 export const login= async(req,res,next)=>{
    try{
         const user = await User.findOne({email:req.body.email});
         const err = new Error();
         err.status=404;
         err.message="User not found"
         if(!user) return next(err)

         const isCorrect = bcrypt.compareSync(req.body.password, user.password);
         if(!isCorrect) return res.status(400).send("wrong password ")


        const token = jwt.sign({
            id:user._id
        },
        process.env.JWT_KEY)
         const {password, ...info}=user._doc
         res
         .cookie("accessToken",token,{
            httpOnly:true,
         })
         .status(200).send(info)
    }
    catch(err){
        res.status(500).send("something went wrong")
    }
 }
 export const logout=(req,res)=>{

 }

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js"
import authRoute from "./routes/auth.route.js"
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();
mongoose.set("strictQuery",true);

async function main() {
  try{
    await mongoose.connect(process.env.MONGO);
    console.log('mongodb connect')
  }
  catch(error){
   handleError(error)
  }
    
    
  }
  main()

  app.use(express.json());
  app.use(cookieParser());
  app.use("/api/auth/",authRoute)
  app.use("/api/users/",userRoute)

 app.use((err,req,res,next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong !";

  return res.status(errorStatus).send(errorMessage)
 })

app.listen(5000, ()=>{
    console.log("Backend server is running")
})
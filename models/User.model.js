import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
username:{
    type:String,
    require:true,
},
email:{
    type:String,
    require:true,
    unique:true,
},
password:{
    type:String,
    require:true,
},
device:{
    type:Array,
    require:true,
},
courseDuration:{
    type:Number,
    require:true,
},
termsAndConditions: {
    type: String,
    default: "agree",
    enum: ["agree", "disagree"],
    required: true
}
 },{
    timestamps:true
 })

 export default mongoose.model("User",userSchema)
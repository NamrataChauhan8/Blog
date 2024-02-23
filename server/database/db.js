import mongoose from "mongoose";

export const connection=async()=>{
    const URL='mongodb+srv://namratac:Namrata@cluster0.nte2w9a.mongodb.net/Blog';
    try{
       await mongoose.connect(URL,{useNewUrlParser:true});
       console.log("Database connected succesfully");
    }catch(error){
        console.log("error while handling database",error);
    }
}

export default connection;
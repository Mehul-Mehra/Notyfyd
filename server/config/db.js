import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MONGODB CONNECTED SUCCESSFULLY');
    }
    catch(error){
        console.log('FAILED TO CONNECT TO MONGODB',error);
        process.exit(1);
    }
};
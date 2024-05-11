import mongoose from 'mongoose';
import { config  } from 'dotenv'; // to acess contents in.env file
config();


export const connectDb = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.log("error : ",error);
    }
};
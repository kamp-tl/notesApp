import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config({path:'src/.env', quiet:true});

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongo connected');
    } catch (err){
        console.error('error connecting to mongo', err.message);
        process.exit(1); //exit with failure 
    }
}
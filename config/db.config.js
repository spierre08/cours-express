import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connnectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
        console.log("Database connected successfully")
    } catch (error) {
        console.log(error);
    }
}

export default connnectDB;
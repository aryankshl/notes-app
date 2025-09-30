import mongoose from "mongoose";

//this isConnected flag prevents multiple database connections
let isConnected = false;

export async function connect(){
    if(isConnected){
        console.log("Already connected to the database");
        return;
    }

    try{
        await mongoose.connect(process.env.MONGO_URI!);
        isConnected = true;
        console.log("Connected to the database");
    } catch(error){
        console.log("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}
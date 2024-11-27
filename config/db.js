import mongoose from "mongoose";

export const ConnectDB = async () => {
    await mongoose.connect('mongodb+srv://somto565:28JmWaJnbhlLG92w@cluster22.azwnl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster22')
    console.log("DB Connected");
    
}
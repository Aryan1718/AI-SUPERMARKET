// lib/dbConnect.js
import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export async function dbConnect() {
    if (isConnected) {
        console.log("Already connected to the database.");
        return;
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = db.connections[0].readyState;
        console.log("Successfully connected to the database.");
    } catch (error) {
        console.log("Database connection error:", error);
        throw new Error("Database connection failed.");
    }
}

import express from "express";
import "dotenv/config";
import { dbConnection } from "./config/db.js";

const app = express()

// Apply middlewares
app.use(express.json());

// Use routes

// Connect to database
dbConnection();

// Listen on port
const PORT = process.env.PORT || 5060;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
import express from "express";
import "dotenv/config";
import cors from "cors";
import { dbConnection } from "./config/db.js";
import { visitorRouter } from "./routes/visitor_route.js";

const app = express();

// Apply middlewares
app.use(express.json());
app.use(cors({ Credentials: true, origin: "*" }));

// Use routes
app.use("/api/v1", visitorRouter);

// Connect to database
dbConnection();

// Listen on port
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

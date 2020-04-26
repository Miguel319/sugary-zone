import express from "express";
import cors from "cors";

import cakeRoute from './routes/cake';
import authRoute from './routes/auth';

const app = express();

// Settings
app.set("port", process.env.PORT || 3001);

// CORS
app.use(cors());
app.use(express.json());

// Route vars
// const cakeRoute = require("./routes/cake");
// const authRoute = require("./routes/auth");

// Routes
app.use("/api/cakes", cakeRoute);
app.use("/api/auth", authRoute);

export default app;

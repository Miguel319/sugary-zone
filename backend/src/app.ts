import express from "express";
import cors from "cors";

import cakeRoute from "./routes/cake.routes";
import authRoute from "./routes/auth.routes";
import errorHandler from "./middlewares/error";

const app = express();

const BASE_URL = "/api/v1";

// Settings
app.set("port", process.env.PORT || 3001);

// CORS
app.use(cors());
app.use(express.json());

// Routes
app.use(`${BASE_URL}/cakes`, cakeRoute);
app.use(`${BASE_URL}/auth`, authRoute);

app.use(errorHandler);

export default app;

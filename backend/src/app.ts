const express = require("express");
const cors = require("cors");

const app = express();

// Settings
app.set("port", process.env.PORT || 3001);

// CORS
app.use(cors());
app.use(express.json());

// Route vars
const cakeRoute = require("./routes/cake");

// Routes
app.use('/api/cakes', cakeRoute);

export default app;

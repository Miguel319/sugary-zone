const express = require("express");
const cors = require("cors");

const app = express();

// Settings
app.set("port", process.env.PORT || 3001);

// CORS
app.use(cors());
app.use(express.json());


export default app;

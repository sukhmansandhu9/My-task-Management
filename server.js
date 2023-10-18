const dotenv = require("dotenv");
require("colors");
const DB = require("./config/db");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// Rest Object
const app = express();

// Import Routes
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
// Environment Variables
dotenv.config();

// Connect to DataBase
DB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", userRoutes);
// app.use("api/v1/task", taskRoutes);

app.use("/api/v1/task", taskRoutes);

const PORT = process.env.Port || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgYellow.white);
});

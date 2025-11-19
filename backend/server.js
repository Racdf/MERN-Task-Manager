require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const tasksRouter = require("./routes/tasks");
const errorHandler = (err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    message: err.message || "Server error",
  });
};

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/tasks", tasksRouter);

app.get("/", (req, res) => res.send("API running"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log("Server running on port", PORT));
  })
  .catch((err) => console.error("DB Connection Error", err));

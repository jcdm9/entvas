require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { InitiateMongoServer } = require("./../database/init");
const userRoutes = require("./routes/user");
const taskRoutes = require("./routes/task");
const mailRoutes = require("./routes/mail");

// initiate connection to database
InitiateMongoServer();

const app = express();

// app.use(cors({ origin: "*", credentials: true }));
app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/mail", mailRoutes);

// health check
app.get("/health", (req, res) => {
  res.json({ check: "Server is running." });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on ${process.env.URL}:${process.env.PORT}`);
});

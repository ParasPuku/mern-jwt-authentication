const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRouter");

require("dotenv").config();
const connectDB = require("./dbconnections/db");

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get("/ping", (req, res) => {
  res.send("Hello from the backend PONG");
});

app.use(bodyParser.json());
app.use(cors());

app.get("/api/v1/auth", authRouter);

app.listen(PORT, () => {
  console.log("Server is running on port 5000");
});

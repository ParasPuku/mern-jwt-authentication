const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/AuthRouter");
const productsRouter = require("./routes/ProductsRouter");

require("dotenv").config();
require("./dbconnections/db");

app.use(express.json());
console.log("Hello Ram", process.env.PORT);
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow required headers
  })
);
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.use("/ping", (req, res) => {
  console.log("GET PING");
  res.send("Hello from the backend PONG");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

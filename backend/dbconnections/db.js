require('dotenv').config();
const mongoose = require("mongoose");

const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;

if (!MONGODB_CONNECTION_STRING) {
  console.error(
    "MongoDB connection string is not defined in environment variables."
  );
  process.exit(1); // Exit the application if the connection string is missing
}

mongoose
  .connect(MONGODB_CONNECTION_STRING)
  .then(() => {
    console.log("Successfully Connected to DB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application on connection failure
  });

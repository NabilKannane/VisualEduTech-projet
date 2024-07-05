const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config();
const app = express();
const authRoutes = require("./routes/authRoutes");
const BiblioRoutes = require("./routes/BiblioRoutes");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/", authRoutes);
app.use("/api",BiblioRoutes)


module.exports = app;

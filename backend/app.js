const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors"); // Add this line
// const path = require("path");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

dotenv.config({path:"backend/config/config.env"});

// Use CORS middleware
app.use(cors({

    origin: 'http://localhost:3000',

    credentials: true

}));

app.use(express.json({limit: "10mb", extended: true}));
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
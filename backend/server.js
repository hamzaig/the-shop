const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const morgan = require("morgan");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
app.use(express.json());

dotenv.config();
connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);


// console.log(path.join(__dirname, "/public"));

// const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..//frontend/build")))
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../", "frontend", "build", "index.html"));
  })
} else {
  app.get("/", (req, res) => {
    res.send("API is running")
  })
}


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`.green.bold));

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
app.use(express.json());

dotenv.config();
connectDB();

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
})

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 7000;

app.listen("7000", console.log(`Server is running in ${process.env.NODE_ENV} mode on ${PORT}`.green.bold));

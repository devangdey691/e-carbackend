const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");

const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

app.use("/api", carRoutes);

app.use("/api/users", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/test", (req, res) => {
  res.send("Server Test OK");
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
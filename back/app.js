const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const tourRouter = require("./routes/tourRoutes");
const categoryRouter = require("./routes/categoryRoutes");

const app = express();

app.use(cors());

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// )

app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/categories", categoryRouter);

module.exports = app;

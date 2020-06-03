const express = require("express");
const bodyParser = require("body-parser");

// Mongoose
const mongoose = require("mongoose");

const profilesRoutes = require("./routes/profile-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use("/api/profiles", profilesRoutes); // => /api/pros/..
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An knkown error occured!" });
});

mongoose
  .connect(
    "mongodb+srv://Tony:HiQAce123@cluster0-endxe.mongodb.net/profiles?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });

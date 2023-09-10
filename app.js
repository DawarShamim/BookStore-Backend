const express = require("express");
const mongoose = require("mongoose");
const { success, error } = require("consola");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const {isHttpError} = require("http-errors");

const app = express();
const passport = require("passport");

const { login,Authentication, RoleCheck } = require("./Auth");
const DBurl = process.env.DBurl;
const PORT = process.env.Port || 8080;

app.use(express.json());
app.use(cors());

require("./middleware/passport")(passport);
require("./middleware/cache");

app.use("/login",login);
app.use("/api/author", require("./routes/AuthorRoute"));
app.use("/api/book", require("./routes/BookRoute"));
app.use("/api/booksales", require("./routes/BookSalesRoute"));
app.use("/api/client", require("./routes/ClientRoute"));
app.use("/api/reviews", require("./routes/ClientReviewsRoute"));
app.use("/api/employee",Authentication,RoleCheck(["Admin"]), require("./routes/EmployeeRoute"));
app.use("/api/stores", require("./routes/StoreRoute"));
app.use("/api/user",Authentication,require("./routes/UserController"));

app.use('/public/', express.static(path.join(__dirname, 'public')));
app.use('/search-api',require("./routes/PublicRoute"));


// Custom error handling middleware
app.use((error, req, res, next) => {
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  console.error("for unknown error",error);
  if (isHttpError(error)) {
    cosnole.log("in http",error);
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

//For Unknown Endpoints
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});

startApp = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DBurl);
    console.log("Connected to the database successfully");
    app.listen(PORT, () => {
      console.log("Server started on port", PORT);
    });
  } catch (err) {
    error({
      message: `Unable to connect with the database: ${err.message}`,
      badge: true,
    });
    startApp();
  }
};

startApp();

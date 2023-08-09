const express = require("express");
const mongoose = require("mongoose");
const { success, error } = require("consola");
const cors = require("cors");
require("dotenv").config();

const app = express();
const passport = require("passport");

const { login } = require("./Auth");
const DBurl = process.env.DBurl;
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

require("./middleware/passport")(passport);

app.use("/api/author", require("./routes/AuthorRoutes"));
app.use("/api/book", require("./routes/BookRoutes"));
app.use("/api/booksales", require("./routes/BookSalesRoutes"));
app.use("/api/clients", require("./routes/ClientRoutes"));
app.use("/api/clientreviews", require("./routes/ClientReviewsRoutes"));
app.use("/api/employee", require("./routes/EmployeeRoutes"));
app.use("/api/stores", require("./routes/StoreRoutes"));

// Custom error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  let errorMessage = "An unknown error occurred";
  let statusCode = 500;
  if (error instanceof HttpError) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

// This will fire whenever an unknown endpoint is hit
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

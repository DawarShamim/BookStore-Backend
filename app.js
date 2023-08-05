const express = require("express");
const mongoose =require("mongoose");
const {success,error} = require("consola");
const cors = require("cors");

const bodyParser = require("body-parser");

require('dotenv').config();
const DBurl=process.env.DBurl;

const app = express();
const passport = require("passport");

const{ login } =require('./Auth');


const PORT = process.env.PORT || 8080;

app.use(express.json()); 
app.use(cors());

app.use(bodyParser.json());

require("./middleware/passport")(passport);

app.use('/api/User',require('./routes/userRoutes'));

app.use('/api/Task',require('./routes/taskRoutes'));

app.use('/api/Login',login);

// This will fire whenever an unknown endpoint is hit
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.send({ error: "404 Not Found" });
  }
});

startApp = async () => {
      try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(DBurl);
      
        console.log("Connected to the database successfully");
      
        app.listen(PORT, () => {
          console.log("Server started",PORT);
        });
            
    
    
    } catch (err) {
      error({
        message: `Unable to connect with database: ${err.message}`,
        badge: true,
      });
      startApp();
    }
  };
  
  startApp();
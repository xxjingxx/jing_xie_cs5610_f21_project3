require("dotenv").config();
const express = require("express");
const user = require("./routes/controller/User.Controller.js");
const job = require("./routes/controller/Job.Controller.js");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//Setup MongoDB Connection
mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true });

const mongoDB = mongoose.connection;

mongoDB.on(
  "error",
  console.error.bind(console, "Error connecting to MongoDB:")
);

const app = express();
//app.use(session({secret: "SUPER_DUPER_SECRET"}));
app.use(
  session({
    secret: process.env.SUPER_DUPER_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_STRING }),
  })
);
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/user", user);
app.use("/api/job", job);
// Note that it is common practice got backend APIs in Node to start with the api prefix
// to distinguish them from frontend routes

app.get("/banana", (req, res) => {
  res.send("NOT BANANA!");
});

// https://www.amazon.com/gp/css/order-history

app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  console.log("received request");
  res.sendFile(path.join(__dirname, "build", "index.html"));
  //res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("NOT BANANA!");
});

// app.listen(8000, function() {
//     console.log('Starting server');
// });
app.listen(process.env.PORT || 8000, () => {
  console.log(`Starting server`);
});

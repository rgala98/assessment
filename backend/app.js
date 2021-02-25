const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('./database/mongooseStudent');
const cors = require("cors");

require("dotenv").config();

const app = express();

const apiPort = process.env.PORT || 5000;

//ROUTES
const studentRouter = require("./routes/students");
const leaderboardRouter = require("./routes/leaderboard");


app.use(cors());
app.use(bodyParser.json());

app.use("/api",studentRouter);
app.use("/api",leaderboardRouter);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
  })

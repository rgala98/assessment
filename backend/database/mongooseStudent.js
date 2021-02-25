const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.ATLAS_URI_STUDENT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

module.exports = { mongoose };

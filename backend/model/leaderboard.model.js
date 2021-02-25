const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const leaderBoardSchema = new Schema(
  {
    player_name: {
      type: String,
      trim: true,
      required: true,
    },
    time: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Leaderboard", leaderBoardSchema);

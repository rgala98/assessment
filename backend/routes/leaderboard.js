const router = require("express").Router();

let Leaderboard = require("../model/leaderboard.model");

router.get("/leaderboard", (req, res) => {
  Leaderboard.find()
    .sort({ time: -1 })
    .then((leaderboard) => res.json(leaderboard))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.post("/leaderboard", (req, res) => {
  const time = req.body.time;
  const player_name = req.body.player_name;

  const newLeaderboard = new Leaderboard({
    time: time,
    player_name: player_name,
  });

  newLeaderboard
    .save()
    .then(() => res.json("Player Added!"))
    .catch((err) => res.status(400).send("Error: " + err));
});

module.exports = router;

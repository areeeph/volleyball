const { Score } = require("../models");
const { getIO } = require("../socket");

const index = async (req, res) => {
  try {
    
    const score = await Score.findByPk(2);

    return res.json(score);
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const update = async (req, res) => {
  try {
    const score = await Score.findByPk(2);

    if (!score) {
      return res.status(404).send("Score not found");
    }

    const {
      team1_name,
      team1_score,
      team1_set,
      team2_name,
      team2_score,
      team2_set,
      team1_logo,
      team2_logo,
      current_set,
    } = req.body;

    console.log("hello");
    await score.update({
      team1_name,
      team1_score,
      team1_set,
      team2_name,
      team2_score,
      team2_set,
      team1_logo,
      team2_logo,
      current_set,
    });

    const io = getIO();

    io.emit("scoreUpdated", score);

    console.log("Score updated:", score);

    res.json({ message: "Score updated successfully", score });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to update score");
  }
};

const reset = async (req, res) => {
  try {
    const score = await Score.findByPk(2);

    if (!score) {
      return res.status(404).send("Score not found");
    }

    await score.update({
      team1_name: "Team 1",
      team1_score: 0,
      team1_set: 0,
      team2_name: "Team 2",
      team2_score: 0,
      team2_set: 0,
      team1_logo: "/images/blank.jpg",
      team2_logo: "/images/blank.jpg",
      current_set: 1,
    });

    const io = getIO();

    io.emit("scoreUpdated", score);

    return res.json({ message: "Score reset successfully", score });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to delete score");
  }
};

module.exports = {
  index,
  update,
  reset,
};

const { Score, Set, Point } = require("../models");
const { getIO } = require("../socket");

const index = async (req, res) => {
  try {
    const team1 = await Score.findOne({ where: { team_id: 1 } });
    const team2 = await Score.findOne({ where: { team_id: 2 } });

    const sets = await Set.findAll();

    return res.json({ team1, team2, sets });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const update = async (req, res) => {
  try {
    const {
      team1_id,
      team1_name,
      team1_logo,
      team2_id,
      team2_name,
      team2_logo,
    } = req.body;

    const [team_1, team_2] = await Promise.all([
      Score.findOne({ where: { team_id: team1_id } }),
      Score.findOne({ where: { team_id: team2_id } }),
    ]);

    await Promise.all([
      team_1.update({
        name: team1_name,
        logo: team1_logo,
      }),
      team_2.update({
        name: team2_name,
        logo: team2_logo,
      }),
    ]);

    const [team1, team2, sets] = await Promise.all([
      Score.findOne({ where: { team_id: 1 } }),
      Score.findOne({ where: { team_id: 2 } }),
      Set.findAll(),
    ]);

    const io = getIO();

    io.emit("DataUpdated", { team1, team2, sets });

    res.json({ message: "Set created successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to update score");
  }
};

const update_score = async (req, res) => {
  const { team_id, score } = req.body;
  try {
    const set = await Set.findOne({
      where: { set: req.body.set, team_id: team_id },
    });

    if (!set) {
      return res.status(404).send("Score not found");
    }

    await set.update({
      score: score,
    });

    const [team1, team2, sets] = await Promise.all([
      Score.findOne({ where: { team_id: 1 } }),
      Score.findOne({ where: { team_id: 2 } }),
      Set.findAll(),
    ]);

    const io = getIO();

    io.emit("DataUpdated", { team1, team2, sets });

    res.json({ message: "Set created successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to update score");
  }
};

const create_set = async (req, res) => {
  try {
    console.log(req.body);
    const { set } = req.body;

    const team1_set = await Set.create({
      set: set,
      team_id: 1,
      score: 0,
    });

    const team2_set = await Set.create({
      set: set,
      team_id: 2,
      score: 0,
    });

    const [team1, team2, sets] = await Promise.all([
      Score.findOne({ where: { team_id: 1 } }),
      Score.findOne({ where: { team_id: 2 } }),
      Set.findAll(),
    ]);

    const io = getIO();

    io.emit("DataUpdated", { team1, team2, sets });

    res.json({ message: "Set created successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to create set");
  }
};

const deleteSet = async (req, res) => {
  try {
    const { set } = req.body;

    const data = await Set.destroy({ where: { set: set } });

    const [team1, team2, sets] = await Promise.all([
      Score.findOne({ where: { team_id: 1 } }),
      Score.findOne({ where: { team_id: 2 } }),
      Set.findAll(),
    ]);

    const io = getIO();

    io.emit("DataUpdated", { team1, team2, sets });

    res.json({ message: "Set deleted successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to create set");
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

const stats = async (req, res) => {
  try {
    const [stats, team1, team2] = await Promise.all([
      Point.findAll({
        limit: 10,
        order: [["id", "DESC"]],
      }),
      Score.findOne({ where: { team_id: 1 } }),
      Score.findOne({ where: { team_id: 2 } }),
    ]);

    return res.json({ stats: stats.reverse(), team1, team2 });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const stat = async (req, res) => {
  try {
    const { team_id, point } = req.body;

    const stat = await Point.create({
      team_id: team_id,
      point: point,
    });

    const [stats, team] = await Promise.all([
      Point.findAll({
        limit: 10,
        order: [["id", "DESC"]],
      }),
      Score.findOne({ team_id: team_id }),
    ]);

    const io = getIO();

    io.emit("StatsUpdated", { stats: stats.reverse(), team });

    res.json({ message: "Set created successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to create set");
  }
};

const topSix = async (req, res) => {
  try {
    const { name1, name2, name3, name4, name5, name6 } = req.body;

    const io = getIO();

    io.emit("TopSix", { name1, name2, name3, name4, name5, name6 });

    res.json({ message: "Set created successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to create set");
  }
};

const position = async (req, res) => {
  try {
    const { position, name } = req.body;

    const io = getIO();

    io.emit("Position", { position, name });

    res.json({ message: "Set created successfully" });
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to create set");
  }
};

module.exports = {
  index,
  update,
  reset,
  update_score,
  create_set,
  deleteSet,
  stats,
  stat,
  topSix,
  position,
};

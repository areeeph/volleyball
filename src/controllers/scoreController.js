const { Score } = require("../models");

const index = async (req, res) => {
  try {
    const score = await Score.findByPk(2);
    res.render("score/index", {
      title: "Scores",
      score,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const edit = async (req, res) => {
  try {
    const score = await Score.findByPk(2);

    if (!score) {
      return res.status(404).render("404", {
        title: "Score Not Found",
      });
    }

    console.log(score.team1_name);

    res.render("score/update", {
      title: "Edit Score",
      score,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const update = async (req, res) => {
  try {
    const score = await Score.findByPk(req.params.id);

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
      current_set,
    } = req.body;

    await score.update({
      team1_name,
      team1_score,
      team1_set,
      team2_name,
      team2_score,
      team2_set,
      current_set,
    });

    res.redirect("/scores");
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to update score");
  }
};

const destroy = async (req, res) => {
  try {
    const score = await Score.findByPk(req.params.id);

    if (!score) {
      return res.status(404).send("Score not found");
    }

    await score.destroy();

    res.redirect("/scores");
  } catch (error) {
    console.error(error);

    res.status(500).send("Failed to delete score");
  }
};

const stats = async (req, res) => {
  try {
    const score = await Score.findByPk(2);
    res.render("score/stats", {
      title: "Scores",
      score,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

module.exports = {
  index,
  edit,
  update,
  destroy,
  stats,
};

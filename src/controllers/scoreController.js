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
    res.render("score/update", {
      title: "Edit Score",
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

const topsix = async (req, res) => {
  try {
    res.render("score/top-six", {
      title: "Top Six",
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const topsixUpdate = async (req, res) => {
  try {
    res.render("score/top-six-update", {
      title: "Top Six",
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const positions = async (req, res) => {
  try {
    res.render("score/positions", {
      title: "Top Six",
    });
  } catch (error) {
    console.error(error);

    res.status(500).send("Server Error");
  }
};

const positionsUpdate = async (req, res) => {
  try {
    res.render("score/positions-update", {
      title: "Top Six",
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
  topsix,
  topsixUpdate,
  positions,
  positionsUpdate
};

const sequelize = require("../config/database");
const Score = require("./Score");

const db = {
  sequelize,
  Score
};

module.exports = db;
const sequelize = require("../config/database");
const Score = require("./Score");
const Set = require("./Set");

const db = {
  sequelize,
  Score,
  Set
};

module.exports = db;
const sequelize = require("../config/database");
const Score = require("./Score");
const Set = require("./Set");
const Point = require("./Points");

Score.hasMany(Point, {
  foreignKey: "team_id",
  sourceKey: "team_id",
  as: "points",
});

Point.belongsTo(Score, {
  foreignKey: "team_id",
  targetKey: "team_id",
  as: "team",
});

const db = {
  sequelize,
  Score,
  Set,
  Point,
};

module.exports = db;

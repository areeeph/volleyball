const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Point = sequelize.define(
  "Point",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "scores",
        key: "team_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    tableName: "points",
    timestamps: true,
  },
);

module.exports = Point;

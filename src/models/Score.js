const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Score = sequelize.define(
  "Score",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    tableName: "scores",
    timestamps: true,
  },
);

module.exports = Score;

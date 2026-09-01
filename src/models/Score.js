const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Score = sequelize.define(
  "Score",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    team1_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    team1_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    team1_set: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    team2_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    team2_score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    team2_set: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    current_set: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  
  {
    tableName: "scores",
    timestamps: true
  }
);

module.exports = Score;
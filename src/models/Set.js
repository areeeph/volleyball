const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Set = sequelize.define(
  "Set",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    score:{
      type: DataTypes.INTEGER,
      allowNull: false
    },

    set:{
      type: DataTypes.INTEGER,
      allowNull: false
    },  

    team_id:{
      type: DataTypes.INTEGER,
      allowNull: false
    }

  },
  
  {
    tableName: "sets",
    timestamps: true
  }
);

module.exports = Set;

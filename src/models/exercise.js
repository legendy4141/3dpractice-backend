import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Exercise = sequelize.define(
  "Exercise",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    bmname: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    instructions: {
      type: DataTypes.STRING(512),
      allowNull: true,
    },
    hold: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    repeat: {
      type: DataTypes.SMALLINT,
      allowNull: true,
    },
    timesperday: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    range: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    resistance: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    direction: {
      type: DataTypes.STRING(16),
      allowNull: true,
    },
    randomkey: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tblexercises",
    timestamps: false,
  }
);

export default Exercise;

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const ProtExercise = sequelize.define(
  "ProtExercise",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    practiceid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    protocolid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conditionid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exerciseid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    hold: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
    },
    repeat: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
    },
    timesperday: {
      type: DataTypes.MEDIUMINT,
      allowNull: true,
    },
    range: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    resistance: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    direction: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    randomkey: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tblprotexercises",
    timestamps: false,
  }
);

export default ProtExercise;

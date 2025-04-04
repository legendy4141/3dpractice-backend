import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PlanPhase = sequelize.define(
  "PlanPhase",
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
    careplanid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phaseid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    repeattime: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    active: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "tblplanphases",
    timestamps: false,
  }
);

export default PlanPhase;

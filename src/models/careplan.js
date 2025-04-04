import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Careplan = sequelize.define(
  "Careplan",
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
    conditions: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    careplanname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    repeattime: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phaseorder: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "tblcareplans",
    timestamps: false,
  }
);

export default Careplan;

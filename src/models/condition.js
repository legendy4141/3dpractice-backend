import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Condition = sequelize.define(
  "Condition",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    area: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    acondition: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    exerciselist: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    practiceid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    treatmentlist: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    bmname: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "tblconditions",
    timestamps: false,
  }
);

export default Condition;

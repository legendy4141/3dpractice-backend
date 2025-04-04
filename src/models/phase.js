import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Phase = sequelize.define(
  "Phase",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    practiceid: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "tblphases",
    timestamps: false,
  }
);

export default Phase;

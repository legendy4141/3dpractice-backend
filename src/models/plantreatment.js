import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const PlanTreatment = sequelize.define(
  "PlanTreatment",
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
    treatmentid: {
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
  },
  {
    tableName: "tblplantreatments",
    timestamps: false,
  }
);

export default PlanTreatment;

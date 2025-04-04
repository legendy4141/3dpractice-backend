import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Treatment = sequelize.define(
  "Treatment",
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
    tableName: "tbltreatments",
    timestamps: false,
  }
);

export default Treatment;

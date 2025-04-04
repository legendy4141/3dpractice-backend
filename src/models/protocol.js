import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Protocol = sequelize.define(
  "Protocol",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    protocolname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    practiceid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    conditions: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "tblprotocols",
    timestamps: false,
  }
);

export default Protocol;

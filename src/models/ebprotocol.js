import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EBProtocol = sequelize.define(
  "EBProtocol",
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
    conditions: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "tblebprotocols",
    timestamps: false,
  }
);

export default EBProtocol;

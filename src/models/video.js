import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Video = sequelize.define(
  "Video",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    displayname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    videolink: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    vimeolink: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    randomkey: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tblvideos",
    timestamps: false,
  }
);

export default Video;

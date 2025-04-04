import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

const Practice = sequelize.define(
  "Practice",
  {
    practiceid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    contactname: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    practicename: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    customerid: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    address1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address2: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address3: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    postalcode: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    contactnumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    goodlic: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
      allowNull: true,
    },
    logobin: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
    blurb: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    carecreditmid: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    linkurl1: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    features: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phasedefaults: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    randomkey: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tblpractice",
    timestamps: false, // Assuming the table does not have timestamps
  }
);

Practice.associate = (models) => {
  Practice.hasMany(models.User, {
    foreignKey: "practiceid", // Field in User that refers to Practice
    sourceKey: "practiceid",
  });
};

export default Practice;

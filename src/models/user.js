import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "User",
  {
    userid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: {
        args: true,
        msg: "Username must be unique",
      },
    },
    password: {
      type: DataTypes.STRING(255), // Increased to accommodate hashed passwords
      allowNull: false,
    },
    securitytype: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
    patientid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    practiceid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    suspended: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "tblusers",
    timestamps: false,
  }
);

// Hash the password before saving it
User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(7);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeSave(async (user) => {
  if (user.password && user.changed("password")) {
    // Password has changed, so hash the new password before saving
    const salt = await bcrypt.genSalt(7);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

// Compare the password
User.prototype.comparePassword = async function (pwd) {
  // return bcrypt.compare(pwd, this.password);
  return pwd === this.password;
};

User.associate = (models) => {
  User.belongsTo(models.Practice, {
    foreignKey: "practiceid", // Field in User that refers to Practice
    targetKey: "practiceid",
  });
};

export default User;

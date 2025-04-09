import models from "../models/index.js";
import { Op } from "sequelize";

export const createUser = async (userData) => {
  try {
    const user = await models.User.create(userData);
    return user;
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

export const getUsers = async () => {
  try {
    return await models.User.findAll();
  } catch (err) {
    throw new Error("Error fetching users: " + err.message);
  }
};

export const getUserByEmail = async (email) => {
  return models.User.findOne({
    where: {
      email,
    },
  });
};

export const getUserByUsername = async (username) => {
  return models.User.findOne({
    where: {
      username,
      [Op.or]: [{ securitytype: 2 }, { securitytype: 3 }],
    },
  });
};

export const getUserByPracticeID = async (practiceid) => {
  return models.User.findOne({
    where: {
      practiceid,
    },
  });
};

export const getAdminUserByUsername = async (username) => {
  return models.User.findOne({
    where: {
      username,
      securitytype: 1,
    },
  });
};

export const getUserById = async (userId) => {
  return models.User.findByPk(userId);
};

export const getUserWithPractice = async (userId) => {
  try {
    const user = await models.User.findOne({
      where: {
        userid: userId,
      },
      include: {
        model: models.Practice,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (err) {
    throw new Error("Error fetching user with practice: " + err.message);
  }
};

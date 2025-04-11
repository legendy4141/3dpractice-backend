import models from "../models/index.js";
import { Op } from "sequelize";

// Get all exercises
export const getAllExercisesService = async () => {
  try {
    const exercises = await models.Exercise.findAll({
      order: [["name", "ASC"]],
    });
    return exercises;
  } catch (error) {
    throw error;
  }
};

export const getAllBMnameService = async () => {
  try {
    const allBMname = await models.Exercise.findAll({
      attributes: ["bmname"],
      group: ["bmname"],
      order: [["bmname", "ASC"]],
    });
    return allBMname.map((exercise) => exercise.bmname);
  } catch (error) {
    throw error;
  }
};

// Get an exercise by ID
export const getExerciseByIdService = async (id) => {
  try {
    const exercise = await models.Exercise.findByPk(id);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    return exercise;
  } catch (error) {
    throw error;
  }
};

export const getNamenBMnameByIdService = async (ids) => {
  if (!Array.isArray(ids) || ids.length === 0) {
    return [];
  }

  const exercises = await models.Exercise.findAll({
    where: { id: { [Op.in]: ids } },
  });

  return exercises;
};

// Create a new exercise
export const createExerciseService = async (exerciseData) => {
  try {
    const newExercise = await models.Exercise.create(exerciseData);
    return newExercise;
  } catch (error) {
    throw error;
  }
};

// Update an exercise
export const updateExerciseService = async (id, exerciseData) => {
  try {
    const exercise = await models.Exercise.findByPk(id);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    return await exercise.update(exerciseData);
  } catch (error) {
    throw error;
  }
};

// Delete an exercise
export const deleteExerciseService = async (id) => {
  try {
    const exercise = await models.Exercise.findByPk(id);
    if (!exercise) {
      throw new Error("Exercise not found");
    }
    await exercise.destroy();
    return { message: "Exercise deleted" };
  } catch (error) {
    throw error;
  }
};

export const getSortedExercisesByIdsService = async (ids) => {
  try {
    const exercises = await models.Exercise.findAll({
      where: {
        id: ids,
      },
      order: [["name", "ASC"]],
    });

    if (exercises.length === 0) {
      throw new Error("No exercises found");
    }

    return exercises;
  } catch (error) {
    throw error;
  }
};

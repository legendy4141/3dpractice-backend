import models from "../models/index.js";

// Get all EBProtExercises
export const getAllEBProtExercisesService = async () => {
  return await models.EBProtExercise.findAll();
};

// Get an EBProtExercise by ID
export const getEBProtExerciseByIdService = async (id) => {
  return await models.EBProtExercise.findOne({ where: { id } });
};

export const getEBProtExerciseWithProtIDService = async (protocolid) => {
  const exercises = await models.EBProtExercise.findAll({
    where: { protocolid },
    attributes: ["exerciseid", "hold", "repeat", "timesperday", "instructions"],
    raw: true,
  });

  return exercises;
};

// Create a new EBProtExercise
export const createEBProtExerciseService = async (data) => {
  return await models.EBProtExercise.create(data);
};

// Update an EBProtExercise
export const updateEBProtExerciseService = async (id, data) => {
  const exercise = await models.EBProtExercise.findOne({ where: { id } });
  if (exercise) {
    return await exercise.update(data);
  }
  return null;
};

// Delete an EBProtExercise
export const deleteEBProtExerciseService = async (id) => {
  const exercise = await models.EBProtExercise.findOne({ where: { id } });
  if (exercise) {
    await exercise.destroy();
    return true;
  }
  return false;
};

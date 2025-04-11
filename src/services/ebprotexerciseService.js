import models from "../models/index.js";

// Get all EBProtExercises
export const getAllEBProtExercisesService = async () => {
  return await models.EBProtExercise.findAll();
};

// Get an EBProtExercise by ID
export const getEBProtExerciseByIdService = async (id) => {
  return await models.EBProtExercise.findOne({ where: { id } });
};

export const getEBProtExercisesByProtIdService = async (protocolid) => {
  const exercises = await models.EBProtExercise.findAll({
    where: { protocolid },
  });
  return exercises;
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

export const bulkDeleteService = async (protocolid) => {
  const result = await models.EBProtExercise.destroy({
    where: { protocolid },
  });

  return result;
};

export const bulkEditService = async (protocolid, exercises) => {
  await models.EBProtExercise.destroy({
    where: { protocolid },
  });
  const bulkData = exercises.map((exercise) => ({
    protocolid,
    conditionid: 0,
    exerciseid: exercise.id,
    instructions: exercise.instructions,
    hold: exercise.hold,
    repeat: exercise.repeat,
    timesperday: exercise.timesperday,
    range: "Ignore",
    resistance: "Ignore",
    direction: "Ignore",
    randomkey: Math.floor(10000000 + Math.random() * 90000000),
  }));

  // Bulk create new exercises
  return await models.EBProtExercise.bulkCreate(bulkData);
};

export const bulkCreateService = async (protocolid, exercises) => {
  const bulkData = exercises.map((exercise) => ({
    protocolid,
    conditionid: 0,
    exerciseid: exercise.id,
    instructions: exercise.instructions,
    hold: exercise.hold,
    repeat: exercise.repeat,
    timesperday: exercise.timesperday,
    range: "Ignore",
    resistance: "Ignore",
    direction: "Ignore",
    randomkey: Math.floor(10000000 + Math.random() * 90000000),
  }));

  // Bulk create new exercises
  return await models.EBProtExercise.bulkCreate(bulkData);
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

import models from "../models/index.js";

// Get all ProtExercises
export const getAllProtExercisesService = async () => {
  return await models.ProtExercise.findAll();
};

// Get a ProtExercise by ID
export const getProtExerciseByIdService = async (id) => {
  return await models.ProtExercise.findOne({ where: { id } });
};

export const copyProtExerciseService = async (
  practiceid,
  protocolid,
  newprotocolid
) => {
  const result = await models.ProtExercise.findAll({
    where: { practiceid, protocolid },
  });

  const copyData = result.map((exercise) => ({
    practiceid: exercise.practiceid,
    protocolid: newprotocolid,
    conditionid: 0,
    exerciseid: exercise.exerciseid,
    instructions: exercise.instructions,
    hold: exercise.hold, // Fixed: hold should not use instructions
    repeat: exercise.repeat,
    timesperday: exercise.timesperday,
    range: exercise.range,
    resistance: exercise.resistance,
    direction: exercise.direction,
    randomkey: Math.floor(10000000 + Math.random() * 90000000),
  }));

  // Bulk create new exercises
  return await models.ProtExercise.bulkCreate(copyData);
};

export const getWithPracIDnProtIDService = async (practiceid, protocolid) => {
  return await models.ProtExercise.findAll({
    where: { practiceid, protocolid },
  });
};

export const getProtExerciseWithPracIDnProtIDService = async (
  practiceid,
  protocolid
) => {
  const exercises = await models.ProtExercise.findAll({
    where: { practiceid, protocolid },
    attributes: ["exerciseid", "hold", "repeat", "timesperday", "instructions"],
    raw: true,
  });

  return exercises;
};

// Create a new ProtExercise
export const createProtExerciseService = async (data) => {
  return await models.ProtExercise.create(data);
};

// Bulk create ProtExercises
export const bulkCreateProtExercisesService = async (data) => {
  return await models.ProtExercise.bulkCreate(data);
};

export const bulkEditProtExercisesService = async (data) => {
  // Delete existing exercises with the given practiceid and protocolid
  await models.ProtExercise.destroy({
    where: {
      practiceid: data.practiceid,
      protocolid: data.protocolid,
    },
  });

  // Prepare data for bulk creation
  const createData = data.selected.map((exercise) => ({
    practiceid: data.practiceid,
    protocolid: data.protocolid,
    conditionid: 0,
    exerciseid: exercise.exerciseid,
    instructions: exercise.instructions,
    hold: exercise.hold, // Fixed: hold should not use instructions
    repeat: exercise.repeat,
    timesperday: exercise.timesperday,
    range: exercise.range,
    resistance: exercise.resistance,
    direction: exercise.direction,
    randomkey: Math.floor(10000000 + Math.random() * 90000000),
  }));

  // Bulk create new exercises
  return await models.ProtExercise.bulkCreate(createData);
};

// Update a ProtExercise
export const updateProtExerciseService = async (id, data) => {
  const protExercise = await models.ProtExercise.findOne({ where: { id } });
  if (protExercise) {
    return await protExercise.update(data);
  }
  return null;
};

// Delete a ProtExercise
export const deleteProtExerciseService = async (id) => {
  const protExercise = await models.ProtExercise.findOne({ where: { id } });
  if (protExercise) {
    await protExercise.destroy();
    return true;
  }
  return false;
};

export const deleteByPracIDnProtIDService = async (practiceid, protocolid) => {
  return await models.ProtExercise.destroy({
    where: {
      practiceid,
      protocolid,
    },
  });
};

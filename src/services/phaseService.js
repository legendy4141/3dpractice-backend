import models from "../models/index.js";
import { Op } from "sequelize";

// Get all Phases
export const getAllPhasesService = async () => {
  return await models.Phase.findAll();
};

export const getPracticeZeroPhasesService = async () => {
  return await models.Phase.findAll({
    where: { practiceid: 0 },
    order: [["name", "ASC"]],
  });
};

export const getPhasesWithSecurityTypeService = async (
  securitytypeId,
  practiceId
) => {
  const whereCondition = {
    [Op.or]: [{ practiceid: 0 }],
  };

  if (securitytypeId === "2") {
    whereCondition[Op.or].push({ practiceid: practiceId });
  }

  return await models.Phase.findAll({
    where: whereCondition,
    order: [["name", "ASC"]],
  });
};

// Get a Phase by ID
export const getPhaseByIdService = async (id) => {
  return await models.Phase.findOne({ where: { id } });
};

// Create a new Phase
export const createPhaseService = async (data) => {
  return await models.Phase.create(data);
};

// Update a Phase
export const updatePhaseService = async (id, data) => {
  const phase = await models.Phase.findOne({ where: { id } });
  if (phase) {
    return await phase.update(data);
  }
  return null;
};

// Delete a Phase
export const deletePhaseService = async (id) => {
  const phase = await models.Phase.findOne({ where: { id } });
  if (phase) {
    await phase.destroy();
    return true;
  }
  return false;
};

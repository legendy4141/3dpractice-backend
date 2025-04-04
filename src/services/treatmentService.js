import models from "../models/index.js";
import { Op } from "sequelize";
// Get all Treatments
export const getAllTreatmentsService = async () => {
  return await models.Treatment.findAll();
};

export const getTreatmentsWithSecurityTypeService = async (
  securitytypeId,
  practiceId
) => {
  const whereCondition = {
    [Op.or]: [{ practiceid: 0 }],
  };

  if (securitytypeId === "2") {
    whereCondition[Op.or].push({ practiceid: practiceId });
  }

  return await models.Treatment.findAll({
    where: whereCondition,
    order: [["name", "ASC"]],
  });
};

// Get a Treatment by ID
export const getTreatmentByIdService = async (id) => {
  return await models.Treatment.findOne({ where: { id } });
};

// Create a new Treatment
export const createTreatmentService = async (data) => {
  return await models.Treatment.create(data);
};

// Update a Treatment
export const updateTreatmentService = async (id, data) => {
  const treatment = await models.Treatment.findOne({ where: { id } });
  if (treatment) {
    return await treatment.update(data);
  }
  return null;
};

// Delete a Treatment
export const deleteTreatmentService = async (id) => {
  const treatment = await models.Treatment.findOne({ where: { id } });
  if (treatment) {
    await treatment.destroy();
    return true;
  }
  return false;
};

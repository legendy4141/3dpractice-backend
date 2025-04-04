import models from "../models/index.js";

// Get all Conditions
export const getAllConditionsService = async () => {
  return await models.Condition.findAll();
};

// Get a Condition by ID
export const getConditionByIdService = async (id) => {
  return await models.Condition.findOne({ where: { id } });
};

// Create a new Condition
export const createConditionService = async (data) => {
  return await models.Condition.create(data);
};

// Update a Condition
export const updateConditionService = async (id, data) => {
  const condition = await models.Condition.findOne({ where: { id } });
  if (condition) {
    return await condition.update(data);
  }
  return null;
};

// Delete a Condition
export const deleteConditionService = async (id) => {
  const condition = await models.Condition.findOne({ where: { id } });
  if (condition) {
    await condition.destroy();
    return true;
  }
  return false;
};

export const getIDOnlyService = async (area, acondition) => {
  return await models.Condition.findOne({
    where: {
      area: area,
      acondition: acondition,
    },
  });
};

export const getExercisesOnlyService = async (area, acondition) => {
  return await models.Condition.findOne({
    where: {
      area: area,
      acondition: acondition,
    },
  });
};

export const getTreatmentlistOnlyService = async (areaId, aconditionId) => {
  const treatmentList = await models.Condition.findOne({
    where: {
      area: areaId,
      acondition: aconditionId,
    },
    attributes: ["id", "treatmentlist", "description", "bmname"],
    raw: true,
  });
  return treatmentList || {};
};

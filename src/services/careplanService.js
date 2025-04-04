import models from "../models/index.js";

// Get all Careplans
export const getAllCareplansService = async () => {
  return await models.Careplan.findAll();
};

// Get a Careplan by ID
export const getCareplanByIdService = async (id) => {
  return await models.Careplan.findOne({ where: { id } });
};

export const getCareplanByPracticeIdService = async (practiceid) => {
  return await models.Careplan.findAll({
    where: { practiceid },
    order: [["careplanname", "ASC"]],
  });
};

// Create a new Careplan
export const createCareplanService = async (data) => {
  return await models.Careplan.create(data);
};

// Update a Careplan
export const updateCareplanService = async (id, data) => {
  const careplan = await models.Careplan.findOne({ where: { id } });
  if (careplan) {
    return await careplan.update(data);
  }
  return null;
};

// Delete a Careplan
export const deleteCareplanService = async (id) => {
  const careplan = await models.Careplan.findOne({ where: { id } });
  if (careplan) {
    await careplan.destroy();
    return true;
  }
  return false;
};

import models from "../models/index.js";

// Service to create multiple PlanTreatment entries
export const createPlanTreatmentService = async ({
  practiceid,
  careplanid,
  treatments,
}) => {
  try {
    const planTreatmentsToCreate = treatments.map((treatment) => ({
      practiceid,
      careplanid,
      treatmentid: treatment.id, // Assuming frontend sends treatment ID
      name: treatment.name,
      description: treatment.description,
    }));
    // Bulk insert all treatments
    const newPlanTreatments = await models.PlanTreatment.bulkCreate(
      planTreatmentsToCreate
    );
    return newPlanTreatments;
  } catch (error) {
    throw new Error("Error creating PlanTreatments: " + error.message);
  }
};

export const bulkEditTreatmentsService = async ({
  practiceid,
  careplanid,
  treatments,
}) => {
  try {
    await models.PlanTreatment.destroy({
      where: {
        practiceid: practiceid,
        careplanid: careplanid,
      },
    });

    const planTreatmentsToCreate = treatments.map((treatment) => ({
      practiceid,
      careplanid,
      treatmentid: treatment.id, // Assuming frontend sends treatment ID
      name: treatment.name,
      description: treatment.description,
    }));
    // Bulk insert all treatments
    const newPlanTreatments = await models.PlanTreatment.bulkCreate(
      planTreatmentsToCreate
    );
    return newPlanTreatments;
  } catch (error) {
    throw new Error("Error creating PlanTreatments: " + error.message);
  }
};

// Service to get all PlanTreatments
export const getAllPlanTreatmentsService = async () => {
  try {
    const planTreatments = await models.PlanTreatment.findAll();
    return planTreatments;
  } catch (error) {
    throw new Error("Error fetching PlanTreatments: " + error.message);
  }
};

// Service to get a PlanTreatment by ID
export const getPlanTreatmentByIdService = async (id) => {
  try {
    const planTreatment = await models.PlanTreatment.findOne({ where: { id } });
    if (!planTreatment) {
      throw new Error("PlanTreatment not found");
    }
    return planTreatment;
  } catch (error) {
    throw new Error("Error fetching PlanTreatment: " + error.message);
  }
};

export const getTreatmentsByPracIDnCareplanIdService = async ({
  practiceid,
  careplanid,
}) => {
  return await models.PlanTreatment.findAll({
    where: {
      practiceid,
      careplanid,
    },
  });
};

// Service to update a PlanTreatment by ID
export const updatePlanTreatmentService = async (id, updateData) => {
  try {
    const planTreatment = await models.PlanTreatment.findByPk(id);
    if (!planTreatment) {
      throw new Error("PlanTreatment not found");
    }

    await planTreatment.update(updateData);
    return planTreatment;
  } catch (error) {
    throw new Error("Error updating PlanTreatment: " + error.message);
  }
};

// Service to delete a PlanTreatment by ID
export const deletePlanTreatmentService = async (id) => {
  try {
    const planTreatment = await models.PlanTreatment.findByPk(id);
    if (!planTreatment) {
      throw new Error("PlanTreatment not found");
    }

    await planTreatment.destroy();
    return { message: "PlanTreatment deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting PlanTreatment: " + error.message);
  }
};

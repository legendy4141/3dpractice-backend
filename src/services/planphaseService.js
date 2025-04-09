import models from "../models/index.js";

// Service to create a new PlanPhase
export const createPlanPhaseService = async ({
  practiceid,
  careplanid,
  phases,
}) => {
  try {
    // Map each phase to include practiceid and careplanid
    const planPhasesToCreate = phases.map((phase) => ({
      practiceid,
      careplanid,
      phaseid: phase.id, // Assuming frontend sends phase ID
      name: phase.name,
      description: phase.description,
      repeattime: phase.repeattime,
      duration: phase.duration,
      active: phase.active,
    }));

    // Bulk insert all phases
    const newPlanPhases = await models.PlanPhase.bulkCreate(planPhasesToCreate);

    return newPlanPhases;
  } catch (error) {
    throw new Error("Error creating PlanPhases: " + error.message);
  }
};

export const bulkEditPhasesService = async ({
  practiceid,
  careplanid,
  phases,
}) => {
  try {
    await models.PlanPhase.destroy({
      where: {
        practiceid: practiceid,
        careplanid: careplanid,
      },
    });
    // Map each phase to include practiceid and careplanid
    const planPhasesToEdit = phases.map((phase) => ({
      practiceid,
      careplanid,
      phaseid: phase.id, // Assuming frontend sends phase ID
      name: phase.name,
      description: phase.description,
      repeattime: phase.repeattime,
      duration: phase.duration,
      active: phase.active,
    }));

    // Bulk insert all phases
    const newPlanPhases = await models.PlanPhase.bulkCreate(planPhasesToEdit);

    return newPlanPhases;
  } catch (error) {
    throw new Error("Error creating PlanPhases: " + error.message);
  }
};

// Service to get all PlanPhases
export const getAllPlanPhasesService = async () => {
  try {
    const planPhases = await models.PlanPhase.findAll();
    return planPhases;
  } catch (error) {
    throw new Error("Error fetching PlanPhases: " + error.message);
  }
};

// Service to get a PlanPhase by ID
export const getPlanPhaseByIdService = async (id) => {
  try {
    const planPhase = await models.PlanPhase.findOne({ where: { id } });
    if (!planPhase) {
      throw new Error("PlanPhase not found");
    }
    return planPhase;
  } catch (error) {
    throw new Error("Error fetching PlanPhase: " + error.message);
  }
};

export const getPhasesByPracIDnCareplanIdService = async ({
  practiceid,
  careplanid,
  phaseids,
}) => {
  try {
    const phaseIdArray = phaseids
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id); // Ensure clean array like ['6', '3', '5']

    const planPhases = await models.PlanPhase.findAll({
      where: {
        practiceid,
        careplanid,
        phaseid: phaseIdArray,
      },
    });

    // Map to phaseIdArray order
    const orderedPhases = phaseIdArray
      .map((id) => planPhases.find((p) => String(p.phaseid) === id))
      .filter(Boolean); // Remove any unmatched just in case

    return orderedPhases;
  } catch (error) {
    throw new Error("Error fetching PlanPhases: " + error.message);
  }
};

// Service to update a PlanPhase by ID
export const updatePlanPhaseService = async (id, updateData) => {
  try {
    const planPhase = await models.PlanPhase.findByPk(id);
    if (!planPhase) {
      throw new Error("PlanPhase not found");
    }

    await planPhase.update(updateData);
    return planPhase;
  } catch (error) {
    throw new Error("Error updating PlanPhase: " + error.message);
  }
};

// Service to delete a PlanPhase by ID
export const deletePlanPhaseService = async (id) => {
  try {
    const planPhase = await models.PlanPhase.findByPk(id);
    if (!planPhase) {
      throw new Error("PlanPhase not found");
    }

    await planPhase.destroy();
    return { message: "PlanPhase deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting PlanPhase: " + error.message);
  }
};

export const deletePlanPhaseByPracIDnCareplanIdService = async ({
  practiceid,
  careplanid,
}) => {
  try {
    const planPhases = await models.PlanPhase.destroy({
      where: {
        practiceid: practiceid,
        careplanid: careplanid,
      },
    });

    return { message: "PlanPhases deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting PlanPhases: " + error.message);
  }
};

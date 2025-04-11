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

export const getExerciseListByIDsService = async (ids) => {
  try {
    // Find all conditions where the id is in the provided ids array
    const conditions = await models.Condition.findAll({
      where: {
        id: ids,
      },
      attributes: ["exerciselist"], // Only fetch the 'exerciselist' field
    });

    // Merge and process the exerciselist strings
    const mergedExerciseList = new Set(); // Use a Set to avoid duplicates

    conditions.forEach((condition) => {
      if (condition.exerciselist) {
        const exerciseIds = condition.exerciselist
          .split(",") // Split the string by commas
          .map((id) => id.trim()) // Trim whitespace
          .filter(
            (id) => id !== "" && condition.exerciselist.includes(`,${id}`)
          ) // Ensure it matches the ,XXX, format
          .map((id) => parseInt(id, 10)) // Convert to integers
          .filter((id) => !isNaN(id)); // Filter out invalid numbers

        exerciseIds.forEach((id) => mergedExerciseList.add(id)); // Add to the Set
      }
    });

    // Convert the Set back to an array and return it
    return Array.from(mergedExerciseList);
  } catch (error) {
    throw new Error("Error fetching exercise list by IDs: " + error.message);
  }
};

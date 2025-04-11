import {
  getAllConditionsService,
  getConditionByIdService,
  createConditionService,
  updateConditionService,
  deleteConditionService,
  getIDOnlyService,
  getExercisesOnlyService,
  getTreatmentlistOnlyService,
  getExerciseListByIDsService,
} from "../services/conditionService.js";

// Get all Conditions
export const getConditions = async (req, res) => {
  try {
    const conditions = await getAllConditionsService();
    res.status(200).json(conditions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching conditions", error: error.message });
  }
};

export const getExerciseListByIDs = async (req, res) => {
  const { ids } = req.body;
  try {
    const exerciseList = await getExerciseListByIDsService(ids);
    res.status(200).json(exerciseList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Condition by ID
export const getConditionById = async (req, res) => {
  const { id } = req.params;
  try {
    const condition = await getConditionByIdService(id);
    if (!condition) {
      return res.status(404).json({ message: "Condition not found" });
    }
    res.status(200).json(condition);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching condition", error: error.message });
  }
};

// Create a new Condition
export const createCondition = async (req, res) => {
  const {
    area,
    acondition,
    exerciselist,
    practiceid,
    treatmentlist,
    description,
    bmname,
  } = req.body;
  try {
    const newCondition = await createConditionService({
      area,
      acondition,
      exerciselist,
      practiceid,
      treatmentlist,
      description,
      bmname,
    });
    res.status(201).json(newCondition);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating condition", error: error.message });
  }
};

// Update a Condition
export const updateCondition = async (req, res) => {
  const { id } = req.params;
  const {
    area,
    acondition,
    exerciselist,
    practiceid,
    treatmentlist,
    description,
    bmname,
  } = req.body;
  try {
    const updatedCondition = await updateConditionService(id, {
      area,
      acondition,
      exerciselist,
      practiceid,
      treatmentlist,
      description,
      bmname,
    });
    if (!updatedCondition) {
      return res.status(404).json({ message: "Condition not found" });
    }
    res.status(200).json(updatedCondition);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating condition", error: error.message });
  }
};

// Delete a Condition
export const deleteCondition = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCondition = await deleteConditionService(id);
    if (!deletedCondition) {
      return res.status(404).json({ message: "Condition not found" });
    }
    res.status(200).json({ message: "Condition deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting condition", error: error.message });
  }
};

export const getIDOnly = async (req, res) => {
  const { area, acondition } = req.body;
  try {
    const condition = await getIDOnlyService(area, acondition);
    if (!condition) {
      return res.status(404).json({ message: "id not found" });
    }
    res.status(200).json(condition.id);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching id", error: error.message });
  }
};

export const getExercises = async (req, res) => {
  const { area, acondition } = req.body;
  try {
    const condition = await getExercisesOnlyService(area, acondition);
    if (!condition) {
      return res.status(404).json({ message: "id not found" });
    }
    res.status(200).json(condition.exerciselist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching id", error: error.message });
  }
};

export const getTreatmentlistOnly = async (req, res) => {
  const { areaId, aconditionId } = req.params;

  try {
    const treatmentlist = await getTreatmentlistOnlyService(
      areaId,
      aconditionId
    );
    if (!treatmentlist) {
      return res.status(404).json({ message: "treatmentlist not found" });
    }
    res.status(200).json(treatmentlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching id", error: error.message });
  }
};

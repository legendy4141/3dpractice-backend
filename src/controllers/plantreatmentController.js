import {
  createPlanTreatmentService,
  bulkEditTreatmentsService,
  getAllPlanTreatmentsService,
  getPlanTreatmentByIdService,
  getTreatmentsByPracIDnCareplanIdService,
  updatePlanTreatmentService,
  deletePlanTreatmentService,
  deletePlanTreatmentByPracIDnCareplanIdService,
} from "../services/planTreatmentService.js";

// Create multiple PlanTreatments
export const createPlanTreatment = async (req, res) => {
  const { practiceid, careplanid, treatments } = req.body;
  try {
    const newPlanTreatments = await createPlanTreatmentService({
      practiceid,
      careplanid,
      treatments,
    });
    res.status(201).json(newPlanTreatments);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const bulkEdit = async (req, res) => {
  const { practiceid, careplanid, treatments } = req.body;
  try {
    const newPlanTreatments = await bulkEditTreatmentsService({
      practiceid,
      careplanid,
      treatments,
    });
    res.status(201).json(newPlanTreatments);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all PlanTreatments
export const getAllPlanTreatments = async (req, res) => {
  try {
    const planTreatments = await getAllPlanTreatmentsService();
    res.status(200).json(planTreatments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single PlanTreatment by ID
export const getPlanTreatmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const planTreatment = await getPlanTreatmentByIdService(id);
    res.status(200).json(planTreatment);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getTreatments = async (req, res) => {
  const { practiceid, careplanid } = req.params;

  try {
    const planTreatments = await getTreatmentsByPracIDnCareplanIdService({
      practiceid,
      careplanid,
    });
    if (!planTreatments) {
      return res.status(404).json({ message: "PlanTreatments not found" });
    }
    res.status(200).json(planTreatments);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// Update a PlanTreatment by ID
export const updatePlanTreatment = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedPlanTreatment = await updatePlanTreatmentService(id, {
      name,
      description,
    });
    res.status(200).json(updatedPlanTreatment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a PlanTreatment by ID
export const deletePlanTreatment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deletePlanTreatmentService(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePlanTreatmentByPracIDnCarePlanID = async (req, res) => {
  const { practiceid, careplanid } = req.params;

  try {
    const result = await deletePlanTreatmentByPracIDnCareplanIdService({
      practiceid,
      careplanid,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

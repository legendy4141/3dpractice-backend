import {
  createPlanPhaseService,
  bulkEditPhasesService,
  getAllPlanPhasesService,
  getPlanPhaseByIdService,
  updatePlanPhaseService,
  deletePlanPhaseService,
  deletePlanPhaseByPracIDnCareplanIdService,
  getPhasesByPracIDnCareplanIdService,
} from "../services/planphaseService.js";

// Create a new PlanPhase
export const createPlanPhase = async (req, res) => {
  const { practiceid, careplanid, phases } = req.body;

  try {
    const newPlanPhases = await createPlanPhaseService({
      practiceid,
      careplanid,
      phases,
    });
    res.status(201).json(newPlanPhases);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const bulkEdit = async (req, res) => {
  const { practiceid, careplanid, phases } = req.body;

  try {
    const newPlanPhases = await bulkEditPhasesService({
      practiceid,
      careplanid,
      phases,
    });
    res.status(201).json(newPlanPhases);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
// Get all PlanPhases
export const getAllPlanPhases = async (req, res) => {
  try {
    const planPhases = await getAllPlanPhasesService();
    res.status(200).json(planPhases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a PlanPhase by ID
export const getPlanPhaseById = async (req, res) => {
  const { id } = req.params;

  try {
    const planPhase = await getPlanPhaseByIdService(id);
    if (!planPhase) {
      return res.status(404).json({ message: "PlanPhase not found" });
    }
    res.status(200).json(planPhase);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

export const getPhases = async (req, res) => {
  const { practiceid, careplanid } = req.params;
  const { phaseids } = req.body;

  try {
    const planPhases = await getPhasesByPracIDnCareplanIdService({
      practiceid,
      careplanid,
      phaseids,
    });
    if (!planPhases) {
      return res.status(404).json({ message: "PlanPhases not found" });
    }
    res.status(200).json(planPhases);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// Update a PlanPhase by ID
export const updatePlanPhase = async (req, res) => {
  const { id } = req.params;
  const {
    practiceid,
    careplanid,
    phaseid,
    name,
    description,
    repeattime,
    duration,
    active,
  } = req.body;

  try {
    const updatedPlanPhase = await updatePlanPhaseService(id, {
      practiceid,
      careplanid,
      phaseid,
      name,
      description,
      repeattime,
      duration,
      active,
    });

    if (!updatedPlanPhase) {
      return res.status(404).json({ message: "PlanPhase not found" });
    }
    res.status(200).json(updatedPlanPhase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a PlanPhase by ID
export const deletePlanPhase = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deletePlanPhaseService(id);
    if (!result) {
      return res.status(404).json({ message: "PlanPhase not found" });
    }
    res.status(200).json({ message: "PlanPhase deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePlanPhaseByPracIDnCareplanID = async (req, res) => {
  const { practiceid, careplanid } = req.params;

  try {
    const result = await deletePlanPhaseByPracIDnCareplanIdService({
      practiceid,
      careplanid,
    });
    if (!result) {
      return res.status(404).json({ message: "PlanPhase not found" });
    }
    res.status(200).json({ message: "PlanPhase deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

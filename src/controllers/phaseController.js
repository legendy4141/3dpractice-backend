import {
  getAllPhasesService,
  getPhasesWithSecurityTypeService,
  getPhaseByIdService,
  createPhaseService,
  updatePhaseService,
  deletePhaseService,
} from "../services/phaseService.js";

// Get all Phases
export const getPhases = async (req, res) => {
  try {
    const phases = await getAllPhasesService();
    res.status(200).json(phases);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching phases", error: error.message });
  }
};

export const getPhasesWithSecurityType = async (req, res) => {
  const { securitytypeId, practiceId } = req.params;

  try {
    const phases = await getPhasesWithSecurityTypeService(
      securitytypeId,
      practiceId
    );
    res.status(200).json(phases);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching phases", error: error.message });
  }
};

// Get Phase by ID
export const getPhaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const phase = await getPhaseByIdService(id);
    if (!phase) {
      return res.status(404).json({ message: "Phase not found" });
    }
    res.status(200).json(phase);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching phase", error: error.message });
  }
};

// Create a new Phase
export const createPhase = async (req, res) => {
  const { practiceid, name, description, repeattime, duration, active } =
    req.body;
  try {
    const newPhase = await createPhaseService({
      practiceid,
      name,
      description,
      repeattime,
      duration,
      active,
    });
    res.status(201).json(newPhase);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating phase", error: error.message });
  }
};

// Update a Phase
export const updatePhase = async (req, res) => {
  const { id } = req.params;
  const { practiceid, name, description, repeattime, duration, active } =
    req.body;
  try {
    const updatedPhase = await updatePhaseService(id, {
      practiceid,
      name,
      description,
      repeattime,
      duration,
      active,
    });
    if (!updatedPhase) {
      return res.status(404).json({ message: "Phase not found" });
    }
    res.status(200).json(updatedPhase);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating phase", error: error.message });
  }
};

// Delete a Phase
export const deletePhase = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPhase = await deletePhaseService(id);
    if (!deletedPhase) {
      return res.status(404).json({ message: "Phase not found" });
    }
    res.status(200).json({ message: "Phase deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting phase", error: error.message });
  }
};

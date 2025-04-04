import {
  getAllTreatmentsService,
  getTreatmentsWithSecurityTypeService,
  getTreatmentByIdService,
  createTreatmentService,
  updateTreatmentService,
  deleteTreatmentService,
} from "../services/treatmentService.js";

// Get all Treatments
export const getAllTreatments = async (req, res) => {
  try {
    const treatments = await getAllTreatmentsService();
    res.status(200).json(treatments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching treatments", error: error.message });
  }
};

export const getTreatmentsWithSecurityType = async (req, res) => {
  const { securitytypeId, practiceId } = req.params;

  try {
    const phases = await getTreatmentsWithSecurityTypeService(
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

// Get Treatment by ID
export const getTreatmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const treatment = await getTreatmentByIdService(id);
    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }
    res.status(200).json(treatment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching treatment", error: error.message });
  }
};

// Create a new Treatment
export const createTreatment = async (req, res) => {
  const { practiceid, name, description } = req.body;
  try {
    const newTreatment = await createTreatmentService({
      practiceid,
      name,
      description,
    });
    res.status(201).json(newTreatment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating treatment", error: error.message });
  }
};

// Update a Treatment
export const updateTreatment = async (req, res) => {
  const { id } = req.params;
  const { practiceid, name, description } = req.body;
  try {
    const updatedTreatment = await updateTreatmentService(id, {
      practiceid,
      name,
      description,
    });
    if (!updatedTreatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }
    res.status(200).json(updatedTreatment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating treatment", error: error.message });
  }
};

// Delete a Treatment
export const deleteTreatment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTreatment = await deleteTreatmentService(id);
    if (!deletedTreatment) {
      return res.status(404).json({ message: "Treatment not found" });
    }
    res.status(200).json({ message: "Treatment deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting treatment", error: error.message });
  }
};

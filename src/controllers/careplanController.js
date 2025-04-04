import {
  getAllCareplansService,
  getCareplanByIdService,
  getCareplanByPracticeIdService,
  createCareplanService,
  updateCareplanService,
  deleteCareplanService,
} from "../services/careplanService.js";

// Get all Careplans
export const getCareplans = async (req, res) => {
  try {
    const careplans = await getAllCareplansService();
    res.status(200).json(careplans);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching careplans", error: error.message });
  }
};

// Get Careplan by ID
export const getCareplanById = async (req, res) => {
  const { id } = req.params;
  try {
    const careplan = await getCareplanByIdService(id);
    if (!careplan) {
      return res.status(404).json({ message: "Careplan not found" });
    }
    res.status(200).json(careplan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching careplan", error: error.message });
  }
};

export const getCareplanByPracticeId = async (req, res) => {
  const { practiceid } = req.params;
  try {
    const careplan = await getCareplanByPracticeIdService(practiceid);
    if (!careplan) {
      return res.status(404).json({ message: "Careplan not found" });
    }
    res.status(200).json(careplan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching careplan", error: error.message });
  }
};

// Create a new Careplan
export const createCareplan = async (req, res) => {
  const {
    practiceid,
    conditions,
    careplanname,
    repeattime,
    duration,
    active,
    phaseorder,
  } = req.body;
  try {
    // Create the careplan using the service layer
    const newCareplan = await createCareplanService({
      practiceid,
      conditions,
      careplanname,
      repeattime,
      duration,
      active,
      phaseorder,
    });
    res.status(201).json(newCareplan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating careplan", error: error.message });
  }
};

// Update a Careplan
export const updateCareplan = async (req, res) => {
  const { id } = req.params;
  const {
    practiceid,
    conditions,
    careplanname,
    repeattime,
    duration,
    active,
    phaseorder,
  } = req.body;
  try {
    const updatedCareplan = await updateCareplanService(id, {
      practiceid,
      conditions,
      careplanname,
      repeattime,
      duration,
      active,
      phaseorder,
    });
    if (!updatedCareplan) {
      return res.status(404).json({ message: "Careplan not found" });
    }
    res.status(200).json(updatedCareplan);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating careplan", error: error.message });
  }
};

// Delete a Careplan
export const deleteCareplan = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCareplan = await deleteCareplanService(id);
    if (!deletedCareplan) {
      return res.status(404).json({ message: "Careplan not found" });
    }
    res.status(200).json({ message: "Careplan deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting careplan", error: error.message });
  }
};

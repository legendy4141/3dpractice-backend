import {
  getAllProtExercisesService,
  getProtExerciseByIdService,
  getWithPracIDnProtIDService,
  createProtExerciseService,
  bulkCreateProtExercisesService,
  bulkEditProtExercisesService,
  updateProtExerciseService,
  deleteProtExerciseService,
  deleteByPracIDnProtIDService,
  copyProtExerciseService,
} from "../services/protexerciseService.js";

// Get all ProtExercises
export const getProtExercises = async (req, res) => {
  try {
    const protExercises = await getAllProtExercisesService();
    res.status(200).json(protExercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ProtExercises", error: error.message });
  }
};

// Get ProtExercise by ID
export const getProtExerciseById = async (req, res) => {
  const { id } = req.params;
  try {
    const protExercise = await getProtExerciseByIdService(id);
    if (!protExercise) {
      return res.status(404).json({ message: "ProtExercise not found" });
    }
    res.status(200).json(protExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ProtExercise", error: error.message });
  }
};

export const getByPracIDnProtID = async (req, res) => {
  const { practiceid, protocolid } = req.body;
  try {
    const protExercise = await getWithPracIDnProtIDService(
      practiceid,
      protocolid
    );
    if (!protExercise) {
      return res.status(404).json({ message: "ProtExercise not found" });
    }
    res.status(200).json(protExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ProtExercise", error: error.message });
  }
};

// Create a new ProtExercise
export const createProtExercise = async (req, res) => {
  const {
    practiceid,
    protocolid,
    conditionid,
    exerciseid,
    instructions,
    hold,
    repeat,
    timesperday,
    range,
    resistance,
    direction,
    randomkey,
  } = req.body;
  try {
    const newProtExercise = await createProtExerciseService({
      practiceid,
      protocolid,
      conditionid,
      exerciseid,
      instructions,
      hold,
      repeat,
      timesperday,
      range,
      resistance,
      direction,
      randomkey,
    });
    res.status(201).json(newProtExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ProtExercise", error: error.message });
  }
};

// Bulk create ProtExercises
export const bulkCreateProtExercises = async (req, res) => {
  const protExercisesData = req.body;

  if (!Array.isArray(protExercisesData) || protExercisesData.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid input. Expected an array of objects." });
  }

  try {
    const newProtExercises = await bulkCreateProtExercisesService(
      protExercisesData
    );
    res.status(201).json(newProtExercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ProtExercises", error: error.message });
  }
};

export const bulkEditProtExercises = async (req, res) => {
  const protExercisesData = req.body;

  try {
    const editedProtExercises = await bulkEditProtExercisesService(
      protExercisesData
    );
    res.status(201).json(editedProtExercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating ProtExercises", error: error.message });
  }
};

export const copyProtExercise = async (req, res) => {
  const { practiceid, protocolid, newprotocolid } = req.body;
  try {
    const protExercise = await copyProtExerciseService(
      practiceid,
      protocolid,
      newprotocolid
    );
    if (!protExercise) {
      return res.status(404).json({ message: "ProtExercise not found" });
    }
    res.status(200).json(protExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching ProtExercise", error: error.message });
  }
};

// Update a ProtExercise
export const updateProtExercise = async (req, res) => {
  const { id } = req.params;
  const {
    practiceid,
    protocolid,
    conditionid,
    exerciseid,
    instructions,
    hold,
    repeat,
    timesperday,
    range,
    resistance,
    direction,
    randomkey,
  } = req.body;
  try {
    const updatedProtExercise = await updateProtExerciseService(id, {
      practiceid,
      protocolid,
      conditionid,
      exerciseid,
      instructions,
      hold,
      repeat,
      timesperday,
      range,
      resistance,
      direction,
      randomkey,
    });
    if (!updatedProtExercise) {
      return res.status(404).json({ message: "ProtExercise not found" });
    }
    res.status(200).json(updatedProtExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating ProtExercise", error: error.message });
  }
};

// Delete a ProtExercise
export const deleteProtExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProtExercise = await deleteProtExerciseService(id);
    if (!deletedProtExercise) {
      return res.status(404).json({ message: "ProtExercise not found" });
    }
    res.status(200).json({ message: "ProtExercise deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ProtExercise", error: error.message });
  }
};

export const deleteByPracIDnProtID = async (req, res) => {
  const { practiceid, protocolid } = req.body;

  try {
    const deletePractice = await deleteByPracIDnProtIDService(
      practiceid,
      protocolid
    );
    res.status(201).json(deletePractice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting ProtExercises", error: error.message });
  }
};

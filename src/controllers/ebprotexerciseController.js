import {
  getAllEBProtExercisesService,
  getEBProtExerciseByIdService,
  getEBProtExercisesByProtIdService,
  createEBProtExerciseService,
  bulkCreateService,
  updateEBProtExerciseService,
  deleteEBProtExerciseService,
  bulkEditService,
  bulkDeleteService,
} from "../services/ebprotexerciseService.js";

// Get all EBProtExercises
export const getEBProtExercises = async (req, res) => {
  try {
    const exercises = await getAllEBProtExercisesService();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching EBProtExercises",
      error: error.message,
    });
  }
};

// Get EBProtExercise by ID
export const getEBProtExerciseById = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await getEBProtExerciseByIdService(id);
    if (!exercise) {
      return res.status(404).json({ message: "EBProtExercise not found" });
    }
    res.status(200).json(exercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching EBProtExercise", error: error.message });
  }
};

export const getEBProtExercisesByProtId = async (req, res) => {
  const { protocolid } = req.params;
  try {
    const exercises = await getEBProtExercisesByProtIdService(protocolid);
    if (!exercises) {
      return res.status(404).json({ message: "EBProtExercise not found" });
    }
    res.status(200).json(exercises);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching EBProtExercise", error: error.message });
  }
};

// Create a new EBProtExercise
export const createEBProtExercise = async (req, res) => {
  const {
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
    const newExercise = await createEBProtExerciseService({
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
    res.status(201).json(newExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating EBProtExercise", error: error.message });
  }
};

export const bulkCreate = async (req, res) => {
  const { protocolid, exercises } = req.body; // Assuming the request body contains an array of exercises
  try {
    const createdExercises = await bulkCreateService(protocolid, exercises);
    res.status(201).json(createdExercises);
  } catch (error) {
    res.status(500).json({
      message: "Error creating EBProtExercises",
      error: error.message,
    });
  }
};

export const bulkEdit = async (req, res) => {
  const { protocolid, exercises } = req.body; // Assuming the request body contains an array of exercises
  try {
    const editedExercises = await bulkEditService(protocolid, exercises);
    res.status(201).json(editedExercises);
  } catch (error) {
    res.status(500).json({
      message: "Error updating EBProtExercises",
      error: error.message,
    });
  }
};

export const bulkDelete = async (req, res) => {
  const { protocolid } = req.body; // Assuming the request body contains an array of exercises
  try {
    const editedExercises = await bulkDeleteService(protocolid);
    res.status(201).json(editedExercises);
  } catch (error) {
    res.status(500).json({
      message: "Error updating EBProtExercises",
      error: error.message,
    });
  }
};
// Update an EBProtExercise
export const updateEBProtExercise = async (req, res) => {
  const { id } = req.params;
  const {
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
    const updatedExercise = await updateEBProtExerciseService(id, {
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
    if (!updatedExercise) {
      return res.status(404).json({ message: "EBProtExercise not found" });
    }
    res.status(200).json(updatedExercise);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating EBProtExercise", error: error.message });
  }
};

// Delete an EBProtExercise
export const deleteEBProtExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedExercise = await deleteEBProtExerciseService(id);
    if (!deletedExercise) {
      return res.status(404).json({ message: "EBProtExercise not found" });
    }
    res.status(200).json({ message: "EBProtExercise deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting EBProtExercise", error: error.message });
  }
};

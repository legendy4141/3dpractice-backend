import {
  getAllExercisesService,
  getAllBMnameService,
  getExerciseByIdService,
  createExerciseService,
  updateExerciseService,
  deleteExerciseService,
  getSortedExercisesByIdsService,
  getNamenBMnameByIdService,
} from "../services/exerciseService.js";

// Get all exercises
export const getAllExercises = async (req, res) => {
  try {
    const exercises = await getAllExercisesService();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExercisesByIDs = async (req, res) => {
  const { ids } = req.body;
  try {
    const exercises = await getNamenBMnameByIdService(ids);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllBMname = async (req, res) => {
  try {
    const allBMname = await getAllBMnameService();
    res.status(200).json(allBMname);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get exercise by ID
export const getExerciseById = async (req, res) => {
  const { id } = req.params;
  try {
    const exercise = await getExerciseByIdService(id);
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new exercise
export const createExercise = async (req, res) => {
  try {
    const newExercise = await createExerciseService(req.body);
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an exercise
export const updateExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedExercise = await updateExerciseService(id, req.body);
    res.status(200).json(updatedExercise);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an exercise
export const deleteExercise = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteExerciseService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExercises = async (req, res) => {
  const { ids } = req.body;
  try {
    const result = await getSortedExercisesByIdsService(ids);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

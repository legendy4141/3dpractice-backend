import {
  createPracticeService,
  getAllPracticesService,
  getPracticeByIdService,
  updatePracticeService,
  deletePracticeService,
} from "../services/practiceService.js";

// Create a new practice
export const createPractice = async (req, res) => {
  const {
    contactname,
    practicename,
    customerid,
    address1,
    address2,
    address3,
    city,
    state,
    country,
    postalcode,
    contactnumber,
    email,
    goodlic,
    logobin,
    blurb,
    carecreditid,
    linkurl1,
    features,
    phasedefaults,
    randomkey,
  } = req.body;

  try {
    const newPractice = await createPracticeService({
      contactname,
      practicename,
      customerid,
      address1,
      address2,
      address3,
      city,
      state,
      country,
      postalcode,
      contactnumber,
      email,
      goodlic,
      logobin,
      blurb,
      carecreditid,
      linkurl1,
      features,
      phasedefaults,
      randomkey,
    });
    res.status(201).json(newPractice);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all practices
export const getAllPractices = async (req, res) => {
  try {
    const practices = await getAllPracticesService();
    res.status(200).json(practices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get a practice by ID
export const getPracticeById = async (req, res) => {
  const { id } = req.params;

  try {
    const practice = await getPracticeByIdService(id);
    res.status(200).json(practice);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: error.message });
  }
};

// Update a practice by ID
export const updatePractice = async (req, res) => {
  const { id } = req.params;
  const {
    contactname,
    practicename,
    customerid,
    address1,
    address2,
    address3,
    city,
    state,
    country,
    postalcode,
    contactnumber,
    email,
    goodlic,
    logobin,
    blurb,
    carecreditid,
    linkurl1,
    features,
    phasedefaults,
    randomkey,
  } = req.body;

  try {
    const updatedPractice = await updatePracticeService(id, {
      contactname,
      practicename,
      customerid,
      address1,
      address2,
      address3,
      city,
      state,
      country,
      postalcode,
      contactnumber,
      email,
      goodlic,
      logobin,
      blurb,
      carecreditid,
      linkurl1,
      features,
      phasedefaults,
      randomkey,
    });
    res.status(200).json(updatedPractice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a practice by ID
export const deletePractice = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await deletePracticeService(id);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

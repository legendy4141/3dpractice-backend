import {
  getAllEBProtocolsService,
  getEBProtocolByIdService,
  createEBProtocolService,
  updateEBProtocolService,
  deleteEBProtocolService,
} from "../services/ebprotocolService.js";

// Get all EBProtocols
export const getEBProtocols = async (req, res) => {
  try {
    const protocols = await getAllEBProtocolsService();
    res.status(200).json(protocols);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching EBProtocols", error: error.message });
  }
};

// Get EBProtocol by ID
export const getEBProtocolById = async (req, res) => {
  const { id } = req.params;
  try {
    const protocol = await getEBProtocolByIdService(id);
    if (!protocol) {
      return res.status(404).json({ message: "EBProtocol not found" });
    }
    res.status(200).json(protocol);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching EBProtocol", error: error.message });
  }
};

// Create a new EBProtocol
export const createEBProtocol = async (req, res) => {
  const { protocolname, conditions } = req.body;
  try {
    const newProtocol = await createEBProtocolService({
      protocolname,
      conditions,
    });
    res.status(201).json(newProtocol);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating EBProtocol", error: error.message });
  }
};

// Update an EBProtocol
export const updateEBProtocol = async (req, res) => {
  const { id } = req.params;
  const { protocolname, conditions } = req.body;
  try {
    const updatedProtocol = await updateEBProtocolService(id, {
      protocolname,
      conditions,
    });
    if (!updatedProtocol) {
      return res.status(404).json({ message: "EBProtocol not found" });
    }
    res.status(200).json(updatedProtocol);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating EBProtocol", error: error.message });
  }
};

// Delete an EBProtocol
export const deleteEBProtocol = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProtocol = await deleteEBProtocolService(id);
    if (!deletedProtocol) {
      return res.status(404).json({ message: "EBProtocol not found" });
    }
    res.status(200).json({ message: "EBProtocol deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting EBProtocol", error: error.message });
  }
};

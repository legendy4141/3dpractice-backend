import {
  getAllProtocolsService,
  getProtocolByIdService,
  createProtocolService,
  updateProtocolService,
  deleteProtocolService,
  getProtocolWithIDnConditionService,
} from "../services/protocolService.js";

// Get all protocols
export const getProtocols = async (req, res) => {
  try {
    const protocols = await getAllProtocolsService();
    res.status(200).json(protocols);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching protocols", error: error.message });
  }
};

// Get a specific protocol by ID
export const getProtocolById = async (req, res) => {
  const { id } = req.params;
  try {
    const protocol = await getProtocolByIdService(id);
    if (!protocol) {
      return res.status(404).json({ message: "Protocol not found" });
    }
    res.status(200).json(protocol);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching protocol", error: error.message });
  }
};

export const getWithIDnCondition = async (req, res) => {
  const { practiceID, conditionID } = req.body;
  try {
    const protocol = await getProtocolWithIDnConditionService(
      practiceID,
      conditionID
    );
    if (!protocol) {
      return res.status(404).json({ message: "Protocol not found" });
    }
    res.status(200).json(protocol);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching protocol", error: error.message });
  }
};

// Create a new protocol
export const createProtocol = async (req, res) => {
  const { protocolname, practiceid, conditions } = req.body;
  try {
    const newProtocol = await createProtocolService({
      protocolname,
      practiceid,
      conditions,
    });
    res.status(201).json(newProtocol);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating protocol", error: error.message });
  }
};

// Update a protocol
export const updateProtocol = async (req, res) => {
  const { id } = req.params;
  const { protocolname, practiceid, conditions } = req.body;

  try {
    const updatedProtocol = await updateProtocolService(id, {
      protocolname,
      practiceid,
      conditions,
    });
    if (!updatedProtocol) {
      return res.status(404).json({ message: "Protocol not found" });
    }
    res.status(200).json(updatedProtocol);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating protocol", error: error.message });
  }
};

// Delete a protocol
export const deleteProtocol = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProtocol = await deleteProtocolService(id);
    if (!deletedProtocol) {
      return res.status(404).json({ message: "Protocol not found" });
    }
    res.status(200).json({ message: "Protocol deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting protocol", error: error.message });
  }
};

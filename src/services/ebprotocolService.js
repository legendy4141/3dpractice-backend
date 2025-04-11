import models from "../models/index.js";

// Get all EBProtocols
export const getAllEBProtocolsService = async () => {
  return await models.EBProtocol.findAll({ order: [["protocolname", "ASC"]] });
};

// Get an EBProtocol by ID
export const getEBProtocolByIdService = async (id) => {
  return await models.EBProtocol.findOne({ where: { id } });
};

// Create a new EBProtocol
export const createEBProtocolService = async (data) => {
  return await models.EBProtocol.create(data);
};

// Update an EBProtocol
export const updateEBProtocolService = async (id, data) => {
  const protocol = await models.EBProtocol.findOne({ where: { id } });
  if (protocol) {
    return await protocol.update(data);
  }
  return null;
};

// Delete an EBProtocol
export const deleteEBProtocolService = async (id) => {
  const protocol = await models.EBProtocol.findOne({ where: { id } });
  if (protocol) {
    await protocol.destroy();
    return true;
  }
  return false;
};

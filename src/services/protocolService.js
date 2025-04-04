import models from "../models/index.js";
import { Sequelize } from "sequelize";
// Get all protocols
export const getAllProtocolsService = async () => {
  return await models.Protocol.findAll();
};

// Get a protocol by ID
export const getProtocolByIdService = async (id) => {
  return await models.Protocol.findOne({ where: { id } });
};

export const getProtocolWithIDnConditionService = async (
  practiceID,
  conditionID
) => {
  return await models.Protocol.findAll({
    where: {
      practiceid: practiceID,
      [Sequelize.Op.and]: [
        Sequelize.literal(`FIND_IN_SET('${conditionID}', conditions) > 0`), // Ensures an exact match for conditionID in a comma-separated string
      ],
    },
    order: [["protocolname", "ASC"]], // Orders results by protocolname in ascending order
  });
};

// Create a new protocol
export const createProtocolService = async (data) => {
  return await models.Protocol.create(data);
};

// Update a protocol
export const updateProtocolService = async (id, data) => {
  const protocol = await models.Protocol.findOne({ where: { id } });
  if (protocol) {
    return await protocol.update(data);
  }
  return null;
};

// Delete a protocol
export const deleteProtocolService = async (id) => {
  const protocol = await models.Protocol.findOne({ where: { id } });
  if (protocol) {
    await protocol.destroy();
    return true;
  }
  return false;
};

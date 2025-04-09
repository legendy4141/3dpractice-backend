import models from "../models/index.js";

// Service to create a new practice
export const createPracticeService = async ({
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
}) => {
  try {
    const newPractice = await models.Practice.create({
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
    return newPractice;
  } catch (error) {
    throw new Error("Error creating practice: " + error.message);
  }
};

// Service to get all practices
export const getAllPracticesService = async () => {
  try {
    const practices = await models.Practice.findAll();
    return practices;
  } catch (error) {
    throw new Error("Error fetching practices: " + error.message);
  }
};

export const getAllPracticesWithStatusService = async () => {
  try {
    const practices = await models.Practice.findAll();
    const practicesWithStatus = await Promise.all(
      practices.map(async (practice) => {
        // Find if any user associated with the practice is suspended
        const user = await models.User.findOne({
          where: {
            practiceid: practice.practiceid,
          },
        });

        // Add status to the practice object
        return {
          ...practice.toJSON(),
          status: user?.suspended,
        };
      })
    );
    return practicesWithStatus;
  } catch (error) {
    throw new Error("Error fetching practices: " + error.message);
  }
};

// Service to get a practice by ID
export const getPracticeByIdService = async (id) => {
  return await models.Practice.findOne({ where: { practiceid: id } });
};

// Service to update a practice by ID
export const updatePracticeService = async (id, updateData) => {
  try {
    const practice = await models.Practice.findByPk(id);
    if (!practice) {
      throw new Error("Practice not found");
    }

    await practice.update(updateData);
    return practice;
  } catch (error) {
    throw new Error("Error updating practice: " + error.message);
  }
};

// Service to delete a practice by ID
export const deletePracticeService = async (id) => {
  try {
    const practice = await models.Practice.findByPk(id);
    if (!practice) {
      throw new Error("Practice not found");
    }

    await practice.destroy();
    return { message: "Practice deleted successfully" };
  } catch (error) {
    throw new Error("Error deleting practice: " + error.message);
  }
};

import models from "../models/index.js";
import { buildLinkForID, exposeRandomKey } from "../utils/cryptURL.js";

export const getVideoByRandomKeyService = async (id, randomKey) => {
  const exposed = exposeRandomKey(id);

  const isPracticeExist = await models.Practice.findOne({
    where: { randomkey: +exposed },
  });

  if (isPracticeExist === null || isPracticeExist == undefined) return null;
  return await models.Video.findOne({ where: { randomkey: randomKey } });
};

// Get all Videos
export const getAllVideosService = async (userId) => {
  console.log("#################################################");
  const videos = await models.Video.findAll({
    order: [["displayname", "ASC"]],
  });
  const user = await models.User.findByPk(userId);
  console.log("***************user", user);
  const practiceId = user.practiceid;
  console.log("****************practiceId", practiceId);
  const practice = await models.Practice.findByPk(practiceId);
  if (!practice) {
    console.log("Practice is not found");
    return [];
  }
  console.log("****************practice", practice);
  let practiceRandomKey = practice?.randomkey;
  if (
    practiceRandomKey === null ||
    practiceRandomKey === 0 ||
    practiceRandomKey === undefined
  ) {
    let randomId =
      Math.floor(Math.random() * (99999999 - 10000000 + 1)) + 10000000;
    let updateData = {
      practiceid: practice.practiceid,
      contactname: practice.contactname,
      practicename: practice.practicename,
      customerid: practice.customerid,
      address1: practice.address1,
      address2: practice.address2,
      address3: practice.address3,
      city: practice.city,
      state: practice.state,
      country: practice.country,
      postalcode: practice.postalcode,
      contactnumber: practice.contactnumber,
      email: practice.email,
      goodlic: practice.goodlic,
      logobin: practice.logobin,
      blurb: practice.blurb,
      carecreditmid: practice.carecreditmid,
      linkurl1: practice.linkurl1,
      features: practice.features,
      phasedefaults: practice.phasedefaults,
      randomkey: randomId,
    };
    console.log("***********need to change: ", updateData);
    //when randomid is founded???
    await practice.update(updateData);
    practiceRandomKey = randomId;
  }
  console.log("****************practiceRandomKey", practiceRandomKey);

  // Map through each video and add the encrypted link
  return videos.map((video) => {
    const encryptedLink = buildLinkForID(practiceRandomKey, video.randomkey); // Encrypting videolink
    console.log("full encrpyt URL", encryptedLink);
    return {
      ...video.toJSON(), // Converts Sequelize object to plain object
      encryptlink: encryptedLink, // Adding the new field to each video
    };
  });
};

// Get a Video by ID
export const getVideoByIdService = async (id) => {
  return await models.Video.findOne({ where: { id } });
};

// Create a new Video
export const createVideoService = async (data) => {
  return await models.Video.create(data);
};

// Update a Video
export const updateVideoService = async (id, data) => {
  const video = await models.Video.findOne({ where: { id } });
  if (video) {
    return await video.update(data);
  }
  return null;
};

// Delete a Video
export const deleteVideoService = async (id) => {
  const video = await models.Video.findOne({ where: { id } });
  if (video) {
    await video.destroy();
    return true;
  }
  return false;
};

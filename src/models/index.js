import User from "./user.js";
import Practice from "./practice.js";
import Exercise from "./exercise.js";
import Protocol from "./protocol.js";
import EBProtocol from "./ebprotocol.js";
import EBProtExercise from "./ebprotexercise.js";
import Condition from "./condition.js";
import Phase from "./phase.js";
import Video from "./video.js";
import ProtExercise from "./protexercise.js";
import Treatment from "./treatment.js";
import Careplan from "./careplan.js";
import PlanPhase from "./planphase.js";
import PlanTreatment from "./plantreatment.js";

const models = {
  User,
  Practice,
  Exercise,
  Protocol,
  EBProtocol,
  EBProtExercise,
  Condition,
  Phase,
  Video,
  ProtExercise,
  Treatment,
  Careplan,
  PlanPhase,
  PlanTreatment,
};

Object.entries(models).map(([, model]) => {
  if (model?.associate) {
    model.associate(models);
  }
  return model;
});

export default models;

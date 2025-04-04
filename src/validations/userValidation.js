const Joi = require("joi");

const createUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  password: Joi.string().min(6).max(50).required(),
  securitytype: Joi.number().integer().required(),
  patientid: Joi.number().integer().optional(),
  practiceid: Joi.number().integer().optional(),
  suspended: Joi.boolean().optional(),
  description: Joi.string().max(100).optional(),
  email: Joi.string().email().max(255).required(),
});

const updateUserValidation = Joi.object({
  username: Joi.string().min(3).max(50).optional(),
  password: Joi.string().min(6).max(50).optional(),
  securitytype: Joi.number().integer().optional(),
  patientid: Joi.number().integer().optional(),
  practiceid: Joi.number().integer().optional(),
  suspended: Joi.boolean().optional(),
  description: Joi.string().max(100).optional(),
  email: Joi.string().email().max(255).optional(),
});

module.exports = { createUserValidation, updateUserValidation };

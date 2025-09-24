import Joi from "joi";
const updateSessionStatusSchema = Joi.object({
  memberId: Joi.number().integer().positive().required().messages({
    "number.base": "member Id must be a number.",
    "number.integer": "member Id must be an integer.",
    "number.positive": "member Id must be a positive number.",
    "any.required": "member Id is required.",
  }),
  sessionId: Joi.number().integer().positive().required().messages({
    "number.base": "session Id must be a number.",
    "number.integer": "session Id must be an integer.",
    "number.positive": "session Id must be a positive number.",
    "any.required": "session Id is required.",
  }),
  status: Joi.string().valid("Panding", "Complited").required().messages({
    "string.base": "Status must be a string.",
    "any.only": "Status must be one of Panding or Complited",
    "any.required": "Status is required.",
  }),
});
export default updateSessionStatusSchema;

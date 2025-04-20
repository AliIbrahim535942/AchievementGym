import Joi from "joi";
const getSessionSchema = Joi.object({
  sessionId: Joi.number().integer().positive().required().messages({
    "number.base": "session Id must be a number.",
    "number.integer": "session Id must be an integer.",
    "number.positive": "session Id must be a positive number.",
    "any.required": "session Id is required.",
  }),
});
export default getSessionSchema;

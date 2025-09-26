import Joi from "joi";

const getProgressDataShema = Joi.object({
  memberId: Joi.number().integer().positive().required().messages({
    "number.base": "member Id must be a number.",
    "number.integer": "member Id must be an integer.",
    "number.positive": "member Id must be a positive number.",
    "any.required": "member Id is required.",
  }),
  exerciseId: Joi.number().integer().positive().required().messages({
    "number.base": "exerciseId must be a number.",
    "number.integer": "exerciseId must be an integer.",
    "number.positive": "exerciseId must be a positive number.",
    "any.required": "exerciseId is required.",
  }),
});

export default getProgressDataShema;

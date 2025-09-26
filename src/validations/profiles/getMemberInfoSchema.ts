import Joi from "joi";

const getMemberInfoSchema = Joi.object({
  memberId: Joi.number().integer().positive().required().messages({
    "number.base": "member Id must be a number.",
    "number.integer": "member Id must be an integer.",
    "number.positive": "member Id must be a positive number.",
    "any.required": "member Id is required.",
  }),
});

export default getMemberInfoSchema;

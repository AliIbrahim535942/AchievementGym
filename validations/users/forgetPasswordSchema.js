import Joi from "joi";

const forgetPassowordValidaionSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.email": "Email must be a valid email format",
    "any.required": "Email is a required field",
  }),
  accountType: Joi.string().valid("Coach", "GymMember").required().messages({
    "string.base": "Account type must be a string",
    "any.only": "Account type must be either Coach or GymMember",
    "any.required": "Account type is required",
  }),
});

export default forgetPassowordValidaionSchema;

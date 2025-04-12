import Joi from "joi";

const signinValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email should be a type of text",
    "string.email": "Email must be a valid email format",
    "any.required": "Email is a required field",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password should be a type of text",
    "any.required": "Password is a required field",
  }),
  accountType: Joi.string().valid("Coach", "GymMember").required().messages({
    "string.base": "Account type must be a string",
    "any.only": "Account type must be either Coach or GymMember",
    "any.required": "Account type is required",
  }),
});

export default signinValidationSchema;

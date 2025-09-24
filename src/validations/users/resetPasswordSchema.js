import Joi from "joi";

const resetPasswordValidationSchema = Joi.object({
  password: Joi.string().required().messages({
    "string.base": "Password should be a type of text",
    "any.required": "Password is a required field",
  }),
  token: Joi.string().required().messages({
    "string.base": "token should be a type of text",
    "any.required": "token is a required field",
  }),
});

export default resetPasswordValidationSchema;

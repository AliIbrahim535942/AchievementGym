import Joi from "joi";
const signupValidationSchema = Joi.object({
  accountType: Joi.string().valid("Coach", "GymMember").required().messages({
    "string.base": "account type must be a string.",
    "any.only": "account type must be either Coach or GymMember.",
    "any.required": "account type is required.",
  }),
  firstName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/) //letters and spaces
    .required()
    .messages({
      "string.base": "firstName should be a type of 'text'",
      "string.pattern.base": "firstName should only contain letters and spaces",
      "any.required": "firstName is a required field",
    }),
  lastName: Joi.string()
    .pattern(/^[A-Za-z\s]+$/) //letters and spaces
    .required()
    .messages({
      "string.base": "lastName should be a type of 'text'",
      "string.pattern.base": "lastName should only contain letters and spaces",
      "any.required": "lastName is a required field",
    }),
  bio: Joi.string()
    .allow("")
    .optional()
    .messages({ "string.base": "bio should be a type of 'text'" }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{7,15}$/) //(7–15 digits)
    .required()
    .messages({
      "string.base": "number should be a type of 'text'",
      "string.pattern.base": "number must contain only digits (7–15 digits)",
      "any.required": "number is a required field",
    }),
  email: Joi.string().email().required().messages({
    "string.base": "email should be a type of 'text'",
    "string.email": "email must be a valid email format",
    "any.required": "email is a required field",
  }),
  password: Joi.string()
    .min(8)
    .pattern(/(?=.*[A-Z])/) //one uppercase letter
    .pattern(/(?=.*\d)/) //one number
    .pattern(/(?=.*[!@#$%^&*(),.?":{}|<>])/) //one special character
    .required()
    .messages({
      "string.base": "password should be a type of 'text'",
      "string.min": "password should be at least 8 characters long",
      "string.pattern.base":
        "password must contain at least one uppercase letter, one number, and one special character",
      "any.required": "password is a required field",
    }),
  sportType: Joi.string()
    .valid("Calisthenics", "Body building", "Powerlifting")
    .required()
    .messages({
      "string.base": "sportType must be a string.",
      "any.only":
        "sportType must be one of Calisthenics or Body building or Powerlifting",
      "any.required": "sportType is required.",
    }),
});
export default signupValidationSchema;

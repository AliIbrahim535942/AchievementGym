import Joi from "joi";

const addSessionSchema = Joi.object({
  memberId: Joi.number().integer().positive().required().messages({
    "number.base": "member Id must be a number.",
    "number.integer": "member Id must be an integer.",
    "number.positive": "member Id must be a positive number.",
    "any.required": "member Id is required.",
  }),

  duration: Joi.number().positive().required().messages({
    "number.base": "Duration must be a number.",
    "number.positive": "Duration must be a positive number.",
    "any.required": "Duration is required.",
  }),

  date: Joi.date().required().messages({
    "date.base": "Date must be a valid date.",
    "any.required": "Date is required.",
  }),

  exercises: Joi.array()
    .items(
      Joi.object({
        exerciseId: Joi.number().integer().positive().required().messages({
          "number.base": "exerciseId must be a number.",
          "number.integer": "exerciseId must be an integer.",
          "number.positive": "exerciseId must be a positive number.",
          "any.required": "exerciseId is required.",
        }),
        weight: Joi.number().positive().optional().messages({
          "number.base": "weight must be a number.",
          "number.positive": "weight must be a positive number.",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Exercises must be an array.",
      "array.min": "At least one exercise is required.",
      "any.required": "Exercises field is required.",
    }),
});

export default addSessionSchema;

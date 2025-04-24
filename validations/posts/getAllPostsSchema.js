import Joi from "joi";

export const getAllPostsValidationSchema = Joi.object({
  pageNumber: Joi.number().integer().min(0).required().messages({
    "number.base": "pageNumber must be a number.",
    "number.integer": "pageNumber must be an integer.",
    "number.min": "pageNumber must be at least 0.",
    "any.required": "pageNumber is required.",
  }),
});
export default getAllPostsValidationSchema;

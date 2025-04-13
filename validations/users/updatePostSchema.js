import Joi from "joi";
const updatePostValidationShema = Joi.object({
  content: Joi.string().required().messages({
    "string.base": "Content must be a text.",
    "string.empty": "Content is required.",
    "any.required": "Content is required.",
  }),
  postId: Joi.number().integer().positive().required().messages({
    "number.base": "postId must be a number.",
    "number.integer": "postId must be an integer.",
    "number.positive": "postId must be a positive number.",
    "any.required": "postId is required.",
  }),
});
export default updatePostValidationShema;

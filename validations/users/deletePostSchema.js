import Joi from "joi";
const deletePostValidationShema = Joi.object({

  postId: Joi.number().integer().positive().required().messages({
    "number.base": "postId must be a number.",
    "number.integer": "postId must be an integer.",
    "number.positive": "postId must be a positive number.",
    "any.required": "postId is required.",
  }),
});
export default deletePostValidationShema;

import Joi from "joi";
const addPostValidationShema = Joi.object({
  content: Joi.string().required().messages({
    "string.base": "Content must be a text.",
    "string.empty": "Content is required.",
    "any.required": "Content is required.",
  }),
  
});
export default addPostValidationShema;

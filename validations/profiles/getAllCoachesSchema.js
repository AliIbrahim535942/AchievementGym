import Joi from "joi";

const getAllCoachesSchema = Joi.object({
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

export default getAllCoachesSchema;

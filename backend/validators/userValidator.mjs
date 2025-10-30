import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(30).optional(),
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(8).max(100).required(),
});

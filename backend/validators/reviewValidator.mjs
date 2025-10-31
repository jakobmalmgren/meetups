import Joi from "joi";

export const reviewSchema = Joi.object({
  review: Joi.string().trim().min(8).max(300).optional().messages({
    "string.min": "Review must be at least 8 characters",
    "string.max": "Review must be at most 300 characters",
  }),
  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.base": "rating must be a number",
    "number.integer": "rating must be an integer",
    "number.min": "rating must be between 1 and 5",
    "number.max": "rating must be between 1 and 5",
    "any.required": "rating is required",
  }),
}).prefs({ abortEarly: false, stripUnknown: true });

// validera url parametrar
export const paramsSchema = Joi.object({
  meetupId: Joi.string().hex().length(24).required(),
}).prefs({ abortEarly: true, stripUnknown: true, convert: false });

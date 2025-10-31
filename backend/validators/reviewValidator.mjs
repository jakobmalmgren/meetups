import Joi from "joi";

export const reviewSchema = Joi.object({
    review: Joi.string().trim().min(8).max(300).optional(),
    rating: Joi.number().integer().min(1).max(5).required(),
}).prefs({ abortEarly: false, stripUnknown: true })
import Joi from "joi";

export const reviewSchema = Joi.object({
    review: Joi.string().min(3).max(300),
    rating: Joi.number().min(1).max(5),
})
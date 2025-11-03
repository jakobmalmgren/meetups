import Joi from "joi";

export const meetupIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.length": "Invalid meetup ID",
    "string.hex": "Invalid meetup ID",
    "any.required": "Meetup ID is required",
  }),
}).prefs({ abortEarly: true, stripUnknown: true, convert: false });

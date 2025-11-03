import Joi from "joi";

export const signupSchema = Joi.object({
  email: Joi.string()
    .email({
      tlds: { allow: ["com", "se", "net", "org"] }, // tillåter endast dessa..
      minDomainSegments: 2,
    })
    .trim()
    .lowercase()
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
    }),
  password: Joi.string()
    .min(8)
    .max(100)
    .pattern(/[A-Z]/, "uppercase letter")
    .pattern(/[0-9]/, "number")
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password must be at most 100 characters long.",
      "string.pattern.name": "Password must contain at least one {#name}.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string().min(8).max(100).required(),
});

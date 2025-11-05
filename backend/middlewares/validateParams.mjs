export const validateParams = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.params, {
    abortEarly: true,
    stripUnknown: true,
    convert: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ error: error.details?.[0]?.message || "Validation error" });
  }
  req.params = value;
  next();
};

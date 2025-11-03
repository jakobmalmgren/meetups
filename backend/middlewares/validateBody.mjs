export const validateBody = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, {
    abortEarly: true,
    stripUnknown: true,
  });
  if (error) {
    return res.status(400).json({
      success: false,
      error: error.details?.[0]?.message || "Validation error",
    });
  }
  req.body = value;
  next();
};

export const validateLoginBody = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, {
    abortEarly: true,
    stripUnknown: true,
  });
  if (error) {
    return res.status(401).json({
      success: false,
      error: "Wrong email or password",
    });
  }
  req.body = value;
  next();
};

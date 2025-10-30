const validateBody = (schema, opions = {}) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
      ...opions,
    });
    if (error) return sendValidationError(res, error);
  };
};

import { ApiError } from "../utils/api-response.js";

/**
 * @description Middleware to validate request body against a Joi schema
 */
export const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorDetails = error.details.map((detail) => detail.message);
    return next(new ApiError(400, "Validation failed", errorDetails));
  }

  next();
};
/**
 * @description Standardized Response format for successful requests
 */
class ApiResponse {
  constructor(statusCode, message, payload = null) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.payload = payload;
  }
}

/**
 * @description Standardized Error format for failed requests
 */
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.payload = null; // Usually null for errors
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

const globalErrorHandler = (err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  /* ---------------- API ERROR ---------------- */
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: err.success,
      statusCode: err.statusCode,
      message: err.message,
      payload: err.payload,
      errors: err.errors,
    });
  }

  /* ---------------- MONGOOSE CAST ---------------- */
  if (err.name === "CastError") {
    return res.status(400).json(new ApiError(400, "Invalid ID format"));
  }

  /* ---------------- DUPLICATE KEY ---------------- */
  if (err.code === 11000) {
    return res.status(400).json(new ApiError(400, "Duplicate field value"));
  }

  /* ---------------- FALLBACK ---------------- */
  return res.status(500).json(new ApiError(500, "Internal Server Error"));
};

export { ApiResponse, ApiError, globalErrorHandler };

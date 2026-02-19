import { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    message: `Not Found: ${req.originalUrl}`,
    success: false,
    error: { statusCode: 404, path: req.originalUrl },
  });
};

interface CustomError {
  statusCode?: number;
  customError?: any;
  name?: string;
  message?: string;
  errors?: any;
  code?: number;
  keyPattern?: Record<string, number>;
  [key: string]: any;
}

export const errorHandler: ErrorRequestHandler = (err, req, res) => {
  const e = err as CustomError;

  if (e.customError) {
    res.status(e.statusCode || 400).json(e.customError);
    return;
  }

  if (e.name === "ValidationError" && e.errors) {
    const errors: Record<string, any> = {};
    for (const field in e.errors) {
      errors[field] = {
        message: e.errors[field].message,
        name: e.errors[field].name,
        properties: e.errors[field].properties,
        kind: e.errors[field].kind,
        path: e.errors[field].path,
        value: e.errors[field].value,
      };
    }

    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: { name: e.name, errors },
    });
    return;
  }

  if (e.name === "CastError") {
    res.status(400).json({
      message: "Invalid ID",
      success: false,
      error: { name: e.name, message: e.message },
    });
    return;
  }

  if (e.code === 11000) {
    const field = Object.keys(e.keyPattern || {})[0] || "field";
    res.status(409).json({
      message: "Duplicate key error",
      success: false,
      error: {
        name: "DuplicateKeyError",
        path: field,
        message: `${field} already exists`,
      },
    });
    return;
  }

  res.status(e.statusCode || 500).json({
    message: e.message || "Something went wrong",
    success: false,
    error: { name: e.name, message: e.message },
  });
};

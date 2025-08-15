/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
// import config from "../config";

// Not Found Route Handler
export const notFoundHandler: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    success: false,
    message: `🔍 Not Found: ${req.originalUrl}`,
  });
};

// Global Error Handler
interface CustomError {
  statusCode?: number;
  customError?: any;
  name?: string;
  message?: string;
  [key: string]: any;
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Cast err to our custom type for TypeScript
  const e = err as CustomError;

  // Handle Mongoose ValidationError
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
      error: {
        name: e.name,
        errors,
      },
    });
    return; // exit the function
  }

  // Handle other errors
  res.status(e.statusCode || 500).json({
    message: e.message || "Something went wrong",
    success: false,
    error: e,
  });
};

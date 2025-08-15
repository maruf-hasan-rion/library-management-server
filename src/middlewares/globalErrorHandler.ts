/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import config from "../config";

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
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const statusCode = err.statusCode || 500;
  // const message = err.message || "Internal Server Error";

  // res.status(statusCode).json({
  //   success: false,
  //   message,
  //   stack: config.node_env === "development" ? err.stack : undefined,
  // });

  if (err.name === "ValidationError") {
    const errors: Record<string, any> = {};

    for (const field in err.errors) {
      errors[field] = {
        message: err.errors[field].message,
        name: err.errors[field].name,
        properties: err.errors[field].properties,
        kind: err.errors[field].kind,
        path: err.errors[field].path,
        value: err.errors[field].value,
      };
    }

    return res.status(400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: err.name,
        errors,
      },
    });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
    success: false,
    error: err,
  });
};

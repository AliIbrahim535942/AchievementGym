import { Schema } from "joi";
import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../utils/responseHandler";
export default function validate(
  schema: Schema,
  target: "body" | "query" | "params",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.validate(req[target], { abortEarly: false });
      if (result?.error) {
        return responseHandler.error(
          res,
          `Validation error: ${result.error.details
            .map((e) => e.message)
            .join(", ")}`,
          400,
        );
      }
      req[target] = result.value;
      return next();
    } catch (err) {
      console.log(err);
      responseHandler.error(res, "Server error during schema validation", 500);
    }
  };
}

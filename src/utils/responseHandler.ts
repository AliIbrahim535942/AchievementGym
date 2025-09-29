import { Response } from "express";
const responseHandler = {
  success: (res: Response, message: string, data = {}) => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  },
  notFound: (res: Response, message: string) => {
    return res.status(404).json({
      success: false,
      message,
    });
  },
  error: (res: Response, message: string, errorCode = 400, details = {}) => {
    return res.status(errorCode).json({
      success: false,
      message,
      errorCode,
      details,
    });
  },
};
export { responseHandler };

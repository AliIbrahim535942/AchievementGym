const responseHandler = {
  success: (res, message, data = {}) => {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  },
  notFound: (res, message) => {
    return res.status(404).json({
      success: false,
      message,
    });
  },
  error: (res, message, errorCode = 400, details = {}) => {
    return res.status(errorCode).json({
      success: false,
      message,
      errorCode,
      details,
    });
  },
};
export { responseHandler };

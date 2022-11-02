const sendError = (res, message, code = 400) =>
  res.status(code).json({
    status: code,
    success: false,
    message,
  });

export default sendError;

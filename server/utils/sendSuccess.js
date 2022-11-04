const sendSuccess = (res, message, data = null, code = 200) => {
  if (data) {
    return res.status(code).json({
      status: code,
      success: true,
      message,
      data,
    });
  } else {
    return res.status(code).json({
      status: code,
      success: true,
      message,
    });
  }
};
export default sendSuccess;

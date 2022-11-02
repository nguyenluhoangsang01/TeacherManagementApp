const sendSuccess = (res, message, data = null, code = 200) => {
  if (data) {
    return res.status(code).json({
      success: true,
      message,
      data,
    });
  } else {
    return res.status(code).json({
      success: true,
      message,
    });
  }
};
export default sendSuccess;

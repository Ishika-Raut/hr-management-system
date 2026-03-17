export const AppResponse = (res, statusCode, success, message, data = null, extra = null) => 
{   
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    extra
  });
}

function AppResponse(res, statusCode, success, message, data = null, extra = null) 
{   
  return res.status(statusCode).json({
    success,
    message,
    data,
    extra
  });
}

export default AppResponse;
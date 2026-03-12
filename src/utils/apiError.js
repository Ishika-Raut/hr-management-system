function AppError(message, statusCode) 
{
  const error = new Error(message);

  error.statusCode = statusCode;
  error.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";

  return error;
}

export default AppError;
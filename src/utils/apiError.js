function AppError(message, statusCode, status) 
{
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = status;
  return error;
}

export default AppError;
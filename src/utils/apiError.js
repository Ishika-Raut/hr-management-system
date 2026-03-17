export const AppError = (res, message, statusCode) =>
{
  return res.status(statusCode).json({success:false, message})
}


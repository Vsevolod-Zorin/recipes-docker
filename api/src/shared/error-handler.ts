export const errorHandler = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    res.status(err.statusCode || 400).json({ message: err.message, error: err.error });
  }
};

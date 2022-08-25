export const errorHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    res.status(err.statusCode || 400).json({ msg: err.message, error: err.error });
  });
};

export const errorHandler = fn => async (req, res, next) => {
	try {
		await fn(req, res, next);
	} catch (err) {
		res
			.status(err.code || 400)
			.json({ code: err.code || 400, message: err.message, error: err.error });
	}
};

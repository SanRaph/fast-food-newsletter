const notFoundError = (req, res, next) =>  {
    const err = new Error(`Can't Find ${req.originalUrl}`);
    res.status(404);
    next(err);
  };

  const errorHandler = (err, req, res, next) => {
    const statusCode = res.status === 200 ? 500 : statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      status: 'OK',
      stack: process.env.NODE_ENV === 'production' ? '🤷‍♀️' : err.stack
    });
  }

  module.exports = {
    notFoundError,
    errorHandler
  };
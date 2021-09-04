const errorMiddleware = (err, req, res, next) => {
  return res.status(err.status || 500).json({
    code: err.code || 'UNKNOWN_CODE',
    message: err.message || 'unknown',
    severity: err.severity || 'HIGH'
  })
}

module.exports = errorMiddleware


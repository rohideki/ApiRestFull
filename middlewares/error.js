module.exports = (error, req, res, next) => {
    const code = typeof error.code === 'string' ? 500 : error.code
    const status = code || 500
    const {message, data} = error
  
    res.status(status).json({
      message: message,
      data: data,
      code: status,
    })
  }
  
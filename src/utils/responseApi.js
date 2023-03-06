const responseServerError = (res, error) => {
  console.log(error)
  res.status(500).json({
    errCode: 0,
    msg: 'Server Error'
  })
}

module.exports = {
  responseServerError,
}

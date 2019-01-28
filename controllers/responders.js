const successResponder = (res, data) => {
  return res.status(200).send({ success: true, data: data });
}

const errorResponder = (res, statusCode, errors) => {
  return res.status(statusCode).send({ success: false, errors: errors });
}

module.exports = {
  successResponder,
  errorResponder
}

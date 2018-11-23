const VALID_EMAIL_REGEX = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

const isValidEmail = (email) => (
  VALID_EMAIL_REGEX.test(email)
)

module.exports = { isValidEmail }

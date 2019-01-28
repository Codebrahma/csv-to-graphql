const { validate } = require('validate.js');
const { flatten, values } = require('lodash');

const VALIDATION_CONSTRAINTS = {
  name: {
    presence: true,
    length: {
      minimum: 4,
      message: "must be at least 4 characters"
    }
  },
  username: {
    presence: true,
    length: {
      minimum: 8,
      message: "must be at least 8 characters"
    }
  },
  email: {
    presence: true,
    email: {
      message: "must be valid"
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "must be at least 6 characters"
    }
  }
};

const getFullErrorMessages = (errors) => flatten(values(errors));
const validateParams = (data) => getFullErrorMessages(validate(data, VALIDATION_CONSTRAINTS));
module.exports = { validateParams };

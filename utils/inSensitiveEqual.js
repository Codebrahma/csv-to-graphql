const inSensitiveEqual = (arg1 = '', arg2 = '') => {
  return (arg1.localeCompare(arg2, 'en', { sensitivity: 'accent' }) === 0);
}

module.exports = inSensitiveEqual;

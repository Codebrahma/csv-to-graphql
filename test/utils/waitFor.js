const timeoutFunc = global.setTimeout;

const waitFor = (milliseconds) => (
  new Promise((r) => timeoutFunc.call(global, r, milliseconds))
);

module.exports = waitFor;

const createDate = (year = 0, month = 0, day = 0, hour = 0, minute = 0) =>
  new Date(Date.UTC(year, month, day, hour, minute));

module.exports = {
  createDate
};

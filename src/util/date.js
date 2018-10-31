const getUtcDate = (year = 0, month = 0, day = 0, hour = 0, minute = 0) =>
    new Date(Date.UTC(year, month, day, hour, minute)),
  getMinutesDiff = (start, end) => {
    const diff = Math.abs(start - end);
    return Math.floor(diff / 1000 / 60);
  },
  addMinutes = (date, minutes) => {
    const copy = new Date(date);
    copy.setMinutes(copy.getMinutes() + minutes);
    return copy;
  };

module.exports = {
  getUtcDate,
  getMinutesDiff,
  addMinutes
};

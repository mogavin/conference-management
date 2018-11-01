const getUtcHour = (hour = 0, minute = 0) => {
    const today = new Date();
    return new Date(Date.UTC(today.getYear(), today.getMonth(), today.getDay(), hour, minute));
  },
  getMinutesDiff = (start, end) => {
    const diff = Math.abs(start - end);
    return Math.floor(diff / 1000 / 60);
  },
  addMinutes = (date, minutes = 0) => {
    const copy = new Date(date);
    copy.setMinutes(copy.getMinutes() + minutes);
    return copy;
  };

module.exports = {
  getUtcHour,
  getMinutesDiff,
  addMinutes
};

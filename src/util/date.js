const getUtcHour = (hour = 0, minute = 0) => {
    const today = new Date();
    return new Date(Date.UTC(today.getYear(), today.getMonth(), today.getDay(), hour, minute));
  },
  addMinutes = (date, minutes = 0) => {
    const copy = new Date(date);
    copy.setMinutes(copy.getMinutes() + minutes);
    return copy;
  };

module.exports = {
  getUtcHour,
  addMinutes,
};

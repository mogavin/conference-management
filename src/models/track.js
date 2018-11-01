const session = require("./session"),
  { getUtcHour } = require("../util/date");

const _getMorningSession = () => {
    const lunch = {
      start: getUtcHour(12)
    };
    return session("Morning", getUtcHour(9), getUtcHour(12), { event: lunch });
  },
  _getAfternoonSession = () => {
    const network = {
      start: getUtcHour(16)
    };
    return session("Afternoon", getUtcHour(13), getUtcHour(17), { event: network });
  };

const track = (
  name,
  { morningSession = _getMorningSession(), afternoonSession = _getAfternoonSession() } = {}
) => {
  const hasTime = proposal =>
    morningSession.hasTime(proposal) || afternoonSession.hasTime(proposal);

  return {
    hasTime
  };
};

module.exports = track;

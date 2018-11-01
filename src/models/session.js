const { getUtcDate, getMinutesDiff, addMinutes } = require("../util/date");

const session = (
  name,
  start,
  end,
  { event, talks = event ? [event] : [], availableTime = start } = {}
) => {
  const hasTime = ({ length }) => {
      const withLength = addMinutes(availableTime, length);
      return withLength <= end;
    },
    addTalk = ({ name, length }) => {
      const spliceIndex = event ? talks.length - 1 : talks.length,
        hasAvailableTime = hasTime({ length });

      if (hasAvailableTime) {
        talks.splice(spliceIndex, 0, { name, start: availableTime });
        availableTime = addMinutes(availableTime, length);
        event && availableTime > event.start && (event.start = availableTime);
      }

      return session(name, start, end, { event, talks, availableTime });
    };

  return {
    addTalk,
    hasTime,
    talks
  };
};

module.exports = session;

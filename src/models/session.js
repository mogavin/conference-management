const { getUtcDate, getMinutesDiff, addMinutes } = require("../util/date");

const session = (
  name,
  start,
  end,
  { event, talks = event ? [event] : [], availableTime = start } = {}
) => {
  const hasTime = ({ length = 0 }) => availableTime < end;

  return {
    addTalk: ({ name, length }) => {
      const spliceIndex = event ? talks.length - 1 : talks.length,
        hasAvailableTime = hasTime({ length });

      hasAvailableTime && talks.splice(spliceIndex, 0, { name, start: availableTime });
      availableTime = hasAvailableTime ? addMinutes(availableTime, length) : availableTime;

      return session(name, start, end, { event, talks, availableTime });
    },

    hasTime,
    talks
  };
};

module.exports = session;

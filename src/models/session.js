const { getUtcDate, getMinutesDiff, addMinutes } = require("../util/date");

const session = (
  name,
  start,
  end,
  { event, talks = event ? [event] : [], availableTime = start } = {}
) => {
  const minutesRemaining = getMinutesDiff(availableTime, end),
    hasTime = minutesRemaining > 0;

  return {
    addTalk: ({ name, length }) => {
      const spliceIndex = event ? talks.length - 1 : talks.length;
      hasTime && talks.splice(spliceIndex, 0, { name, start: availableTime }),
        (availableTime = hasTime ? addMinutes(availableTime, length) : availableTime);

      return session(name, start, end, { event, talks, availableTime });
    },

    talks
  };
};

module.exports = session;

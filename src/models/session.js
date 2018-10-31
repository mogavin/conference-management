const { getUtcDate, getMinutesDiff, addMinutes } = require("../util/date");

const session = ({ name, start, end, talks = [], availableTime = start } = {}) => {
  const minutesRemaining = getMinutesDiff(availableTime, end),
    hasTime = minutesRemaining > 0;
  return {
    addTalk: ({ name, length }) => {
      const required = {
          name,
          start,
          end
        },
        optional = hasTime
          ? {
              talks: talks.concat({ name, start: availableTime }),
              availableTime: addMinutes(availableTime, length)
            }
          : { talks, availableTime };

      return session({ ...required, ...optional });
    },

    talks
  };
};

module.exports = session;

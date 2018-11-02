const talk = require("../talk"),
  { addMinutes } = require("../../util/date");

const session = (
  name,
  start,
  end,
  { event, talks = event ? [talk(event)] : [], availableTime = start } = {}
) => {
  const hasTime = ({ length }) => {
      const withLength = addMinutes(availableTime, length);
      return withLength <= end;
    },
    addTalk = ({ name, length }) => {
      const canAdd = hasTime({ length }),
        updateTalks = proposal => {
          const spliceIndex = event ? talks.length - 1 : talks.length;
          talks.splice(spliceIndex, 0, talk(proposal));
        },
        updateEvent = newEvent => talks.splice(talks.length - 1, 1, talk(newEvent));

      if (canAdd) {
        updateTalks({ name, start: availableTime, length });
        availableTime = addMinutes(availableTime, length);
        event && availableTime > event.start && updateEvent({ ...event, start: availableTime });
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

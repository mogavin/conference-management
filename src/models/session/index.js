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
        add = proposal => {
          const spliceIndex = event ? talks.length - 1 : talks.length;
          talks.splice(spliceIndex, 0, talk(proposal));
        },
        updateEvent = availableTime =>
          event &&
          availableTime > event.start &&
          talks.splice(talks.length - 1, 1, talk({ ...event, start: availableTime }));

      if (canAdd) {
        add({ name, start: availableTime, length });
        availableTime = addMinutes(availableTime, length);
        updateEvent(availableTime);
      }

      return session(name, start, end, { event, talks, availableTime });
    },
    toString = () => talks.reduce((print, talk) => (print += `${talk.toString()}\n\n`), "");

  return Object.freeze({
    addTalk,
    hasTime,
    toString,
    talks
  });
};

module.exports = session;

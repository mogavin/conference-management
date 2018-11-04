const session = require('../session'),
  { getUtcHour } = require('../../util/date');

const _getMorningSession = () => {
    const lunch = {
      name: 'Lunch',
      start: getUtcHour(12),
    };
    return session('Morning', getUtcHour(9), getUtcHour(12), { event: lunch });
  },
  _getAfternoonSession = () => {
    const network = {
      name: 'Networking Event',
      start: getUtcHour(16),
    };
    return session('Afternoon', getUtcHour(13), getUtcHour(17), { event: network });
  };

const track = (
  name,
  { morningSession = _getMorningSession(), afternoonSession = _getAfternoonSession() } = {},
) => {
  const hasTime = proposal =>
      morningSession.hasTime(proposal) || afternoonSession.hasTime(proposal),
    addTalk = proposal => {
      if (morningSession.hasTime(proposal)) morningSession = morningSession.addTalk(proposal);
      else afternoonSession = afternoonSession.addTalk(proposal);

      return track(name, { morningSession, afternoonSession });
    },
    toString = () =>
      `Track ${name}:\n\n${morningSession.toString()}\n\n${afternoonSession.toString()}`;

  return Object.freeze({
    hasTime,
    addTalk,
    toString,
    morning: morningSession,
    afternoon: afternoonSession,
  });
};

module.exports = track;

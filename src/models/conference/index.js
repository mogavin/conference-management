const _track = require('../track');

const conference = (proposals, { tracks = [], trackFactory = _track } = {}) => {
  while (proposals.length) {
    const toRemove = [],
      newTrack = proposals.reduce((track, proposal, i) => {
        if (track.hasTime(proposal)) {
          toRemove.push(i);
          return track.addTalk(proposal);
        }
        return track;
      }, trackFactory(tracks.length + 1));

    while (toRemove.length) proposals.splice(toRemove.pop(), 1);

    tracks.push(newTrack);
  }

  return Object.freeze({
    tracks,
    toString: () => tracks.map(track => track.toString()).join(`\n\n\n\n`),
  });
};

module.exports = conference;

const _track = require("../track");

const conference = (proposals, { track = _track } = {}) => {
  const tracks = [];

  while (proposals.length) {
    const toRemove = [],
      newTrack = proposals.reduce((track, proposal, i) => {
        if (track.hasTime(proposal)) {
          toRemove.push(i);
          return track.addTalk(proposal);
        }
        return track;
      }, track(tracks.length));

    while (toRemove.length) proposals.splice(toRemove.pop(), 1);

    tracks.push(newTrack);
  }

  return {
    tracks
  };
};

module.exports = conference;

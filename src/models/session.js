const session = ({ talks = [] } = {}) => {
  const _talks = talks;

  return {
    addTalk: ({ name, length }) => {
      const talk = {
        name,
        start: new Date(2018, 9, 22, 9)
      };
      return session({ talks: _talks.concat(talk) });
    },

    getTalks: () => _talks
  };
};

module.exports = session;

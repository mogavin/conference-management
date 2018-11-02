const talk = ({ name, start, length }) => {
  return {
    toString: () => {
      const hour12 = start.toLocaleString([], { hour12: true }).slice(-2),
        startDesc = `${start.toUTCString().replace(/.* (\d{2}:\d{2}).*/, "$1")}${hour12}`,
        lengthDesc = length ? (length === 5 ? "lightning" : `${length}min`) : "";

      return `${startDesc} ${name} ${lengthDesc}`;
    }
  };
};

module.exports = talk;

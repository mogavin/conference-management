const proposal = input => {
  const isValid = /^([^0-9]+)\s(\d{2}min|lightning)$/.test(input);

  if (isValid) {
    const isMin = /\d{2}min$/.exec(input),
      lengthType = isMin ? isMin[0] : "lightning",
      isLightning = lengthType === "lightning",
      name = input.substring(0, input.indexOf(lengthType) - 1),
      length = isLightning ? 5 : parseInt(lengthType.substr(0, 2));

    return Object.freeze({
      name,
      length
    });
  } else throw "Input incorreto. O formato deve ser <Nome da talk> (<XX>min | lightning)";
};

module.exports = proposal;

const proposal = input => {
  const isValid = /^([^0-9]+)\s(\d{2}min|lightning)$/.test(input);

  if (isValid) {
    const lengthType = input.includes("min") ? "min" : "lightning",
      isLightning = lengthType === "lightning",
      name = input.substring(0, input.indexOf(lengthType) - (isLightning ? 1 : 3)),
      length = isLightning ? 5 : parseInt(input.substr(input.indexOf(lengthType) - 2, 2));

    return {
      name,
      length
    };
  } else throw "Input incorreto. O formato deve ser <Nome da talk> (<lenght>min | lightning)";
};

module.exports = proposal;

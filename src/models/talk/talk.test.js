const { assert } = require("chai"),
  talk = require("./index"),
  { getUtcHour } = require("../../util/date");

describe("Talk", () => {
  it.each([
    [
      "alterando a descrição de talks com 5min para lightning",
      {
        name: "Rails for Python Developers",
        start: getUtcHour(16),
        length: 5
      },
      "16:00PM Rails for Python Developers lightning"
    ],
    [
      "adicionando 'min' ao final dos lengths diferentes de 5min",
      {
        name: "Overdoing it in Python",
        start: getUtcHour(10, 45),
        length: 45
      },
      "10:45AM Overdoing it in Python 45min"
    ]
  ])("deve ter uma descrição formatadas %s", (testCase, proposal, expected) => {
    const actual = talk(proposal).toString();

    assert.equal(actual, expected);
  });
});

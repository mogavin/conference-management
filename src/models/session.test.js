const { assert } = require("chai"),
  session = require("./session"),
  { getUtcDate } = require("../util/date");

describe("Session", () => {
  it("deve distribuir corretamente proposals inseridas no intervalo sem evento", () => {
    const proposals = [
        {
          name: "Writing Fast Tests Against Enterprise Rails",
          length: 60
        },
        {
          name: "Overdoing it in Python",
          length: 45
        },
        {
          name: "Lua for the Masses",
          length: 30
        },
        {
          name: "Ruby Errors from Mismatched Gem Versions",
          length: 45
        }
      ],
      name = "Morning",
      start = getUtcDate(2018, 9, 22, 9),
      end = getUtcDate(2018, 9, 22, 12);
    let morningSession = session({ name, start, end });

    proposals.forEach(proposal => {
      morningSession = morningSession.addTalk(proposal);
    });

    const actual = morningSession.talks,
      expected = [
        {
          name: "Writing Fast Tests Against Enterprise Rails",
          start: getUtcDate(2018, 9, 22, 9)
        },
        {
          name: "Overdoing it in Python",
          start: getUtcDate(2018, 9, 22, 10)
        },
        {
          name: "Lua for the Masses",
          start: getUtcDate(2018, 9, 22, 10, 45)
        },
        {
          name: "Ruby Errors from Mismatched Gem Versions",
          start: getUtcDate(2018, 9, 22, 11, 15)
        }
      ];

    assert.deepEqual(actual, expected);
  });
});

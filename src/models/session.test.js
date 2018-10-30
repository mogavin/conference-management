const { assert } = require("chai"),
  session = require("./session"),
  { createDate } = require("../util/date");

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
      start = createDate(2018, 9, 22, 9),
      end = createDate(2018, 9, 22, 12);
    let morningSession = session({ name, start, end });

    proposals.forEach(proposal => {
      morningSession = morningSession.addTalk(proposal);
    });

    const actual = morningSession.getTalks(),
      expected = [
        {
          name: "Writing Fast Tests Against Enterprise Rails",
          start: createDate(2018, 9, 22, 9)
        },
        {
          name: "Overdoing it in Python",
          start: createDate(2018, 9, 22, 10)
        },
        {
          name: "Lua for the Masses",
          start: createDate(2018, 9, 22, 10, 45)
        },
        {
          name: "Ruby Errors from Mismatched Gem Versions",
          start: createDate(2018, 9, 22, 11, 15)
        }
      ];

    console.log(actual);
    console.log(expected);

    assert.deepEqual(actual, expected);
  });
});

const { assert } = require("chai"),
  session = require("./session"),
  { getUtcDate } = require("../util/date");

describe("Session", () => {
  const PROPOSALS = [
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
    },
    {
      name: "Common Ruby Errors",
      length: 45
    },
    {
      name: "Rails for Python Developers",
      length: 5
    }
  ];

  describe("sem evento", () => {
    it("deve distribuir proposals inseridas no intervalo, ignorando as que porventura o ultrapassem", () => {
      const name = "Morning",
        start = getUtcDate(2018, 9, 22, 9),
        end = getUtcDate(2018, 9, 22, 12);
      let morningSession = session(name, start, end);

      PROPOSALS.forEach(proposal => {
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

  describe("com evento", () => {
    it("cuja data de inicio seja igual a data final da session, deve distribuir proposals inserindo este evento ao final", () => {
      const name = "Morning",
        start = getUtcDate(2018, 9, 22, 9),
        end = getUtcDate(2018, 9, 22, 12),
        event = {
          name: "Lunch",
          start: getUtcDate(2018, 9, 22, 12)
        };
      let morningSession = session(name, start, end, { event });

      PROPOSALS.forEach(proposal => {
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
          },
          {
            name: "Lunch",
            start: getUtcDate(2018, 9, 22, 12)
          }
        ];

      assert.deepEqual(actual, expected);
    });
  });
});

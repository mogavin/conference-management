const { assert } = require("chai"),
  session = require("./index"),
  { getUtcHour } = require("../../util/date");

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
        start = getUtcHour(9),
        end = getUtcHour(12);
      let morningSession = session(name, start, end);

      PROPOSALS.forEach(proposal => {
        morningSession = morningSession.addTalk(proposal);
      });

      const actual = morningSession.talks,
        expected = [
          {
            name: "Writing Fast Tests Against Enterprise Rails",
            start: getUtcHour(9)
          },
          {
            name: "Overdoing it in Python",
            start: getUtcHour(10)
          },
          {
            name: "Lua for the Masses",
            start: getUtcHour(10, 45)
          },
          {
            name: "Ruby Errors from Mismatched Gem Versions",
            start: getUtcHour(11, 15)
          }
        ];

      console.log(actual);
      console.log(expected);

      assert.deepEqual(actual, expected);
    });
  });

  describe("com evento ao final, deve distribuir proposals inseridas no intervalo", () => {
    it("onde a data de inicio do evento seja igual a data final da session", () => {
      const name = "Morning",
        start = getUtcHour(9),
        end = getUtcHour(12),
        event = {
          name: "Lunch",
          start: getUtcHour(12)
        };
      let morningSession = session(name, start, end, { event });

      PROPOSALS.forEach(proposal => {
        morningSession = morningSession.addTalk(proposal);
      });

      const actual = morningSession.talks,
        expected = [
          {
            name: "Writing Fast Tests Against Enterprise Rails",
            start: getUtcHour(9)
          },
          {
            name: "Overdoing it in Python",
            start: getUtcHour(10)
          },
          {
            name: "Lua for the Masses",
            start: getUtcHour(10, 45)
          },
          {
            name: "Ruby Errors from Mismatched Gem Versions",
            start: getUtcHour(11, 15)
          },
          {
            name: "Lunch",
            start: getUtcHour(12)
          }
        ];

      assert.deepEqual(actual, expected);
    });

    it("onde a data de inicio do evento seja menor que data final da session", () => {
      const name = "Afternoon",
        start = getUtcHour(13),
        end = getUtcHour(17),
        event = {
          name: "Networking Event",
          start: getUtcHour(16)
        };
      let morningSession = session(name, start, end, { event });

      PROPOSALS.forEach(proposal => {
        morningSession = morningSession.addTalk(proposal);
      });

      const actual = morningSession.talks,
        expected = [
          {
            name: "Writing Fast Tests Against Enterprise Rails",
            start: getUtcHour(13)
          },
          {
            name: "Overdoing it in Python",
            start: getUtcHour(14)
          },
          {
            name: "Lua for the Masses",
            start: getUtcHour(14, 45)
          },
          {
            name: "Ruby Errors from Mismatched Gem Versions",
            start: getUtcHour(15, 15)
          },
          {
            name: "Common Ruby Errors",
            start: getUtcHour(16)
          },
          {
            name: "Rails for Python Developers",
            start: getUtcHour(16, 45)
          },
          {
            name: "Networking Event",
            start: getUtcHour(16, 50)
          }
        ];

      assert.deepEqual(actual, expected);
    });
  });

  it.each([
    [
      "retorna true caso tenha intervalo disponível para encaixar a proposal",
      { length: 45 },
      getUtcHour(11),
      getUtcHour(12),
      true
    ],
    [
      "retorna false caso não tenha intervalo para encaixar a proposal",
      { length: 60 },
      getUtcHour(16, 45),
      getUtcHour(17),
      false
    ]
  ])(
    "ao informar a possibilidade de inserção de novas proposals %s",
    (testCase, proposal, availableTime, end, expected) => {
      const morningSession = session("Morning", new Date(), end, { availableTime });

      const actual = morningSession.hasTime(proposal);

      assert.equal(actual, expected);
    }
  );
});
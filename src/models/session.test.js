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

  describe("com evento ao final, deve distribuir proposals inseridas no intervalo", () => {
    it("onde a data de inicio do evento seja igual a data final da session", () => {
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

    it("onde a data de inicio do evento seja menor que data final da session", () => {
      const name = "Afternoon",
        start = getUtcDate(2018, 9, 22, 13),
        end = getUtcDate(2018, 9, 22, 17),
        event = {
          name: "Networking Event",
          start: getUtcDate(2018, 9, 22, 16)
        };
      let morningSession = session(name, start, end, { event });

      PROPOSALS.forEach(proposal => {
        morningSession = morningSession.addTalk(proposal);
      });

      const actual = morningSession.talks,
        expected = [
          {
            name: "Writing Fast Tests Against Enterprise Rails",
            start: getUtcDate(2018, 9, 22, 13)
          },
          {
            name: "Overdoing it in Python",
            start: getUtcDate(2018, 9, 22, 14)
          },
          {
            name: "Lua for the Masses",
            start: getUtcDate(2018, 9, 22, 14, 45)
          },
          {
            name: "Ruby Errors from Mismatched Gem Versions",
            start: getUtcDate(2018, 9, 22, 15, 15)
          },
          {
            name: "Common Ruby Errors",
            start: getUtcDate(2018, 9, 22, 16)
          },
          {
            name: "Networking Event",
            start: getUtcDate(2018, 9, 22, 16, 45)
          }
        ];

      console.log(actual);
      console.log(expected);

      assert.deepEqual(actual, expected);
    });
  });

  it.each([
    [
      "caso não tenha evento e ainda não tenha sido utilizado todo o intervalo disponível",
      undefined,
      getUtcDate(2018, 9, 22, 11),
      true
    ],
    [
      "caso não tenha evento e tenha sido utilizado todo o intervalo disponível",
      undefined,
      getUtcDate(2018, 9, 22, 12),
      false
    ],
    [
      "caso tenha evento e ainda não tenha sido utilizado todo o intervalo disponível",
      {
        name: "Lunch",
        start: getUtcDate(2018, 9, 22, 11)
      },
      getUtcDate(2018, 9, 22, 11),
      true
    ],
    [
      "caso tenha evento e tenha sido utilizado todo o intervalo disponível",
      {
        name: "Lunch",
        start: getUtcDate(2018, 9, 22, 10),
        end: getUtcDate(2018, 9, 22, 11)
      },
      getUtcDate(2018, 9, 22, 11),
      false
    ]
  ])(
    "deve informar a possibilidade de inserção de novas proposals %s",
    (testCase, event, availableTime, expected) => {
      const name = "Morning",
        start = getUtcDate(2018, 9, 22, 9),
        end = getUtcDate(2018, 9, 22, 12),
        morningSession = session(name, start, end, { event, availableTime });

      const actual = morningSession.hasTime({ length: 0 });

      assert.equal(actual, expected);
    }
  );
});

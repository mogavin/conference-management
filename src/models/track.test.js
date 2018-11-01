const { stub } = require("sinon"),
  { assert } = require("chai"),
  track = require("./track"),
  { getUtcDate } = require("../util/date");

describe("Track", () => {
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

  it.each([
    [
      "retorna true caso tenha sessions da manhã e tarde disponíveis para encaixar a proposal",
      true,
      true,
      true
    ],
    [
      "retorna true caso tenha a session da manhã disponível para encaixar a proposal",
      true,
      false,
      true
    ],
    [
      "retorna true caso tenha a session da tarde disponível para encaixar a proposal",
      false,
      true,
      true
    ],
    [
      "retorna false caso não tenha sessions disponíveis para encaixar a proposal",
      false,
      false,
      false
    ]
  ])(
    "ao informar a possibilidade de inserção de novas proposals %s",
    (testCase, hasTimeMorning, hasTimeAfternoon, expected) => {
      const proposal = "Proposal test",
        morningSession = {
          hasTime: stub()
        },
        afternoonSession = {
          hasTime: stub()
        };

      morningSession.hasTime.withArgs(proposal).returns(hasTimeMorning);
      afternoonSession.hasTime.withArgs(proposal).returns(hasTimeAfternoon);

      const trackOne = track("Track 1", { morningSession, afternoonSession });

      const actual = trackOne.hasTime(proposal);

      assert.equal(actual, expected);
    }
  );
});

const conference = require("./index"),
  { getUtcHour } = require("../../util/date");

describe("Conference", () => {
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
    },
    {
      name: "Communicating Over Distance",
      length: 60
    },
    {
      name: "Accounting-Driven Development",
      length: 45
    },
    {
      name: "Woah",
      length: 30
    },
    {
      name: "Sit Down and Writen",
      length: 30
    },
    {
      name: "Pair Programming vs Noise",
      length: 45
    },
    {
      name: "Rails Magic",
      length: 60
    },
    {
      name: "Ruby on Rails: Why We Should Move On",
      length: 60
    },
    {
      name: "Clojure Ate Scala (on my project)",
      length: 45
    },
    {
      name: "Programming in the Boondocks of Seattle",
      length: 30
    },
    {
      name: "Ruby vs. Clojure for Back-End Development",
      length: 30
    },
    {
      name: "Ruby on Rails Legacy App Maintenance",
      length: 60
    },
    {
      name: "A World Without HackerNews",
      length: 30
    },
    {
      name: "User Interface CSS in Rails App",
      length: 30
    }
  ];

  it("teste integração", () => {
    const { tracks } = conference(PROPOSALS);

    tracks.forEach(({ morning, afternoon }) => {
      morning.talks.forEach(({ toString }) => console.log(toString()));
      afternoon.talks.forEach(({ toString }) => console.log(toString()));
      console.log("=================================================");
    });
  });
});

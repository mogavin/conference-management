const proposal = require('../proposal'),
  conference = require('./index'),
  { assert } = require('chai');

describe('Conference', () => {
  const INPUTS = [
    'Writing Fast Tests Against Enterprise Rails 60min',
    'Overdoing it in Python 45min',
    'Lua for the Masses 30min',
    'Ruby Errors from Mismatched Gem Versions 45min',
    'Common Ruby Errors 45min',
    'Rails for Python Developers lightning',
    'Communicating Over Distance 60min',
    'Accounting-Driven Development 45min',
    'Woah 30min',
    'Sit Down and Write 30min',
    'Pair Programming vs Noise 45min',
    'Rails Magic 60min',
    'Ruby on Rails: Why We Should Move On 60min',
    'Clojure Ate Scala (on my project) 45min',
    'Programming in the Boondocks of Seattle 30min',
    'Ruby vs. Clojure for Back-End Development 30min',
    'Ruby on Rails Legacy App Maintenance 60min',
    'A World Without HackerNews 30min',
    'User Interface CSS in Rails Apps 30min',
  ];

  it('deve converter os inputs em talks e distribuir em tracks', () => {
    const proposals = INPUTS.map(input => proposal(input));
    const actual = conference(proposals).toString(),
      expected = `Track 1:

09:00AM Writing Fast Tests Against Enterprise Rails 60min

10:00AM Overdoing it in Python 45min

10:45AM Lua for the Masses 30min

11:15AM Ruby Errors from Mismatched Gem Versions 45min

12:00PM Lunch

13:00PM Common Ruby Errors 45min

13:45PM Rails for Python Developers lightning

13:50PM Communicating Over Distance 60min

14:50PM Accounting-Driven Development 45min

15:35PM Woah 30min

16:05PM Sit Down and Write 30min

16:35PM Networking Event



Track 2:

09:00AM Pair Programming vs Noise 45min

09:45AM Rails Magic 60min

10:45AM Ruby on Rails: Why We Should Move On 60min

12:00PM Lunch

13:00PM Clojure Ate Scala (on my project) 45min

13:45PM Programming in the Boondocks of Seattle 30min

14:15PM Ruby vs. Clojure for Back-End Development 30min

14:45PM Ruby on Rails Legacy App Maintenance 60min

15:45PM A World Without HackerNews 30min

16:15PM User Interface CSS in Rails Apps 30min

16:45PM Networking Event`;

    assert.equal(actual, expected);
  });
});

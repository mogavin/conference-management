const { assert } = require('chai'),
  proposal = require('./index');

describe('Proposal', () => {
  it.each([
    [
      'extraindo o nome e a length',
      'Programming in the Boondocks of Seattle 30min',
      {
        name: 'Programming in the Boondocks of Seattle',
        length: 30,
      },
    ],
    [
      'convertendo lengths lightning para 5 minutos',
      'Rails for Python Developers lightning',
      {
        name: 'Rails for Python Developers',
        length: 5,
      },
    ],
  ])('deve converter em proposal %s', (testCase, input, expected) => {
    const actual = proposal(input);
    assert.deepEqual(actual, expected);
  });

  it.each([
    ['caso input tenha algum número no nome', 'Ruby 85on Rails: Why We Should Move On 60min'],
    ['caso input não tenha ao final lightning ou <length>min', 'Rails for Python Developers'],
  ])('deve lançar um erro %s', (testCase, input) => {
    assert.throws(() => proposal(input));
  });
});

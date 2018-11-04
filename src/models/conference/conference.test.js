const sinon = require('sinon'),
  stub = sinon.stub,
  { assert } = require('chai'),
  conference = require('./index');

describe('Conference', () => {
  it('deve criar tracks de acordo com a quantidade de proposals', () => {
    const proposals = ['PROP_0', 'PROP_1', 'PROP_2', 'PROP_3', 'PROP_4'],
      trackOne = {
        hasTime: stub(),
        addTalk: stub(),
      },
      trackTwo = {
        hasTime: stub(),
        addTalk: stub(),
      },
      trackFactory = stub();

    trackFactory.withArgs(1).returns(trackOne);
    trackFactory.withArgs(2).returns(trackTwo);

    trackOne.hasTime.withArgs('PROP_0').returns(true);
    trackOne.hasTime.withArgs('PROP_2').returns(true);
    trackTwo.hasTime.withArgs('PROP_1').returns(true);
    trackTwo.hasTime.withArgs('PROP_3').returns(true);
    trackTwo.hasTime.withArgs('PROP_4').returns(true);

    trackOne.addTalk.withArgs('PROP_0').returns(trackOne);
    trackOne.addTalk.withArgs('PROP_2').returns(trackOne);
    trackTwo.addTalk.withArgs('PROP_1').returns(trackTwo);
    trackTwo.addTalk.withArgs('PROP_3').returns(trackTwo);
    trackTwo.addTalk.withArgs('PROP_4').returns(trackTwo);

    const actual = conference(proposals, { trackFactory }).tracks,
      expected = [trackOne, trackTwo];

    assert.deepEqual(actual, expected);
  });

  it('deve ter uma descrição formatada', () => {
    const tracks = [
      {
        toString: () => 'TRACK_1',
      },
      {
        toString: () => 'TRACK_2',
      },
    ];

    const actual = conference([], { tracks }).toString(),
      expected = `TRACK_1\n\n\n\nTRACK_2`;

    assert.equal(actual, expected);
  });
});

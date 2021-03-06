const sinon = require('sinon'),
  stub = sinon.stub,
  { assert } = require('chai'),
  track = require('./index');

describe('Track', () => {
  it.each([
    [
      'retorna true caso tenha sessions da manhã e tarde disponíveis para encaixar a proposal',
      true,
      true,
      true,
    ],
    [
      'retorna true caso tenha a session da manhã disponível para encaixar a proposal',
      true,
      false,
      true,
    ],
    [
      'retorna true caso tenha a session da tarde disponível para encaixar a proposal',
      false,
      true,
      true,
    ],
    [
      'retorna false caso não tenha sessions disponíveis para encaixar a proposal',
      false,
      false,
      false,
    ],
  ])(
    'ao informar a possibilidade de inserção de novas proposals %s',
    (testCase, hasTimeMorning, hasTimeAfternoon, expected) => {
      const proposal = 'Proposal test',
        morningSession = {
          hasTime: stub(),
        },
        afternoonSession = {
          hasTime: stub(),
        };

      morningSession.hasTime.withArgs(proposal).returns(hasTimeMorning);
      afternoonSession.hasTime.withArgs(proposal).returns(hasTimeAfternoon);

      const trackOne = track('1', { morningSession, afternoonSession });

      const actual = trackOne.hasTime(proposal);

      assert.equal(actual, expected);
    },
  );

  it('caso tenha espaço, deve priorizar inserir proposals na session da manhã', () => {
    const proposal = {
        name: "I'm a proposal",
      },
      morningSession = {
        hasTime: stub(),
        addTalk: stub(),
      },
      afternoonSession = {
        hasTime: stub(),
        addTalk: stub(),
      },
      expected = 'Tudo ok';

    morningSession.hasTime.withArgs(proposal).returns(true);
    morningSession.addTalk.withArgs(proposal).returns(expected);

    const trackOne = track('Track 1', { morningSession, afternoonSession });

    const actual = trackOne.addTalk(proposal).morning;

    assert.deepEqual(actual, expected);
    sinon.assert.notCalled(afternoonSession.addTalk);
  });

  it('caso não tenha espaço na session da manhã, deve tentar inserir na da tarde', () => {
    const proposal = {
        name: "I'm a proposal",
      },
      morningSession = {
        hasTime: stub(),
        addTalk: stub(),
      },
      afternoonSession = {
        hasTime: stub(),
        addTalk: stub(),
      },
      expected = 'Tudo ok';

    morningSession.hasTime.withArgs(proposal).returns(false);
    afternoonSession.addTalk.withArgs(proposal).returns(expected);

    const trackOne = track('1', { morningSession, afternoonSession });

    const actual = trackOne.addTalk(proposal).afternoon;

    assert.deepEqual(actual, expected);
    sinon.assert.notCalled(morningSession.addTalk);
  });

  it('deve ter uma descrição formatada', () => {
    const morningSession = {
        toString: () => 'MORNING_SESSION',
      },
      afternoonSession = {
        toString: () => 'AFTERNOON_SESSION',
      };

    const actual = track('1', { morningSession, afternoonSession }).toString(),
      expected = `Track 1:\n\nMORNING_SESSION\n\nAFTERNOON_SESSION`;

    assert.equal(actual, expected);
  });
});

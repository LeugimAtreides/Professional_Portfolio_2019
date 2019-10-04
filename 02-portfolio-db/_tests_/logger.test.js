import Logger from '../Logger';

describe('logger tests', () => {
  test('should pretty print json', () => {
    expect(Logger.info('', { hello: 'worlds' }, { world: 'world' })).toEqual(
      true
    );
  });
});
